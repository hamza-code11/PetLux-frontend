"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetProduct, useUpdateProduct } from "@/hooks/useProducts";
import { useGetPetTypes } from "@/hooks/usePetTypes";
import { useGetCategories } from "@/hooks/useCategories";
import { useGetSubcategories } from "@/hooks/useSubcategories";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./ProductForm.module.css";

// Local Types
interface FormImage {
  id: string;
  file?: File; // Optional: For new uploads
  previewUrl: string;
  isExisting?: boolean;
}

interface FormVariant {
  id: string;
  name: string;
  slug: string;
  regular_price: string;
  sale_price: string;
  quantity: string;
  description: string;
  images: FormImage[];
}

interface Props {
  id: number;
}

export default function EditProductForm({ id }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  
  // Fetch Data
  const { data: productData, isLoading: isLoadingProduct } = useGetProduct(id);
  const product = productData?.data;
  
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  // Dropdown Data
  const { data: petTypesData } = useGetPetTypes(1, 100);
  const { data: categoriesData } = useGetCategories(1, 100);
  const { data: subcategoriesData } = useGetSubcategories(1, 100);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<"draft" | "publish">("draft");
  const [quantity, setQuantity] = useState("0");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [petTypeId, setPetTypeId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [subcategoryId, setSubcategoryId] = useState<string>("");
  
  const [hasVariants, setHasVariants] = useState(false);
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [images, setImages] = useState<FormImage[]>([]);
  const [variants, setVariants] = useState<FormVariant[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]); // Track removed existing images

  // Populate form when data loads
  useEffect(() => {
    if (product) {
      setName(product.name);
      setSlug(product.slug);
      setStatus(product.status);
      setQuantity(String(product.quantity));
      setShortDescription(product.short_description || "");
      setLongDescription(product.long_description || "");
      setPetTypeId(String(product.pet_type_id || ""));
      setCategoryId(String(product.category_id || ""));
      setSubcategoryId(String(product.subcategory_id || ""));
      setHasVariants(product.has_variants);
      setRegularPrice(product.regular_price || "");
      setSalePrice(product.sale_price || "");
      
      // Map existing images
      if (!product.has_variants && product.images) {
        setImages(product.images.map(img => ({
          id: String(img.id),
          previewUrl: getImageUrl(img.image_path),
          isExisting: true
        })));
      }

      // Map existing variants
      if (product.has_variants && product.variants) {
        setVariants(product.variants.map(v => ({
          id: String(v.id),
          name: v.name,
          slug: v.slug,
          regular_price: String(v.regular_price),
          sale_price: v.sale_price ? String(v.sale_price) : "",
          quantity: String(v.quantity),
          description: v.description || "",
          images: v.images.map(img => ({
            id: String(img.id),
            previewUrl: getImageUrl(img.image_path),
            isExisting: true
          }))
        })));
      }
    }
  }, [product]);

  // Cleanup new blob URLs
  useEffect(() => {
    return () => {
      images.filter(img => !img.isExisting).forEach(img => URL.revokeObjectURL(img.previewUrl));
      variants.forEach(v => v.images.filter(img => !img.isExisting).forEach(img => URL.revokeObjectURL(img.previewUrl)));
    };
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setSlug(value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
  };

  const createImageObj = (files: FileList): FormImage[] => {
    return Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      previewUrl: URL.createObjectURL(file),
      isExisting: false
    }));
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(prev => [...prev, ...createImageObj(e.target.files!)]);
    }
  };

  const removeMainImage = (image: FormImage) => {
    if (image.isExisting) {
      setDeletedImageIds(prev => [...prev, Number(image.id)]);
    } else {
      URL.revokeObjectURL(image.previewUrl);
    }
    setImages(prev => prev.filter(img => img.id !== image.id));
  };

  const handleProductTypeChange = (hasVars: boolean) => {
    setHasVariants(hasVars);
    if (hasVars && variants.length === 0) {
      addVariant();
    }
  };

  const addVariant = () => {
    setVariants([...variants, {
      id: Date.now().toString(),
      name: "",
      slug: "",
      regular_price: "",
      sale_price: "",
      quantity: "0",
      description: "",
      images: [],
    }]);
  };

  const updateVariant = (id: string, field: keyof FormVariant, value: any) => {
    setVariants(variants.map(v => {
      if (v.id === id) {
        const updated = { ...v, [field]: value };
        if (field === "name") {
          updated.slug = value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
        }
        return updated;
      }
      return v;
    }));
  };

  const handleVariantImageUpload = (variantId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImgs = createImageObj(e.target.files);
      setVariants(variants.map(v => 
        v.id === variantId ? { ...v, images: [...v.images, ...newImgs] } : v
      ));
    }
  };

  const removeVariantImage = (variantId: string, image: FormImage) => {
    if (image.isExisting) {
      setDeletedImageIds(prev => [...prev, Number(image.id)]);
    } else {
      URL.revokeObjectURL(image.previewUrl);
    }
    setVariants(variants.map(v => 
      v.id === variantId ? { ...v, images: v.images.filter(img => img.id !== image.id) } : v
    ));
  };

  const removeVariant = (variantId: string) => {
    const variantToRemove = variants.find(v => v.id === variantId);
    if (variantToRemove) {
      variantToRemove.images.forEach(img => {
        if (img.isExisting) setDeletedImageIds(prev => [...prev, Number(img.id)]);
        else URL.revokeObjectURL(img.previewUrl);
      });
    }
    setVariants(variants.filter(v => v.id !== variantId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!name.trim()) return toast.error("Product Name is required.");
    if (!petTypeId) return toast.error("Please select a Pet Type.");
    if (!categoryId) return toast.error("Please select a Category.");

    const payload: any = {
      name: name.trim(),
      slug,
      status,
      pet_type_id: Number(petTypeId),
      category_id: Number(categoryId),
      subcategory_id: subcategoryId ? Number(subcategoryId) : null,
      short_description: shortDescription,
      long_description: longDescription,
      has_variants: hasVariants,
      deleted_image_ids: deletedImageIds, // Send to backend for deletion
    };

    if (!hasVariants) {
      payload.regular_price = regularPrice;
      payload.sale_price = salePrice;
      payload.quantity = quantity;
      // Only send new images
      payload.main_images = images.filter(img => !img.isExisting).map(img => img.file);
    } else {
      payload.variants = variants.map(v => ({
        // If id is numeric, it's existing. Send it so backend can update instead of recreate.
        id: isNaN(Number(v.id)) ? null : Number(v.id),
        name: v.name,
        slug: v.slug,
        regular_price: v.regular_price,
        sale_price: v.sale_price,
        quantity: v.quantity,
        description: v.description,
        images: v.images.filter(img => !img.isExisting).map(img => img.file),
      }));
    }

    updateProduct({ id, data: payload }, {
      onSuccess: () => {
        toast.success("Product updated successfully!");
        router.push("/admin/products");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to update product.");
      }
    });
  };

  const petTypeOptions = useMemo(() => petTypesData?.data || [], [petTypesData]);
  const categoryOptions = useMemo(() => categoriesData?.data || [], [categoriesData]);
  const subcategoryOptions = useMemo(() => subcategoriesData?.data || [], [subcategoriesData]);

  if (isLoadingProduct) {
    return <div style={{ padding: '20px' }}>Loading product details...</div>;
  }

  if (!product) {
    return <div style={{ padding: '20px' }}>Product not found.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formLayout}>
        
        {/* Main Column */}
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>General Information</h3>
            <div className={styles.formGroup}>
              <label className={styles.label}>Product Name</label>
              <input type="text" className={styles.input} value={name} onChange={handleNameChange} required disabled={isPending} />
            </div>
            <div className={styles.rowGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Slug</label>
                <input type="text" className={`${styles.input} ${styles.inputDisabled}`} value={slug} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Status</label>
                <select className={styles.select} value={status} onChange={(e) => setStatus(e.target.value as "draft" | "publish")} disabled={isPending}>
                  <option value="draft">Draft</option>
                  <option value="publish">Publish</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Short Description</label>
              <textarea className={styles.textarea} rows={2} value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} disabled={isPending} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Long Description</label>
              <textarea className={styles.textarea} rows={4} value={longDescription} onChange={(e) => setLongDescription(e.target.value)} disabled={isPending} />
            </div>
          </div>
        </div>

        {/* Side Column */}
        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Organize</h3>
            <div className={styles.formGroup}>
              <label className={styles.label}>Pet Type</label>
              <select className={styles.select} value={petTypeId} onChange={(e) => setPetTypeId(e.target.value)} required disabled={isPending}>
                <option value="">Select Pet Type</option>
                {petTypeOptions.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <select className={styles.select} value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required disabled={isPending}>
                <option value="">Select Category</option>
                {categoryOptions.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Subcategory (Optional)</label>
              <select className={styles.select} value={subcategoryId} onChange={(e) => setSubcategoryId(e.target.value)} disabled={isPending}>
                <option value="">Select Subcategory</option>
                {subcategoryOptions.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Full Width Column */}
        <div className={`${styles.card} ${styles.fullWidthCard}`}>
          <h3 className={styles.cardTitle}>Product Type & Pricing</h3>
          
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input type="radio" checked={!hasVariants} onChange={() => handleProductTypeChange(false)} disabled={isPending} />
              Simple Product
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" checked={hasVariants} onChange={() => handleProductTypeChange(true)} disabled={isPending} />
              Variants Product
            </label>
          </div>

          {!hasVariants ? (
            <>
              <div className={styles.threeColGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Regular Price</label>
                  <input type="number" className={styles.input} value={regularPrice} onChange={(e) => setRegularPrice(e.target.value)} required={!hasVariants} disabled={isPending} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Sale Price</label>
                  <input type="number" className={styles.input} value={salePrice} onChange={(e) => setSalePrice(e.target.value)} disabled={isPending} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Quantity</label>
                  <input type="number" className={styles.input} value={quantity} onChange={(e) => setQuantity(e.target.value)} disabled={isPending} />
                </div>
              </div>
              <div className={styles.formGroup} style={{ marginTop: '16px' }}>
                <label className={styles.label}>Product Gallery</label>
                <input type="file" multiple accept="image/jpeg,image/png,image/webp" ref={mainFileInputRef} onChange={handleMainImageUpload} className={styles.hiddenInput} disabled={isPending} />
                <div className={styles.imageGrid}>
                  {images.map(img => (
                    <div key={img.id} className={styles.previewBox}>
                      <img src={img.previewUrl} alt="Preview" />
                      <button type="button" onClick={() => removeMainImage(img)} className={styles.removeImgBtn} disabled={isPending}>&times;</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => mainFileInputRef.current?.click()} className={styles.addImageBtn} disabled={isPending}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Images</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.variantsSection}>
              {variants.map((variant, index) => (
                <div key={variant.id} className={styles.variantCard}>
                  <div className={styles.variantHeader}>
                    <span className={styles.variantIndex}>Variant #{index + 1}</span>
                    <button type="button" onClick={() => removeVariant(variant.id)} className={styles.removeBtn} disabled={isPending}>Remove</button>
                  </div>
                  
                  <div className={styles.rowGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Variant Name</label>
                      <input type="text" className={styles.input} value={variant.name} onChange={(e) => updateVariant(variant.id, 'name', e.target.value)} required disabled={isPending} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Slug</label>
                      <input type="text" className={`${styles.input} ${styles.inputDisabled}`} value={variant.slug} readOnly />
                    </div>
                  </div>

                  <div className={styles.threeColGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Regular Price</label>
                      <input type="number" className={styles.input} value={variant.regular_price} onChange={(e) => updateVariant(variant.id, 'regular_price', e.target.value)} required disabled={isPending} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Sale Price</label>
                      <input type="number" className={styles.input} value={variant.sale_price} onChange={(e) => updateVariant(variant.id, 'sale_price', e.target.value)} disabled={isPending} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Quantity</label>
                      <input type="number" className={styles.input} value={variant.quantity} onChange={(e) => updateVariant(variant.id, 'quantity', e.target.value)} disabled={isPending} />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Description</label>
                    <input type="text" className={styles.input} value={variant.description} onChange={(e) => updateVariant(variant.id, 'description', e.target.value)} disabled={isPending} />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Variant Images</label>
                    <input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={(e) => handleVariantImageUpload(variant.id, e)} className={styles.hiddenInput} id={`variant-file-${variant.id}`} disabled={isPending} />
                    <div className={styles.imageGrid}>
                      {variant.images.map(img => (
                        <div key={img.id} className={styles.previewBox}>
                          <img src={img.previewUrl} alt="Variant" />
                          <button type="button" onClick={() => removeVariantImage(variant.id, img)} className={styles.removeImgBtn} disabled={isPending}>&times;</button>
                        </div>
                      ))}
                      <button type="button" onClick={() => document.getElementById(`variant-file-${variant.id}`)?.click()} className={styles.addImageBtn} disabled={isPending}>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add Images</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addVariant} className={styles.addVariantBtn} disabled={isPending}>
                + Add Another Variant
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className={styles.formActions}>
        <Link href="/admin/products" className={styles.cancelBtn}>Cancel</Link>
        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? "Updating..." : "Update Product"}
        </button>
      </div>
    </form>
  );
}


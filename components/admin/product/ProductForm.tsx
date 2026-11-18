"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product, ProductVariant, ProductImage } from "@/types/product";
import { PET_TYPES } from "@/data/pettype";
import { CATEGORIES } from "@/data/category";
import { SUBCATEGORIES } from "@/data/subcategory";
import styles from "./ProductForm.module.css";

interface Props {
  initialData?: Product;
  isEditMode?: boolean;
}

export default function ProductForm({ initialData, isEditMode = false }: Props) {
  const router = useRouter();
  const mainFileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [status, setStatus] = useState<"draft" | "publish">(initialData?.status || "draft");
  const [quantity, setQuantity] = useState(initialData?.quantity || "0");
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || "");
  const [longDescription, setLongDescription] = useState(initialData?.longDescription || "");
  const [petType, setPetType] = useState(initialData?.petType || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [subcategory, setSubcategory] = useState(initialData?.subcategory || "");
  const [images, setImages] = useState<ProductImage[]>(initialData?.images || []);
  const [hasVariants, setHasVariants] = useState(initialData?.hasVariants || false);
  const [regularPrice, setRegularPrice] = useState(initialData?.regularPrice || "");
  const [salePrice, setSalePrice] = useState(initialData?.salePrice || "");

  const defaultVariant: ProductVariant = {
    id: Date.now().toString(),
    name: "",
    slug: "",
    regularPrice: "",
    salePrice: "",
    quantity: "0",
    description: "",
    images: [],
  };

  const [variants, setVariants] = useState<ProductVariant[]>(
    initialData?.variants || (initialData?.hasVariants ? [defaultVariant] : [])
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    const generatedSlug = value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  };

  const createImageObj = (files: FileList): ProductImage[] => {
    return Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      previewUrl: URL.createObjectURL(file)
    }));
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(prev => [...prev, ...createImageObj(e.target.files!)]);
    }
  };

  const removeMainImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const addVariant = () => {
    setVariants([...variants, { ...defaultVariant, id: Date.now().toString() }]);
  };

  const updateVariant = (id: string, field: keyof ProductVariant, value: any) => {
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

  const removeVariantImage = (variantId: string, imageId: string) => {
    setVariants(variants.map(v => 
      v.id === variantId ? { ...v, images: v.images.filter(img => img.id !== imageId) } : v
    ));
  };

  const removeVariant = (id: string) => {
    setVariants(variants.filter(v => v.id !== id));
  };

  const handleProductTypeChange = (hasVars: boolean) => {
    setHasVariants(hasVars);
    if (hasVars && variants.length === 0) {
      addVariant();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("status", status);
    formData.append("short_description", shortDescription);
    formData.append("long_description", longDescription);
    formData.append("pet_type", petType);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("has_variants", String(hasVariants));

    if (!hasVariants) {
      formData.append("regular_price", regularPrice);
      formData.append("sale_price", salePrice);
      formData.append("quantity", quantity);
      images.forEach(img => {
        if (img.file) formData.append("main_images[]", img.file);
      });
    } else {
      const variantsData = variants.map((v, index) => {
        v.images?.forEach((img, imgIndex) => {
          if (img.file) formData.append(`variants[${index}][images][${imgIndex}]`, img.file);
        });
        return {
          name: v.name,
          slug: v.slug,
          regular_price: v.regularPrice,
          sale_price: v.salePrice,
          quantity: v.quantity,
          description: v.description,
        };
      });
      formData.append("variants", JSON.stringify(variantsData));
    }

    console.log("Payload:", formData);
    alert(isEditMode ? "Product updated successfully!" : "Product added successfully!");
    router.push("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formLayout}>
        
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>General Information</h3>
            <div className={styles.formGroup}>
              <label className={styles.label}>Product Name</label>
              <input type="text" className={styles.input} value={name} onChange={handleNameChange} required />
            </div>
            <div className={styles.rowGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Slug</label>
                <input type="text" className={`${styles.input} ${styles.inputDisabled}`} value={slug} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Status</label>
                <select className={styles.select} value={status} onChange={(e) => setStatus(e.target.value as "draft" | "publish")}>
                  <option value="draft">Draft</option>
                  <option value="publish">Publish</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Short Description</label>
              <textarea className={styles.textarea} rows={2} value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Long Description</label>
              <textarea className={styles.textarea} rows={4} value={longDescription} onChange={(e) => setLongDescription(e.target.value)} />
            </div>
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Organize</h3>
            <div className={styles.formGroup}>
              <label className={styles.label}>Pet Type</label>
              <select className={styles.select} value={petType} onChange={(e) => setPetType(e.target.value)} required>
                <option value="">Select Pet Type</option>
                {PET_TYPES.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <select className={styles.select} value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Subcategory</label>
              <select className={styles.select} value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                <option value="">Select Subcategory</option>
                {SUBCATEGORIES.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className={`${styles.card} ${styles.fullWidthCard}`}>
          <h3 className={styles.cardTitle}>Product Type & Pricing</h3>
          
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input type="radio" checked={!hasVariants} onChange={() => handleProductTypeChange(false)} />
              Simple Product
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" checked={hasVariants} onChange={() => handleProductTypeChange(true)} />
              Variants Product
            </label>
          </div>

          {!hasVariants ? (
            <>
              <div className={styles.threeColGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Regular Price</label>
                  <input type="number" className={styles.input} value={regularPrice} onChange={(e) => setRegularPrice(e.target.value)} required={!hasVariants} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Sale Price</label>
                  <input type="number" className={styles.input} value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Quantity</label>
                  <input type="number" className={styles.input} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
              </div>
              <div className={styles.formGroup} style={{ marginTop: '16px' }}>
                <label className={styles.label}>Product Gallery</label>
                <input type="file" multiple accept="image/*" ref={mainFileInputRef} onChange={handleMainImageUpload} className={styles.hiddenInput} />
                <div className={styles.imageGrid}>
                  {images.map(img => (
                    <div key={img.id} className={styles.previewBox}>
                      <img src={img.previewUrl} alt="Preview" />
                      <button type="button" onClick={() => removeMainImage(img.id)} className={styles.removeImgBtn}>&times;</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => mainFileInputRef.current?.click()} className={styles.addImageBtn}>
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
                    <button type="button" onClick={() => removeVariant(variant.id)} className={styles.removeBtn}>Remove</button>
                  </div>
                  
                  <div className={styles.rowGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Variant Name</label>
                      <input type="text" className={styles.input} value={variant.name} onChange={(e) => updateVariant(variant.id, 'name', e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Slug</label>
                      <input type="text" className={`${styles.input} ${styles.inputDisabled}`} value={variant.slug} readOnly />
                    </div>
                  </div>

                  <div className={styles.threeColGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Regular Price</label>
                      <input type="number" className={styles.input} value={variant.regularPrice} onChange={(e) => updateVariant(variant.id, 'regularPrice', e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Sale Price</label>
                      <input type="number" className={styles.input} value={variant.salePrice} onChange={(e) => updateVariant(variant.id, 'salePrice', e.target.value)} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Quantity</label>
                      <input type="number" className={styles.input} value={variant.quantity} onChange={(e) => updateVariant(variant.id, 'quantity', e.target.value)} />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Description</label>
                    <input type="text" className={styles.input} value={variant.description} onChange={(e) => updateVariant(variant.id, 'description', e.target.value)} />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Variant Images</label>
                    <input type="file" multiple accept="image/*" onChange={(e) => handleVariantImageUpload(variant.id, e)} className={styles.hiddenInput} id={`variant-file-${variant.id}`} />
                    <div className={styles.imageGrid}>
                      {variant.images?.map(img => (
                        <div key={img.id} className={styles.previewBox}>
                          <img src={img.previewUrl} alt="Variant" />
                          <button type="button" onClick={() => removeVariantImage(variant.id, img.id)} className={styles.removeImgBtn}>&times;</button>
                        </div>
                      ))}
                      <button type="button" onClick={() => document.getElementById(`variant-file-${variant.id}`)?.click()} className={styles.addImageBtn}>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add Images</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addVariant} className={styles.addVariantBtn}>
                + Add Another Variant
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.formActions}>
        <Link href="/admin/products" className={styles.cancelBtn}>Cancel</Link>
        <button type="submit" className={styles.submitBtn}>
          {isEditMode ? "Update Product" : "Save Product"}
        </button>
      </div>
    </form>
  );
}



"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetCategory, useUpdateCategory } from "@/hooks/useCategories";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./CategoryForm.module.css";

interface Props {
  id: number;
}

// Local placeholder path from public folder
const PLACEHOLDER_IMAGE = "/placeholder.jpg";

export default function EditCategoryForm({ id }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Fetch single category
  const { data, isLoading } = useGetCategory(id);
  const category = data?.data;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Blob URL track karne ke liye (Memory leak fix)
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const { mutate: updateCategory, isPending } = useUpdateCategory();

  // Data load hone par form fill karein
  useEffect(() => {
    if (category) {
      setName(category.name);
      setSlug(category.slug);
      // Agar image_path hai toh URL banao, warna null rakho (placeholder handle karega)
      setImagePreview(category.image_path ? getImageUrl(category.image_path) : null);
    }
  }, [category]);

  // Cleanup: Blob URL revoke karein
  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    const generatedSlug = value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    // Validate file size (Max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB.");
      return;
    }

    // Revoke old blob URL
    if (blobUrl) URL.revokeObjectURL(blobUrl);

    const newBlobUrl = URL.createObjectURL(file);
    setBlobUrl(newBlobUrl);
    setImageFile(file);
    setImagePreview(newBlobUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category Name is required.");
      return;
    }

    updateCategory(
      { id, data: { name: name.trim(), slug, image: imageFile || undefined } },
      {
        onSuccess: () => {
          toast.success("Category updated successfully!");
          router.push("/admin/categories");
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to update category.");
        },
      }
    );
  };

  // Loading State
  if (isLoading) {
    return <div style={{ padding: '20px' }}>Loading category details...</div>;
  }

  if (!category) {
    return <div style={{ padding: '20px' }}>Category not found.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        <div className={styles.inputsSection}>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Category Name</label>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={handleNameChange}
              required
              disabled={isPending}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Slug (Auto-generated)</label>
            <input
              type="text"
              className={`${styles.input} ${styles.inputDisabled}`}
              value={slug}
              readOnly
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Update Image (Optional)</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/svg+xml,image/webp,image/jfif"
              ref={fileInputRef}
              onChange={handleImageChange}
              className={styles.hiddenInput}
              disabled={isPending}
            />
            <div
              className={styles.uploadBox}
              onClick={() => !isPending && fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>{imageFile ? "Change Image" : "Click to upload new image"}</span>
              {imageFile && <span className={styles.fileName}>{imageFile.name}</span>}
            </div>
          </div>
        </div>

        <div className={styles.previewSection}>
          <span className={styles.label}>Image Preview</span>
          <div className={styles.imagePreviewWrapper}>
            {/* Agar imagePreview null hai, toh local placeholder use hoga */}
            <img
              src={imagePreview || PLACEHOLDER_IMAGE}
              alt="Category Preview"
              className={styles.previewImage}
              onError={(e) => {
                // Agar backend image load fail ho jaye (404), toh local placeholder set karo
                (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.formActions}>
        <Link href="/admin/categories" className={styles.cancelBtn}>Cancel</Link>
        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? "Updating..." : "Update Category"}
        </button>
      </div>
    </form>
  );
}
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateCategory } from "@/hooks/useCategories"; // Hook import kiya
import { useToast } from "@/components/ui/Toast/ToastContext"; // Toast import kiya
import styles from "./CategoryForm.module.css";

export default function CategoryForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Hook ka use
  const { mutate: createCategory, isPending } = useCreateCategory();

  // Memory Leak Fix: Jab component unmount ho ya image change ho, purana URL revoke karein
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

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

    // Revoke old preview
    if (imagePreview) URL.revokeObjectURL(imagePreview);

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category Name is required.");
      return;
    }

    if (!imageFile) {
      toast.error("Please select an image.");
      return;
    }

    // API Call
    createCategory(
      { name: name.trim(), slug, image: imageFile },
      {
        onSuccess: () => {
          toast.success("Category added successfully!");
          router.push("/admin/categories");
        },
        onError: (err: any) => {
          const errorMsg = err.response?.data?.message || "Failed to create category.";
          toast.error(errorMsg);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        <div className={styles.inputsSection}>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Category Name</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. Dog Food, Toys"
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
            <label className={styles.label}>Category Image</label>
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
              <span>{imageFile ? "Change Image" : "Click to upload image"}</span>
              {imageFile && <span className={styles.fileName}>{imageFile.name}</span>}
            </div>
          </div>
        </div>

        <div className={styles.previewSection}>
          <span className={styles.label}>Image Preview</span>
          <div className={styles.imagePreviewWrapper}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className={styles.previewImage} />
            ) : (
              <div className={styles.imagePlaceholder}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>No Image Selected</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.formActions}>
        <Link href="/admin/categories" className={styles.cancelBtn}>Cancel</Link>
        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? "Saving..." : "Save Category"}
        </button>
      </div>
    </form>
  );
}

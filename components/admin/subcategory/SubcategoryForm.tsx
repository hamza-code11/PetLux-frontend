"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateSubcategory } from "@/hooks/useSubcategories";
import { useToast } from "@/components/ui/Toast/ToastContext";
import styles from "./SubcategoryForm.module.css";

// Local placeholder path from public folder
const PLACEHOLDER_IMAGE = "/placeholder.jpeg";

export default function SubcategoryForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { mutate: createSubcategory, isPending } = useCreateSubcategory();

  // Memory Leak Fix
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

    // File Validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB.");
      return;
    }

    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!name.trim()) {
    toast.error("Subcategory Name is required.");
    return;
  }

  // API Call
  createSubcategory(
    { name: name.trim(), slug, image: imageFile || undefined },
    {
      onSuccess: () => {
        toast.success("Subcategory added successfully!");
        router.push("/admin/subcategories");
      },
      onError: (err: any) => {
        const errorMsg = err.response?.data?.message || "Failed to create subcategory.";
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
            <label className={styles.label}>Subcategory Name</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. Dry Dog Food, Dog Toys"
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
            <label className={styles.label}>Subcategory Image (Optional)</label>
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
            {/* Placeholder Logic: Agar image nahi hai toh /placeholder.jpeg dikhao */}
            <img
              src={imagePreview || PLACEHOLDER_IMAGE}
              alt="Preview"
              className={styles.previewImage}
              onError={(e) => {
                (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.formActions}>
        <Link href="/admin/subcategories" className={styles.cancelBtn}>Cancel</Link>
        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? "Saving..." : "Save Subcategory"}
        </button>
      </div>
    </form>
  );
}

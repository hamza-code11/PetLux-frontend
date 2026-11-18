"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Category } from "@/types/category";
import styles from "./CategoryForm.module.css";

interface Props { initialData: Category; }

export default function EditCategoryForm({ initialData }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initialData.name);
  const [slug, setSlug] = useState(initialData.slug);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.image);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    const generatedSlug = value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ id: initialData.id, name, slug, imageFile });
    alert("Category updated successfully!");
    router.push("/admin/categories");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        <div className={styles.inputsSection}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Category Name</label>
            <input type="text" className={styles.input} value={name} onChange={handleNameChange} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Slug (Auto-generated)</label>
            <input type="text" className={`${styles.input} ${styles.inputDisabled}`} value={slug} readOnly />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Update Image</label>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className={styles.hiddenInput} />
            <div className={styles.uploadBox} onClick={() => fileInputRef.current?.click()}>
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
        <button type="submit" className={styles.submitBtn}>Update Category</button>
      </div>
    </form>
  );
}

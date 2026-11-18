"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./PetTypeForm.module.css";

export default function PetTypeForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Auto-generate slug
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    
    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  };

  // Handle Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create a temporary URL for preview
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Yahan FormData banakar API ko bhejenge
    console.log({ name, slug, imageFile });
    
    alert("Pet Type added successfully!");
    router.push("/admin/petTypes");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      
      <div className={styles.formGrid}>
        {/* Left Side: Inputs */}
        <div className={styles.inputsSection}>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Pet Type Name</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. Dog, Cat, Bird"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Slug (Auto-generated)</label>
            <input
              type="text"
              className={`${styles.input} ${styles.inputDisabled}`}
              placeholder="e.g. dog-cat-bird"
              value={slug}
              readOnly // User edit nahi kar sakta
            />
            <span className={styles.helpText}>
              Generated automatically from the name.
            </span>
          </div>

          {/* Image Upload Section */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Pet Type Image</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className={styles.hiddenInput}
            />
            
            <div 
              className={styles.uploadBox} 
              onClick={triggerFileInput}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>{imageFile ? "Change Image" : "Click to upload image"}</span>
              {imageFile && <span className={styles.fileName}>{imageFile.name}</span>}
            </div>
          </div>
        </div>

        {/* Right Side: Image Preview */}
        <div className={styles.previewSection}>
          <span className={styles.label}>Image Preview</span>
          <div className={styles.imagePreviewWrapper}>
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Preview" 
                className={styles.previewImage}
              />
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
        <Link href="/admin/petTypes" className={styles.cancelBtn}>
          Cancel
        </Link>
        <button type="submit" className={styles.submitBtn}>
          Save Pet Type
        </button>
      </div>

    </form>
  );
}

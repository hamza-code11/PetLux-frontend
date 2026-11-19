"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreatePetType } from "@/hooks/usePetTypes";
import { useToast } from "@/components/ui/Toast/ToastContext";
import styles from "./PetTypeForm.module.css";

export default function PetTypeForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { mutate: createPetType, isPending } = useCreatePetType();

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
    if (!imageFile) {
      toast.error("Please select an image.");
      return;
    }

    createPetType(
      { name, slug, image: imageFile },
      {
        onSuccess: () => {
          toast.success("Pet Type added successfully!");
          router.push("/admin/petTypes");
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to create pet type.");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* ... (Same UI as aapne diya, bas submit button me isPending use karein) ... */}
      <div className={styles.formGrid}>
        <div className={styles.inputsSection}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Pet Type Name</label>
            <input type="text" className={styles.input} placeholder="e.g. Dog" value={name} onChange={handleNameChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Slug</label>
            <input type="text" className={`${styles.input} ${styles.inputDisabled}`} value={slug} readOnly />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Pet Type Image</label>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className={styles.hiddenInput} required />
            <div className={styles.uploadBox} onClick={() => fileInputRef.current?.click()}>
              <span>{imageFile ? "Change Image" : "Click to upload image"}</span>
            </div>
          </div>
        </div>
        <div className={styles.previewSection}>
          <span className={styles.label}>Image Preview</span>
          <div className={styles.imagePreviewWrapper}>
            {imagePreview ? <img src={imagePreview} alt="Preview" className={styles.previewImage} /> : <div className={styles.imagePlaceholder}><span>No Image</span></div>}
          </div>
        </div>
      </div>
      <div className={styles.formActions}>
        <Link href="/admin/petTypes" className={styles.cancelBtn}>Cancel</Link>
        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? "Saving..." : "Save Pet Type"}
        </button>
      </div>
    </form>
  );
}

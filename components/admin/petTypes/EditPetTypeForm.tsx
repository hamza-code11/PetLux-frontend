"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetPetType, useUpdatePetType } from "@/hooks/usePetTypes";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { getImageUrl, isLocalImage } from "@/lib/imageUrl"; // getImageUrl import karein
import styles from "./PetTypeForm.module.css";

interface Props {
  id: number;
}

export default function EditPetTypeForm({ id }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Fetch single item
  const { data, isLoading } = useGetPetType(id);
  const petType = data?.data;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { mutate: updatePetType, isPending } = useUpdatePetType();

  // Data load hone par form fill karein
  useEffect(() => {
    if (petType) {
      setName(petType.name);
      setSlug(petType.slug);
      // Yahan getImageUrl use karein taaki port 8000 add ho jaye
      setImagePreview(getImageUrl(petType.image_path)); 
    }
  }, [petType]);

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
    updatePetType(
      { id, data: { name, slug, image: imageFile || undefined } },
      {
        onSuccess: () => {
          toast.success("Pet Type updated successfully!");
          router.push("/admin/petTypes");
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to update pet type.");
        },
      }
    );
  };

  if (isLoading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (!petType) return <div>Pet Type not found.</div>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        <div className={styles.inputsSection}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Pet Type Name</label>
            <input type="text" className={styles.input} value={name} onChange={handleNameChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Slug</label>
            <input type="text" className={`${styles.input} ${styles.inputDisabled}`} value={slug} readOnly />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Update Image (Optional)</label>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className={styles.hiddenInput} />
            <div className={styles.uploadBox} onClick={() => fileInputRef.current?.click()}>
              <span>{imageFile ? "Change Image" : "Click to change image"}</span>
            </div>
          </div>
        </div>
        <div className={styles.previewSection}>
          <span className={styles.label}>Image Preview</span>
          <div className={styles.imagePreviewWrapper}>
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Preview" 
                className={styles.previewImage} 
              />
            ) : <div className={styles.imagePlaceholder}><span>No Image</span></div>}
          </div>
        </div>
      </div>
      <div className={styles.formActions}>
        <Link href="/admin/petTypes" className={styles.cancelBtn}>Cancel</Link>
        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? "Updating..." : "Update Pet Type"}
        </button>
      </div>
    </form>
  );
}


"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetPetType, useUpdatePetType } from "@/hooks/usePetTypes";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { getImageUrl, isLocalImage } from "@/lib/imageUrl";
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
  
  // Blob URL track karne ke liye (Memory leak fix)
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const { mutate: updatePetType, isPending } = useUpdatePetType();

  // Data load hone par form fill karein
  useEffect(() => {
    if (petType) {
      setName(petType.name);
      setSlug(petType.slug);
      // Backend image ka URL set karein
      setImagePreview(getImageUrl(petType.image_path));
    }
  }, [petType]);

  // Cleanup: Component unmount hone par ya blob URL change hone par revoke karein
  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    
    // Slug automatically generate hoga
    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
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

    // Validate file size (Max 2MB as per backend)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB.");
      return;
    }

    // Purana blob URL revoke karein (agar hai)
    if (blobUrl) URL.revokeObjectURL(blobUrl);

    // Naya blob URL banayein
    const newBlobUrl = URL.createObjectURL(file);
    setBlobUrl(newBlobUrl);
    setImageFile(file);
    setImagePreview(newBlobUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Pet Type Name is required.");
      return;
    }

    updatePetType(
      { id, data: { name: name.trim(), slug, image: imageFile || undefined } },
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

  // Check karein ki preview blob URL hai ya backend URL
  const isBlob = imagePreview?.startsWith("blob:");

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
              <span>{imageFile ? "Change Image" : "Click to change image"}</span>
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
                // Agar image load na ho toh placeholder dikhe
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder-image.png";
                }}
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

      {/* Actions */}
      <div className={styles.formActions}>
        <Link href="/admin/petTypes" className={styles.cancelBtn}>
          Cancel
        </Link>
        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? "Updating..." : "Update Pet Type"}
        </button>
      </div>
    </form>
  );
}


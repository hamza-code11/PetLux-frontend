
"use client";

import { useEffect, useState } from "react";
import {
  useCmsSection,
  useUpdateCmsSection,
  BannerContent,
} from "@/hooks/useCms";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./banner-cms-form.module.css";

export default function BannerCmsForm() {
  const { data, isLoading } =
    useCmsSection<BannerContent>("banner_section");

  const updateMutation =
    useUpdateCmsSection("banner_section");

  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const content = data?.data?.content;

    if (content) {
      setImage(content.image || "");
      setLink(content.link || "");
    }
  }, [data]);

  useEffect(() => {
    if (!imageFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("content[image]", image);
    formData.append("content[link]", link);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    updateMutation.mutate(formData);
  };

  if (isLoading) return <p>Loading banner settings...</p>;

  const imagePreview = preview || (image ? getImageUrl(image) : "");

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Banner Image</label>

        {imagePreview && (
          <div className={styles.preview}>
            <img src={imagePreview} alt="Banner preview" />
          </div>
        )}

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className={styles.fileInput}
          onChange={(e) => {
            setImageFile(e.target.files?.[0] || null);
          }}
        />

        <p className={styles.helpText}>
          Recommended: Full-width banner image. JPG, PNG or WebP.
        </p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Banner Click Link</label>

        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="/shop/food"
          className={styles.input}
        />

        <p className={styles.helpText}>
          Example: /shop/food or https://example.com
        </p>
      </div>

      <div className={styles.footer}>
        <button
          type="submit"
          disabled={updateMutation.isPending || (!image && !imageFile)}
          className={styles.saveButton}
        >
          {updateMutation.isPending ? "Saving..." : "Save Banner"}
        </button>
      </div>

      {updateMutation.isSuccess && (
        <p className={styles.successMessage}>
          Banner updated successfully.
        </p>
      )}

      {updateMutation.isError && (
        <p className={styles.errorMessage}>
          Failed to update banner. Please try again.
        </p>
      )}
    </form>
  );
}

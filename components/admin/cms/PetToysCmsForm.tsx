"use client";

import { useEffect, useRef, useState } from "react";
import {
  useCmsSection,
  useUpdateCmsSection,
  PetToysContent,
  CmsImage,
} from "@/hooks/useCms";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./PetToysCmsForm.module.css";

const EMPTY: PetToysContent = {
  title: "",
  description: "",
  features: ["", "", "", ""],
  button_text: "",
  button_link: "",
  images: [
    { src: "", slug: "" },
    { src: "", slug: "" },
    { src: "", slug: "" },
    { src: "", slug: "" },
  ],
};

type LocalImage = CmsImage & { file?: File; preview?: string };

export default function PetToysCmsForm() {
  const { toast } = useToast();
  const { data, isLoading } = useCmsSection<PetToysContent>("pet_toys");
  const { mutate: save, isPending } = useUpdateCmsSection("pet_toys");

  const [form, setForm] = useState<PetToysContent>(EMPTY);
  const [images, setImages] = useState<LocalImage[]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (data?.data?.content) {
      const c = data.data.content;
      setForm({
        ...EMPTY,
        ...c,
        images: undefined as any, // handled separately
      } as PetToysContent);
      const safeImages =
        c.images?.length === 4 ? c.images : EMPTY.images;
      setImages(safeImages.map((i) => ({ ...i })));
    }
  }, [data]);

  const update = <K extends keyof PetToysContent>(
    key: K,
    value: PetToysContent[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const updateFeature = (idx: number, value: string) => {
    const next = [...form.features];
    next[idx] = value;
    update("features", next);
  };

  const updateImage = (idx: number, patch: Partial<LocalImage>) => {
    setImages((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], ...patch };
      return next;
    });
  };

  const pickImage = (idx: number) => inputRefs.current[idx]?.click();

  const onFilePicked = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    updateImage(idx, { file, preview });
  };

  const handleSave = () => {
    const hasFile = images.some((i) => !!i.file);

    if (hasFile) {
      // Multipart form data
      const fd = new FormData();
      fd.append("content[title]", form.title);
      fd.append("content[description]", form.description);
      form.features.forEach((f, i) => fd.append(`content[features][${i}]`, f));
      fd.append("content[button_text]", form.button_text);
      fd.append("content[button_link]", form.button_link);

      images.forEach((img, i) => {
        fd.append(`content[images][${i}][slug]`, img.slug);
        fd.append(
          `content[images][${i}][src]`,
          img.file ? "" : img.src // file ho to empty, backend path dega
        );
        if (img.file) {
          fd.append(`images[${i}]`, img.file);
        }
      });

      save(fd, {
        onSuccess: () => toast.success("Pet Toys section updated."),
        onError: () => toast.error("Failed to update section."),
      });
    } else {
      // Plain JSON — no files
      const payload: PetToysContent = {
        ...form,
        images: images.map(({ src, slug }) => ({ src, slug })),
      };
      save(payload, {
        onSuccess: () => toast.success("Pet Toys section updated."),
        onError: () => toast.error("Failed to update section."),
      });
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.sectionTitle}>Pet Toys Section</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Title</label>
        <input
          className={styles.input}
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Features</label>
        <div className={styles.featureList}>
          {form.features.map((f, idx) => (
            <input
              key={idx}
              className={styles.input}
              value={f}
              placeholder={`Feature ${idx + 1}`}
              onChange={(e) => updateFeature(idx, e.target.value)}
            />
          ))}
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Button Text</label>
          <input
            className={styles.input}
            value={form.button_text}
            onChange={(e) => update("button_text", e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Button Link</label>
          <input
            className={styles.input}
            value={form.button_link}
            onChange={(e) => update("button_link", e.target.value)}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Images (4)</label>
        <div className={styles.imagesGrid}>
          {images.map((img, idx) => (
            <div key={idx} className={styles.imageSlot}>
              <div
                className={styles.imagePreview}
                onClick={() => pickImage(idx)}
                role="button"
                tabIndex={0}
              >
                {img.preview || img.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img.preview || getImageUrl(img.src)}
                    alt={`Image ${idx + 1}`}
                  />
                ) : (
                  <span className={styles.uploadHint}>+ Upload</span>
                )}
                <input
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => onFilePicked(idx, e)}
                />
              </div>
              <input
                className={styles.input}
                value={img.slug}
                placeholder={`Slug (e.g. rope-toy)`}
                onChange={(e) => updateImage(idx, { slug: e.target.value })}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className={styles.saveBtn}
        onClick={handleSave}
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save Pet Toys Section"}
      </button>
    </div>
  );
}
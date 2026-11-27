"use client";

import { useEffect, useRef, useState } from "react";
import {
  useCmsSection,
  useUpdateCmsSection,
  CategoryContent,
  CategoryItem,
} from "@/hooks/useCms";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./CategoryCmsForm.module.css";

const SLOTS = 5; // 1 main + 4 small

const emptyCats = (): CategoryItem[] =>
  Array.from({ length: SLOTS }, () => ({ name: "", slug: "", image: "" }));

const EMPTY: CategoryContent = {
  title: "",
  subtitle: "",
  categories: emptyCats(),
};

type LocalCategory = CategoryItem & { file?: File; preview?: string };

export default function CategoryCmsForm() {
  const { toast } = useToast();
  const { data, isLoading } = useCmsSection<CategoryContent>("category_section");
  const { mutate: save, isPending } = useUpdateCmsSection("category_section");

  const [form, setForm] = useState<CategoryContent>(EMPTY);
  const [cats, setCats] = useState<LocalCategory[]>(emptyCats());
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (data?.data?.content) {
      const c = data.data.content;
      setForm({ title: c.title ?? "", subtitle: c.subtitle ?? "", categories: [] });
      const safe =
        c.categories?.length === SLOTS ? c.categories : emptyCats();
      setCats(safe.map((x) => ({ ...x })));
    }
  }, [data]);

  const updateCat = (idx: number, patch: Partial<LocalCategory>) => {
    setCats((prev) => {
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
    updateCat(idx, { file, preview: URL.createObjectURL(file) });
  };

  const handleSave = () => {
    const hasFile = cats.some((c) => !!c.file);

    if (hasFile) {
      const fd = new FormData();
      fd.append("content[title]", form.title);
      fd.append("content[subtitle]", form.subtitle);
      cats.forEach((c, i) => {
        fd.append(`content[categories][${i}][name]`, c.name);
        fd.append(`content[categories][${i}][slug]`, c.slug);
        fd.append(
          `content[categories][${i}][image]`,
          c.file ? "" : c.image
        );
        if (c.file) fd.append(`images[${i}]`, c.file);
      });

      save(fd, {
        onSuccess: () => toast.success("Category section updated."),
        onError: () => toast.error("Failed to update section."),
      });
    } else {
      save(
        {
          title: form.title,
          subtitle: form.subtitle,
          categories: cats.map(({ name, slug, image }) => ({ name, slug, image })),
        },
        {
          onSuccess: () => toast.success("Category section updated."),
          onError: () => toast.error("Failed to update section."),
        }
      );
    }
  };

  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.sectionTitle}>Category Section</h2>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Subtitle</label>
          <input
            className={styles.input}
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Categories (5 = 1 main + 4 small)
        </label>
        <div className={styles.catsGrid}>
          {cats.map((cat, idx) => {
            const isMain = idx === 0;
            const imgSrc = cat.preview || (cat.image ? getImageUrl(cat.image) : "");
            return (
              <div
                key={idx}
                className={`${styles.catSlot} ${isMain ? styles.catSlotMain : ""}`}
              >
                <span className={styles.slotBadge}>
                  {isMain ? "Main" : `Card ${idx}`}
                </span>

                <div
                  className={styles.imagePreview}
                  onClick={() => pickImage(idx)}
                  role="button"
                  tabIndex={0}
                >
                  {imgSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imgSrc} alt={cat.name || `Category ${idx + 1}`} />
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
                  placeholder="Name (e.g. Foods)"
                  value={cat.name}
                  onChange={(e) => updateCat(idx, { name: e.target.value })}
                />
                <input
                  className={styles.input}
                  placeholder="Slug (e.g. foods)"
                  value={cat.slug}
                  onChange={(e) => updateCat(idx, { slug: e.target.value })}
                />
              </div>
            );
          })}
        </div>
      </div>

      <button
        className={styles.saveBtn}
        onClick={handleSave}
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save Category Section"}
      </button>
    </div>
  );
}

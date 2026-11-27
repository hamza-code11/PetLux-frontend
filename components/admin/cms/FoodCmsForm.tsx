
"use client";

import { useEffect, useRef, useState } from "react";
import {
  useCmsSection,
  useUpdateCmsSection,
  FoodContent,
} from "@/hooks/useCms";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./FoodCmsForm.module.css";

const EMPTY: FoodContent = {
  eyebrow: "",
  title: "",
  description: "",
  features: ["", "", ""],
  button_text: "",
  button_link: "",
  image: "",
};

export default function FoodCmsForm() {
  const { toast } = useToast();

  const { data, isLoading } =
    useCmsSection<FoodContent>("food_section");

  const { mutate: save, isPending } =
    useUpdateCmsSection("food_section");

  const [form, setForm] = useState<FoodContent>(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data?.data?.content) {
      const content = data.data.content;

      setForm({
        ...EMPTY,
        ...content,
        features: [
          content.features?.[0] ?? "",
          content.features?.[1] ?? "",
          content.features?.[2] ?? "",
        ],
      });
    }
  }, [data]);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const updateField = (
    field: keyof FoodContent,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setForm((prev) => {
      const features = [...prev.features];
      features[index] = value;

      return { ...prev, features };
    });
  };

  const handleSave = () => {
    const fd = new FormData();

    fd.append("content[eyebrow]", form.eyebrow);
    fd.append("content[title]", form.title);
    fd.append("content[description]", form.description);
    fd.append("content[button_text]", form.button_text);
    fd.append("content[button_link]", form.button_link);
    fd.append("content[image]", form.image);

    form.features.forEach((feature, index) => {
      fd.append(`content[features][${index}]`, feature);
    });

    if (file) {
      fd.append("image", file);
    }

    save(fd, {
      onSuccess: () => {
        setFile(null);
        toast.success("Food section updated successfully.");
      },
      onError: () => {
        toast.error("Failed to update food section.");
      },
    });
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const imageSrc = preview || (
    form.image ? getImageUrl(form.image) : ""
  );

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.sectionTitle}>
        Food Section
      </h2>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Eyebrow Text</label>
          <input
            className={styles.input}
            value={form.eyebrow}
            onChange={(e) =>
              updateField("eyebrow", e.target.value)
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Section Title</label>
          <input
            className={styles.input}
            value={form.title}
            onChange={(e) =>
              updateField("title", e.target.value)
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.textarea}
            rows={5}
            value={form.description}
            onChange={(e) =>
              updateField("description", e.target.value)
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Button Text</label>
          <input
            className={styles.input}
            value={form.button_text}
            onChange={(e) =>
              updateField("button_text", e.target.value)
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Button Link</label>
          <input
            className={styles.input}
            value={form.button_link}
            onChange={(e) =>
              updateField("button_link", e.target.value)
            }
            placeholder="/shop/food"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Features (3)
        </label>

        {form.features.map((feature, index) => (
          <input
            key={index}
            className={styles.input}
            value={feature}
            placeholder={`Feature ${index + 1}`}
            onChange={(e) =>
              updateFeature(index, e.target.value)
            }
          />
        ))}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Section Image</label>

        <div
          className={styles.imagePreview}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageSrc} alt="Food section preview" />
          ) : (
            <span>+ Upload Image</span>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          hidden
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
          }}
        />

        {file && (
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => {
              setFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
          >
            Cancel New Image
          </button>
        )}
      </div>

      <button
        className={styles.saveBtn}
        onClick={handleSave}
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save Food Section"}
      </button>
    </div>
  );
}



"use client";

import { useEffect, useState } from "react";
import {
  useCmsSection,
  useUpdateCmsSection,
  type HeroContent,
} from "@/hooks/useCms";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./hero-cms-form.module.css";

const DEFAULT_CONTENT: HeroContent = {
  badge_text: "Healthy Food • Happy Pets",
  title_line_one: "PetLux",
  title_line_two: "Pet",
  title_highlight: "Foods",
  tagline:
    "Nutritious, Delicious & Trusted Pet Food for a Healthier, Happier Life.",
  button_text: "Shop Now",
  button_link: "/shop",
  image: "/images/hero-pets.jpg",
  features: [
    {
      line_one: "Premium Quality",
      line_two: "Ingredients",
      icon: "shield",
    },
    {
      line_one: "Supports Overall",
      line_two: "Health",
      icon: "heart",
    },
    {
      line_one: "Loved by",
      line_two: "Pets",
      icon: "paw",
    },
    {
      line_one: "Fast & Reliable",
      line_two: "Delivery",
      icon: "truck",
    },
  ],
};

const FEATURE_ICONS = ["shield", "heart", "paw", "truck"] as const;

export default function HeroCmsForm() {
  const { data, isLoading } =
    useCmsSection<HeroContent>("hero_section");

  const updateMutation = useUpdateCmsSection("hero_section");

  const [form, setForm] = useState<HeroContent>(DEFAULT_CONTENT);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const content = data?.data?.content;

    if (content) {
      setForm({
        ...DEFAULT_CONTENT,
        ...content,
        features: DEFAULT_CONTENT.features.map((defaultFeature, index) => ({
          ...defaultFeature,
          ...content.features?.[index],
          icon: defaultFeature.icon,
        })),
      });
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

  const handleChange = (
    field: keyof HeroContent,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureChange = (
    index: number,
    field: "line_one" | "line_two",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? { ...feature, [field]: value } : feature
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("content[badge_text]", form.badge_text);
    formData.append("content[title_line_one]", form.title_line_one);
    formData.append("content[title_line_two]", form.title_line_two);
    formData.append("content[title_highlight]", form.title_highlight);
    formData.append("content[tagline]", form.tagline);
    formData.append("content[button_text]", form.button_text);
    formData.append("content[button_link]", form.button_link);
    formData.append("content[image]", form.image);

    form.features.forEach((feature, index) => {
      formData.append(
        `content[features][${index}][line_one]`,
        feature.line_one
      );

      formData.append(
        `content[features][${index}][line_two]`,
        feature.line_two
      );

      formData.append(
        `content[features][${index}][icon]`,
        FEATURE_ICONS[index]
      );
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return <p>Loading Hero CMS...</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Hero Image */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Hero Image</h3>

        <div className={styles.imageWrapper}>
          {(preview || form.image) && (
            <img
              src={preview || getImageUrl(form.image)}
              alt="Hero preview"
              className={styles.imagePreview}
            />
          )}
        </div>

        <label className={styles.label}>Upload Hero Image</label>

        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/webp"
          className={styles.input}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImageFile(file);
          }}
        />

        <p className={styles.helpText}>
          Recommended image size: 1200 × 650px. Maximum 5MB.
        </p>
      </section>

      {/* Badge */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Hero Badge</h3>

        <label className={styles.label}>Badge Text</label>
        <input
          className={styles.input}
          value={form.badge_text}
          onChange={(e) => handleChange("badge_text", e.target.value)}
          placeholder="Healthy Food • Happy Pets"
        />
      </section>

      {/* Heading */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Hero Heading</h3>

        <label className={styles.label}>First Line</label>
        <input
          className={styles.input}
          value={form.title_line_one}
          onChange={(e) => handleChange("title_line_one", e.target.value)}
        />

        <label className={styles.label}>Second Line</label>
        <input
          className={styles.input}
          value={form.title_line_two}
          onChange={(e) => handleChange("title_line_two", e.target.value)}
        />

        <label className={styles.label}>Highlighted Text</label>
        <input
          className={styles.input}
          value={form.title_highlight}
          onChange={(e) => handleChange("title_highlight", e.target.value)}
        />
      </section>

      {/* Tagline */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Hero Description</h3>

        <label className={styles.label}>Tagline</label>
        <textarea
          className={styles.textarea}
          rows={3}
          value={form.tagline}
          onChange={(e) => handleChange("tagline", e.target.value)}
        />
      </section>

      {/* Button */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Call To Action</h3>

        <label className={styles.label}>Button Text</label>
        <input
          className={styles.input}
          value={form.button_text}
          onChange={(e) => handleChange("button_text", e.target.value)}
        />

        <label className={styles.label}>Button Link</label>
        <input
          className={styles.input}
          value={form.button_link}
          onChange={(e) => handleChange("button_link", e.target.value)}
          placeholder="/shop"
        />
      </section>

      {/* Features */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Hero Features</h3>

        {form.features.map((feature, index) => (
          <div key={FEATURE_ICONS[index]} className={styles.featureCard}>
            <div className={styles.featureHeader}>
              <h4>Feature {index + 1}</h4>
              <span className={styles.iconName}>
                {FEATURE_ICONS[index]}
              </span>
            </div>

            <label className={styles.label}>First Line</label>
            <input
              className={styles.input}
              value={feature.line_one}
              onChange={(e) =>
                handleFeatureChange(index, "line_one", e.target.value)
              }
            />

            <label className={styles.label}>Second Line</label>
            <input
              className={styles.input}
              value={feature.line_two}
              onChange={(e) =>
                handleFeatureChange(index, "line_two", e.target.value)
              }
            />
          </div>
        ))}
      </section>

      {/* Submit */}
      <div className={styles.footer}>
        <button
          type="submit"
          className={styles.saveButton}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? "Saving..." : "Save Hero Section"}
        </button>
      </div>

      {updateMutation.isSuccess && (
        <p className={styles.successMessage}>
          Hero section updated successfully!
        </p>
      )}

      {updateMutation.isError && (
        <p className={styles.errorMessage}>
          Failed to update hero section. Please try again.
        </p>
      )}
    </form>
  );
}

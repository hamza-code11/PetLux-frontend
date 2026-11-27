
"use client";

import { useEffect, useState } from "react";
import {
  useCmsSection,
  useUpdateCmsSection,
  AboutContent,
} from "@/hooks/useCms";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./about-cms-form.module.css";

const DEFAULT_CONTENT: AboutContent = {
  hero: {
    eyebrow: "",
    title: "",
    description: "",
  },
  stats: [],
  mission: {
    eyebrow: "",
    title: "",
    description_one: "",
    description_two: "",
    button_text: "",
    button_link: "",
  },
  team: {
    eyebrow: "",
    title: "",
    members: [],
  },
  images: [],
};

export default function AboutCmsForm() {
  const { data, isLoading } =
    useCmsSection<AboutContent>("about_section");

  const updateMutation = useUpdateCmsSection("about_section");

  const [form, setForm] = useState<AboutContent>(DEFAULT_CONTENT);
  const [imageFiles, setImageFiles] = useState<Record<number, File>>({});
  const [previews, setPreviews] = useState<Record<number, string>>({});

  useEffect(() => {
    if (data?.data?.content) {
      setForm(data.data.content);
    }
  }, [data]);

  useEffect(() => {
    const urls = Object.entries(imageFiles).map(([index, file]) => ({
      index: Number(index),
      url: URL.createObjectURL(file),
    }));

    setPreviews(
      Object.fromEntries(urls.map(({ index, url }) => [index, url]))
    );

    return () => {
      urls.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [imageFiles]);

  const updateHero = (
    field: keyof AboutContent["hero"],
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const updateMission = (
    field: keyof AboutContent["mission"],
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      mission: { ...prev.mission, [field]: value },
    }));
  };

  const updateTeamSection = (field: "eyebrow" | "title", value: string) => {
    setForm((prev) => ({
      ...prev,
      team: { ...prev.team, [field]: value },
    }));
  };

  const updateStat = (
    index: number,
    field: "value" | "label",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      stats: prev.stats.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const updateMember = (
    index: number,
    field: "name" | "role",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        members: prev.team.members.map((member, i) =>
          i === index ? { ...member, [field]: value } : member
        ),
      },
    }));
  };

  const updateImage = (index: number, file?: File) => {
    if (!file) return;

    setImageFiles((prev) => ({
      ...prev,
      [index]: file,
    }));
  };

  const addStat = () => {
    setForm((prev) => ({
      ...prev,
      stats: [...prev.stats, { value: "", label: "" }],
    }));
  };

  const removeStat = (index: number) => {
    setForm((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
  };

  const addMember = () => {
    setForm((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        members: [
          ...prev.team.members,
          { name: "", role: "", image: "" },
        ],
      },
    }));
  };

  const removeMember = (index: number) => {
    setForm((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        members: prev.team.members.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("content[hero][eyebrow]", form.hero.eyebrow);
    formData.append("content[hero][title]", form.hero.title);
    formData.append("content[hero][description]", form.hero.description);

    formData.append("content[mission][eyebrow]", form.mission.eyebrow);
    formData.append("content[mission][title]", form.mission.title);
    formData.append(
      "content[mission][description_one]",
      form.mission.description_one
    );
    formData.append(
      "content[mission][description_two]",
      form.mission.description_two
    );
    formData.append(
      "content[mission][button_text]",
      form.mission.button_text
    );
    formData.append(
      "content[mission][button_link]",
      form.mission.button_link
    );

    formData.append("content[team][eyebrow]", form.team.eyebrow);
    formData.append("content[team][title]", form.team.title);

    form.stats.forEach((stat, index) => {
      formData.append(`content[stats][${index}][value]`, stat.value);
      formData.append(`content[stats][${index}][label]`, stat.label);
    });

    form.team.members.forEach((member, index) => {
      formData.append(
        `content[team][members][${index}][name]`,
        member.name
      );
      formData.append(
        `content[team][members][${index}][role]`,
        member.role
      );
      formData.append(
        `content[team][members][${index}][image]`,
        member.image
      );
    });

    // Image order: hero = 0, mission = 1, team members = 2 onwards.
    const allImages = [
      { key: "hero", src: form.images.find((img) => img.key === "hero")?.src || "" },
      { key: "mission", src: form.images.find((img) => img.key === "mission")?.src || "" },
      ...form.team.members.map((member, index) => ({
        key: `team_${index}`,
        src: member.image,
      })),
    ];

    allImages.forEach((image, index) => {
      formData.append(`content[images][${index}][key]`, image.key);
      formData.append(`content[images][${index}][src]`, image.src);

      if (imageFiles[index]) {
        formData.append(`images[${index}]`, imageFiles[index]);
      }
    });

    updateMutation.mutate(formData);
  };

  if (isLoading) return <p>Loading About CMS...</p>;

  const imageSource = (index: number, src: string) =>
    previews[index] || (src ? getImageUrl(src) : "");

  const ImageField = ({
    label,
    index,
    src,
  }: {
    label: string;
    index: number;
    src: string;
  }) => (
    <div className={styles.fieldGroup}>
      <label className={styles.label}>{label}</label>

      {imageSource(index, src) && (
        <div className={styles.imagePreview}>
          <img src={imageSource(index, src)} alt={label} />
        </div>
      )}

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className={styles.input}
        onChange={(e) => updateImage(index, e.target.files?.[0])}
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* HERO */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Hero Section</h3>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Eyebrow</label>
          <input
            className={styles.input}
            value={form.hero.eyebrow}
            onChange={(e) => updateHero("eyebrow", e.target.value)}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Heading</label>
          <input
            className={styles.input}
            value={form.hero.title}
            onChange={(e) => updateHero("title", e.target.value)}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.textarea}
            value={form.hero.description}
            onChange={(e) => updateHero("description", e.target.value)}
          />
        </div>

        <ImageField
          label="Hero Image"
          index={0}
          src={form.images.find((img) => img.key === "hero")?.src || ""}
        />
      </section>

      {/* STATS */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Stats</h3>
          <button type="button" className={styles.addButton} onClick={addStat}>
            + Add Stat
          </button>
        </div>

        {form.stats.map((stat, index) => (
          <div className={styles.itemCard} key={index}>
            <div className={styles.itemHeader}>
              <strong>Stat {index + 1}</strong>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeStat(index)}
              >
                Remove
              </button>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Value</label>
              <input
                className={styles.input}
                value={stat.value}
                onChange={(e) => updateStat(index, "value", e.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Label</label>
              <input
                className={styles.input}
                value={stat.label}
                onChange={(e) => updateStat(index, "label", e.target.value)}
              />
            </div>
          </div>
        ))}
      </section>

      {/* MISSION */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Mission Section</h3>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Eyebrow</label>
          <input
            className={styles.input}
            value={form.mission.eyebrow}
            onChange={(e) => updateMission("eyebrow", e.target.value)}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Heading</label>
          <input
            className={styles.input}
            value={form.mission.title}
            onChange={(e) => updateMission("title", e.target.value)}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>First Paragraph</label>
          <textarea
            className={styles.textarea}
            value={form.mission.description_one}
            onChange={(e) =>
              updateMission("description_one", e.target.value)
            }
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Second Paragraph</label>
          <textarea
            className={styles.textarea}
            value={form.mission.description_two}
            onChange={(e) =>
              updateMission("description_two", e.target.value)
            }
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Button Text</label>
          <input
            className={styles.input}
            value={form.mission.button_text}
            onChange={(e) => updateMission("button_text", e.target.value)}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Button Link</label>
          <input
            className={styles.input}
            value={form.mission.button_link}
            onChange={(e) => updateMission("button_link", e.target.value)}
          />
        </div>

        <ImageField
          label="Mission Image"
          index={1}
          src={form.images.find((img) => img.key === "mission")?.src || ""}
        />
      </section>

      {/* TEAM */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Team Section</h3>
          <button type="button" className={styles.addButton} onClick={addMember}>
            + Add Member
          </button>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Eyebrow</label>
          <input
            className={styles.input}
            value={form.team.eyebrow}
            onChange={(e) => updateTeamSection("eyebrow", e.target.value)}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Heading</label>
          <input
            className={styles.input}
            value={form.team.title}
            onChange={(e) => updateTeamSection("title", e.target.value)}
          />
        </div>

        {form.team.members.map((member, index) => (
          <div className={styles.itemCard} key={index}>
            <div className={styles.itemHeader}>
              <strong>Team Member {index + 1}</strong>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeMember(index)}
              >
                Remove
              </button>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                value={member.name}
                onChange={(e) =>
                  updateMember(index, "name", e.target.value)
                }
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Role</label>
              <input
                className={styles.input}
                value={member.role}
                onChange={(e) =>
                  updateMember(index, "role", e.target.value)
                }
              />
            </div>

            <ImageField
              label="Profile Image"
              index={index + 2}
              src={member.image}
            />
          </div>
        ))}
      </section>

      <div className={styles.footer}>
        <button
          type="submit"
          className={styles.saveButton}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? "Saving..." : "Save About Page"}
        </button>
      </div>

      {updateMutation.isSuccess && (
        <p className={styles.successMessage}>
          About page updated successfully.
        </p>
      )}

      {updateMutation.isError && (
        <p className={styles.errorMessage}>
          Failed to update About page. Please try again.
        </p>
      )}
    </form>
  );
}



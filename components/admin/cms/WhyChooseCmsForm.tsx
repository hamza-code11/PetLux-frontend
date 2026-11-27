
"use client";

import { useEffect, useState } from "react";
import {
    useCmsSection,
    useUpdateCmsSection,
    WhyChooseContent,
} from "@/hooks/useCms";
import styles from "./WhyChooseCmsForm.module.css";

export default function WhyChooseCmsForm() {
    const { data, isLoading } =
        useCmsSection<WhyChooseContent>("why_choose_section");

    const updateMutation =
        useUpdateCmsSection<WhyChooseContent>("why_choose_section");

    const [form, setForm] = useState<WhyChooseContent>({
        eyebrow: "",
        title: "",
        subtitle: "",
        features: [],
    });

    useEffect(() => {
        if (data?.data?.content) {
            setForm(data.data.content);
        }
    }, [data]);

    const updateField = (
        field: keyof WhyChooseContent,
        value: string
    ) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const updateFeature = (
        index: number,
        field: "title" | "description",
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            features: prev.features.map((feature, i) =>
                i === index ? { ...feature, [field]: value } : feature
            ),
        }));
    };

    const addFeature = () => {
        if (form.features.length >= 4) return;

        setForm((prev) => ({
            ...prev,
            features: [...prev.features, { title: "", description: "" }],
        }));
    };

    const removeFeature = (index: number) => {
        setForm((prev) => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        updateMutation.mutate(form);
    };

    if (isLoading) return <p>Loading CMS content...</p>;

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldGroup}>
                <label className={styles.label}>Eyebrow</label>
                <input className={styles.input} />
            </div>

            <div className={styles.fieldGroup}>
                <label className={styles.label}>Section Title</label>
                <input className={styles.input} />
            </div>

            <div className={styles.fieldGroup}>
                <label className={styles.label}>Subtitle</label>
                <textarea className={styles.textarea} />
            </div>

            <div className={styles.featureSection}>
                <div className={styles.featureHeader}>
                    <h3 className={styles.sectionTitle}>Feature Cards</h3>
                    <span className={styles.featureCount}>
                        {form.features.length}/4
                    </span>
                </div>

                <div className={styles.featureList}>
                    {form.features.map((feature, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.featureCardHeader}>
                                <span className={styles.featureNumber}>
                                    Feature {index + 1}
                                </span>
                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={() => removeFeature(index)}
                                >
                                    Remove
                                </button>
                            </div>

                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Title</label>
                                <input
                                    className={styles.input}
                                    value={feature.title}
                                    onChange={(e) =>
                                        updateFeature(index, "title", e.target.value)
                                    }
                                />
                            </div>

                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Description</label>
                                <textarea
                                    className={styles.textarea}
                                    value={feature.description}
                                    onChange={(e) =>
                                        updateFeature(index, "description", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    className={styles.addButton}
                    onClick={addFeature}
                    disabled={form.features.length >= 4}
                >
                    + Add Feature
                </button>
            </div>

            <div className={styles.footer}>
                <button
                    type="submit"
                    className={styles.saveButton}
                    disabled={updateMutation.isPending}
                >
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>


    );
}



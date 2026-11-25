"use client";

import { useState } from "react";
import { useSendContactMessage } from "@/hooks/useContact";
import { useToast } from "@/components/ui/Toast/ToastContext";
import styles from "./ContactForm.module.css";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const { toast } = useToast();
  const { mutate: sendMessage, isPending } = useSendContactMessage();

  const handleChange =
    (field: keyof typeof INITIAL_FORM) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendMessage(formData, {
      onSuccess: (data) => {
        toast.success(data.message || "Message sent successfully!");
        setFormData(INITIAL_FORM);
      },
      onError: (err: any) => {
        const msg =
          err?.response?.data?.message ||
          "Failed to send message. Please try again.";
        toast.error(msg);
      },
    });
  };

  return (
    <div className={styles.formBox}>
      <h2 className={styles.sectionTitle}>Send us a Message</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="contact-name">Your Name *</label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange("name")}
              disabled={isPending}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="contact-email">Your Email *</label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange("email")}
              disabled={isPending}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="contact-subject">Subject *</label>
          <input
            id="contact-subject"
            type="text"
            required
            placeholder="How can we help?"
            value={formData.subject}
            onChange={handleChange("subject")}
            disabled={isPending}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="contact-message">Message *</label>
          <textarea
            id="contact-message"
            rows={6}
            required
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange("message")}
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

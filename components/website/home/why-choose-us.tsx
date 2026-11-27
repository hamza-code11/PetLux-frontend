
"use client";

import { useCmsSection, WhyChooseContent } from "@/hooks/useCms";
import styles from "./why-choose-us.module.css";

const FEATURE_ICONS = [
  <svg key="quality" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  <svg key="delivery" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>,
  <svg key="ingredients" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>,
  <svg key="support" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M9 12h6" />
    <path d="M12 9v6" />
  </svg>,
];

export default function WhyChooseUs() {
  const { data, isLoading } =
    useCmsSection<WhyChooseContent>("why_choose_section");

  const content = data?.data?.content;

  if (isLoading || !content) return null;

  return (
    <section className={styles.section} aria-labelledby="why-choose-title">
      <div className={styles.inner}>
        <div className={styles.header}>
          {content.eyebrow && (
            <span className={styles.eyebrow}>{content.eyebrow}</span>
          )}

          <h2 id="why-choose-title" className={styles.title}>
            {content.title}
          </h2>

          {content.subtitle && (
            <p className={styles.subtitle}>{content.subtitle}</p>
          )}
        </div>

        <div className={styles.grid}>
          {content.features?.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                {FEATURE_ICONS[index % FEATURE_ICONS.length]}
              </div>

              <h3 className={styles.cardTitle}>{feature.title}</h3>

              <p className={styles.cardDescription}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

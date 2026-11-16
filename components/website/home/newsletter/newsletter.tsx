"use client";

import styles from "./newsletter.module.css";

export default function Newsletter() {
  return (
    <section className={styles.section}>
      <div className={styles.banner}>
        <div className={styles.container}>
          {/* Left Side: Icon & Text */}
          <div className={styles.content}>
            <svg
              className={styles.icon}
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>

            <div className={styles.textWrapper}>
              <h2 className={styles.title}>Subscribe to Our Newsletter</h2>
              <p className={styles.subtitle}>
                Get updates on new products, special offers and pet care tips.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className={styles.input}
              required
              aria-label="Email address"
            />
            <button type="submit" className={styles.button}>
              Subscribe
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

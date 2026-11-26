"use client";

import styles from "./CheckoutSkeleton.module.css";

export default function CheckoutSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header skeleton */}
        <div className={styles.header}>
          <div className={styles.line} style={{ width: "180px", height: "14px" }} />
          <div className={styles.line} style={{ width: "240px", height: "36px", marginTop: "20px" }} />
          <div className={styles.line} style={{ width: "320px", height: "16px", marginTop: "12px" }} />
        </div>

        {/* Layout skeleton */}
        <div className={styles.layout}>
          <div className={styles.formSection}>
            {[1, 2].map((i) => (
              <div key={i} className={styles.card}>
                <div className={styles.line} style={{ width: "200px", height: "22px", marginBottom: "20px" }} />
                <div className={styles.grid}>
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className={styles.field}>
                      <div className={styles.line} style={{ width: "70px", height: "12px", marginBottom: "8px" }} />
                      <div className={styles.line} style={{ width: "100%", height: "48px" }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summarySection}>
            <div className={styles.card}>
              <div className={styles.line} style={{ width: "160px", height: "22px", marginBottom: "20px" }} />
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.summaryRow}>
                  <div className={styles.line} style={{ width: "56px", height: "56px", borderRadius: "8px" }} />
                  <div style={{ flex: 1 }}>
                    <div className={styles.line} style={{ width: "80%", height: "14px", marginBottom: "6px" }} />
                    <div className={styles.line} style={{ width: "40%", height: "12px" }} />
                  </div>
                </div>
              ))}
              <div className={styles.line} style={{ width: "100%", height: "1px", margin: "16px 0" }} />
              <div className={styles.line} style={{ width: "100%", height: "20px", marginBottom: "12px" }} />
              <div className={styles.line} style={{ width: "100%", height: "24px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


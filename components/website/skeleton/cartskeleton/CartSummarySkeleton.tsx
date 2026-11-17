import styles from "./CartSkeleton.module.css";

export default function CartSummarySkeleton() {
  return (
    <div className={styles.summaryWrapper}>
      <div className={styles.summaryTitle} />
      
      <div className={styles.summaryRow}>
        <div className={styles.summaryLabel} />
        <div className={styles.summaryValue} />
      </div>
      <div className={styles.summaryRow}>
        <div className={styles.summaryLabel} />
        <div className={styles.summaryValue} />
      </div>
      <div className={styles.summaryRow}>
        <div className={styles.summaryLabel} />
        <div className={styles.summaryValue} />
      </div>
      
      <div className={styles.divider} />
      
      <div className={styles.summaryRow}>
        <div className={styles.summaryTotalLabel} />
        <div className={styles.summaryTotalValue} />
      </div>

      <div className={styles.checkoutBtn} />
    </div>
  );
}


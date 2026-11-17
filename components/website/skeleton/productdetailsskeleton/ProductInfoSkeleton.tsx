import styles from "./Skeleton.module.css";

export default function ProductInfoSkeleton() {
  return (
    <div className={styles.infoWrapper}>
      <div className={styles.infoTopRow}>
        <div className={styles.infoCategory} />
        <div className={styles.infoIcon} />
      </div>

      <div className={styles.infoTitle} />

      <div className={styles.infoPriceRow}>
        <div className={styles.infoPrice} />
        <div className={styles.infoReviews} />
      </div>

      <div className={styles.infoDescLine} />
      <div className={styles.infoDescLine} />
      <div className={styles.infoDescLine} style={{ width: "80%" }} />

      <div className={styles.infoVariantLabel} />
      <div className={styles.infoVariantList}>
        <div className={styles.infoVariantBtn} />
        <div className={styles.infoVariantBtn} />
        <div className={styles.infoVariantBtn} />
      </div>

      <div className={styles.infoActions}>
        <div className={styles.infoQuantity} />
        <div className={styles.infoCartBtn} />
      </div>
    </div>
  );
}

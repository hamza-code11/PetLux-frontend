import styles from "./WishlistSkeleton.module.css";

export default function WishlistHeaderSkeleton() {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.breadcrumb} />
      <div className={styles.titleRow}>
        <div className={styles.titleLeft}>
          <div className={styles.title} />
          <div className={styles.subtitle} />
        </div>
        <div className={styles.actions}>
          <div className={styles.btn} />
          <div className={styles.btnLg} />
        </div>
      </div>
    </div>
  );
}


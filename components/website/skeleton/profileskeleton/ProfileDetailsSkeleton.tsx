import styles from "./ProfileSkeleton.module.css";

export default function ProfileDetailsSkeleton() {
  return (
    <div className={styles.detailsWrapper}>
      <div className={`${styles.shimmer} ${styles.detailsHeader}`} />
      
      <div className={styles.infoGrid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.infoItem}>
            <div className={`${styles.shimmer} ${styles.label}`} />
            <div className={`${styles.shimmer} ${styles.value}`} />
          </div>
        ))}
      </div>
    </div>
  );
}


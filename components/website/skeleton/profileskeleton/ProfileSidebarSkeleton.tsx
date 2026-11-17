import styles from "./ProfileSkeleton.module.css";

export default function ProfileSidebarSkeleton() {
  return (
    <div className={styles.sidebarWrapper}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`${styles.shimmer} ${styles.menuItem}`} />
      ))}
      <div className={`${styles.shimmer} ${styles.menuItem}`} style={{ marginTop: "12px", height: "40px" }} />
    </div>
  );
}

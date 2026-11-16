import styles from "./HeaderSkeleton.module.css";

export default function HeaderSkeleton() {
  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.title} />
        <div className={styles.subtitle} />
      </div>
    </div>
  );
}


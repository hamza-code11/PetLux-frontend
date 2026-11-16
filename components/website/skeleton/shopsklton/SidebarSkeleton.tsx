import styles from "./SidebarSkeleton.module.css";

export default function SidebarSkeleton() {
  return (
    <aside className={styles.sidebar}>
      {/* Pet Types Skeleton */}
      <div className={styles.group}>
        <div className={styles.title} />
        <div className={styles.list}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.listItem} />
          ))}
        </div>
      </div>

      {/* Categories Skeleton */}
      <div className={styles.group}>
        <div className={styles.title} />
        <div className={styles.list}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={styles.listItem} />
          ))}
        </div>
      </div>

      {/* Price Range Skeleton */}
      <div className={styles.group}>
        <div className={styles.title} />
        <div className={styles.list}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.listItem} />
          ))}
        </div>
      </div>
    </aside>
  );
}


import ProfileSidebarSkeleton from "./ProfileSidebarSkeleton";
import ProfileDetailsSkeleton from "./ProfileDetailsSkeleton";
import styles from "./ProfileSkeleton.module.css";

export default function ProfileSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        {/* Header Skeleton */}
        <div className={styles.headerWrapper}>
          <div className={`${styles.shimmer} ${styles.breadcrumb}`} />
          <div className={`${styles.shimmer} ${styles.title}`} />
          <div className={`${styles.shimmer} ${styles.subtitle}`} />
        </div>

        {/* Layout Skeleton */}
        <div className={styles.layout}>
          <ProfileSidebarSkeleton />
          <ProfileDetailsSkeleton />
        </div>

      </div>
    </div>
  );
}

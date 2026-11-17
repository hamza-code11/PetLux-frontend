import styles from "./AboutSkeleton.module.css";

export default function AboutSkeleton() {
  return (
    <div className={styles.container}>
      
      {/* 1. Hero Skeleton */}
      <div className={styles.heroWrapper}>
        <div className={styles.heroText}>
          <div className={styles.eyebrowSkeleton} />
          <div className={styles.titleSkeleton} />
          <div className={styles.descSkeleton} />
          <div className={styles.descSkeletonShort} />
        </div>
        <div className={styles.heroImageSkeleton} />
      </div>

      {/* 2. Stats Skeleton */}
      <div className={styles.statsWrapper}>
        <div className={styles.statsInner}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.statItem}>
              <div className={styles.statValueSkeleton} />
              <div className={styles.statLabelSkeleton} />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Mission Skeleton */}
      <div className={styles.missionWrapper}>
        <div className={styles.missionText}>
          <div className={styles.eyebrowSkeleton} />
          <div className={styles.titleSkeleton} style={{ width: "70%" }} />
          <div className={styles.descSkeleton} />
          <div className={styles.descSkeleton} />
          <div className={styles.descSkeleton} />
          <div className={styles.descSkeletonShort} />
        </div>
        <div className={styles.missionImageSkeleton} />
      </div>

      {/* 4. Team Skeleton */}
      <div className={styles.teamWrapper}>
        <div className={styles.teamHeader}>
          <div className={styles.eyebrowSkeleton} />
          <div className={styles.titleSkeleton} style={{ width: "40%" }} />
        </div>
        <div className={styles.teamGrid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.teamCard}>
              <div className={styles.teamImageSkeleton} />
              <div className={styles.teamNameSkeleton} />
              <div className={styles.teamRoleSkeleton} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}


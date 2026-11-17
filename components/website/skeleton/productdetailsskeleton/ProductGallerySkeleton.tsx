import styles from "./Skeleton.module.css";

export default function ProductGallerySkeleton() {
  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.thumbnailsWrapper}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.thumbBox} />
        ))}
      </div>
      <div className={styles.mainImageBox} />
    </div>
  );
}

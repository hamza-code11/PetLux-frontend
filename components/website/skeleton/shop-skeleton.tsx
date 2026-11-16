import styles from "./shop-skeleton.module.css";

export default function ShopSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className={styles.card}>
            <div className={styles.imagePlaceholder} />
            <div className={styles.textPlaceholder} />
            <div className={styles.pricePlaceholder} />
          </div>
        ))}
      </div>
    </div>
  );
}

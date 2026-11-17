import styles from "./WishlistSkeleton.module.css";

export default function WishlistItemSkeleton() {
  return (
    <div className={styles.row}>
      {/* Product Info */}
      <div className={styles.colProduct}>
        <div className={styles.image} />
        <div className={styles.details}>
          <div className={styles.name} />
          <div className={styles.category} />
          <div className={styles.variant} />
        </div>
      </div>

      {/* Price */}
      <div className={styles.colPrice}>
        <div className={styles.price} />
      </div>

      {/* Actions */}
      <div className={styles.colAction}>
        <div className={styles.cartBtn} />
        <div className={styles.removeBtn} />
      </div>
    </div>
  );
}


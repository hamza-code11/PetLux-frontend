import styles from "./CartSkeleton.module.css";

export default function CartItemSkeleton() {
  return (
    <div className={styles.item}>
      <div className={styles.image} />
      <div className={styles.details}>
        <div className={styles.category} />
        <div className={styles.name} />
        <div className={styles.variant} />
        <div className={styles.bottomRow}>
          <div className={styles.qtyBtn} />
          <div className={styles.price} />
        </div>
      </div>
    </div>
  );
}


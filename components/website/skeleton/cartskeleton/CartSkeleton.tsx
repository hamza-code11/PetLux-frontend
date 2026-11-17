import CartItemSkeleton from "./CartItemSkeleton";
import CartSummarySkeleton from "./CartSummarySkeleton";
import styles from "./CartSkeleton.module.css";

export default function CartSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        <div className={styles.headerWrapper}>
          <div className={styles.title} />
          <div className={styles.subtitle} />
        </div>

        <div className={styles.layout}>
          
          <div className={styles.itemsList}>
            {[1, 2, 3].map((i) => (
              <CartItemSkeleton key={i} />
            ))}
          </div>

          <CartSummarySkeleton />

        </div>

      </div>
    </div>
  );
}


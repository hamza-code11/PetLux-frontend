import ProductCardSkeleton from "./ProductCardSkeleton";
import styles from "./GridSkeleton.module.css";

export default function GridSkeleton() {
  // 8 cards show karenge skeleton mein (ya 16 jo bhi aapko chahiye)
  return (
    <div className={styles.grid}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}


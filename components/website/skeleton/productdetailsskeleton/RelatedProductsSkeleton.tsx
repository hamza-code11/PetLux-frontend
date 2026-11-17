import ProductCardSkeleton from "@/components/website/skeleton/shopsklton/ProductCardSkeleton";
import styles from "./Skeleton.module.css";

export default function RelatedProductsSkeleton() {
  return (
    <div>
      <div className={styles.relatedTitle} />
      <div className={styles.relatedGrid}>
        {/* 4 baar product card skeleton render karenge */}
        {[1, 2, 3, 4].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
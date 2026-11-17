import ProductGallerySkeleton from "./ProductGallerySkeleton";
import ProductInfoSkeleton from "./ProductInfoSkeleton";
import RelatedProductsSkeleton from "./RelatedProductsSkeleton";
import styles from "./Skeleton.module.css";

export default function ProductDetailsSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        {/* Top Section: Gallery & Info */}
        <div className={styles.topSection}>
          <ProductGallerySkeleton />
          <ProductInfoSkeleton />
        </div>

        {/* Middle Section: Tabs */}
        <div className={styles.tabsWrapper}>
          <div className={styles.tabHeader} />
          <div className={styles.tabLine} />
          <div className={styles.tabLine} />
          <div className={styles.tabLine} style={{ width: "60%" }} />
        </div>

        {/* Bottom Section: Related Products */}
        <RelatedProductsSkeleton />
        
      </div>
    </div>
  );
}

import WishlistHeaderSkeleton from "./WishlistHeaderSkeleton";
import WishlistItemSkeleton from "./WishlistItemSkeleton";
import styles from "./WishlistSkeleton.module.css";

export default function WishlistSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        <WishlistHeaderSkeleton />

        <div className={styles.listWrapper}>
          {[1, 2, 3, 4].map((i) => (
            <WishlistItemSkeleton key={i} />
          ))}
        </div>

      </div>
    </div>
  );
}


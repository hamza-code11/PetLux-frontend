import Link from "next/link";
import styles from "./WishlistHeader.module.css";

interface Props {
  totalItems: number;
  onRemoveAll: () => void;
  onMoveAllToCart: () => void;
}

export default function WishlistHeader({ totalItems, onRemoveAll, onMoveAllToCart }: Props) {
  return (
    <div className={styles.header}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className={styles.separator}>/</span>
        <span className={styles.current}>Wishlist</span>
      </nav>

      <div className={styles.titleRow}>
        <div className={styles.titleLeft}>
          <h1 className={styles.title}>My Wishlist</h1>
          <p className={styles.subtitle}>
            <span className={styles.count}>{totalItems}</span> {totalItems === 1 ? "item" : "items"} saved
          </p>
        </div>

        {totalItems > 0 && (
          <div className={styles.actions}>
            <button className={styles.btnOutline} onClick={onRemoveAll}>
              Remove All
            </button>
            <button className={styles.btnSolid} onClick={onMoveAllToCart}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Move to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

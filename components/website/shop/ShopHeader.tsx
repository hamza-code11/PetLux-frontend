import styles from "./ShopHeader.module.css";

export default function ShopHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Shop All Products</h1>
        <p className={styles.subtitle}>Showing 1–16 of 20 results</p>
      </div>
    </div>
  );
}

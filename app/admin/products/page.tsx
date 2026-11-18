import Link from "next/link";
import { PRODUCTS } from "@/data/product";
import ProductTable from "@/components/admin/product/ProductTable";
import styles from "./ProductPage.module.css";

export const metadata = { title: "Products | Admin" };

export default function ProductsPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>Manage your store's inventory.</p>
        </div>
        <Link href="/admin/products/add" className={styles.addBtn}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </Link>
      </div>
      <ProductTable initialData={PRODUCTS} />
    </div>
  );
}


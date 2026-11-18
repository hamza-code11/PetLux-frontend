import Link from "next/link";
import { CATEGORIES } from "@/data/category";
import CategoryTable from "@/components/admin/category/CategoryTable";
import styles from "./CategoryPage.module.css";

export const metadata = {
  title: "Categories | Admin",
};

export default function CategoriesPage() {
  return (
    <div className={styles.pageWrapper}>
      
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Categories</h1>
          <p className={styles.subtitle}>
            Manage the categories of products available in your store.
          </p>
        </div>
        
        <Link href="/admin/categories/add" className={styles.addBtn}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Category
        </Link>
      </div>

      <CategoryTable initialData={CATEGORIES} />

    </div>
  );
}


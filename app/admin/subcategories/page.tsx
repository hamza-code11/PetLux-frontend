import Link from "next/link";
import { SUBCATEGORIES } from "@/data/subcategory";
import SubcategoryTable from "@/components/admin/subcategory/SubcategoryTable";
import styles from "./SubcategoryPage.module.css";

export const metadata = {
  title: "Subcategories | Admin",
};

export default function SubcategoriesPage() {
  return (
    <div className={styles.pageWrapper}>
      
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Subcategories</h1>
          <p className={styles.subtitle}>
            Manage the subcategories of products available in your store.
          </p>
        </div>
        
        <Link href="/admin/subcategories/add" className={styles.addBtn}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Subcategory
        </Link>
      </div>

      <SubcategoryTable initialData={SUBCATEGORIES} />

    </div>
  );
}


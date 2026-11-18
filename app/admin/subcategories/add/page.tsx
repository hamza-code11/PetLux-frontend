import Link from "next/link";
import SubcategoryForm from "@/components/admin/subcategory/SubcategoryForm";
import styles from "./AddSubcategoryPage.module.css";

export const metadata = { title: "Add Subcategory | Admin" };

export default function AddSubcategoryPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Add New Subcategory</h1>
          <p className={styles.subtitle}>Create a new product subcategory.</p>
        </div>
        <Link href="/admin/subcategories" className={styles.backBtn}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to List
        </Link>
      </div>
      <SubcategoryForm />
    </div>
  );
}


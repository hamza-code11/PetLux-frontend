import Link from "next/link";
import EditCategoryForm from "@/components/admin/category/EditCategoryForm";
import styles from "./EditCategoryPage.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Edit Category | Admin",
};

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);

  // Agar ID invalid hai (NaN), toh user ko error dikhayein
  if (isNaN(numericId)) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Invalid Category ID</h1>
            <p className={styles.subtitle}>The requested category does not exist.</p>
          </div>
          <Link href="/admin/categories" className={styles.backBtn}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Edit Category</h1>
          <p className={styles.subtitle}>Update the details for this category.</p>
        </div>
        <Link href="/admin/categories" className={styles.backBtn}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to List
        </Link>
      </div>
      
      {/* ID pass kar rahe hain, initialData nahi */}
      <EditCategoryForm id={numericId} />
    </div>
  );
}

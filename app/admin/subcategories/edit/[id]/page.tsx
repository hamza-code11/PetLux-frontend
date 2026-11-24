import Link from "next/link";
import EditSubcategoryForm from "@/components/admin/subcategory/EditSubcategoryForm";
import styles from "./EditSubcategoryPage.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Edit Subcategory | Admin",
};

export default async function EditSubcategoryPage({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);

  // Invalid ID Handling
  if (isNaN(numericId)) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Invalid Subcategory ID</h1>
            <p className={styles.subtitle}>The requested subcategory does not exist.</p>
          </div>
          <Link href="/admin/subcategories" className={styles.backBtn}>
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
          <h1 className={styles.title}>Edit Subcategory</h1>
          <p className={styles.subtitle}>Update the details for this subcategory.</p>
        </div>
        <Link href="/admin/subcategories" className={styles.backBtn}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to List
        </Link>
      </div>

      {/* ID pass kar rahe hain */}
      <EditSubcategoryForm id={numericId} />
    </div>
  );
}

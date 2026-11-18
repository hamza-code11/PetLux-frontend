import Link from "next/link";
import { SUBCATEGORIES } from "@/data/subcategory";
import EditSubcategoryForm from "@/components/admin/subcategory/EditSubcategoryForm";
import { notFound } from "next/navigation";
import styles from "./EditSubcategoryPage.module.css";

interface Props { params: Promise<{ id: string }>; }

export const metadata = { title: "Edit Subcategory | Admin" };

export default async function EditSubcategoryPage({ params }: Props) {
  const { id } = await params;
  const subcategory = SUBCATEGORIES.find((p) => p.id === Number(id));

  if (!subcategory) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Edit Subcategory</h1>
          <p className={styles.subtitle}>Update the details for <strong>{subcategory.name}</strong>.</p>
        </div>
        <Link href="/admin/subcategories" className={styles.backBtn}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to List
        </Link>
      </div>
      <EditSubcategoryForm initialData={subcategory} />
    </div>
  );
}


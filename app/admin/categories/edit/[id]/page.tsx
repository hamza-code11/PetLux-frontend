import Link from "next/link";
import { CATEGORIES } from "@/data/category";
import EditCategoryForm from "@/components/admin/category/EditCategoryForm";
import { notFound } from "next/navigation";
import styles from "./EditCategoryPage.module.css";

interface Props { params: Promise<{ id: string }>; }

export const metadata = { title: "Edit Category | Admin" };

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const category = CATEGORIES.find((p) => p.id === Number(id));

  if (!category) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Edit Category</h1>
          <p className={styles.subtitle}>Update the details for <strong>{category.name}</strong>.</p>
        </div>
        <Link href="/admin/categories" className={styles.backBtn}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to List
        </Link>
      </div>
      <EditCategoryForm initialData={category} />
    </div>
  );
}

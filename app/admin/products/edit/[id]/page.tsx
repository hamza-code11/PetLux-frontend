import Link from "next/link";
import EditProductForm from "@/components/admin/product/EditProductForm";
import styles from "./EditProductPage.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Edit Product | Admin",
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Invalid Product ID</h1>
            <p className={styles.subtitle}>The requested product does not exist.</p>
          </div>
          <Link href="/admin/products" className={styles.backBtn}>
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
          <h1 className={styles.title}>Edit Product</h1>
          <p className={styles.subtitle}>Update the details for this product.</p>
        </div>
        <Link href="/admin/products" className={styles.backBtn}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to List
        </Link>
      </div>
      
      {/* Pass ID only, form will fetch data */}
      <EditProductForm id={numericId} />
    </div>
  );
}


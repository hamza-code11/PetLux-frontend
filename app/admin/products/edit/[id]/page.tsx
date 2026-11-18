import Link from "next/link";
import { PRODUCTS } from "@/data/product";
import ProductForm from "@/components/admin/product/ProductForm";
import { notFound } from "next/navigation";
import styles from "./EditProductPage.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Edit Product | Admin",
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Edit Product</h1>
          <p className={styles.subtitle}>
            Update details for <strong>{product.name}</strong>.
          </p>
        </div>
        <Link href="/admin/products" className={styles.backBtn}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to List
        </Link>
      </div>
      <ProductForm initialData={product} isEditMode={true} />
    </div>
  );
}

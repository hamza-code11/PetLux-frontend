import Link from "next/link";
import EditPetTypeForm from "@/components/admin/petTypes/EditPetTypeForm";
import styles from "./EditPetTypePage.module.css";

interface Props {
  params: Promise<{ id: string }>; 
}

export const metadata = {
  title: "Edit Pet Type | Admin",
};

export default async function EditPetTypePage({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);

  // Agar ID invalid hai (NaN), toh user ko error dikhayein
  if (isNaN(numericId)) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Invalid Pet Type ID</h1>
            <p className={styles.subtitle}>The requested pet type does not exist.</p>
          </div>
          <Link href="/admin/petTypes" className={styles.backBtn}>
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
          <h1 className={styles.title}>Edit Pet Type</h1>
          <p className={styles.subtitle}>
            Update the details for this pet type.
          </p>
        </div>
        <Link href="/admin/petTypes" className={styles.backBtn}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to List
        </Link>
      </div>

      <EditPetTypeForm id={numericId} />
    </div>
  );
}


import Link from "next/link";
import PetTypeForm from "@/components/admin/petTypes/PetTypeForm";
import styles from "./AddPetTypePage.module.css";

export const metadata = {
  title: "Add Pet Type | Admin",
};

export default function AddPetTypePage() {
  return (
    <div className={styles.container}>
      
      {/* Header Box */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Add New Pet Type</h1>
          <p className={styles.subtitle}>
            Create a new pet category to organize your products.
          </p>
        </div>
        <Link href="/admin/petTypes" className={styles.backBtn}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to List
        </Link>
      </div>

      {/* Form Component */}
      <PetTypeForm />

    </div>
  );
}


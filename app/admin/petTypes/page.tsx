import Link from "next/link";
import { PET_TYPES } from "@/data/pettype";
import PetTypesTable from "@/components/admin/petTypes/PetTypesTable";
import styles from "./PetTypesPage.module.css";

export const metadata = {
  title: "Pet Types | Admin",
};

export default function PetTypesPage() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* Header Box (Fixed at top of content area) */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Pet Types</h1>
          <p className={styles.subtitle}>
            Manage the categories of pets available in your store.
          </p>
        </div>
        
        <Link href="/admin/petTypes/add" className={styles.addBtn}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Pet Type
        </Link>
      </div>

      {/* Table Component (Yeh ab scrollable area handle karega) */}
      <PetTypesTable/>

    </div>
  );
}

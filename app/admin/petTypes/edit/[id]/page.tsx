import Link from "next/link";
import { PET_TYPES } from "@/data/pettype";
import EditPetTypeForm from "@/components/admin/petTypes/EditPetTypeForm";
import { notFound } from "next/navigation";
import styles from "./EditPetTypePage.module.css";

interface Props {
  params: Promise<{ id: string }>; // Next.js 15 mein params ek Promise hai
}

export const metadata = {
  title: "Edit Pet Type | Admin",
};

export default async function EditPetTypePage({ params }: Props) {
  // Promise ko unwrap (await) karna zaroori hai
  const { id } = await params;

  console.log("URL se aayi ID:", id);

  // Data se match karein
  const petType = PET_TYPES.find((p) => p.id === Number(id));

  // Agar ID database mein nahi mili toh 404 page
  if (!petType) {
    notFound();
  }

  return (
    <div className={styles.container}>
      
      {/* Header Box */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Edit Pet Type</h1>
          <p className={styles.subtitle}>
            Update the details for <strong>{petType.name}</strong>.
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
      <EditPetTypeForm initialData={petType} />

    </div>
  );
}
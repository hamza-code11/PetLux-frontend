"use client";

import { useGetContactMessages } from "@/hooks/useContact";
import ContactTable from "@/components/admin/contact/ContactTable";
import styles from "./ContactPage.module.css";

export default function ContactMessagesPage() {
  const { data, isLoading } = useGetContactMessages({ per_page: 10 });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Contact Messages</h1>
          <p className={styles.subtitle}>
            Manage all customer inquiries and messages.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading messages...</div>
      ) : (
        <ContactTable initialData={data?.data ?? []} />
      )}
    </div>
  );
}

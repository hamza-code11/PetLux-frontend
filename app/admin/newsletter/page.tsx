"use client";

import { useGetNewsletterSubscribers } from "@/hooks/useNewsletter";
import NewsletterTable from "@/components/admin/newsletter/NewsletterTable";
import styles from "./NewsletterPage.module.css";

export default function NewsletterPage() {
  const { data, isLoading } = useGetNewsletterSubscribers({ per_page: 10 });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Newsletter Subscribers</h1>
          <p className={styles.subtitle}>
            Manage all the emails subscribed to your newsletter.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading subscribers...</div>
      ) : (
        <NewsletterTable initialData={data?.data ?? []} />
      )}
    </div>
  );
}


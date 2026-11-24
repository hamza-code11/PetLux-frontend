"use client";

import { useAdminReviews } from "@/hooks/useAdminReviews";
import ReviewsTable from "@/components/admin/review/ReviewsTable";
import styles from "./ReviewsPage.module.css";

export default function ReviewsPage() {
  const { data, isLoading } = useAdminReviews();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Reviews & Ratings</h1>
          <p className={styles.subtitle}>
            Approve, reject, or manage all product reviews.
          </p>
        </div>

        {data?.stats && (
          <div className={styles.statsRow}>
            <StatCard label="Total" value={data.stats.total} variant="neutral" />
            <StatCard label="Pending" value={data.stats.pending} variant="warning" />
            <StatCard label="Approved" value={data.stats.approved} variant="success" />
            <StatCard label="Rejected" value={data.stats.rejected} variant="danger" />
          </div>
        )}
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading reviews...</div>
      ) : (
        <ReviewsTable initialData={data?.data ?? []} />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant: "neutral" | "warning" | "success" | "danger";
}) {
  return (
    <div className={`${styles.statCard} ${styles[variant]}`}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}


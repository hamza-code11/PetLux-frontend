import { REVIEWS } from "@/data/review";
import ReviewsTable from "@/components/admin/review/ReviewsTable";
import styles from "./ReviewsPage.module.css";

export const metadata = {
  title: "Reviews & Ratings | Admin",
};

export default function ReviewsPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Reviews & Ratings</h1>
          <p className={styles.subtitle}>
            Manage all the product reviews and customer feedback.
          </p>
        </div>
      </div>

      <ReviewsTable initialData={REVIEWS} />
    </div>
  );
}


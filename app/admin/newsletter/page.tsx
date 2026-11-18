import { NEWSLETTERS } from "@/data/newsletter";
import NewsletterTable from "@/components/admin/newsletter/NewsletterTable";
import styles from "./NewsletterPage.module.css";

export const metadata = {
  title: "Newsletter | Admin",
};

export default function NewsletterPage() {
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

      <NewsletterTable initialData={NEWSLETTERS} />
    </div>
  );
}

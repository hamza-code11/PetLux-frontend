import { CONTACT_MESSAGES } from "@/data/contact";
import ContactTable from "@/components/admin/contact/ContactTable";
import styles from "./ContactPage.module.css";

export const metadata = {
  title: "Contact Messages | Admin",
};

export default function ContactMessagesPage() {
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

      <ContactTable initialData={CONTACT_MESSAGES} />
    </div>
  );
}


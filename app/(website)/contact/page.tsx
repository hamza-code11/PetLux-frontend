import ContactHero from "@/components/website/contact/ContactHero";
import ContactForm from "@/components/website/contact/ContactForm";
import ContactInfo from "@/components/website/contact/ContactInfo";
import styles from "./contact.module.css";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <ContactHero />
      
      <div className={styles.mainWrapper}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
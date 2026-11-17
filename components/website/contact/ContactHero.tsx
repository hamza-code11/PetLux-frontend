import Link from "next/link";
import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.container}>
        
        <nav className={styles.breadcrumbs}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Contact Us</span>
        </nav>

        <div className={styles.headerContent}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            Have questions about our products or your order? Our team is here to help you.
          </p>
        </div>

      </div>
    </div>
  );
}


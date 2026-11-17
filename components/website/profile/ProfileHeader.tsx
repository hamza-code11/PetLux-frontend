import Link from "next/link";
import styles from "./ProfileHeader.module.css";

export default function ProfileHeader() {
  return (
    <div className={styles.header}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className={styles.separator}>/</span>
        <span className={styles.current}>My Profile</span>
      </nav>

      <div className={styles.titleRow}>
        <div className={styles.titleLeft}>
          <h1 className={styles.title}>My Profile</h1>
          <p className={styles.subtitle}>Manage your account settings and preferences.</p>
        </div>
      </div>
    </div>
  );
}

import styles from "./ProfileDetails.module.css";

export default function ProfileDetails() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Personal Information</h2>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Full Name</span>
          <span className={styles.value}>John Doe</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Email Address</span>
          <span className={styles.value}>john.doe@example.com</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Phone Number</span>
          <span className={styles.value}>+1 (555) 000-0000</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Member Since</span>
          <span className={styles.value}>January 2024</span>
        </div>
      </div>
    </div>
  );
}

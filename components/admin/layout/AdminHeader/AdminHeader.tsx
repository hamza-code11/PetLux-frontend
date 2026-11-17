"use client";

import styles from "./AdminHeader.module.css";

export default function AdminHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className={styles.header}>
      <button className={styles.menuBtn} onClick={toggleSidebar} aria-label="Open Menu">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className={styles.right}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>Admin User</span>
          <span className={styles.userRole}>Super Admin</span>
        </div>
        <div className={styles.avatar}>A</div>
      </div>
    </header>
  );
}

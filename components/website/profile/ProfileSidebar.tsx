"use client";

import styles from "./ProfileSidebar.module.css";

// Props add kiye taake parent state control kar sake
interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileSidebar({ activeTab, setActiveTab }: ProfileSidebarProps) {
  const links = [
    { id: "details", name: "Profile Details" },
    { id: "edit", name: "Edit Profile" },
    { id: "orders", name: "My Orders" },
    { id: "track", name: "Track Orders" },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className={`${styles.link} ${activeTab === link.id ? styles.active : ""}`}
          >
            {link.name}
          </button>
        ))}
      </nav>
      <button className={styles.logoutBtn}>Log Out</button>
    </aside>
  );
}

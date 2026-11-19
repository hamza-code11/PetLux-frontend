"use client";

import { useLogout } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast/ToastContext";
import styles from "./ProfileSidebar.module.css";

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileSidebar({ activeTab, setActiveTab }: ProfileSidebarProps) {
  const { mutate: logout, isPending } = useLogout();
  const { toast } = useToast();

  const links = [
    { id: "details", name: "Profile Details" },
    { id: "edit", name: "Edit Profile" },
    { id: "orders", name: "My Orders" },
    { id: "track", name: "Track Orders" },
  ];

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully!");
      }
    });
  };

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
      <button 
        className={styles.logoutBtn} 
        onClick={handleLogout}
        disabled={isPending}
      >
        {isPending ? "Logging out..." : "Log Out"}
      </button>
    </aside>
  );
}
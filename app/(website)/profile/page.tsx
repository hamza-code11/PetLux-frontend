"use client";

import { useState } from "react";
import ProfileHeader from "@/components/website/profile/ProfileHeader";
import ProfileSidebar from "@/components/website/profile/ProfileSidebar";
import ProfileDetails from "@/components/website/profile/ProfileDetails";
import EditProfile from "@/components/website/profile/EditProfile";
import styles from "./profile.module.css";

export default function ProfilePage() {
  // Default tab "details" rahega
  const [activeTab, setActiveTab] = useState("details");

  // Right side ka content decide karne ke liye function
  const renderContent = () => {
    switch (activeTab) {
      case "details":
        return <ProfileDetails />;
      case "edit":
        return <EditProfile />;
      case "orders":
        return <div className={styles.placeholder}>My Orders (Coming Soon)</div>;
      case "track":
        return <div className={styles.placeholder}>Track Orders (Coming Soon)</div>;
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        <ProfileHeader />

        <div className={styles.layout}>
          {/* Sidebar ko state aur setter pass kar diya */}
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className={styles.content}>
            {/* Yahan conditionally component render hoga */}
            {renderContent()}
          </div>
        </div>

      </div>
    </div>
  );
}


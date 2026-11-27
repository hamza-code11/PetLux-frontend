"use client";

import { useState } from "react";
import ProfileHeader from "@/components/website/profile/ProfileHeader";
import ProfileSidebar from "@/components/website/profile/ProfileSidebar";
import ProfileDetails from "@/components/website/profile/ProfileDetails";
import EditProfile from "@/components/website/profile/EditProfile";
import MyOrders from "@/components/website/profile/MyOrders";
import TrackOrders from "@/components/website/profile/TrackOrders";
import styles from "./profile.module.css";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  const renderContent = () => {
    switch (activeTab) {
      case "details":
        return <ProfileDetails />;
      case "edit":
        return <EditProfile />;
      case "orders":
        return <MyOrders />;
      case "track":
        return <TrackOrders />;        // 👈 yahan
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ProfileHeader />
        <div className={styles.layout}>
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className={styles.content}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
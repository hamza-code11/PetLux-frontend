"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useAuth";
import styles from "./ProfileDetails.module.css";

export default function ProfileDetails() {
  const { data, isLoading } = useCurrentUser();
  const user = data?.user;

  // Hydration Fix: Mounted state
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Jab tak mount na ho ya data load ho raha ho, loading show karein
  if (!mounted || isLoading) {
    return <div style={{ padding: "20px" }}>Loading profile...</div>;
  }

  if (!user) {
    return <div style={{ padding: "20px" }}>User not found. Please login again.</div>;
  }

  // Date format karne ke liye
  const memberSince = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Personal Information</h2>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Full Name</span>
          <span className={styles.value}>{user.first_name} {user.last_name}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Email Address</span>
          <span className={styles.value}>{user.email}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Phone Number</span>
          <span className={styles.value}>{user.phone}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Member Since</span>
          <span className={styles.value}>{memberSince}</span>
        </div>
      </div>
    </div>
  );
}


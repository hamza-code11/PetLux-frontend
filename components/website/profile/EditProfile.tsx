"use client";

import { useState } from "react";
import styles from "./EditProfile.module.css";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    phone: "+1 (555) 000-0000",
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile info updated successfully!");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password reset successfully!");
  };

  return (
    <div className={styles.container}>
      {/* Account Info Section */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Account Details</h2>
        <form onSubmit={handleInfoSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              className={styles.input}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone Number</label>
            <input
              type="tel"
              className={styles.input}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <button type="submit" className={styles.saveBtn}>
            Save Changes
          </button>
        </form>
      </div>

      {/* Password Reset Section */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Current Password</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Enter current password"
              value={passwordData.current}
              onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>New Password</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Enter new password"
              value={passwordData.new}
              onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm New Password</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Confirm new password"
              value={passwordData.confirm}
              onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
              required
            />
          </div>

          <button type="submit" className={styles.saveBtn}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}


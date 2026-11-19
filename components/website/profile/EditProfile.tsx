"use client";

import { useState, useEffect } from "react";
import { useCurrentUser, useUpdateProfile, useUpdatePassword } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast/ToastContext";
import styles from "./EditProfile.module.css";

export default function EditProfile() {
  const { data, isLoading } = useCurrentUser();
  const user = data?.user;
  const { toast } = useToast();

  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
  const { mutate: updatePassword, isPending: isUpdatingPassword } = useUpdatePassword();

  // Mounted state fix
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Profile Form State ---
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  // --- Password Form State ---
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  // Eye icon states
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // User data load hone par form fill karein
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Profile Submit
  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData, {
      onSuccess: () => toast.success("Profile updated successfully!"),
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to update profile.");
      },
    });
  };

  // Password Submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.password_confirmation) {
      toast.error("New passwords do not match!");
      return;
    }
    if (passwordData.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    updatePassword(passwordData, {
      onSuccess: () => {
        toast.success("Password updated successfully!");
        setPasswordData({ current_password: "", password: "", password_confirmation: "" });
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to update password.");
      },
    });
  };

  // Loading state (Hydration fix)
  if (!mounted || isLoading) {
    return <div style={{ padding: "20px" }}>Loading profile...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Account Info Section */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Account Details</h2>
        <form onSubmit={handleInfoSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>First Name</label>
            <input
              type="text"
              className={styles.input}
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Last Name</label>
            <input
              type="text"
              className={styles.input}
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

          <button type="submit" className={styles.saveBtn} disabled={isUpdatingProfile}>
            {isUpdatingProfile ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Password Reset Section */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className={styles.form}>
          
          {/* Current Password */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Current Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showCurrent ? "text" : "password"}
                className={styles.input}
                placeholder="Enter current password"
                value={passwordData.current_password}
                onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                required
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowCurrent(!showCurrent)} tabIndex={-1}>
                {showCurrent ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className={styles.formGroup}>
            <label className={styles.label}>New Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showNew ? "text" : "password"}
                className={styles.input}
                placeholder="Enter new password"
                value={passwordData.password}
                onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
                required
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowNew(!showNew)} tabIndex={-1}>
                {showNew ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm New Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirm ? "text" : "password"}
                className={styles.input}
                placeholder="Confirm new password"
                value={passwordData.password_confirmation}
                onChange={(e) => setPasswordData({ ...passwordData, password_confirmation: e.target.value })}
                required
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1}>
                {showConfirm ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.saveBtn} disabled={isUpdatingPassword}>
            {isUpdatingPassword ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}


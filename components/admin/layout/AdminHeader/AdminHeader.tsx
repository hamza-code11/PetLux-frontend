"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { useCurrentUser, useLogout } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast/ToastContext";
import styles from "./AdminHeader.module.css";

export default function AdminHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  // Mounted state (Hydration fix)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // User Data & Logout Hooks
  const { data: userData, isLoading } = useCurrentUser();
  const user = userData?.user;
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  // Initials
  const initials = user
    ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()
    : "A";
  const fullName = user ? `${user.first_name} ${user.last_name}` : "Admin User";
  const roleName = user?.role === "admin" ? "Super Admin" : "User";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully!");
      }
    });
  };

  return (
    <header className={styles.header}>
      <button className={styles.menuBtn} onClick={toggleSidebar} aria-label="Open Menu">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className={styles.right}>
        {/* Theme Toggle */}
        <ThemeToggle variant="adaptive" />

        {/* User Dropdown */}
        <div className={styles.dropdownWrapper} ref={dropdownRef}>
          <button 
            className={styles.userBtn} 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen}
          >
            <div className={styles.userInfo}>
              {isLoading ? (
                <>
                  <span className={styles.userName}>Loading...</span>
                  <span className={styles.userRole}>...</span>
                </>
              ) : (
                <>
                  <span className={styles.userName}>{fullName}</span>
                  <span className={styles.userRole}>{user?.email || roleName}</span>
                </>
              )}
            </div>
            <div className={styles.avatar}>
              {isLoading ? "..." : initials}
            </div>
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {/* Profile Link - Website Profile Page */}
              <Link 
                href="/profile" 
                className={styles.dropdownItem}
                onClick={() => setIsDropdownOpen(false)}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </Link>
              
              {/* Logout Button */}
              <button 
                className={styles.dropdownItem}
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}


"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "./AdminHeader.module.css";

export default function AdminHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
              <span className={styles.userName}>Admin User</span>
              <span className={styles.userRole}>Super Admin</span>
            </div>
            <div className={styles.avatar}>A</div>
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link 
                href="/admin/profile" 
                className={styles.dropdownItem}
                onClick={() => setIsDropdownOpen(false)}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </Link>
              <button 
                className={styles.dropdownItem}
                onClick={() => {
                  setIsDropdownOpen(false);
                  alert("Logout functionality coming soon!");
                  // Yahan aap apna logout logic likh sakte hain
                }}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

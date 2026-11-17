"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./AdminSidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  
  // Dropdowns ko open/close karne ke liye state
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    dashboard: true, // Dashboard default open rahega
  });

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`} onClick={onClose} />
      
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        
        {/* Logo Section */}
        <div className={styles.logoWrapper}>
          <Link href="/admin" className={styles.logo}>
            <Image 
              src="/logo/logo.png" 
              alt="PetLux"
              width={120} 
              height={40} 
              className={styles.logoImage}
              priority
            />
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className={styles.nav}>
          
          {/* MENU SECTION */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>MENU</span>
            
            {/* Dashboard Accordion */}
            <div className={styles.menuGroup}>
              <button 
                className={`${styles.menuBtn} ${openMenus.dashboard ? styles.menuBtnActive : ""}`}
                onClick={() => toggleMenu("dashboard")}
              >
                <div className={styles.menuBtnLeft}>
                  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </div>
                <svg className={`${styles.chevron} ${openMenus.dashboard ? styles.chevronOpen : ""}`} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`${styles.subMenu} ${openMenus.dashboard ? styles.subMenuOpen : ""}`}>
                <Link href="/admin" className={styles.subLink} onClick={onClose}>CRM</Link>
                <Link href="/admin" className={styles.subLink} onClick={onClose}>Analytics</Link>
                <Link href="/admin" className={styles.subLink} onClick={onClose}>eCommerce</Link>
                <Link href="/admin" className={styles.subLink} onClick={onClose}>Projects</Link>
                <Link href="/admin" className={styles.subLink} onClick={onClose}>HRM</Link>
                <Link href="/admin" className={styles.subLinkActive} onClick={onClose}>Jobs</Link>
              </div>
            </div>
          </div>

          {/* PAGES SECTION */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>PAGES</span>
            
            <Link href="/admin/auth" className={styles.link} onClick={onClose}>
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Authentication
              <svg className={styles.chevronRight} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <Link href="/admin/errors" className={styles.link} onClick={onClose}>
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Error Pages
              <svg className={styles.chevronRight} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* APPS SECTION */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>APPS</span>
            
            <Link href="/admin/contacts" className={styles.link} onClick={onClose}>
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Contacts
            </Link>
            
            <Link href="/admin/calendar" className={styles.link} onClick={onClose}>
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Calendar
            </Link>
          </div>

        </nav>
      </aside>
    </>
  );
}

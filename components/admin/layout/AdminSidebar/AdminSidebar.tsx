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
  
  // Dropdown states
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    petTypes: false,
    categories: false,
    subcategories: false,
    products: false,
  });

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const getSubLinkClass = (href: string) => {
    return pathname === href ? styles.subLinkActive : styles.subLink;
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
        <div className={styles.nav}>
          
          <div className={styles.section}>
            <span className={styles.sectionTitle}>MAIN MENU</span>
            
            {/* Dashboard Link */}
            <Link 
              href="/admin" 
              onClick={onClose}
              className={`${styles.link} ${pathname === "/admin" ? styles.linkActive : ""}`}
            >
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>

            {/* Pet Types Accordion */}
            <div className={styles.menuGroup}>
              <button 
                className={`${styles.menuBtn} ${openMenus.petTypes ? styles.menuBtnActive : ""}`}
                onClick={() => toggleMenu("petTypes")}
              >
                <div className={styles.menuBtnLeft}>
                  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pet Types
                </div>
                <svg className={`${styles.chevron} ${openMenus.petTypes ? styles.chevronOpen : ""}`} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`${styles.subMenu} ${openMenus.petTypes ? styles.subMenuOpen : ""}`}>
                <Link href="/admin/petTypes" className={getSubLinkClass("/admin/pet-types")} onClick={onClose}>List Pet Types</Link>
                <Link href="/admin/petTypes/add" className={getSubLinkClass("/admin/pet-types/add")} onClick={onClose}>Add Pet Type</Link>
              </div>
            </div>

            {/* Categories Accordion */}
            <div className={styles.menuGroup}>
              <button 
                className={`${styles.menuBtn} ${openMenus.categories ? styles.menuBtnActive : ""}`}
                onClick={() => toggleMenu("categories")}
              >
                <div className={styles.menuBtnLeft}>
                  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Categories
                </div>
                <svg className={`${styles.chevron} ${openMenus.categories ? styles.chevronOpen : ""}`} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`${styles.subMenu} ${openMenus.categories ? styles.subMenuOpen : ""}`}>
                <Link href="/admin/categories" className={getSubLinkClass("/admin/Categories")} onClick={onClose}>List Categories</Link>
                <Link href="/admin/categories/add" className={getSubLinkClass("/admin/Categories/add")} onClick={onClose}>Add Category</Link>
              </div>
            </div>

            {/* Subcategories Accordion */}
            <div className={styles.menuGroup}>
              <button 
                className={`${styles.menuBtn} ${openMenus.subcategories ? styles.menuBtnActive : ""}`}
                onClick={() => toggleMenu("subcategories")}
              >
                <div className={styles.menuBtnLeft}>
                  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Subcategories
                </div>
                <svg className={`${styles.chevron} ${openMenus.subcategories ? styles.chevronOpen : ""}`} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`${styles.subMenu} ${openMenus.subcategories ? styles.subMenuOpen : ""}`}>
                <Link href="/admin/subcategories" className={getSubLinkClass("/admin/Subcategories")} onClick={onClose}>List Subcategories</Link>
                <Link href="/admin/subcategories/add" className={getSubLinkClass("/admin/Subcategories/add")} onClick={onClose}>Add Subcategory</Link>
              </div>
            </div>

            {/* Products Accordion */}
            <div className={styles.menuGroup}>
              <button 
                className={`${styles.menuBtn} ${openMenus.products ? styles.menuBtnActive : ""}`}
                onClick={() => toggleMenu("products")}
              >
                <div className={styles.menuBtnLeft}>
                  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Products
                </div>
                <svg className={`${styles.chevron} ${openMenus.products ? styles.chevronOpen : ""}`} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`${styles.subMenu} ${openMenus.products ? styles.subMenuOpen : ""}`}>
                <Link href="/admin/products" className={getSubLinkClass("/admin/Products")} onClick={onClose}>List Products</Link>
                <Link href="/admin/products/add" className={getSubLinkClass("/admin/Products/add")} onClick={onClose}>Add Product</Link>
              </div>
            </div>
          </div>


          <Link 
            href="/admin/reviews" 
            onClick={onClose}
            className={`${styles.link} ${pathname === "/admin/reviews" ? styles.linkActive : ""}`}
          >
            <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Reviews & Ratings
          </Link>


          {/* NEW SECTION: INBOX */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>INBOX</span>

            <Link 
              href="/admin/cms" 
              onClick={onClose}
              className={`${styles.link} ${pathname === "/admin/cms" ? styles.linkActive : ""}`}
            >
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              CMS Manager
            </Link>

            <Link 
              href="/admin/messages" 
              onClick={onClose}
              className={`${styles.link} ${pathname === "/admin/messages" ? styles.linkActive : ""}`}
            >
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Messages
            </Link>

            <Link 
              href="/admin/newsletter" 
              onClick={onClose}
              className={`${styles.link} ${pathname === "/admin/newsletter" ? styles.linkActive : ""}`}
            >
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
              </svg>
              Newsletter
            </Link>
          </div>

        </div>

        {/* Logout Button Fixed at Bottom */}
        <div className={styles.logoutWrapper}>
          <button onClick={onClose} className={styles.logoutBtn}>
            <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

      </aside>
    </>
  );
}

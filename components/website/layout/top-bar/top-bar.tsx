import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle"; // Apna sahi path dena yahan

import { siteConfig } from "@/types/site";
import styles from "./top-bar.module.css";

const MailIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <div className={styles.inner}>
        <div className={styles.group}>
          <a
            href={`mailto:${siteConfig.email}`}
            className={`${styles.item} ${styles.emailItem}`}
          >
            <MailIcon />
            <span>{siteConfig.email}</span>
          </a>

          <a href={`tel:${siteConfig.phoneHref}`} className={styles.item}>
            <PhoneIcon />
            <span>{siteConfig.phone}</span>
          </a>
        </div>

        <div className={styles.group}>
          {/* Theme Toggle Yahan Add Kiya Hai */}
          <div className={styles.themeToggleWrapper}>
             <ThemeToggle />
          </div>
          
          <Link href="/track-order" className={styles.item}>
            Track Order
          </Link>
          <Link href="/contact" className={styles.item}>
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";

import { useMenu } from "@/hooks/useMenu";
import { STORE_INFO } from "@/lib/storeInfo";
import styles from "./footer.module.css";

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.6 3c.3 2.2 1.6 3.7 3.7 3.9v3c-1.4.1-2.7-.4-3.7-1.1v6.1c0 3.2-2.3 5.6-5.4 5.6-3 0-5.4-2.4-5.4-5.4 0-3.3 2.8-5.7 6-5.3v3.1c-1.5-.4-2.9.7-2.9 2.2 0 1.3 1 2.3 2.3 2.3 1.4 0 2.4-1 2.4-2.6V3h3Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  // useMenu hook directly Menu API ("/menu") ko call karta hai
  const { data: menu = [], isLoading } = useMenu();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Brand */}
        <div className={styles.about}>
          <Link href="/" className={styles.logo} aria-label="PetLux home">
            <Image
              src="/logo/logo.png"
              alt="PetLux"
              width={240}
              height={48}
              className={styles.logoImg}
            />
          </Link>

          <p className={styles.description}>
            Premium food, essentials and accessories for your beloved pets.
            Crafted with care, delivered with love.
          </p>

          <div className={styles.socials}>
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                title={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <h3>Shop by Pet</h3>

          {/* Dynamic Menu API Data */}
          {isLoading ? (
            <span className={styles.loadingText}>Loading...</span>
          ) : (
            menu.map((pet) => (
              <Link key={pet.id} href={`/shop/${pet.slug}`}>
                {pet.name}
              </Link>
            ))
          )}

        </div>

        <div className={styles.column}>
          <h3>Customer Care</h3>
          <Link href="/contact">Contact Us</Link>
          <Link href="/faq">FAQs</Link>
          <Link href="/track-order">Track Order</Link>
        </div>

        <div className={styles.column}>
          <h3>About PetLux</h3>
          <Link href="/about">Our Story</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </div>

        {/* Contact info */}
        {/* Contact info */}
        <div className={styles.contact}>
          <h3>Contact Us</h3>

          {STORE_INFO.phone && (
            <a
              href={`tel:${STORE_INFO.phone.replace(/\s/g, "")}`}
              className={styles.contactItem}
            >
              {/* Existing phone SVG */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
              </svg>
              <span>{STORE_INFO.phone}</span>
            </a>
          )}

          {STORE_INFO.email && (
            <a
              href={`mailto:${STORE_INFO.email}`}
              className={styles.contactItem}
            >
              {/* Existing email SVG */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{STORE_INFO.email}</span>
            </a>
          )}

          {STORE_INFO.address && (
            <div className={styles.contactItem}>
              {/* Existing location SVG */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{STORE_INFO.address}</span>
            </div>
          )}
        </div>

      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} PetLux. All rights reserved.</span>
        <span>Made with care for pets everywhere.</span>
      </div>
    </footer>
  );
}


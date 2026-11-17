"use client";

import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

import type { MenuPetType } from "@/types/menu";
import {
  BagIcon,
  ChevronIcon,
  MenuIcon,
  UserIcon,
  HeartIcon, // Wishlist Icon
} from "./icons";
import MobileDrawer from "./mobile-drawer";
import styles from "./navbar.module.css";

interface NavbarClientProps {
  menu: MenuPetType[];
  cartCount?: number;
  wishlistCount?: number; // Naya Prop add kiya
}

export default function NavbarClient({
  menu,
  cartCount = 0,
  wishlistCount = 0, // Default value 0
}: NavbarClientProps) {
  const pathname = usePathname();

  const [activeId, setActiveId] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMega = (id: number) => {
    clearTimer();
    setActiveId(id);
  };

  const scheduleClose = () => {
    clearTimer();
    closeTimer.current = setTimeout(() => setActiveId(null), 120);
  };

  const closeAll = () => {
    clearTimer();
    setActiveId(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    closeAll();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const petHref = (slug: string) => `/shop/${slug}`;
  
  // Dono counts ke liye badge text calculate kiya
  const cartBadgeText = cartCount > 99 ? "99+" : String(cartCount);
  const wishlistBadgeText = wishlistCount > 99 ? "99+" : String(wishlistCount);

  const renderSimpleLink = (href: string, label: string) => {
    const current = pathname === href;

    return (
      <li
        className={styles.menuItem}
        onMouseEnter={() => setActiveId(null)}
      >
        <Link
          href={href}
          aria-current={current ? "page" : undefined}
          className={`${styles.menuLink} ${
            current ? styles.menuLinkCurrent : ""
          }`}
        >
          {label}
        </Link>
      </li>
    );
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setActiveId(null);
        }
      }}
    >
      <nav className={styles.nav} aria-label="Main navigation">
        {/* Mobile burger */}
        <button
          type="button"
          className={`${styles.iconButton} ${styles.burger}`}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-drawer"
          onClick={() => setMobileOpen(true)}
        >
          <MenuIcon />
        </button>

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image 
            src="/logo/logo.png" 
            alt="PetLux Logo" 
            width={140}
            height={40}
            priority
            className={styles.logoImage}
          />
        </Link>

        {/* Desktop menu */}
        <ul className={styles.menu}>
          <Fragment key="home">{renderSimpleLink("/", "Home")}</Fragment>

          {menu.map((p) => {
            const isActive = activeId === p.id;

            return (
              <li
                key={p.id}
                className={styles.menuItem}
                onMouseEnter={() => openMega(p.id)}
              >
                <Link
                  href={petHref(p.slug)}
                  className={`${styles.menuLink} ${
                    isActive ? styles.menuLinkActive : ""
                  }`}
                  aria-haspopup="true"
                  aria-expanded={isActive}
                  onFocus={() => openMega(p.id)}
                >
                  {p.name}
                  <ChevronIcon className={styles.chevron} />
                </Link>

                {isActive && (
                  <div className={styles.mega}>
                    <div className={styles.megaInner}>
                      <div className={styles.megaColumns}>
                        {p.categories.map((c) => {
                          const catHref = `${petHref(p.slug)}/${c.slug}`;

                          return (
                            <div key={c.id} className={styles.megaColumn}>
                              <Link
                                href={catHref}
                                className={styles.colTitle}
                                onClick={closeAll}
                              >
                                {c.name}
                              </Link>

                              {c.children.length > 0 && (
                                <ul className={styles.subList}>
                                  {c.children.map((s) => (
                                    <li key={s.id}>
                                      <Link
                                        href={`${catHref}/${s.slug}`}
                                        className={styles.subLink}
                                        onClick={closeAll}
                                      >
                                        {s.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <Link
                        href={petHref(p.slug)}
                        className={styles.promo}
                        onClick={closeAll}
                      >
                        <span className={styles.promoLabel}>
                          Everything for your
                        </span>
                        <span className={styles.promoTitle}>{p.name}</span>
                        <span className={styles.promoCta}>
                          Shop all {p.name} &rarr;
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            );
          })}

          <Fragment key="shop">{renderSimpleLink("/shop", "Shop")}</Fragment>
          <Fragment key="about">{renderSimpleLink("/about", "About")}</Fragment>
        </ul>

        {/* Actions: Account / Wishlist / Cart */}
        <div className={styles.actions}>
          <Link
            href="/profile"
            className={styles.iconButton}
            aria-label="Account"
          >
            <UserIcon />
          </Link>

          {/* Wishlist Icon with Badge */}
          <Link
            href="/wishlist"
            className={styles.iconButton}
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <HeartIcon />
            {wishlistCount > 0 && (
              <span className={styles.badge}>{wishlistBadgeText}</span>
            )}
          </Link>

          {/* Cart Icon with Badge */}
          <Link
            href="/cart"
            className={styles.iconButton}
            aria-label={`Cart, ${cartCount} items`}
          >
            <BagIcon />
            {cartCount > 0 && <span className={styles.badge}>{cartBadgeText}</span>}
          </Link>
        </div>
      </nav>

      <MobileDrawer
        menu={menu}
        open={mobileOpen}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}


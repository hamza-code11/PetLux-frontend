"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { SEARCH_PARAM, SEARCH_PATH } from "@/types/search";
import type { MenuPetType } from "@/types/menu";
import {
  BagIcon,
  ChevronIcon,
  CloseIcon,
  SearchIcon,
  UserIcon,
} from "./icons";
import styles from "./mobile-drawer.module.css";

interface MobileDrawerProps {
  menu: MenuPetType[];
  open: boolean;
  cartCount?: number;
  onClose: () => void;
}

export default function MobileDrawer({
  menu,
  open,
  cartCount = 0,
  onClose,
}: MobileDrawerProps) {
  const [openPet, setOpenPet] = useState<number | null>(null);
  const [openCat, setOpenCat] = useState<number | null>(null);

  // Sidebar band hone par accordion reset
  useEffect(() => {
    if (!open) {
      setOpenPet(null);
      setOpenCat(null);
    }
  }, [open]);

  const petHref = (slug: string) => `/shop/${slug}`;
  const badgeText = cartCount > 99 ? "99+" : String(cartCount);

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        onClick={onClose}
        aria-hidden
      />

      <aside
        id="mobile-drawer"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        aria-label="Mobile navigation"
      >
        <div className={styles.header}>
          <Link href="/" className={styles.logo} onClick={onClose}>
            PetLux
          </Link>

          <button
            type="button"
            className={styles.iconButton}
            aria-label="Close menu"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div className={styles.body}>
          <form
            action={SEARCH_PATH}
            method="get"
            role="search"
            className={styles.search}
          >
            <SearchIcon />
            <input
              type="search"
              name={SEARCH_PARAM}
              placeholder="Search products"
              aria-label="Search products"
            />
          </form>

          <Link href="/" className={styles.link} onClick={onClose}>
            Home
          </Link>

          {menu.map((p) => {
            const petOpen = openPet === p.id;

            return (
              <div key={p.id} className={styles.accordion}>
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={petOpen}
                  onClick={() => {
                    setOpenPet(petOpen ? null : p.id);
                    setOpenCat(null);
                  }}
                >
                  {p.name}
                  <ChevronIcon
                    className={`${styles.chevron} ${
                      petOpen ? styles.chevronOpen : ""
                    }`}
                  />
                </button>

                <div
                  className={`${styles.collapse} ${
                    petOpen ? styles.collapseOpen : ""
                  }`}
                >
                  <div className={styles.collapseInner}>
                    <div className={styles.panel}>
                      <Link
                        href={petHref(p.slug)}
                        className={styles.shopAll}
                        onClick={onClose}
                      >
                        Shop all {p.name}
                      </Link>

                      {p.categories.map((c) => {
                        const catHref = `${petHref(p.slug)}/${c.slug}`;
                        const hasChildren = c.children.length > 0;
                        const catOpen = openCat === c.id;

                        return (
                          <div key={c.id} className={styles.category}>
                            <div className={styles.catRow}>
                              <Link
                                href={catHref}
                                className={styles.catLink}
                                onClick={onClose}
                              >
                                {c.name}
                              </Link>

                              {hasChildren && (
                                <button
                                  type="button"
                                  className={styles.catToggle}
                                  aria-label={`Toggle ${c.name}`}
                                  aria-expanded={catOpen}
                                  onClick={() =>
                                    setOpenCat(catOpen ? null : c.id)
                                  }
                                >
                                  <ChevronIcon
                                    className={`${styles.chevron} ${
                                      catOpen ? styles.chevronOpen : ""
                                    }`}
                                  />
                                </button>
                              )}
                            </div>

                            {hasChildren && (
                              <div
                                className={`${styles.collapse} ${
                                  catOpen ? styles.collapseOpen : ""
                                }`}
                              >
                                <div className={styles.collapseInner}>
                                  <ul className={styles.subList}>
                                    {c.children.map((s) => (
                                      <li key={s.id}>
                                        <Link
                                          href={`${catHref}/${s.slug}`}
                                          onClick={onClose}
                                        >
                                          {s.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <Link href="/shop" className={styles.link} onClick={onClose}>
            Shop
          </Link>
          <Link href="/about" className={styles.link} onClick={onClose}>
            About
          </Link>
        </div>

        <div className={styles.footer}>
          <Link href="/account" className={styles.action} onClick={onClose}>
            <UserIcon />
            My Account
          </Link>

          <Link href="/cart" className={styles.action} onClick={onClose}>
            <span className={styles.bag}>
              <BagIcon />
              {cartCount > 0 && (
                <span className={styles.badge}>{badgeText}</span>
              )}
            </span>
            Cart
          </Link>
        </div>
      </aside>
    </>
  );
}

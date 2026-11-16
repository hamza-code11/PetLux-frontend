"use client";

import { useState } from "react";
import styles from "./ShopSidebar.module.css";

const CATEGORIES_DATA = [
  { title: "Dog Food", subs: ["Dry Food", "Wet Food", "Puppy Food", "Senior Food", "Grain Free"] },
  { title: "Treats", subs: ["Biscuits", "Dental Chews", "Training Treats", "Jerky"] },
  { title: "Accessories", subs: ["Beds", "Bowls", "Collars", "Leashes"] },
  { title: "Toys", subs: ["Chew Toys", "Plush Toys", "Balls", "Rope Toys"] },
  { title: "Grooming", subs: ["Shampoo", "Brushes", "Flea & Tick"] },
  { title: "Supplies", subs: ["Waste Bags", "Training Pads", "Cleaning"] },
];

const PRICE_RANGES = ["Under $20", "$20 - $50", "$50 - $100", "Over $100"];

export default function ShopSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(["Dog Food"]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  const filterContent = (
    <>
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Pet Types</h3>
        <ul className={styles.filterList}>
          {["Dogs", "Cats", "Small Pets", "Birds"].map((item) => (
            <li key={item}>
              <label className={styles.filterLabel}>
                <input type="checkbox" className={styles.filterCheckbox} /> {item}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Categories</h3>
        <div className={styles.accordionList}>
          {CATEGORIES_DATA.map((cat) => (
            <div key={cat.title} className={styles.accordionItem}>
              <button 
                className={`${styles.accordionHeader} ${openSections.includes(cat.title) ? styles.active : ""}`}
                onClick={() => toggleSection(cat.title)}
              >
                {cat.title}
                <svg className={styles.chevron} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div className={`${styles.accordionContent} ${openSections.includes(cat.title) ? styles.open : ""}`}>
                <ul className={styles.subList}>
                  {cat.subs.map((sub) => (
                    <li key={sub}>
                      <label className={styles.filterLabel}>
                        <input type="checkbox" className={styles.filterCheckbox} /> {sub}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <div className={styles.accordionList}>
          <div className={styles.accordionItem}>
            <button 
              className={`${styles.accordionHeader} ${openSections.includes("Price Range") ? styles.active : ""}`}
              onClick={() => toggleSection("Price Range")}
            >
              <span className={styles.filterTitle} style={{ margin: 0 }}>Price Range</span>
              <svg className={styles.chevron} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div className={`${styles.accordionContent} ${openSections.includes("Price Range") ? styles.open : ""}`}>
              <ul className={styles.subList} style={{ borderLeft: "none", paddingLeft: 0 }}>
                {PRICE_RANGES.map((item) => (
                  <li key={item}>
                    <label className={styles.filterLabel}>
                      <input type="checkbox" className={styles.filterCheckbox} /> {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <button className={styles.applyBtn} onClick={() => setIsOpen(false)}>Apply Filters</button>
    </>
  );

  return (
    <>
      <div className={styles.mobileFilterBar}>
        <button className={styles.filterBtn} onClick={() => setIsOpen(true)}>Filters</button>
      </div>
      <aside className={styles.desktopSidebar}>{filterContent}</aside>
      <div className={`${styles.drawerOverlay} ${isOpen ? styles.open : ""}`} onClick={() => setIsOpen(false)}>
        <div className={styles.drawerContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.drawerHeader}>
            <h2>Filters</h2>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>X</button>
          </div>
          <div className={styles.drawerBody}>{filterContent}</div>
        </div>
      </div>
    </>
  );
}

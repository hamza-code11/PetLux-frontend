"use client";

import { useState } from "react";
import PetToysCmsForm from "./PetToysCmsForm";
import CategoryCmsForm from "./CategoryCmsForm";
import FoodCmsForm from "./FoodCmsForm";
import WhyChooseCmsForm from "./WhyChooseCmsForm";
import BannerCmsForm from "./BannerCmsForm";
import AboutCmsForm from "./AboutCmsForm";
import HeroCmsForm from "./HeroCmsForm";
import styles from "./CmsManager.module.css";

export default function CmsManager() {
  const [activeTab, setActiveTab] = useState("hero");

  const tabs = [
    { id: "hero",       label: "Hero Section" },
    { id: "petToys",    label: "Pet Toys" },
    { id: "category",   label: "Category" },
    { id: "banner",     label: "Banner" },
    { id: "food",       label: "Food" },
    { id: "whyChoose",  label: "Why Choose Us" },
    { id: "about",      label: "About Page" },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "hero":  return <HeroCmsForm      />;
      case "petToys":   return <PetToysCmsForm />;
      case "category":  return <CategoryCmsForm />;
      case "food":  return <FoodCmsForm  />;
      case "whyChoose":  return <WhyChooseCmsForm   />;
      case "banner":  return <BannerCmsForm    />;
      case "about":  return <AboutCmsForm     />;
      default:          return null;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>CMS Manager</h1>
          <p className={styles.subtitle}>
            Manage your website content and sections.
          </p>
        </div>
      </div>

      <div className={styles.tabsContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.contentArea}>{renderTab()}</div>
    </div>
  );
}

function Placeholder({ name }: { name: string }) {
  return (
    <div style={{ padding: 40, textAlign: "center", color: "var(--color-muted)" }}>
      {name} section — coming soon
    </div>
  );
}


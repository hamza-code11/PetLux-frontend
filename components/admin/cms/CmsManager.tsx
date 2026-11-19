"use client";

import { useState } from "react";
import styles from "./CmsManager.module.css";

const HeroForm = () => (
  <div className={styles.formContainer}>
    <h2 className={styles.sectionTitle}>Hero Section</h2>
    <div className={styles.formGrid}>
      <div className={styles.formGroup}><label className={styles.label}>Title</label><input className={styles.input} type="text" /></div>
      <div className={styles.formGroup}><label className={styles.label}>Subtitle</label><input className={styles.input} type="text" /></div>
      <div className={styles.formGroup}><label className={styles.label}>Button Text</label><input className={styles.input} type="text" /></div>
      <div className={styles.formGroup}><label className={styles.label}>Button Link</label><input className={styles.input} type="text" /></div>
    </div>
    <div className={styles.formGroup}><label className={styles.label}>Image URL</label><input className={styles.input} type="text" /></div>
    <button className={styles.saveBtn}>Save Hero Section</button>
  </div>
);

const PetToysForm = () => (
  <div className={styles.formContainer}>
    <h2 className={styles.sectionTitle}>Pet Toys Section</h2>
    <div className={styles.formGroup}><label className={styles.label}>Title</label><input className={styles.input} type="text" /></div>
    <div className={styles.formGroup}><label className={styles.label}>Description</label><textarea className={styles.textarea} rows={4} /></div>
    <button className={styles.saveBtn}>Save Pet Toys Section</button>
  </div>
);

const BannerForm = () => (
  <div className={styles.formContainer}>
    <h2 className={styles.sectionTitle}>Banner Section</h2>
    <div className={styles.formGroup}><label className={styles.label}>Title</label><input className={styles.input} type="text" /></div>
    <div className={styles.formGroup}><label className={styles.label}>Subtitle</label><input className={styles.input} type="text" /></div>
    <div className={styles.formGroup}><label className={styles.label}>Button Text</label><input className={styles.input} type="text" /></div>
    <div className={styles.formGroup}><label className={styles.label}>Image URL</label><input className={styles.input} type="text" /></div>
    <button className={styles.saveBtn}>Save Banner Section</button>
  </div>
);

const FoodForm = () => (
  <div className={styles.formContainer}>
    <h2 className={styles.sectionTitle}>Food Section</h2>
    <div className={styles.formGroup}><label className={styles.label}>Title</label><input className={styles.input} type="text" /></div>
    <div className={styles.formGroup}><label className={styles.label}>Description</label><textarea className={styles.textarea} rows={4} /></div>
    <button className={styles.saveBtn}>Save Food Section</button>
  </div>
);

const WhyChooseForm = () => (
  <div className={styles.formContainer}>
    <h2 className={styles.sectionTitle}>Why Choose Us</h2>
    <div className={styles.formGroup}><label className={styles.label}>Title</label><input className={styles.input} type="text" /></div>
    <div className={styles.formGroup}><label className={styles.label}>Point 1</label><input className={styles.input} type="text" /></div>
    <div className={styles.formGroup}><label className={styles.label}>Point 2</label><input className={styles.input} type="text" /></div>
    <div className={styles.formGroup}><label className={styles.label}>Point 3</label><input className={styles.input} type="text" /></div>
    <button className={styles.saveBtn}>Save Why Choose Section</button>
  </div>
);

const AboutForm = () => (
  <div className={styles.formContainer}>
    <h2 className={styles.sectionTitle}>About Page Section</h2>
    <div className={styles.formGroup}><label className={styles.label}>Title</label><input className={styles.input} type="text" /></div>
    <div className={styles.formGroup}><label className={styles.label}>Content</label><textarea className={styles.textarea} rows={6} /></div>
    <div className={styles.formGroup}><label className={styles.label}>Image URL</label><input className={styles.input} type="text" /></div>
    <button className={styles.saveBtn}>Save About Section</button>
  </div>
);

export default function CmsManager() {
  const [activeTab, setActiveTab] = useState("hero");

  const tabs = [
    { id: "hero", label: "Hero Section" },
    { id: "petToys", label: "Pet Toys" },
    { id: "banner", label: "Banner" },
    { id: "food", label: "Food" },
    { id: "whyChoose", label: "Why Choose Us" },
    { id: "about", label: "About Page" },
  ];

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

      <div className={styles.contentArea}>
        {activeTab === "hero" && <HeroForm />}
        {activeTab === "petToys" && <PetToysForm />}
        {activeTab === "banner" && <BannerForm />}
        {activeTab === "food" && <FoodForm />}
        {activeTab === "whyChoose" && <WhyChooseForm />}
        {activeTab === "about" && <AboutForm />}
      </div>
    </div>
  );
}


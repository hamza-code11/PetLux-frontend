"use client";

import { useState } from "react";
import styles from "./ProductTabs.module.css";

export default function ProductTabs({ description, features }: { description: string, features: string[] }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className={styles.tabsContainer}>
      {/* Tabs Header */}
      <div className={styles.tabsHeader}>
        <button 
          className={`${styles.tabBtn} ${activeTab === "description" ? styles.active : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === "reviews" ? styles.active : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews (124)
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === "write-review" ? styles.active : ""}`}
          onClick={() => setActiveTab("write-review")}
        >
          Write a Review
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === "description" && (
          <div className={styles.descriptionContent}>
            <p>{description}</p>
            <h4>Key Features:</h4>
            <ul>
              {features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className={styles.reviewsContent}>
            <div className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <strong>Sarah M.</strong>
                <span>★★★★★</span>
              </div>
              <p>My dog absolutely loves this food! His coat is shinier and he has more energy.</p>
            </div>
            {/* Add more mock reviews here */}
          </div>
        )}

        {activeTab === "write-review" && (
          <div className={styles.writeReviewContent}>
            <form className={styles.reviewForm}>
              <div className={styles.formGroup}>
                <label>Rating</label>
                <select>
                  <option>5 Stars</option>
                  <option>4 Stars</option>
                  <option>3 Stars</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Review</label>
                <textarea rows={5} placeholder="Write your review here..."></textarea>
              </div>
              <button type="button" className={styles.submitBtn}>Submit Review</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}


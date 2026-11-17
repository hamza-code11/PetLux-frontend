"use client";

import { useEffect, useState } from "react";
import styles from "./WelcomeBanner.module.css";

export default function WelcomeBanner() {
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {greeting}, <span className={styles.name}>Admin</span> 👋
        </h1>
        <p className={styles.subtitle}>
          Here's a quick snapshot of your store today. Let's make it a great one!
        </p>
      </div>
      
      {/* Decorative Element */}
      <div className={styles.decorativeCircle} />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import styles from "./WelcomeBanner.module.css";

type Period = "morning" | "afternoon" | "evening" | "night";

const GREETINGS: Record<Period, string> = {
  morning: "Good Morning",
  afternoon: "Good Afternoon",
  evening: "Good Evening",
  night: "Good Night",
};

function getPeriod(hour: number): Period {
  if (hour >= 5 && hour < 12) return "morning"; // 5:00 AM - 11:59 AM
  if (hour >= 12 && hour < 17) return "afternoon"; // 12:00 PM - 4:59 PM
  if (hour >= 17 && hour < 20) return "evening"; // 5:00 PM - 7:59 PM
  return "night"; // 8:00 PM - 4:59 AM
}

export default function WelcomeBanner() {
  // Server aur client ka HTML match rakhne ke liye pehle null, phir mount par set
  const [period, setPeriod] = useState<Period | null>(null);

  useEffect(() => {
    const update = () => setPeriod(getPeriod(new Date().getHours()));
    update();
    const id = setInterval(update, 60 * 1000); // har minute check
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.banner} data-period={period ?? "none"}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {period ? GREETINGS[period] : "Welcome"},{" "}
          <span className={styles.name}>Admin</span>
        </h1>
        <p className={styles.subtitle}>
          Here&apos;s a quick snapshot of your store today. Let&apos;s make it a
          great one!
        </p>
      </div>

      {/* Decorative elements */}
      <div className={styles.decorativeCircle} />
      <div className={styles.decorativeCircleSmall} />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useIsFetching } from "@tanstack/react-query";
import styles from "./splash-screen.module.css";

const MIN_MS = 1200; // animation poori nazar aaye is liye minimum time
const MAX_MS = 5000; // API atak jaye to bhi splash hat jaye
const FADE_MS = 600;

/* ---------- SVG icons (currentColor use karte hain) ---------- */

function PawIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
      <ellipse cx="32" cy="43" rx="15" ry="12" />
      <ellipse cx="13" cy="29" rx="6" ry="8" transform="rotate(-22 13 29)" />
      <ellipse cx="25" cy="16" rx="6.5" ry="9" transform="rotate(-8 25 16)" />
      <ellipse cx="39" cy="16" rx="6.5" ry="9" transform="rotate(8 39 16)" />
      <ellipse cx="51" cy="29" rx="6" ry="8" transform="rotate(22 51 29)" />
    </svg>
  );
}

function BoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 32" fill="currentColor" aria-hidden="true">
      <rect x="12" y="11" width="40" height="10" rx="5" />
      <circle cx="10" cy="9" r="6.5" />
      <circle cx="10" cy="23" r="6.5" />
      <circle cx="54" cy="9" r="6.5" />
      <circle cx="54" cy="23" r="6.5" />
    </svg>
  );
}

function FishIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 32" fill="currentColor" aria-hidden="true">
      <ellipse cx="26" cy="16" rx="21" ry="11" />
      <path d="M44 16 L62 3 L62 29 Z" />
      <circle cx="13" cy="13" r="2.5" fill="var(--color-background)" />
    </svg>
  );
}

/* ---------- Floating background items ---------- */

type FloatItem = {
  type: "paw" | "bone" | "fish";
  left: string;
  size: number;
  delay: number;
  duration: number;
  tone: "accent" | "fg";
};

const FLOATERS: FloatItem[] = [
  { type: "paw", left: "6%", size: 38, delay: 0, duration: 7, tone: "accent" },
  { type: "bone", left: "18%", size: 54, delay: 1.6, duration: 8.5, tone: "fg" },
  { type: "fish", left: "30%", size: 52, delay: 0.7, duration: 7.5, tone: "accent" },
  { type: "paw", left: "46%", size: 28, delay: 2.4, duration: 9, tone: "fg" },
  { type: "bone", left: "62%", size: 46, delay: 0.3, duration: 8, tone: "accent" },
  { type: "paw", left: "76%", size: 44, delay: 1.9, duration: 7.2, tone: "accent" },
  { type: "fish", left: "88%", size: 48, delay: 1.1, duration: 9.2, tone: "fg" },
  { type: "bone", left: "93%", size: 36, delay: 3, duration: 8.2, tone: "accent" },
];

const BRAND = ["P", "e", "t", "L", "u", "x"];

export default function SplashScreen() {
  const isFetching = useIsFetching();
  const [minPassed, setMinPassed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [progress, setProgress] = useState(6);

  // Min / max timers
  useEffect(() => {
    const t1 = setTimeout(() => setMinPassed(true), MIN_MS);
    const t2 = setTimeout(() => setTimedOut(true), MAX_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const ready = timedOut || (minPassed && isFetching === 0);

  // Fake progress: 90% tak dheere dheere, ready par 100%
  useEffect(() => {
    if (ready) {
      setProgress(100);
      return;
    }
    const id = setInterval(() => {
      setProgress((p) => p + (90 - p) * 0.07);
    }, 120);
    return () => clearInterval(id);
  }, [ready]);

  // Splash ke dauran page scroll band
  useEffect(() => {
    if (removed) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [removed]);

  // Fade out ke baad DOM se hata do
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setRemoved(true), FADE_MS + 100);
    return () => clearTimeout(t);
  }, [ready]);

  if (removed) return null;

  return (
    <div
      className={`${styles.splash} ${ready ? styles.hide : ""}`}
      role="status"
      aria-label="Loading PetLux"
    >
      {/* Soft glow */}
      <div className={styles.glow} />

      {/* Floating pet items */}
      <div className={styles.floaters} aria-hidden="true">
        {FLOATERS.map((f, i) => {
          const Icon = f.type === "paw" ? PawIcon : f.type === "bone" ? BoneIcon : FishIcon;
          return (
            <span
              key={i}
              className={`${styles.floater} ${f.tone === "accent" ? styles.toneAccent : styles.toneFg}`}
              style={
                {
                  left: f.left,
                  width: f.size,
                  "--delay": `${f.delay}s`,
                  "--duration": `${f.duration}s`,
                } as React.CSSProperties
              }
            >
              <Icon />
            </span>
          );
        })}
      </div>

      {/* Center content */}
      <div className={styles.content}>
        <div className={styles.medallion}>
          <span className={styles.ripple} />
          <span className={`${styles.ripple} ${styles.ripple2}`} />
          <span className={styles.ring} />
          <PawIcon className={styles.pawMain} />
        </div>

        <h1 className={styles.brand} aria-hidden="true">
          {BRAND.map((ch, i) => (
            <span
              key={i}
              className={`${styles.letter} ${i >= 3 ? styles.accent : ""}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              {ch}
            </span>
          ))}
        </h1>

        <p className={styles.tagline}>Premium Pet Care</p>

        <div className={styles.progress}>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${progress}%` }} />
          </div>
          <PawIcon className={styles.progressPaw} />
        </div>
      </div>

      {/* Walking paw prints */}
      <div className={styles.trail} aria-hidden="true">
        {Array.from({ length: 7 }).map((_, i) => (
          <PawIcon
            key={i}
            className={`${styles.print} ${i % 2 === 0 ? styles.printUp : styles.printDown}`}
          />
        ))}
      </div>
    </div>
  );
}


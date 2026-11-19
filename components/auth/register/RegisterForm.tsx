"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./RegisterForm.module.css";

const benefits = [
  {
    title: "Exclusive Member Offers",
    text: "Get early access to deals and discounts on premium pet food.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    ),
  },
  {
    title: "Easy Order Tracking",
    text: "Track every order and view your purchase history in one place.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    ),
  },
  {
    title: "Save Your Favourites",
    text: "Build a wishlist and reorder your pet's essentials in one tap.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    ),
  },
];

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      console.log({ name, email, phone, password });
      alert("Registration successful! Please login.");
      router.push("/login");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      {/* Left Side: Form */}
      <div className={styles.formSide}>
        <div className={styles.formWrapper}>
          <div className={styles.logoWrapper}>
            <Link href="/">
              <Image
                src="/logo/logo.png"
                alt="PetLux Logo"
                width={120}
                height={40}
                className={styles.logoImage}
                priority
              />
            </Link>
          </div>

          <h1 className={styles.title}>Create an Account</h1>
          <p className={styles.subtitle}>
            Already have an account?{" "}
            <Link href="/login" className={styles.link}>
              Sign In
            </Link>
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input
                type="text"
                className={styles.input}
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                className={styles.input}
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Phone Number</label>
              <input
                type="tel"
                className={styles.input}
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className={styles.rowGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Password</label>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className={styles.backHomeWrapper}>
            <Link href="/" className={styles.backHomeLink}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side: Branded Panel */}
      <div className={styles.imageSide}>
        <div className={styles.imageOverlay} />
        <div className={styles.imageContent}>
          <span className={styles.badge}>Premium Pet Care</span>
          <h2 className={styles.imageTitle}>
            Join <span className={styles.accent}>PetLux</span> Today
          </h2>
          <p className={styles.imageText}>
            Create your free account and give your pets the nutrition they deserve.
          </p>

          <ul className={styles.benefitList}>
            {benefits.map((item) => (
              <li key={item.title} className={styles.benefitItem}>
                <span className={styles.benefitIcon}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {item.icon}
                  </svg>
                </span>
                <div>
                  <h3 className={styles.benefitTitle}>{item.title}</h3>
                  <p className={styles.benefitText}>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


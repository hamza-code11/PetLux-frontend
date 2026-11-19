"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLogin } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast/ToastContext";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Eye icon state

  const { toast } = useToast(); // Toast hook
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Login successful! Welcome back.");
          // Redirect `useAuth.ts` ke `onSuccess` me handle ho raha hai
        },
        onError: (err: any) => {
          const message = err.response?.data?.message || "Invalid email or password.";
          toast.error(message);
        },
      }
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.logoWrapper}>
        <Link href="/">
          <Image src="/logo/logo.png" alt="PetLux Logo" width={120} height={40} priority />
        </Link>
      </div>

      <h1 className={styles.title}>Welcome Back</h1>
      <p className={styles.subtitle}>Sign in to your account</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address</label>
          <input
            type="email"
            className={styles.input}
            placeholder="admin@petlux.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field with Eye Icon */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={styles.formOptions}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <Link href="/forgot-password" className={styles.forgotLink}>
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className={styles.footerText}>
        Don't have an account?{" "}
        <Link href="/register" className={styles.footerLink}>Register</Link>
      </p>
    </div>
  );
}

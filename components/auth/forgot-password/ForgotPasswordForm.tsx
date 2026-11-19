"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./ForgotPasswordForm.module.css";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  const [email, setEmail] = useState("");
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]); // 6 boxes for OTP
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Step 1: Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      alert(`OTP sent to ${email} (Demo OTP: 123456)`);
      setStep(2);
      setIsLoading(false);
    }, 1000);
  };

  // OTP Input Logic
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Only numbers allowed
    
    const newOtp = [...otpArray];
    // Agar user ek sath multiple digits paste kare toh handle karein
    newOtp[index] = value.substring(value.length - 1); 
    setOtpArray(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace logic: agar box khali hai toh pichle box par jaye
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otpArray.join("");
    
    if (enteredOtp.length !== 6) {
      alert("Please enter all 6 digits.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (enteredOtp === "123456") {
        alert("OTP verified successfully!");
        setStep(3);
      } else {
        alert("Invalid OTP. Please try again (Hint: 123456)");
      }
      setIsLoading(false);
    }, 1000);
  };

  // Step 3: Reset Password
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      alert("Password reset successfully! Please login.");
      router.push("/login");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.card}>
      
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

      <h1 className={styles.title}>
        {step === 1 && "Forgot Password"}
        {step === 2 && "Enter OTP"}
        {step === 3 && "Reset Password"}
      </h1>
      <p className={styles.subtitle}>
        {step === 1 && "Enter your email to receive an OTP."}
        {step === 2 && `We sent a 6-digit code to ${email}`}
        {step === 3 && "Create a new password for your account."}
      </p>

      {/* Step 1: Email */}
      {step === 1 && (
        <form onSubmit={handleSendOtp} className={styles.form}>
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
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {/* Step 2: OTP Boxes */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className={styles.form}>
          <div className={styles.otpWrapper}>
            {otpArray.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => { otpRefs.current[index] = el; }}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className={styles.otpBox}
                autoFocus={index === 0}
              />
            ))}
          </div>
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <form onSubmit={handleResetPassword} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>New Password</label>
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
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}

      <div className={styles.backHomeWrapper}>
        <Link href="/login" className={styles.backHomeLink}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Login
        </Link>
      </div>
    </div>
  );
}


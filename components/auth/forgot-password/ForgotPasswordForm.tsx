"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForgotPassword, useVerifyOtp, useResetPassword } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast/ToastContext"; 
import styles from "./ForgotPasswordForm.module.css";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  
  // Eye icon states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast(); // Toast hook

  const forgotPasswordMutation = useForgotPassword();
  const verifyOtpMutation = useVerifyOtp();
  const resetPasswordMutation = useResetPassword();

  // Step 1: Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("OTP sent to your email address.");
          setStep(2);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to send OTP. Please try again.");
        },
      }
    );
  };

  // OTP Input Logic
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otpArray];
    newOtp[index] = value.substring(value.length - 1);
    setOtpArray(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otp = otpArray.join("");
    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits.");
      return;
    }

    verifyOtpMutation.mutate(
      { email, otp },
      {
        onSuccess: (data) => {
          setResetToken(data.reset_token);
          toast.success("OTP verified successfully!");
          setStep(3);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Invalid or expired OTP.");
        },
      }
    );
  };

  // Step 3: Reset Password
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    resetPasswordMutation.mutate(
      {
        email,
        reset_token: resetToken,
        password,
        password_confirmation: confirmPassword,
      },
      {
        onSuccess: () => {
          toast.success("Password reset successfully! Please login.");
          // Redirect `useAuth.ts` me handle ho raha hai (/login)
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to reset password.");
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
          <button type="submit" className={styles.submitBtn} disabled={forgotPasswordMutation.isPending}>
            {forgotPasswordMutation.isPending ? "Sending..." : "Send OTP"}
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
          <button type="submit" className={styles.submitBtn} disabled={verifyOtpMutation.isPending}>
            {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {/* Step 3: New Password with Eye Icons */}
      {step === 3 && (
        <form onSubmit={handleResetPassword} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>New Password</label>
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

          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={styles.input}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
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
          
          <button type="submit" className={styles.submitBtn} disabled={resetPasswordMutation.isPending}>
            {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
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

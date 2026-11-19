"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast/ToastContext";
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
  const router = useRouter(); // Router
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { toast } = useToast();
  const { mutate: register, isPending } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    register(
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password,
        password_confirmation: confirmPassword,
      },
      {
        onSuccess: () => {
          toast.success("Registration successful! Welcome to PetLux.");
          // Redirect yahan handle karein
          router.push('/'); 
          router.refresh();
        },
        onError: (err: any) => {
          // Sirf ek dafa error toast show karein
          const message = err.response?.data?.message || "Registration failed. Please try again.";
          
          // Agar Laravel validation error hai (e.g. email already taken)
          const errors = err.response?.data?.errors;
          if (errors) {
            const firstError = Object.values(errors)[0] as string[];
            if (firstError && firstError.length > 0) {
              toast.error(firstError[0]); // Specific error dikhayein
              return;
            }
          }
          
          // Agar specific error nahi mila toh general message dikhayein
          toast.error(message);
        },
      }
    );
  };

  
  return (
    <div className={styles.container}>
      {/* Left Side: Form */}
      <div className={styles.formSide}>
        <div className={styles.formWrapper}>
          <div className={styles.logoWrapper}>
            <Link href="/">
              <Image src="/logo/logo.png" alt="PetLux Logo" width={120} height={40} className={styles.logoImage} priority />
            </Link>
          </div>

          <h1 className={styles.title}>Create an Account</h1>
          <p className={styles.subtitle}>
            Already have an account?{" "}
            <Link href="/login" className={styles.link}>Sign In</Link>
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.rowGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
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

              {/* Confirm Password Field with Eye Icon */}
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
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
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

      {/* Right Side: Branded Panel (Same as before) */}
      <div className={styles.imageSide}>
        <div className={styles.imageOverlay} />
        <div className={styles.imageContent}>
          <span className={styles.badge}>Premium Pet Care</span>
          <h2 className={styles.imageTitle}>Join <span className={styles.accent}>PetLux</span> Today</h2>
          <p className={styles.imageText}>Create your free account and give your pets the nutrition they deserve.</p>

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
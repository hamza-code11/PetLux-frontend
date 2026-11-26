"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useCurrentUser } from "@/hooks/useAuth";
import CheckoutForm from "@/components/website/checkout/CheckoutForm";
import CheckoutSummary from "@/components/website/checkout/CheckoutSummary";
import CheckoutSkeleton from "@/components/website/checkout/CheckoutSkeleton";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const { cart, isMounted } = useCart();
  const router = useRouter();
  
  const { data: userData, isLoading: isUserLoading } = useCurrentUser();
  const user = userData?.user;

  // 👈 Check karein ke DOM me success flag hai ya nahi
  const isOrderSuccess = typeof document !== "undefined" && document.getElementById("order-success-flag");

  useEffect(() => {
    if (!isMounted) return;

    if (!isUserLoading && !user) {
      router.replace("/login?redirect=/checkout");
      return;
    }

    // 👈 Agar order success hai to redirect mat karein
    if (cart.length === 0 && !isOrderSuccess) {
      router.replace("/cart");
    }
  }, [isMounted, isUserLoading, user, cart.length, router, isOrderSuccess]);

  if (!isMounted || isUserLoading) {
    return <CheckoutSkeleton />;
  }

  if ((!user || cart.length === 0) && !isOrderSuccess) {
    return null; 
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.separator}>/</span>
            <Link href="/cart">Cart</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>Checkout</span>
          </nav>

          <div className={styles.titleRow}>
            <div className={styles.titleLeft}>
              <h1 className={styles.title}>Checkout</h1>
              <p className={styles.subtitle}>
                Complete your order in a few simple steps
              </p>
            </div>
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.formSection}>
            <CheckoutForm />
          </div>

          <div className={styles.summarySection}>
            <CheckoutSummary items={cart} />
          </div>
        </div>

      </div>
    </div>
  );
}
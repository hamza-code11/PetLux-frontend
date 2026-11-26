"use client";

import Link from "next/link";
import { use } from "react";
import styles from "./OrderConfirmation.module.css";

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        
        <h1 className={styles.title}>Order Confirmed!</h1>
        <p className={styles.subtitle}>
          Thank you for your purchase. Your order <strong>#{orderId}</strong> has been placed successfully.
        </p>
        
        <div className={styles.infoBox}>
          <p>Status: <strong className={styles.pending}>Pending</strong></p>
          <p>We will verify your payment and update the status shortly.</p>
        </div>

        <Link href="/shop" className={styles.primaryBtn}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

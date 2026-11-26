"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useGetShippingCharges } from "@/hooks/useSettings"; // 👈 Naya Hook Import
import { CartItem as CartItemType } from "@/types/cart";
import styles from "./CartSummary.module.css";

interface Props {
  items: CartItemType[];
}

export default function CartSummary({ items }: Props) {
  const { totalPrice } = useCart();
  
  // Backend se shipping charges fetch kar rahe hain
  const { data: shippingData, isLoading: isShippingLoading } = useGetShippingCharges();

  if (items.length === 0) return null;

  const subtotal = totalPrice; // Cart items ka total
  const shippingFee = shippingData?.data?.shipping_charges || 0; // Default 0 if not loaded
  
  // Grand Total = Subtotal + Shipping
  const grandTotal = subtotal + Number(shippingFee);

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Order Summary</h2>
      
      {/* Subtotal Row */}
      <div className={styles.row}>
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      {/* Shipping Row */}
      <div className={styles.row}>
        <span>Shipping</span>
        <span>
          {isShippingLoading ? (
            <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>Loading...</span>
          ) : (
            `$${Number(shippingFee).toFixed(2)}`
          )}
        </span>
      </div>
      
      <div className={styles.divider} />
      
      {/* Total Row */}
      <div className={`${styles.row} ${styles.totalRow}`}>
        <span>Total</span>
        <span>
          {isShippingLoading ? "..." : `$${grandTotal.toFixed(2)}`}
        </span>
      </div>

      <Link href="/checkout" className={styles.checkoutBtn}>
        Proceed to Checkout
      </Link>
      
      <p className={styles.note}>Secure checkout powered by Stripe</p>
    </div>
  );
}

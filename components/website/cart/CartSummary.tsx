"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { CartItem as CartItemType } from "@/types/cart";
import styles from "./CartSummary.module.css";

interface Props {
  items: CartItemType[];
}

export default function CartSummary({ items }: Props) {
  const { totalPrice } = useCart();

  if (items.length === 0) return null;

  const total = totalPrice; // Sirf total price, koi tax/shipping nahi

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Order Summary</h2>
      
      <div className={styles.row}>
        <span>Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </div>
      
      <div className={styles.divider} />
      
      <div className={`${styles.row} ${styles.totalRow}`}>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Link href="/checkout" className={styles.checkoutBtn}>
        Proceed to Checkout
      </Link>
      
      <p className={styles.note}>Secure checkout powered by Stripe</p>
    </div>
  );
}


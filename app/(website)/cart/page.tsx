"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import CartList from "@/components/website/cart/CartList";
import CartSummary from "@/components/website/cart/CartSummary";
import CartSkeleton from "@/components/website/skeleton/cartskeleton/CartSkeleton"; // Skeleton import
import styles from "./cart.module.css";

export default function CartPage() {
  const { cart, isMounted, removeItem, updateQuantity } = useCart();

  // Hydration fix: Skeleton dikhayein
  if (!isMounted) {
    return <CartSkeleton />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>Cart</span>
          </nav>

          <div className={styles.titleRow}>
            <div className={styles.titleLeft}>
              <h1 className={styles.title}>Shopping Cart</h1>
              <p className={styles.subtitle}>
                <span className={styles.count}>{cart.length}</span> {cart.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet.</p>
            <Link href="/shop" className={styles.primaryBtn}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.itemsSection}>
              <CartList 
                items={cart} 
                onRemoveItem={removeItem} 
                onUpdateQuantity={updateQuantity}
              />
            </div>

            <div className={styles.summarySection}>
              <CartSummary items={cart} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

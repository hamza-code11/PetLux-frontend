"use client";

import { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import CartList from "@/components/website/cart/CartList";
import CartSummary from "@/components/website/cart/CartSummary";
import styles from "./cart.module.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState(PRODUCTS.slice(0, 2));

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        {/* HEADER - Ab Wishlist jaisa boxed hai */}
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
                <span className={styles.count}>{cartItems.length}</span> {cartItems.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
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
                items={cartItems} 
                onRemoveItem={removeItem} 
                onUpdateQuantity={updateQuantity}
              />
            </div>

            <div className={styles.summarySection}>
              <CartSummary items={cartItems} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


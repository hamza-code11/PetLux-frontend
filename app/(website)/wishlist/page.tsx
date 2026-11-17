"use client";

import { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import WishlistHeader from "@/components/website/wishlist/WishlistHeader";
import WishlistList from "@/components/website/wishlist/WishlistList";
import styles from "./wishlist.module.css";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(PRODUCTS.slice(0, 4));

  const removeItem = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeAll = () => {
    setWishlistItems([]);
  };

  const moveAllToCart = () => {
    alert("All items moved to cart!");
  };

  return (
    <div className={styles.page}>
      {/* Sab kuch ek hi container ke andar */}
      <div className={styles.container}>
        
        <WishlistHeader 
          totalItems={wishlistItems.length} 
          onRemoveAll={removeAll} 
          onMoveAllToCart={moveAllToCart} 
        />

        {wishlistItems.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIconWrapper}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
            <p className={styles.emptyDesc}>Looks like you haven't added anything to your wishlist yet.</p>
            <Link href="/shop" className={styles.primaryBtn}>
              Explore Products
            </Link>
          </div>
        ) : (
          <WishlistList items={wishlistItems} onRemoveItem={removeItem} />
        )}

      </div>
    </div>
  );
}

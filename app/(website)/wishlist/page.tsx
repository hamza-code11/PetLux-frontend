"use client";

import Link from "next/link";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/Toast/ToastContext";
import WishlistHeader from "@/components/website/wishlist/WishlistHeader";
import WishlistList from "@/components/website/wishlist/WishlistList";
import WishlistSkeleton from "@/components/website/skeleton/wishlistskeleton/WishlistSkeleton"; // Skeleton import
import styles from "./wishlist.module.css";

export default function WishlistPage() {
  const { wishlist, isMounted, clearWishlist, toggle } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();

  const removeItem = (productId: number, variantId?: number) => {
    const itemToRemove = wishlist.find(
      (item) => item.product.id === productId && item.variant?.id === variantId
    );
    if (itemToRemove) {
      toggle(itemToRemove.product, itemToRemove.variant);
      toast.info("Removed from wishlist.");
    }
  };

  const removeAll = () => {
    clearWishlist();
    toast.success("Wishlist cleared!");
  };

  const moveAllToCart = () => {
    if (wishlist.length === 0) return;
    
    wishlist.forEach((item) => {
      addItem(item.product, 1, item.variant);
    });
    
    clearWishlist();
    toast.success("All items moved to cart!");
  };

  // FIX: Hydration fix ke liye Skeleton dikhayein
  if (!isMounted) {
    return <WishlistSkeleton />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        <WishlistHeader 
          totalItems={wishlist.length} 
          onRemoveAll={removeAll} 
          onMoveAllToCart={moveAllToCart} 
        />

        {wishlist.length === 0 ? (
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
          <WishlistList items={wishlist} onRemoveItem={removeItem} />
        )}

      </div>
    </div>
  );
}
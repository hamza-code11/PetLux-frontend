"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/components/ui/Toast/ToastContext";
import styles from "./ProductInfo.module.css";

interface Props {
  product: any;
  selectedVariant: any;
  onVariantChange: (variant: any) => void;
  currentPrice: string;
  currentOldPrice?: string;
}

export default function ProductInfo({ product, selectedVariant, onVariantChange, currentPrice, currentOldPrice }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggle, has, isMounted: isWishlistMounted } = useWishlist();
  const { toast } = useToast();

  const hasVariants = product.has_variants === 1 || product.has_variants === true;
  const inWishlist = isWishlistMounted && has(product.id, selectedVariant?.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant || undefined);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = () => {
    toggle(product, selectedVariant || undefined);
    if (inWishlist) {
      toast.info(`${product.name} removed from wishlist.`);
    } else {
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  // Category String: Pet Type / Category / Subcategory
  let categoryString = product.pet_type?.name || "";
  if (product.category?.name) categoryString += ` / ${product.category.name}`;
  if (product.subcategory?.name) categoryString += ` / ${product.subcategory.name}`;

  return (
    <div className={styles.info}>
      
      {/* 1. Top Row: Category & Wishlist */}
      <div className={styles.topRow}>
        <span className={styles.category}>{categoryString}</span>
        <button 
          className={styles.wishlistBtn} 
          onClick={handleToggleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg 
            width="20" height="20" viewBox="0 0 24 24" 
            fill={inWishlist ? "currentColor" : "none"} 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={inWishlist ? styles.wishlisted : ""}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      {/* 2. Product Name */}
      <h1 className={styles.title}>{product.name}</h1>

      {/* 3. Price & Reviews */}
      <div className={styles.priceRow}>
        <div className={styles.priceWrapper}>
          <span className={styles.price}>{currentPrice}</span>
          {currentOldPrice && <span className={styles.oldPrice}>{currentOldPrice}</span>}
        </div>
        <div className={styles.rating}>
          <span className={styles.stars}>★★★★★</span>
          <span className={styles.reviewCount}>(124 reviews)</span>
        </div>
      </div>

      <p className={styles.description}>{product.short_description || product.long_description || ""}</p>

      {/* 4. VARIANTS UI */}
      {hasVariants && product.variants && product.variants.length > 0 && (
        <div className={styles.variantsSection}>
          <span className={styles.variantLabel}>Select Variant:</span>
          <div className={styles.variantList}>
            {product.variants.map((v: any) => (
              <button
                key={v.id}
                className={`${styles.variantBtn} ${selectedVariant?.id === v.id ? styles.activeVariant : ""}`}
                onClick={() => onVariantChange(v)}
              >
                <span className={styles.variantName}>{v.name}</span>
                <span className={styles.variantPrice}>
                  ${v.sale_price || v.regular_price}
                </span>
                {/* Naya: Variant Description (agar mojood hai) */}
                {v.description && (
                  <span className={styles.variantDesc}>{v.description}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 5. Actions: Quantity & Add to Cart */}
      <div className={styles.actions}>
        <div className={styles.quantity}>
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button className={styles.addToCartBtn} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

    </div>
  );
}

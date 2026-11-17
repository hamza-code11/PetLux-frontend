"use client";

import { useState } from "react";
import { Product, ProductVariant } from "@/data/products";
import styles from "./ProductInfo.module.css";

interface Props {
  product: Product;
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant) => void;
  currentPrice: string;
  currentOldPrice?: string;
}

export default function ProductInfo({ product, selectedVariant, onVariantChange, currentPrice, currentOldPrice }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className={styles.info}>
      
      {/* 1. Top Row: Category & Wishlist */}
      <div className={styles.topRow}>
        <span className={styles.category}>{product.category}</span>
        <button 
          className={styles.wishlistBtn} 
          onClick={() => setIsWishlisted(!isWishlisted)}
          aria-label="Add to wishlist"
        >
          <svg 
            width="20" height="20" viewBox="0 0 24 24" 
            fill={isWishlisted ? "currentColor" : "none"} 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={isWishlisted ? styles.wishlisted : ""}
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
          <span className={styles.reviewCount}>({product.reviewsCount} reviews)</span>
        </div>
      </div>

      <p className={styles.description}>{product.description}</p>

      {/* 4. VARIANTS UI (Ab Name aur Price dono show honge) */}
      {product.variants && product.variants.length > 0 && (
        <div className={styles.variantsSection}>
          <span className={styles.variantLabel}>
            Select {product.variants[0].title}:
          </span>
          <div className={styles.variantList}>
            {product.variants.map((v) => (
              <button
                key={v.id}
                className={`${styles.variantBtn} ${selectedVariant?.id === v.id ? styles.activeVariant : ""}`}
                onClick={() => onVariantChange(v)}
              >
                <span className={styles.variantName}>{v.name}</span>
                <span className={styles.variantPrice}>{v.price}</span>
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
        <button className={styles.addToCartBtn}>Add to Cart</button>
      </div>

    </div>
  );
}


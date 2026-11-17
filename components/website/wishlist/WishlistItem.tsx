"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductVariant } from "@/data/products";
import styles from "./WishlistItem.module.css";

interface Props {
  product: Product;
  onRemove: () => void;
}

export default function WishlistItem({ product, onRemove }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants ? product.variants[0] : null
  );

  const currentPrice = selectedVariant ? selectedVariant.price : product.displayPrice;

  return (
    <div className={styles.row}>
      
      <div className={styles.colProduct}>
        <div className={styles.imageWrapper}>
          <Link href={`/shop/${product.slug}`}>
            <Image 
              src={selectedVariant ? selectedVariant.images[0] : product.displayImage} 
              alt={product.name} 
              fill 
              className={styles.image} 
            />
          </Link>
        </div>
        
        <div className={styles.productDetails}>
          <Link href={`/shop/${product.slug}`} className={styles.productName}>
            {product.name}
          </Link>
          <span className={styles.category}>{product.category}</span>
          
          {product.variants && product.variants.length > 0 && (
            <div className={styles.variantsWrapper}>
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  className={`${styles.variantBtn} ${selectedVariant?.id === v.id ? styles.activeVariant : ""}`}
                  onClick={() => setSelectedVariant(v)}
                >
                  {v.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.colPrice}>
        <span className={styles.price}>{currentPrice}</span>
      </div>

      <div className={styles.colAction}>
        <button className={styles.cartBtn}>
          Add to Cart
        </button>
        <button 
          className={styles.removeBtn} 
          onClick={onRemove}
          aria-label="Remove from wishlist"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

    </div>
  );
}


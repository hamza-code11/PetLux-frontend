"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductVariant } from "@/data/products";
import styles from "./CartItem.module.css";

interface Props {
  product: Product;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
}

export default function CartItem({ product, onRemove, onUpdateQuantity }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants ? product.variants[0] : null
  );

  const currentPrice = selectedVariant ? selectedVariant.price : product.displayPrice;

  const handleQuantityChange = (newQty: number) => {
    if (newQty < 1) return;
    setQuantity(newQty);
    onUpdateQuantity(newQty);
  };

  return (
    <div className={styles.item}>
      
      {/* Image */}
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

      {/* Details */}
      <div className={styles.details}>
        
        {/* Category (Upar shift ki) */}
        <span className={styles.category}>{product.category}</span>

        <div className={styles.topRow}>
          <Link href={`/shop/${product.slug}`} className={styles.name}>
            {product.name}
          </Link>
          <button className={styles.removeBtn} onClick={onRemove} aria-label="Remove item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
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

        <div className={styles.bottomRow}>
          {/* Quantity Selector */}
          <div className={styles.quantity}>
            <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
          </div>

          {/* Price */}
          <div className={styles.priceWrapper}>
            <span className={styles.price}>{currentPrice}</span>
            <span className={styles.itemTotal}>
              Total: {currentPrice}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

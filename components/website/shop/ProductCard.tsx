"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";

export interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className={styles.cardWrapper}>
      <Link href={`/shop/product/${product.id}`} className={styles.productCard}>
        <div className={styles.imageWrapper}>
          <Image src={product.image} alt={product.name} fill sizes="25vw" className={styles.productImage} />
          
          {/* Hover Actions Menu */}
          <div className={styles.actionsMenu}>
            {/* Add to Cart */}
            <button 
              type="button" 
              className={styles.actionBtn} 
              aria-label="Add to cart" 
              onClick={(e) => {
                e.preventDefault();
                console.log("Add to cart clicked");
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>

            {/* Quick View */}
            <button 
              type="button" 
              className={styles.actionBtn} 
              aria-label="Quick view" 
              onClick={(e) => {
                e.preventDefault();
                console.log("Quick view clicked");
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>

            {/* Wishlist */}
            <button 
              type="button" 
              className={styles.actionBtn} 
              aria-label="Add to wishlist" 
              onClick={(e) => {
                e.preventDefault();
                console.log("Wishlist clicked");
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name}</h3>
          <div className={styles.price}>
            {product.price} {product.oldPrice && <span className={styles.oldPrice}>{product.oldPrice}</span>}
          </div>
        </div>
      </Link>
    </div>
  );
}

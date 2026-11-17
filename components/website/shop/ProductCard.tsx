"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className={styles.cardWrapper}>
      {/* Link mein slug use kiya taaki details page khule */}
      <Link href={`/shop/${product.slug}`} className={styles.productCard}>
        <div className={styles.imageWrapper}>
          <Image 
            src={product.displayImage} 
            alt={product.name} 
            fill 
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" 
            className={styles.productImage} 
          />
          
          <div className={styles.actionsMenu}>
            <button 
              type="button" 
              className={styles.actionBtn} 
              aria-label="Add to cart" 
              onClick={(e) => {
                e.preventDefault(); // Link open hone se roke
                console.log("Add to cart:", product.name);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </button>

            <button 
              type="button" 
              className={styles.actionBtn} 
              aria-label="Quick view" 
              onClick={(e) => {
                e.preventDefault();
                console.log("Quick view:", product.name);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>

            <button 
              type="button" 
              className={styles.actionBtn} 
              aria-label="Add to wishlist" 
              onClick={(e) => {
                e.preventDefault();
                console.log("Wishlist:", product.name);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
        </div>
        
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name}</h3>
          <div className={styles.price}>
            {product.displayPrice} 
            {product.displayOldPrice && <span className={styles.oldPrice}>{product.displayOldPrice}</span>}
          </div>
        </div>
      </Link>
    </div>
  );
}
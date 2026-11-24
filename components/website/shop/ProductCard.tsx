"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { getImageUrl, isLocalImage } from "@/lib/imageUrl";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/components/ui/Toast/ToastContext";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: any }) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hooks
  const { addItem } = useCart();
  const { toggle, has, isMounted: isWishlistMounted } = useWishlist();
  const { toast } = useToast();

  const hasVariants = product.has_variants === 1 || product.has_variants === true;

  // Default variant select karein
  useEffect(() => {
    if (hasVariants && product.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product, hasVariants]);

  // Bahar click par dropdown band karein
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Price Logic ---
  let displayPrice = "";
  let displayOldPrice = "";

  if (hasVariants && selectedVariant) {
    displayPrice = `$${selectedVariant.sale_price || selectedVariant.regular_price}`;
    if (selectedVariant.sale_price && selectedVariant.regular_price) {
      displayOldPrice = `$${selectedVariant.regular_price}`;
    }
  } else {
    displayPrice = `$${product.sale_price || product.regular_price}`;
    if (product.sale_price && product.regular_price) {
      displayOldPrice = `$${product.regular_price}`;
    }
  }

  // --- Image Logic ---
  let imageUrl = "/placeholder.jpeg";
  let imageFound = false;

  if (hasVariants && selectedVariant && selectedVariant.images?.length > 0) {
    const imgPath = selectedVariant.images[0].image_path || selectedVariant.images[0].image_url;
    if (imgPath) {
      imageUrl = getImageUrl(imgPath);
      imageFound = true;
    }
  }

  if (!imageFound && product.images?.length > 0) {
    const imgPath = product.images[0].image_path || product.images[0].image_url;
    if (imgPath) {
      imageUrl = getImageUrl(imgPath);
      imageFound = true;
    }
  }

  // --- Title Logic ---
  const displayName = hasVariants && selectedVariant 
    ? `${product.name} - ${selectedVariant.name}` 
    : product.name;

  // --- Cart & Wishlist Handlers ---
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product, 1, selectedVariant || undefined);
    toast.success(`${displayName} added to cart!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggle(product, selectedVariant || undefined);
    
    const isInWishlist = has(product.id, selectedVariant?.id);
    if (isInWishlist) {
      toast.info(`${displayName} removed from wishlist.`);
    } else {
      toast.success(`${displayName} added to wishlist!`);
    }
  };

  const inWishlist = isWishlistMounted && has(product.id, selectedVariant?.id);

  return (
    <div className={styles.cardWrapper}>
      
      {/* Variant Dropdown */}
      {hasVariants && product.variants?.length > 0 && (
        <div className={styles.variantDropdownWrapper} ref={dropdownRef}>
          <button 
            type="button"
            className={styles.variantToggleBtn}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Select Variant"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className={styles.variantDropdownMenu}>
              {product.variants.map((variant: any) => (
                <button
                  key={variant.id}
                  type="button"
                  className={`${styles.variantItem} ${selectedVariant?.id === variant.id ? styles.variantItemActive : ""}`}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setIsDropdownOpen(false);
                  }}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Card */}
      <Link href={`/product/${product.slug}`} className={styles.productCard}>
        <div className={styles.imageWrapper}>
          <Image 
            src={imageUrl} 
            alt={displayName} 
            fill 
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" 
            className={styles.productImage}
            unoptimized={isLocalImage(imageUrl)}
          />
          
          <div className={styles.actionsMenu}>
            {/* Add to Cart Button */}
            <button 
              type="button" 
              className={styles.actionBtn} 
              aria-label="Add to cart" 
              title="Add to Cart"
              onClick={handleAddToCart}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </button>

            {/* Add to Wishlist Button */}
            <button 
              type="button" 
              className={`${styles.actionBtn} ${inWishlist ? styles.activeWishlist : ""}`}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"} 
              title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              onClick={handleToggleWishlist}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill={inWishlist ? "currentColor" : "none"} 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{displayName}</h3>
          <div className={styles.price}>
            {displayPrice} 
            {displayOldPrice && <span className={styles.oldPrice}>{displayOldPrice}</span>}
          </div>
        </div>
      </Link>
    </div>
  );
}

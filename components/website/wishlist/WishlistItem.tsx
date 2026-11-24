"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl, isLocalImage } from "@/lib/imageUrl";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { WishlistItem as WishlistItemType } from "@/types/cart";
import styles from "./WishlistItem.module.css";

interface Props {
  item: WishlistItemType;
  onRemove: () => void;
}

export default function WishlistItem({ item, onRemove }: Props) {
  const { product, variant: initialVariant } = item;
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);

  const { addItem } = useCart();
  const { changeVariant } = useWishlist(); // Naya function use karein
  const { toast } = useToast();

  // Parent se variant change hone par state sync karein
  useEffect(() => {
    setSelectedVariant(initialVariant);
  }, [initialVariant]);

  // --- Price Calculation ---
  let currentPrice = 0;
  if (selectedVariant) {
    currentPrice = Number(selectedVariant.sale_price || selectedVariant.regular_price);
  } else {
    currentPrice = Number(product.sale_price || product.regular_price || 0);
  }

  // --- Image Calculation ---
  let imageUrl = "/placeholder.jpeg";
  let imageFound = false;

  if (selectedVariant && selectedVariant.images?.length > 0) {
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
    }
  }

  // --- Handlers ---
  const handleVariantChange = (newVariant: any) => {
    if (newVariant.id === selectedVariant?.id) return;

    // FIX: changeVariant use karein taaki position preserve rahe
    changeVariant(product.id, selectedVariant?.id, newVariant);
    setSelectedVariant(newVariant);
    toast.success("Variant updated in wishlist!");
  };

  const handleAddToCart = () => {
    addItem(product, 1, selectedVariant || undefined);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className={styles.row}>
      
      <div className={styles.colProduct}>
        <div className={styles.imageWrapper}>
          <Link href={`/product/${product.slug}`}>
            <Image 
              src={imageUrl} 
              alt={product.name} 
              fill 
              className={styles.image} 
              unoptimized={isLocalImage(imageUrl)}
            />
          </Link>
        </div>
        
        <div className={styles.productDetails}>
          <Link href={`/product/${product.slug}`} className={styles.productName}>
            {product.name}
          </Link>
          <span className={styles.category}>
            {product.pet_type?.name} / {product.category?.name}
          </span>
          
          {product.has_variants && product.variants && product.variants.length > 0 && (
            <div className={styles.variantsWrapper}>
              {product.variants.map((v: any) => (
                <button
                  key={v.id}
                  className={`${styles.variantBtn} ${selectedVariant?.id === v.id ? styles.activeVariant : ""}`}
                  onClick={() => handleVariantChange(v)}
                >
                  {v.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.colPrice}>
        <span className={styles.price}>${currentPrice.toFixed(2)}</span>
      </div>

      <div className={styles.colAction}>
        <button className={styles.cartBtn} onClick={handleAddToCart}>
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


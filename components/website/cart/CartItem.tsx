"use client";

import Image from "next/image";
import Link from "next/link";
import { getImageUrl, isLocalImage } from "@/lib/imageUrl";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { CartItem as CartItemType } from "@/types/cart";
import styles from "./CartItem.module.css";

interface Props {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
}

export default function CartItem({ item, onRemove, onUpdateQuantity }: Props) {
  const { product, variant, quantity } = item;
  const { changeVariant } = useCart(); // Naya function
  const { toast } = useToast();

  // --- Price Calculation ---
  let currentPrice = 0;
  if (variant) {
    currentPrice = Number(variant.sale_price || variant.regular_price);
  } else {
    currentPrice = Number(product.sale_price || product.regular_price || 0);
  }

  // --- Image Calculation ---
  let imageUrl = "/placeholder.jpeg";
  let imageFound = false;

  if (variant && variant.images?.length > 0) {
    const imgPath = variant.images[0].image_path || variant.images[0].image_url;
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

  const handleQuantityChange = (newQty: number) => {
    if (newQty < 1) return;
    onUpdateQuantity(newQty);
  };

  const handleVariantChange = (newVariant: any) => {
    if (newVariant.id === variant?.id) return;
    
    // FIX: changeVariant use karein taaki position preserve rahe
    changeVariant(product.id, variant?.id, newVariant);
    toast.success("Variant updated in cart!");
  };

  return (
    <div className={styles.item}>
      
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

      <div className={styles.details}>
        
        <span className={styles.category}>
          {product.petType?.name} / {product.category?.name}
        </span>

        <div className={styles.topRow}>
          <Link href={`/product/${product.slug}`} className={styles.name}>
            {product.name}
          </Link>
          <button className={styles.removeBtn} onClick={onRemove} aria-label="Remove item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {product.has_variants && product.variants && product.variants.length > 0 && (
          <div className={styles.variantsWrapper}>
            {product.variants.map((v: any) => (
              <button
                key={v.id}
                className={`${styles.variantBtn} ${variant?.id === v.id ? styles.activeVariant : ""}`}
                onClick={() => handleVariantChange(v)}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}

        <div className={styles.bottomRow}>
          <div className={styles.quantity}>
            <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
          </div>

          <div className={styles.priceWrapper}>
            <span className={styles.price}>${currentPrice.toFixed(2)}</span>
            <span className={styles.itemTotal}>
              Total: ${(currentPrice * quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { getImageUrl, isLocalImage } from "@/lib/imageUrl";
import { useCart } from "@/hooks/useCart";
import { useGetShippingCharges } from "@/hooks/useSettings"; // 👈 Import kiya
import { CartItem as CartItemType } from "@/types/cart";
import styles from "./CheckoutSummary.module.css";

interface Props {
  items: CartItemType[];
}

export default function CheckoutSummary({ items }: Props) {
  const { totalPrice } = useCart();
  
  // 👈 Shipping charges fetch kar rahe hain
  const { data: shippingData, isLoading: isShippingLoading } = useGetShippingCharges();

  if (items.length === 0) return null;

  // Shipping Fee nikal rahe hain (default 0)
  const shippingFee = Number(shippingData?.data?.shipping_charges || 0);
  
  // Grand Total = Subtotal + Shipping
  const grandTotal = totalPrice + shippingFee;

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Order Summary</h2>

      {/* Items list */}
      <div className={styles.itemsList}>
        {items.map((item) => {
          const { product, variant, quantity } = item;

          const price = variant
            ? Number(variant.sale_price || variant.regular_price)
            : Number(product.sale_price || product.regular_price || 0);

          let imageUrl = "/placeholder.jpeg";
          if (variant && variant.images?.length > 0) {
            const p = variant.images[0].image_path || variant.images[0].image_url;
            if (p) imageUrl = getImageUrl(p);
          } else if (product.images?.length > 0) {
            const p = product.images[0].image_path || product.images[0].image_url;
            if (p) imageUrl = getImageUrl(p);
          }

          return (
            <div
              key={`${product.id}-${variant?.id || "no-variant"}`}
              className={styles.item}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className={styles.image}
                  unoptimized={isLocalImage(imageUrl)}
                />
                <span className={styles.qtyBadge}>{quantity}</span>
              </div>

              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{product.name}</span>
                {variant && (
                  <span className={styles.itemVariant}>{variant.name}</span>
                )}
              </div>

              <span className={styles.itemPrice}>
                ${(price * quantity).toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>

      <div className={styles.divider} />

      {/* Totals */}
      <div className={styles.row}>
        <span>Subtotal</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      {/* 👈 Dynamic Shipping Row */}
      <div className={styles.row}>
        <span>Shipping</span>
        <span>
          {isShippingLoading ? (
            <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>Loading...</span>
          ) : (
            `$${shippingFee.toFixed(2)}`
          )}
        </span>
      </div>

      <div className={styles.divider} />

      {/* 👈 Total Row (Subtotal + Shipping) */}
      <div className={`${styles.row} ${styles.totalRow}`}>
        <span>Total</span>
        <span>
          {isShippingLoading ? "..." : `$${grandTotal.toFixed(2)}`}
        </span>
      </div>

      <Link href="/cart" className={styles.editCartLink}>
        ← Edit Cart
      </Link>
    </div>
  );
}

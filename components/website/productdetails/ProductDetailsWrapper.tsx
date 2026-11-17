"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import styles from "./ProductDetailsWrapper.module.css";

export default function ProductDetailsWrapper({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants ? product.variants[0] : null
  );

  // Agar variant hai toh uski saari images, warna product ki normal images
  const currentImages = selectedVariant 
    ? selectedVariant.images 
    : product.images || [product.displayImage];

  const currentPrice = selectedVariant ? selectedVariant.price : product.displayPrice;
  const currentOldPrice = selectedVariant ? selectedVariant.oldPrice : product.displayOldPrice;

  return (
    <div className={styles.wrapper}>
      {/* ProductGallery ko ab array of images mil rahi hai (3 per variant) */}
      <ProductGallery images={currentImages} name={product.name} />

      <ProductInfo 
        product={product} 
        selectedVariant={selectedVariant}
        onVariantChange={setSelectedVariant}
        currentPrice={currentPrice}
        currentOldPrice={currentOldPrice}
      />
    </div>
  );
}


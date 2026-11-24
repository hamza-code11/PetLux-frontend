"use client";

import { useState, useEffect } from "react";
import { useGetShopProduct } from "@/hooks/useShop";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import { getImageUrl } from "@/lib/imageUrl";
import ProductDetailsSkeleton from "@/components/website/skeleton/productdetailsskeleton/ProductDetailsSkeleton";
import styles from "./ProductDetailsWrapper.module.css";

export default function ProductDetailsWrapper({ slug }: { slug: string }) {
  const { data, isLoading } = useGetShopProduct(slug);
  const product = data?.data;

  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  // Jab product load ho jaye, toh pehla variant select karein (agar hai)
  useEffect(() => {
    if (product?.has_variants && product.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [product]);

  if (isLoading) return <ProductDetailsSkeleton />;
  if (!product) return <div>Product not found.</div>;

  // --- Image Logic ---
  let images: string[] = [];
  if (selectedVariant && selectedVariant.images?.length > 0) {
    images = selectedVariant.images.map((img: any) => getImageUrl(img.image_path || img.image_url));
  } else if (product.images?.length > 0) {
    images = product.images.map((img: any) => getImageUrl(img.image_path || img.image_url));
  } else {
    images = ["/placeholder.jpeg"];
  }

  // --- Price Logic ---
  const currentPrice = selectedVariant 
    ? `$${selectedVariant.sale_price || selectedVariant.regular_price}` 
    : `$${product.sale_price || product.regular_price}`;
  
  const currentOldPrice = selectedVariant 
    ? (selectedVariant.sale_price ? `$${selectedVariant.regular_price}` : undefined)
    : (product.sale_price ? `$${product.regular_price}` : undefined);

  return (
    <div className={styles.wrapper}>
      <ProductGallery images={images} name={product.name} />

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


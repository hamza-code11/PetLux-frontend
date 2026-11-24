'use client';

import { useEffect, useState } from 'react';
import { ShopProduct, ShopProductVariant } from '@/types/shop';
import { WishlistItem } from '@/types/cart';
import {
  getWishlist,
  toggleWishlist as toggleWishlistUtil,
  clearWishlist as clearWishlistUtil,
  updateWishlistVariant, // Naya import
} from '@/utils/cart';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setWishlist(getWishlist());

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<WishlistItem[]>).detail;
      setWishlist(detail);
    };
    window.addEventListener('wishlist:updated', handler);
    return () => window.removeEventListener('wishlist:updated', handler);
  }, []);

  const toggle = (
    product: ShopProduct,
    variant?: ShopProductVariant
  ) => {
    const next = toggleWishlistUtil(product, variant);
    setWishlist(next);
  };

  const clearWishlist = () => {
    clearWishlistUtil();
    setWishlist([]);
  };

  const has = (productId: number, variantId?: number) =>
    wishlist.some(
      (item) =>
        item.product.id === productId &&
        item.variant?.id === variantId
    );

  // Naya function: Variant change (position preserve)
  const changeVariant = (
    productId: number,
    oldVariantId: number | undefined,
    newVariant: ShopProductVariant
  ) => {
    const next = updateWishlistVariant(productId, oldVariantId, newVariant);
    setWishlist(next);
  };

  return { wishlist, isMounted, toggle, has, clearWishlist, changeVariant };
}


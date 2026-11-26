'use client';

import { useEffect, useState } from 'react';
import { ShopProduct, ShopProductVariant } from '@/types/shop';
import { CartItem } from '@/types/cart';
import {
  addToCart as addToCartUtil,
  getCart,
  removeFromCart as removeFromCartUtil,
  updateCartQuantity,
  updateCartVariant,
} from '@/utils/cart';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setCart(getCart() || []);

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<CartItem[]>).detail;
      setCart(detail || []); // 👈 Fallback lagaya
    };
    window.addEventListener('cart:updated', handler);
    return () => window.removeEventListener('cart:updated', handler);
  }, []);

  const addItem = (
    product: ShopProduct,
    quantity: number = 1,
    variant?: ShopProductVariant
  ) => {
    const next = addToCartUtil(product, quantity, variant);
    setCart(next);
  };

  const removeItem = (productId: number, variantId?: number) => {
    const next = removeFromCartUtil(productId, variantId);
    setCart(next);
  };

  const updateQuantity = (
    productId: number,
    quantity: number,
    variantId?: number
  ) => {
    const next = updateCartQuantity(productId, quantity, variantId);
    setCart(next);
  };

  const changeVariant = (
    productId: number,
    oldVariantId: number | undefined,
    newVariant: ShopProductVariant
  ) => {
    const next = updateCartVariant(productId, oldVariantId, newVariant);
    setCart(next);
  };

  // 👈 Safety: Agar cart undefined ho to empty array use karein
  const safeCart = cart || []; 

  const totalItems = safeCart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = safeCart.reduce((sum, item) => {
    let price = 0;
    if (item.variant) {
      price = Number(item.variant.sale_price || item.variant.regular_price);
    } else {
      price = Number(item.product.sale_price || item.product.regular_price || 0);
    }
    return sum + price * item.quantity;
  }, 0);

  return {
    cart: safeCart,
    isMounted,
    addItem,
    removeItem,
    updateQuantity,
    changeVariant,
    totalItems,
    totalPrice,
  };
}

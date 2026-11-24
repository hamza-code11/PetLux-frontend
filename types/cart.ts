import { ShopProduct, ShopProductVariant } from './shop';

export interface CartItem {
  product: ShopProduct;
  variant?: ShopProductVariant; // Agar variant selected hai
  quantity: number;
}

export interface WishlistItem {
  product: ShopProduct;
  variant?: ShopProductVariant;
}


"use client";

import { CartItem as CartItemType } from "@/types/cart";
import CartItem from "./CartItem";
import styles from "./CartList.module.css";

interface Props {
  items: CartItemType[];
  onRemoveItem: (productId: number, variantId?: number) => void;
  onUpdateQuantity: (productId: number, quantity: number, variantId?: number) => void;
}

export default function CartList({ items, onRemoveItem, onUpdateQuantity }: Props) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <CartItem 
          key={`${item.product.id}-${item.variant?.id || 'no-variant'}`} 
          item={item}
          onRemove={() => onRemoveItem(item.product.id, item.variant?.id)}
          onUpdateQuantity={(qty) => onUpdateQuantity(item.product.id, qty, item.variant?.id)}
        />
      ))}
    </div>
  );
}


"use client";

import { WishlistItem as WishlistItemType } from "@/types/cart";
import WishlistItem from "./WishlistItem";
import styles from "./WishlistList.module.css";

interface Props {
  items: WishlistItemType[];
  onRemoveItem: (productId: number, variantId?: number) => void;
}

export default function WishlistList({ items, onRemoveItem }: Props) {
  return (
    <div className={styles.listWrapper}>
      {items.map((item) => (
        <WishlistItem 
          key={`${item.product.id}-${item.variant?.id || 'no-variant'}`} 
          item={item} 
          onRemove={() => onRemoveItem(item.product.id, item.variant?.id)} 
        />
      ))}
    </div>
  );
}


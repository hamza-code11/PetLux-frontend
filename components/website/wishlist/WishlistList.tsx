import { Product } from "@/data/products";
import WishlistItem from "./WishlistItem";
import styles from "./WishlistList.module.css";

interface Props {
  items: Product[];
  onRemoveItem: (id: number) => void;
}

export default function WishlistList({ items, onRemoveItem }: Props) {
  return (
    <div className={styles.listWrapper}>
      {items.map((item) => (
        <WishlistItem 
          key={item.id} 
          product={item} 
          onRemove={() => onRemoveItem(item.id)} 
        />
      ))}
    </div>
  );
}


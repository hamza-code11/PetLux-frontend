import { Product } from "@/data/products";
import CartItem from "./CartItem";
import styles from "./CartList.module.css";

interface Props {
  items: Product[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
}

export default function CartList({ items, onRemoveItem, onUpdateQuantity }: Props) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <CartItem 
          key={item.id} 
          product={item} 
          onRemove={() => onRemoveItem(item.id)}
          onUpdateQuantity={(qty) => onUpdateQuantity(item.id, qty)}
        />
      ))}
    </div>
  );
}


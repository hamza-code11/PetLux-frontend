import { PRODUCTS } from "@/data/products"; // <-- Asli data yahan se aayega
import ProductCard from "../shop/ProductCard";
import styles from "./RelatedProducts.module.css";

export default function RelatedProducts() {
  // Yahan humne PRODUCTS array se pehle 4 products utha liye hain (aap filter laga kar bhi kar sakte hain)
  const relatedProducts = PRODUCTS.slice(1, 5);

  return (
    <div className={styles.relatedSection}>
      <h2 className={styles.title}>You May Also Like</h2>
      <div className={styles.grid}>
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

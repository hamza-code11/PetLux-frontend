import Link from "next/link";
import { Product } from "@/data/products";
import styles from "./CartSummary.module.css";

export default function CartSummary({ items }: { items: Product[] }) {
  // Dummy Calculations (Aap real logic laga sakte hain)
  const subtotal = 120.00;
  const shipping = 10.00;
  const tax = 8.00;
  const total = subtotal + shipping + tax;

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Order Summary</h2>
      
      <div className={styles.row}>
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className={styles.row}>
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className={styles.row}>
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      
      <div className={styles.divider} />
      
      <div className={`${styles.row} ${styles.totalRow}`}>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Link href="/checkout" className={styles.checkoutBtn}>
        Proceed to Checkout
      </Link>
      
      <p className={styles.note}>Secure checkout powered by Stripe</p>
    </div>
  );
}


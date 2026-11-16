import ShopHeader from "@/components/website/shop/ShopHeader";
import ShopSidebar from "@/components/website/shop/ShopSidebar";
import ShopProductGrid from "@/components/website/shop/ShopProductGrid";
import styles from "./shop.module.css";

export default function ShopPage() {
  return (
    <div className={styles.page}>
      <ShopHeader />
      
      <div className={styles.layout}>
        <ShopSidebar />
        <main className={styles.main}>
          <ShopProductGrid />
        </main>
      </div>
    </div>
  );
}

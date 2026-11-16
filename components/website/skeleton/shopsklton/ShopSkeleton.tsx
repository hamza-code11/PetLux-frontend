import HeaderSkeleton from "./HeaderSkeleton";
import SidebarSkeleton from "./SidebarSkeleton";
import GridSkeleton from "./GridSkeleton";
import styles from "./ShopSkeleton.module.css";

export default function ShopSkeleton() {
  return (
    <div className={styles.page}>
      <HeaderSkeleton />
      
      <div className={styles.layout}>
        <SidebarSkeleton />
        <main className={styles.main}>
          <GridSkeleton />
        </main>
      </div>
    </div>
  );
}

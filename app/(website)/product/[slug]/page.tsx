import ProductDetailsWrapper from "@/components/website/productdetails/ProductDetailsWrapper";
import ProductTabsAndRelated from "@/components/website/productdetails/ProductTabsAndRelated";
import styles from "./product.module.css";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Wrapper ab slug leta hai aur khud data fetch karta hai */}
        <ProductDetailsWrapper slug={slug} />

        {/* Tabs aur RelatedProducts ko product ki zaroorat hai, 
            toh wrapper ke andar hi rakhenge ya alag se fetch karenge */}
        <ProductTabsAndRelated slug={slug} />
      </div>
    </div>
  );
}




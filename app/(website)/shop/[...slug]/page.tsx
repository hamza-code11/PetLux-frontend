import ShopHeader from "@/components/website/shop/ShopHeader";
import ShopSidebar from "@/components/website/shop/ShopSidebar";
import ShopProductGrid from "@/components/website/shop/ShopProductGrid";
import styles from "../shop.module.css";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const title = slug.length > 0 
    ? slug.map(s => s.replace(/-/g, ' ')).join(' / ') 
    : "Shop All Products";
  
  return {
    title: `${title} | PetLux`,
    description: `Browse ${title} products at PetLux.`,
  };
}

export default async function ShopCatchAllPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  
  const petTypeSlug = slug[0] || "";
  const categorySlug = slug[1] || "";
  const subcategorySlug = slug[2] || "";

  return (
    <div className={styles.page}>
      <ShopHeader 
        petTypeSlug={petTypeSlug} 
        categorySlug={categorySlug} 
        subcategorySlug={subcategorySlug} 
      />
      
      <div className={styles.layout}>
        <ShopSidebar 
          petTypeSlug={petTypeSlug} 
          categorySlug={categorySlug} 
          subcategorySlug={subcategorySlug} 
        />
        <main className={styles.main}>
          <ShopProductGrid 
            petTypeSlug={petTypeSlug} 
            categorySlug={categorySlug} 
            subcategorySlug={subcategorySlug} 
          />
        </main>
      </div>
    </div>
  );
}
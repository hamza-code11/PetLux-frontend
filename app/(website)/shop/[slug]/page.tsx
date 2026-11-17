import { PRODUCTS } from "@/data/products";
import ProductDetailsWrapper from "@/components/website/productdetails/ProductDetailsWrapper";
import ProductTabs from "@/components/website/productdetails/ProductTabs";
import RelatedProducts from "@/components/website/productdetails/RelatedProducts";
import styles from "./product.module.css";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Yahan params ko await kiya gaya hai (Next.js 15+ ke liye zaroori hai)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Debugging: Ab yeh sahi slug dikhayega
  console.log("URL Slug:", slug);

  // Data file se product find karein
  const product = PRODUCTS.find((p) => p.slug === slug);

  // Agar product nahi mila toh 404 page show karein
  if (!product) {
    return notFound(); 
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        {/* Top Section: Client Component jo Gallery & Info ko jodta hai */}
        <ProductDetailsWrapper product={product} />

        {/* Middle Section: Description & Reviews */}
        <ProductTabs description={product.description} features={product.features} />

        {/* Bottom Section: Related Products */}
        <RelatedProducts />
        
      </div>
    </div>
  );
}


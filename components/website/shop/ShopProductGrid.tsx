"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useGetShopProducts } from "@/hooks/useShop";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import ProductCardSkeleton from "@/components/website/skeleton/shopsklton/ProductCardSkeleton";
import styles from "./ShopProductGrid.module.css";

interface Props {
  petTypeSlug?: string;
  categorySlug?: string;
  subcategorySlug?: string;
}

export default function ShopProductGrid({ petTypeSlug, categorySlug, subcategorySlug }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentPage = Number(searchParams.get("page")) || 1;

  const filters: any = {
    page: currentPage,
    per_page: 16,
    pet_type_slug: petTypeSlug,
    category_slug: categorySlug,
    subcategory_slug: subcategorySlug,
  };
  
  searchParams.forEach((value, key) => {
    if (key !== "page" && key !== "per_page") {
      filters[key] = value;
    }
  });

  const { data, isLoading } = useGetShopProducts(filters);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // FIX: Loading ke waqt 16 ProductCardSkeleton dikhayein
  if (isLoading) {
    return (
      <div className={styles.grid}>
        {[...Array(16)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return <div className={styles.empty}>No products found in this category.</div>;
  }

  return (
    <>
      <div className={styles.grid}>
        {data.data.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination 
        currentPage={data.current_page} 
        totalPages={data.last_page} 
        onPageChange={handlePageChange} 
      />
    </>
  );
}


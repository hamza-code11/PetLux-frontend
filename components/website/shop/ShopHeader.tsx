"use client";

import { useSearchParams } from "next/navigation";
import { useGetShopProducts } from "@/hooks/useShop";
import styles from "./ShopHeader.module.css";

interface Props {
  petTypeSlug?: string;
  categorySlug?: string;
  subcategorySlug?: string;
}

export default function ShopHeader({ petTypeSlug, categorySlug, subcategorySlug }: Props) {
  const searchParams = useSearchParams();
  
  const filters: any = {
    pet_type_slug: petTypeSlug,
    category_slug: categorySlug,
    subcategory_slug: subcategorySlug,
  };
  
  searchParams.forEach((value, key) => {
    filters[key] = value;
  });

  const { data, isLoading } = useGetShopProducts(filters);

  // Dynamic title
  let title = "Shop All Products";
  if (subcategorySlug) title = subcategorySlug.replace(/-/g, ' ');
  else if (categorySlug) title = categorySlug.replace(/-/g, ' ');
  else if (petTypeSlug) title = petTypeSlug.replace(/-/g, ' ');

  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title} style={{textTransform: 'capitalize'}}>{title}</h1>
        <p className={styles.subtitle}>
          {isLoading 
            ? "Loading products..." 
            : `Showing ${data?.from || 0}–${data?.to || 0} of ${data?.total || 0} results`
          }
        </p>
      </div>
    </div>
  );
}
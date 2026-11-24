"use client";

import { useGetShopProducts } from "@/hooks/useShop";
import ProductCard from "../shop/ProductCard";
import styles from "./RelatedProducts.module.css";
import type { ShopProduct } from "@/types/shop";

interface Props {
  currentProductId: number;
  subcategorySlug?: string | null;
  categorySlug?: string | null;
  petTypeSlug?: string | null;
}

export default function RelatedProducts({
  currentProductId,
  subcategorySlug,
  categorySlug,
  petTypeSlug,
}: Props) {
  const filterParams = subcategorySlug
    ? { subcategory_slug: subcategorySlug, per_page: 6 }
    : categorySlug
    ? { category_slug: categorySlug, per_page: 6 }
    : petTypeSlug
    ? { pet_type_slug: petTypeSlug, per_page: 6 }
    : { per_page: 6 };

  const { data } = useGetShopProducts(filterParams);

  const related =
    data?.data
      .filter((p: ShopProduct) => p.id !== currentProductId)
      .slice(0, 4) || [];

  if (related.length === 0) return null;

  return (
    <div className={styles.relatedSection}>
      <h2 className={styles.title}>You May Also Like</h2>
      <div className={styles.grid}>
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}


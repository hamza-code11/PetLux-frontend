"use client";

import { useGetShopProduct, useGetProductReviews } from "@/hooks/useShop";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";

export default function ProductTabsAndRelated({ slug }: { slug: string }) {
  const { data: productData, isLoading: isProductLoading } = useGetShopProduct(slug);
  const { data: reviewsData, isLoading: isReviewsLoading } = useGetProductReviews(slug);

  const product = productData?.data;
  const reviews = reviewsData?.data || [];

  if (isProductLoading || !product) return null;

  return (
    <>
      <ProductTabs
        description={product.long_description || ""}
        features={[]}
        reviews={reviews}
        productSlug={slug}
        isReviewsLoading={isReviewsLoading}
      />
      <RelatedProducts
        currentProductId={product.id}
        subcategorySlug={product.subcategory?.slug}
        categorySlug={product.category?.slug}
        petTypeSlug={product.petType?.slug}
      />
    </>
  );
}


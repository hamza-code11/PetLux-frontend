import { Suspense } from "react";
import ProductDetailsSkeleton from "@/components/website/skeleton/productdetailsskeleton/ProductDetailsSkeleton";

export default function ProductDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      {children}
    </Suspense>
  );
}
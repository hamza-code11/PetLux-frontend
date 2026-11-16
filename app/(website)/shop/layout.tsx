import { Suspense } from "react";
import ShopSkeleton from "@/components/website/skeleton/shopsklton/ShopSkeleton";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      {children}
    </Suspense>
  );
}

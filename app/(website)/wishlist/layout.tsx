import { Suspense } from "react";
import WishlistSkeleton from "@/components/website/skeleton/wishlistskeleton/WishlistSkeleton";

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<WishlistSkeleton />}>
      {children}
    </Suspense>
  );
}


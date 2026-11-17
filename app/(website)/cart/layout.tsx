import { Suspense } from "react";
import CartSkeleton from "@/components/website/skeleton/cartskeleton/CartSkeleton";

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<CartSkeleton />}>
      {children}
    </Suspense>
  );
}


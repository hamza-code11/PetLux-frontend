import { Suspense } from "react";
import CheckoutSkeleton from "@/components/website/checkout/CheckoutSkeleton";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      {children}
    </Suspense>
  );
}

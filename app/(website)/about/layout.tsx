import { Suspense } from "react";
import AboutSkeleton from "@/components/website/skeleton/aboutskeleton/AboutSkeleton";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<AboutSkeleton />}>
      {children}
    </Suspense>
  );
}


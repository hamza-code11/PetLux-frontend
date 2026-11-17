import { Suspense } from "react";
import ProfileSkeleton from "@/components/website/skeleton/profileskeleton/ProfileSkeleton";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      {children}
    </Suspense>
  );
}


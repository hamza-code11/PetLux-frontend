"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useAuth"; // Hook import kiya

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  // API se user data fetch karein
  const { data: userData, isLoading, isError } = useCurrentUser();
  
  // Hydration fix ke liye mounted state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Agar user mount ho chuka hai aur loading khatam ho gayi hai
    if (mounted && !isLoading) {
      const token = localStorage.getItem("auth_token"); // Token check
      
      // 1. Agar token nahi hai, toh login par bhejein
      if (!token) {
        router.replace("/login");
        return;
      }

      // 2. Agar API fail ho gayi (401 unauthorized), toh login par bhejein
      if (isError) {
        router.replace("/login");
        return;
      }

      // 3. Agar data aa gaya, toh role check karein
      if (userData?.user) {
        if (userData.user.role !== "admin") {
          // Agar user admin nahi hai, toh usko home page par bhej dein
          router.replace("/"); 
        }
      }
    }
  }, [mounted, isLoading, isError, userData, router]);

  // Jab tak loading chal rahi hai ya component mount nahi hua
  if (!mounted || isLoading) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
        Verifying access...
      </div>
    );
  }

  // Agar user admin hai, toh children render karein
  if (userData?.user?.role === "admin") {
    return <>{children}</>;
  }

  // Agar admin nahi hai (aur redirect ho raha hai), toh blank ya loading show karein
  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
      Access Denied. Redirecting...
    </div>
  );
}




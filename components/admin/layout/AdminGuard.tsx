"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // TODO: Yahan apna real auth logic lagayein (e.g., check token from cookies/localStorage)
    const checkAuth = () => {
      const token = localStorage.getItem("admin_token"); // Example
      if (!token) {
        // router.push("/login"); // Auth na hone par login pe bhej dein
        setIsAuthenticated(true); // Abhi ke liye true kar diya taake page render ho
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>Loading...</div>;
  }

  return <>{children}</>;
}


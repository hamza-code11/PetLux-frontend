import type { ReactNode } from "react";

import TopBar from "@/components/website/layout/top-bar/top-bar";
import Header from "@/components/website/layout/navbar/navbar";
import Footer from "@/components/website/layout/footer/footer";
import SplashScreen from "@/components/website/layout/splash-screen/splash-screen";

interface WebsiteLayoutProps {
  children: ReactNode;
}

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <>
      <SplashScreen />
      <TopBar />
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}


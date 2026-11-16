import type { ReactNode } from "react";

import TopBar from "@/components/website/layout/top-bar/top-bar";
import Header from "@/components/website/layout/navbar/navbar";
import Footer from "@/components/website/layout/footer/footer";

interface WebsiteLayoutProps {
  children: ReactNode;
}

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <>
      <TopBar />
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}
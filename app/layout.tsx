import type { Metadata } from "next";
import Script from "next/script";
import QueryProvider from "@/src/providers/QueryProvider";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast/ToastContext";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PetLux | Premium Pet Food & Supplies",
    template: "%s | PetLux",
  },
  description:
    "Discover premium pet food, treats, accessories and essentials for your beloved pets at PetLux.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className="light" 
      data-scroll-behavior="smooth" 
      suppressHydrationWarning
    >
      <head>
        {/* F5 par Theme Blinking / Flash rokne ke liye (No FOUC) */}
        <Script
          id="petlux-theme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 
                              (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.className = theme;
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
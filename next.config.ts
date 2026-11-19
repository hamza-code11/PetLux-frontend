import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "plus.unsplash.com", port: "", pathname: "/**" },
      // Naya: Pexels add karein
      { protocol: "https", hostname: "images.pexels.com", port: "", pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "", pathname: "/storage/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "", pathname: "/storage/**" },
    ],
  },
};

export default nextConfig;


import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  images: {
    // Next 16: local/private IP (127.0.0.1) ki images allow karne ke liye (sirf dev)
    dangerouslyAllowLocalIP: isDev,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "plus.unsplash.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", port: "", pathname: "/**" },
      // Laravel storage (port 8000 zaroori hai)
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/storage/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/storage/**" },
    ],
  },
};

export default nextConfig;

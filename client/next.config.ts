import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.rahulkrrkn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "beu-bih.ac.in",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

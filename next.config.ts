import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "online-logo.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kalrtjvnbtauikrrvgxt.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;

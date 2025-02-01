import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // This tells Next.js to export static files
  // images: {
  //   unoptimized: true,  // Required for static export
  // },
};

export default nextConfig;

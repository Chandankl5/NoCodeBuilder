import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

if (process.env.EXPORT) {
  nextConfig.output = "export";
}

export default nextConfig;

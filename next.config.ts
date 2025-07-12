import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

if (process.env.EXPORT) {
  nextConfig.output = "export";
}

if (process.env.GH_PAGES_DEPLOY) {
  nextConfig.assetPrefix = "/NoCodeBuilder";
}

export default nextConfig;

import type { NextConfig } from "next";

const isCloudflare = process.env.CLOUDFLARE_BUILD === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isCloudflare ? "" : "/Youguang-Studio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

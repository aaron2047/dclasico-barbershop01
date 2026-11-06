import type { NextConfig } from "next";

// GitHub Pages serves project sites at /<repo-name>/. basePath only applies
// during the GitHub Actions build so local `npm run dev` stays at "/".
const isGhPagesBuild = process.env.GITHUB_ACTIONS === "true";
const basePath = isGhPagesBuild ? "/dclasico-barbershop01" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  // Plain <img src="/images/..."> tags don't get basePath automatically,
  // so expose it for the asset() helper in src/lib/site-data.ts.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;

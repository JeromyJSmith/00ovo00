import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js packages for proper ESM handling
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // Neo4j driver uses Node.js APIs — server-only
  serverExternalPackages: ["neo4j-driver"],

  // manim-web references require("fs") internally — stub it for client bundles
  // Turbopack (default in Next.js 16) uses resolveAlias instead of webpack fallbacks
  turbopack: {
    resolveAlias: {
      fs: { browser: "./turbopack-stub.js" },
      path: { browser: "./turbopack-stub.js" },
    },
  },
};

export default nextConfig;

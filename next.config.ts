import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ['local-origin.dev', 'local-origin.dev'],
    output: 'export',
    distDir: 'out',
    images:{
        unoptimized:true,
    },
  /* config options here */
};

export default nextConfig;

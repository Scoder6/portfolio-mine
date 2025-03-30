import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ['local-origin.dev', 'local-origin.dev'],
    basePath: process.env.NODE_ENV === "production" ? '/portfolio-mine' : '',
    output: 'export',
    distDir: 'out',
    images:{
        unoptimized:true,
    },
  /* config options here */
};

export default nextConfig;

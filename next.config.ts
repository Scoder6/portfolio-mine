import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    distDir: 'out',
    images: {
        unoptimized: true,
    },
    basePath: process.env.NODE_ENV === "production" ? '/portfolio-mine' : '', // Just use the repo name
};

export default nextConfig;
import type { NextConfig } from "next";
import path from "node:path";
import createNextIntlPlugin from 'next-intl/plugin';

import "./env";
import "./env.server";

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const isDev = process.env.NODE_ENV === 'development';

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: isDev
      ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://cdn.weatherapi.com; font-src 'self'; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://nominatim.openstreetmap.org https://timeapi.io; frame-src 'none'; object-src 'none'; base-uri 'self'"
      : "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://cdn.weatherapi.com; font-src 'self'; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://nominatim.openstreetmap.org https://timeapi.io; frame-src 'none'; object-src 'none'; base-uri 'self'",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: !isDev,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@": path.resolve(__dirname, "app"),
      "@/components": path.resolve(__dirname, "app/components"),
      "@lib": path.resolve(__dirname, "lib"),
      "@constants": path.resolve(__dirname, "constants"),
      "@shared-types": path.resolve(__dirname, "types/index.ts"),
    };

    return config;
  },
  images: {
    unoptimized: true, // Disable Next.js image optimization for crisp 4K screenshots
    formats: ['image/avif', 'image/webp'],
  },
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};


export default withNextIntl(nextConfig);

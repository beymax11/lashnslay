import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/lounge",     destination: "/menu",         permanent: true },
      { source: "/reserve",    destination: "/reservation",  permanent: true },
      { source: "/loyalty",    destination: "/loyalty-card", permanent: true },
      { source: "/services",   destination: "/menu/services",permanent: true },
      { source: "/admin",      destination: "/admin/dashboard", permanent: true },
    ];
  },
};

export default nextConfig;

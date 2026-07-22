import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      // The content portal (public/admin/index.html) is a static file, and
      // Next.js's public-folder serving only matches exact filenames — it
      // doesn't resolve a directory request to its index.html the way a
      // conventional static host would. Rewrite the bare /admin path editors
      // will actually type to the real file.
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;

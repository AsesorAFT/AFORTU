import { readFileSync } from "node:fs";

const legacyArticleRedirects = JSON.parse(
  readFileSync(
    new URL("./src/content/redirects.json", import.meta.url),
    "utf8",
  ),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.afortu.com.mx" }],
        destination: "https://afortu.com.mx/:path*",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/conocimiento",
        permanent: true,
      },
      ...legacyArticleRedirects.map((redirect) => ({
        ...redirect,
        source: decodeURI(redirect.source),
      })),
    ];
  },
};

export default nextConfig;

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/analysis",
          "/asset-management",
          "/billing",
          "/calendar",
          "/cav",
          "/contracts",
          "/coordination",
          "/dashboard",
          "/login",
          "/objectives",
          "/profile",
          "/pro",
          "/settings",
          "/signup",
          "/tools",
        ],
      },
    ],
    sitemap: "https://afortu.com.mx/sitemap.xml",
    host: "https://afortu.com.mx",
  };
}

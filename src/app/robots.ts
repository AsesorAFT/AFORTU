import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/about",
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
          "/services",
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

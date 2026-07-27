import type { MetadataRoute } from "next";
import { knowledgeArticles } from "@/lib/knowledge";

const baseUrl = "https://afortu.com.mx";
const updatedAt = new Date("2026-07-26T00:00:00-06:00");

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/personas-y-familias`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/empresas`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/oficina-patrimonial`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/patrimonio`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/retiro`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/legado`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/modelo-afortu`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/conocimiento`,
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  const publishedArticles: MetadataRoute.Sitemap = knowledgeArticles
    .filter((article) => article.status === "publicado")
    .map((article) => ({
      url: `${baseUrl}/conocimiento/${article.slug}`,
      lastModified: article.modifiedAt
        ? new Date(article.modifiedAt)
        : article.publishedAt
          ? new Date(article.publishedAt)
          : updatedAt,
      changeFrequency: "monthly",
      priority: 0.65,
    }));

  return [...publicPages, ...publishedArticles];
}

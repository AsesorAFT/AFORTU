import knowledgeData from "@/content/knowledge.json";

export type InlineStyleRange = {
  offset: number;
  length: number;
  style: string;
};

export type KnowledgeBlock = {
  key: string;
  type: string;
  depth: number;
  text: string;
  inlineStyleRanges: InlineStyleRange[];
  entityRanges: Array<{
    offset: number;
    length: number;
    key: number;
  }>;
};

export type KnowledgeArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string | null;
  modifiedAt: string | null;
  author: string;
  language: "es" | "en";
  primaryCategory: string;
  tags: string[];
  readingMinutes: number;
  wordCount: number;
  status: "en_revision" | "publicado";
  source: {
    platform: string;
    originalUrl: string;
    originalPath: string;
    featuredImage: string | null;
    migratedAt: string;
  };
  content: {
    blocks: KnowledgeBlock[];
    entityMap: Record<string, unknown>;
  };
};

export const knowledgeArticles = knowledgeData as KnowledgeArticle[];

export const isKnowledgeDraftPreviewEnabled =
  process.env.NODE_ENV !== "production" ||
  process.env.VERCEL_ENV === "preview" ||
  process.env.AFORTU_EDITORIAL_PREVIEW === "true";

export const knowledgeCategories = Array.from(
  new Set(knowledgeArticles.map((article) => article.primaryCategory)),
).sort((a, b) => a.localeCompare(b, "es"));

export function getKnowledgeArticle(slug: string) {
  return knowledgeArticles.find((article) => article.slug === slug);
}

export function formatKnowledgeDate(value: string | null) {
  if (!value) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Mexico_City",
  }).format(new Date(value));
}

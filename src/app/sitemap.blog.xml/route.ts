import {
  articleUrl,
  escapeXml,
  publishedKnowledgeArticles,
  xmlResponse,
} from "@/lib/knowledge-feed";

export async function GET() {
  const urls = publishedKnowledgeArticles
    .map(
      (article) => `<url>
  <loc>${escapeXml(articleUrl(article))}</loc>
  ${
    (article.modifiedAt ?? article.publishedAt)
      ? `<lastmod>${escapeXml(article.modifiedAt ?? article.publishedAt ?? "")}</lastmod>`
      : ""
  }
</url>`,
    )
    .join("\n");

  return xmlResponse(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`);
}

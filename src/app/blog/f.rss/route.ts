import {
  articleUrl,
  escapeXml,
  publicBaseUrl,
  publishedKnowledgeArticles,
  xmlResponse,
} from "@/lib/knowledge-feed";

export async function GET() {
  const items = publishedKnowledgeArticles
    .map(
      (article) => `<item>
  <guid isPermaLink="true">${escapeXml(articleUrl(article))}</guid>
  <title>${escapeXml(article.title)}</title>
  <link>${escapeXml(articleUrl(article))}</link>
  <description>${escapeXml(article.excerpt)}</description>
  ${article.publishedAt ? `<pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>` : ""}
</item>`,
    )
    .join("\n");

  return xmlResponse(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Centro de Conocimiento AFORTU</title>
  <link>${publicBaseUrl}/conocimiento</link>
  <description>Análisis y guías de AFORTU.</description>
  <language>es-MX</language>
  ${items}
</channel>
</rss>`);
}

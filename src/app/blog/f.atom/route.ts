import {
  articleUrl,
  escapeXml,
  publicBaseUrl,
  publishedKnowledgeArticles,
  xmlResponse,
} from "@/lib/knowledge-feed";

export async function GET() {
  const updated =
    publishedKnowledgeArticles[0]?.modifiedAt ??
    publishedKnowledgeArticles[0]?.publishedAt ??
    "2026-07-26T00:00:00-06:00";
  const entries = publishedKnowledgeArticles
    .map(
      (article) => `<entry>
  <id>${escapeXml(articleUrl(article))}</id>
  <title>${escapeXml(article.title)}</title>
  <link href="${escapeXml(articleUrl(article))}" />
  <updated>${escapeXml(article.modifiedAt ?? article.publishedAt ?? updated)}</updated>
  <summary>${escapeXml(article.excerpt)}</summary>
</entry>`,
    )
    .join("\n");

  return xmlResponse(`<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${publicBaseUrl}/conocimiento</id>
  <title>Centro de Conocimiento AFORTU</title>
  <updated>${escapeXml(updated)}</updated>
  <link href="${publicBaseUrl}/blog/f.atom" rel="self" />
  <link href="${publicBaseUrl}/conocimiento" />
  ${entries}
</feed>`);
}

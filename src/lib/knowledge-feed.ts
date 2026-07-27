import { knowledgeArticles, type KnowledgeArticle } from "@/lib/knowledge";

export const publicBaseUrl = "https://afortu.com.mx";

export const publishedKnowledgeArticles = knowledgeArticles.filter(
  (article) => article.status === "publicado",
);

export function articleUrl(article: KnowledgeArticle) {
  return `${publicBaseUrl}/conocimiento/${article.slug}`;
}

export function articlePlainText(article: KnowledgeArticle) {
  return article.content.blocks
    .map((block) => block.text)
    .filter(Boolean)
    .join("\n\n");
}

export function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function xmlResponse(body: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

import {
  articlePlainText,
  articleUrl,
  publicBaseUrl,
  publishedKnowledgeArticles,
} from "@/lib/knowledge-feed";

export async function GET() {
  return Response.json(
    {
      version: "https://jsonfeed.org/version/1.1",
      title: "Centro de Conocimiento AFORTU",
      home_page_url: `${publicBaseUrl}/conocimiento`,
      feed_url: `${publicBaseUrl}/blog/f.json`,
      language: "es-MX",
      items: publishedKnowledgeArticles.map((article) => ({
        id: article.id,
        url: articleUrl(article),
        title: article.title,
        summary: article.excerpt,
        content_text: articlePlainText(article),
        date_published: article.publishedAt,
        date_modified: article.modifiedAt,
        language: article.language,
        tags: [article.primaryCategory, ...article.tags],
        authors: [{ name: article.author }],
      })),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=3600",
      },
    },
  );
}

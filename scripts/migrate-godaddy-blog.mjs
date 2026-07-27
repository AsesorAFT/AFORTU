import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const FEED_URL = "https://afortu.com.mx/blog/f.json";
const OUTPUT_DIR = new URL("../src/content/", import.meta.url);

function slugify(value) {
  return decodeURIComponent(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!'"“”‘’]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function plainTextFromHtml(value = "") {
  return value
    .replace(/<img\b[^>]*>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizedTitle(value) {
  const title = String(value).trim();
  const corrections = new Map([
    [
      "Propósitos que sí se cumplen: Cómo estructurar tu inversión para",
      "Propósitos que sí se cumplen: cómo estructurar tu inversión para 2026",
    ],
    [
      "Economía Personal y Familiar:",
      "Economía personal y familiar: construyendo una base financiera sólida",
    ],
  ]);
  return corrections.get(title) ?? title;
}

function conciseExcerpt(feedSummary, firstParagraph) {
  const summary = plainTextFromHtml(feedSummary);
  const source =
    !summary || /(?:\.{3}|…)$/.test(summary) ? firstParagraph : summary;
  if (source.length <= 240) return source;
  const bounded = source.slice(0, 237);
  const lastSpace = bounded.lastIndexOf(" ");
  return `${bounded.slice(0, Math.max(lastSpace, 180)).trim()}…`;
}

function primaryCategory(title) {
  const haystack = title.toLowerCase();

  if (
    /(pensi[oó]n|retiro|imss|issste|afore|modalidad 10|modalidad 40|cesant[ií]a)/.test(
      haystack,
    )
  ) {
    return "Retiro";
  }
  if (
    /(sucesi[oó]n|sucesoria|testamento|heredar|herencia|legado|tercera generaci[oó]n|protocolos familiares|gobernanza patrimonial|derechos|asesor[ií]a legal)/.test(
      haystack,
    )
  ) {
    return "Legado";
  }
  if (
    /(empresa|pyme|sociedad mercantil|r[eé]gimen fiscal|fiscal|impuesto|sat|negocio|declarar|deducciones)/.test(
      haystack,
    )
  ) {
    return "Empresas";
  }
  if (
    /(educaci[oó]n|libros|hijos|cultura|finanzas personales|econom[ií]a personal)/.test(
      haystack,
    )
  ) {
    return "Educación financiera";
  }
  if (
    /(fintech|inteligencia artificial|transformaci[oó]n digital)/.test(haystack)
  ) {
    return "Innovación";
  }
  return "Patrimonio";
}

function extractBlogData(html) {
  const marker = "window._BLOG_DATA=";
  const start = html.indexOf(marker);
  if (start === -1) {
    throw new Error("No se encontró window._BLOG_DATA");
  }
  const end = html.indexOf("</script>", start);
  if (end === -1) {
    throw new Error("No se encontró el cierre del bloque de datos");
  }
  let json = html.slice(start + marker.length, end).trim();
  if (json.endsWith(";")) json = json.slice(0, -1);
  return JSON.parse(json);
}

function normalizeDraft(raw) {
  const draft = typeof raw === "string" ? JSON.parse(raw) : raw;
  const blocks = (draft?.blocks ?? [])
    .filter((block) => block.type !== "atomic" && block.text?.trim())
    .map((block) => ({
      key: block.key,
      type: block.type,
      depth: block.depth ?? 0,
      text: block.text.trim(),
      inlineStyleRanges: block.inlineStyleRanges ?? [],
      entityRanges: block.entityRanges ?? [],
    }));

  return {
    blocks,
    entityMap: draft?.entityMap ?? {},
  };
}

function contentWordCount(content) {
  return content.blocks
    .map((block) => block.text)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "AFORTU migration audit/1.0",
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  return response.text();
}

async function migrateItem(item) {
  const html = await fetchText(item.url);
  const data = extractBlogData(html).post;
  const content = normalizeDraft(data.fullContent);
  const wordCount = contentWordCount(content);
  const tags = Array.isArray(data.categories) ? data.categories : [];
  const originalPath = new URL(item.url).pathname;
  const slug = slugify(data.slug ?? originalPath.split("/").pop());
  const title = normalizedTitle(data.title ?? item.title);
  const firstParagraph =
    content.blocks.find((block) => block.type === "unstyled")?.text ?? "";
  const excerpt = conciseExcerpt(item.summary, firstParagraph);

  return {
    id: createHash("sha256").update(item.url).digest("hex").slice(0, 16),
    slug,
    title,
    excerpt,
    publishedAt: data.publishedDate ?? data.date ?? item.date_modified ?? null,
    modifiedAt: item.date_modified ?? data.date ?? null,
    author: "AFORTU",
    language: slug === "choose-financial-consultant-in-mexico" ? "en" : "es",
    primaryCategory: primaryCategory(title),
    tags,
    readingMinutes: Math.max(1, Math.ceil(wordCount / 220)),
    wordCount,
    status: "en_revision",
    source: {
      platform: "GoDaddy Websites + Marketing",
      originalUrl: item.url,
      originalPath,
      featuredImage: data.featuredImage ?? null,
      migratedAt: new Date().toISOString(),
    },
    content,
  };
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, worker),
  );
  return results;
}

const feed = JSON.parse(await fetchText(FEED_URL));
const items = Array.isArray(feed.items) ? feed.items : [];
const articles = await mapWithConcurrency(items, 5, migrateItem);
articles.sort((a, b) =>
  String(b.publishedAt).localeCompare(String(a.publishedAt)),
);

const redirects = articles.map((article) => ({
  source: article.source.originalPath,
  destination: `/conocimiento/${article.slug}`,
  permanent: true,
}));

const quality = {
  expectedCount: 43,
  migratedCount: articles.length,
  completeBodyCount: articles.filter((article) => article.wordCount >= 80)
    .length,
  shortBodySlugs: articles
    .filter((article) => article.wordCount < 80)
    .map((article) => article.slug),
  duplicateSlugs: articles
    .map((article) => article.slug)
    .filter((slug, index, all) => all.indexOf(slug) !== index),
  generatedAt: new Date().toISOString(),
};

await mkdir(OUTPUT_DIR, { recursive: true });
await writeFile(
  new URL("knowledge.json", OUTPUT_DIR),
  `${JSON.stringify(articles, null, 2)}\n`,
  "utf8",
);
await writeFile(
  new URL("redirects.json", OUTPUT_DIR),
  `${JSON.stringify(redirects, null, 2)}\n`,
  "utf8",
);
await writeFile(
  new URL("migration-quality.json", OUTPUT_DIR),
  `${JSON.stringify(quality, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify(quality, null, 2));

if (quality.migratedCount !== quality.expectedCount) {
  process.exitCode = 1;
}
if (quality.duplicateSlugs.length > 0) {
  process.exitCode = 1;
}

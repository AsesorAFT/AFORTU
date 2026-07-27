import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const readJson = async (relativePath) =>
  JSON.parse(await readFile(resolve(root, relativePath), "utf8"));

const [articles, redirects, migrationQuality, claimsAudit] = await Promise.all([
  readJson("src/content/knowledge.json"),
  readJson("src/content/redirects.json"),
  readJson("src/content/migration-quality.json"),
  readJson("src/content/claims-audit.json"),
]);

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(
  articles.length === 43,
  `Se esperaban 43 artículos; hay ${articles.length}.`,
);
assert(
  redirects.length === articles.length,
  "El número de redirecciones no coincide con el catálogo.",
);
assert(
  new Set(articles.map((article) => article.slug)).size === articles.length,
  "Hay slugs duplicados.",
);
assert(
  new Set(articles.map((article) => article.source.originalPath)).size ===
    articles.length,
  "Hay rutas de origen duplicadas.",
);
assert(
  articles.every(
    (article) =>
      article.content.blocks.length > 0 &&
      article.wordCount >= 80 &&
      article.status === "en_revision",
  ),
  "Todos los artículos deben conservar cuerpo completo y seguir en revisión.",
);
assert(
  articles.filter((article) => article.language === "en").length === 1,
  "Debe existir exactamente un artículo marcado en inglés.",
);
assert(
  articles.filter((article) => article.language === "es").length === 42,
  "Deben existir 42 artículos marcados en español.",
);

const redirectsBySource = new Map(
  redirects.map((redirect) => [redirect.source, redirect]),
);

for (const article of articles) {
  const redirect = redirectsBySource.get(article.source.originalPath);
  assert(
    redirect?.destination === `/conocimiento/${article.slug}` &&
      redirect?.permanent === true,
    `Redirección incompleta para ${article.slug}.`,
  );
}

assert(
  migrationQuality.migratedCount === 43 &&
    migrationQuality.completeBodyCount === 43 &&
    migrationQuality.duplicateSlugs.length === 0,
  "El reporte de migración no está íntegro.",
);
assert(
  claimsAudit.summary.totalArticles === 43 &&
    claimsAudit.summary.allRemainNoindex === true,
  "La auditoría editorial no cubre los 43 borradores.",
);

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  "Contenido verificado: 43 artículos completos, 43 redirecciones y noindex editorial activo.",
);

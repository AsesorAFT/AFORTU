import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const inputPath = resolve(root, "src/content/knowledge.json");
const jsonOutputPath = resolve(root, "src/content/claims-audit.json");
const csvOutputPath = resolve(root, "src/content/claims-audit.csv");

const articles = JSON.parse(await readFile(inputPath, "utf8"));

const rules = [
  {
    id: "regulated-investment-language",
    severity: "alta",
    label: "Lenguaje de inversión o actividad regulada",
    pattern:
      /\b(asesor(?:ía)?\s+(?:en\s+)?inversi[oó]n|gesti[oó]n\s+de\s+activos|administraci[oó]n\s+de\s+(?:activos|cartera)|portafolio|rendimiento|fondo(?:s)?\s+de\s+inversi[oó]n|captaci[oó]n)\b/giu,
  },
  {
    id: "guarantee-or-certainty",
    severity: "alta",
    label: "Promesa, garantía o certeza",
    pattern:
      /\b(garanti(?:za|zado|zada|zar)|asegura(?:r|do|da)?|sin\s+riesgo|riesgo\s+cero|rendimiento\s+(?:seguro|garantizado)|protege(?:r|do|da)?\s+tu)\b/giu,
  },
  {
    id: "tax-legal-pension",
    severity: "alta",
    label: "Materia fiscal, jurídica, pensionaria o de seguridad social",
    pattern:
      /\b(SAT|IMSS|ISSSTE|AFORE|modalidad\s+(?:10|40)|r[eé]gimen\s+fiscal|deducci(?:o|ó)n(?:es)?|cuotas?\s+patronales?|pensi(?:o|ó)n|sucesi(?:o|ó)n|sociedad(?:es)?\s+mercantiles?|ley|art[ií]culo\s+\d+)\b/giu,
  },
  {
    id: "quantitative-claim",
    severity: "media",
    label: "Cifra, tasa, monto o porcentaje",
    pattern:
      /(?:\$\s?\d[\d,.]*|\b\d+(?:[.,]\d+)?\s?%|\b(?:tasa|inflaci[oó]n|rendimiento|cuota)\b[^.\n]{0,80}\d)/giu,
  },
  {
    id: "dated-claim",
    severity: "media",
    label: "Referencia temporal que puede perder vigencia",
    pattern:
      /\b(?:20(?:1[0-9]|2[0-9])|actualmente|hoy|vigente|este\s+a[nñ]o)\b/giu,
  },
  {
    id: "recommendation-language",
    severity: "media",
    label: "Lenguaje prescriptivo o de recomendación",
    pattern:
      /\b(debes?|tienes\s+que|es\s+indispensable|es\s+fundamental|la\s+mejor\s+opci[oó]n|te\s+recomendamos?|conviene\s+invertir)\b/giu,
  },
];

function articleText(article) {
  return article.content.blocks
    .map((block) => block.text ?? "")
    .filter(Boolean)
    .join("\n");
}

function extractMatches(text, pattern) {
  const matches = [...text.matchAll(pattern)].map((match) =>
    match[0].replace(/\s+/g, " ").trim(),
  );
  return [...new Set(matches)].slice(0, 12);
}

const audited = articles.map((article) => {
  const text = articleText(article);
  const findings = rules
    .map((rule) => {
      const matches = extractMatches(text, rule.pattern);
      return matches.length
        ? {
            ruleId: rule.id,
            severity: rule.severity,
            label: rule.label,
            matchCount: matches.length,
            examples: matches,
          }
        : null;
    })
    .filter(Boolean);

  const high = findings.filter((finding) => finding.severity === "alta").length;
  const medium = findings.filter(
    (finding) => finding.severity === "media",
  ).length;

  return {
    slug: article.slug,
    title: article.title,
    publishedAt: article.publishedAt,
    primaryCategory: article.primaryCategory,
    originalUrl: article.source.originalUrl,
    editorialStatus: article.status,
    priority: high > 0 ? "P0" : medium > 1 ? "P1" : "P2",
    reviewRequired: findings.length > 0,
    findings,
  };
});

const summary = {
  generatedAt: new Date().toISOString(),
  methodology:
    "Triage automatizado por expresiones regulares. No sustituye revisión jurídica, fiscal, financiera ni editorial humana.",
  totalArticles: audited.length,
  p0: audited.filter((article) => article.priority === "P0").length,
  p1: audited.filter((article) => article.priority === "P1").length,
  p2: audited.filter((article) => article.priority === "P2").length,
  articlesWithFindings: audited.filter((article) => article.reviewRequired)
    .length,
  allRemainNoindex: articles.every((article) => article.status !== "publicado"),
};

await writeFile(
  jsonOutputPath,
  `${JSON.stringify({ summary, articles: audited }, null, 2)}\n`,
);

const csvEscape = (value) => {
  const stringValue = String(value ?? "");
  return `"${stringValue.replaceAll('"', '""')}"`;
};

const rows = [
  [
    "priority",
    "title",
    "slug",
    "published_at",
    "category",
    "finding_count",
    "finding_labels",
    "original_url",
  ],
  ...audited.map((article) => [
    article.priority,
    article.title,
    article.slug,
    article.publishedAt,
    article.primaryCategory,
    article.findings.length,
    article.findings.map((finding) => finding.label).join(" | "),
    article.originalUrl,
  ]),
];

await writeFile(
  csvOutputPath,
  `${rows.map((row) => row.map(csvEscape).join(",")).join("\n")}\n`,
);

console.log(JSON.stringify(summary, null, 2));

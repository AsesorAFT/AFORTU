import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3, ShieldAlert } from "lucide-react";
import { notFound } from "next/navigation";
import { PublicFooter, PublicHeader } from "@/components/site/public-shell";
import { RichContent } from "@/components/site/rich-content";
import {
  formatKnowledgeDate,
  getKnowledgeArticle,
  isKnowledgeDraftPreviewEnabled,
  knowledgeArticles,
} from "@/lib/knowledge";

export function generateStaticParams() {
  return knowledgeArticles
    .filter(
      (article) =>
        article.status === "publicado" || isKnowledgeDraftPreviewEnabled,
    )
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/conocimiento/${article.slug}` },
    robots: {
      index: article.status === "publicado",
      follow: article.status === "publicado",
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt ?? undefined,
      modifiedTime: article.modifiedAt ?? undefined,
      authors: [article.author],
      section: article.primaryCategory,
    },
  };
}

export default async function KnowledgeArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
  if (
    !article ||
    (article.status !== "publicado" && !isKnowledgeDraftPreviewEnabled)
  ) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.publishedAt,
        dateModified: article.modifiedAt,
        inLanguage: article.language,
        author: {
          "@type": "Organization",
          name: "AFORTU",
        },
        publisher: {
          "@type": "Organization",
          name: "AFORTU",
        },
        mainEntityOfPage: `https://afortu.com.mx/conocimiento/${article.slug}`,
        articleSection: article.primaryCategory,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://afortu.com.mx",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Centro de Conocimiento",
            item: "https://afortu.com.mx/conocimiento",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: `https://afortu.com.mx/conocimiento/${article.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="afortu-public min-h-screen">
      <PublicHeader />
      <main>
        <article lang={article.language}>
          <header className="relative overflow-hidden bg-[#071a2b] text-white">
            <div className="afortu-symbol-grid absolute inset-0 opacity-20" />
            <div className="relative mx-auto max-w-[1040px] px-5 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
              <Link
                href="/conocimiento"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#c7ab76] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Centro de Conocimiento
              </Link>
              <p className="mt-12 text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#b89663]">
                {article.primaryCategory}
              </p>
              <h1 className="afortu-display mt-6 max-w-5xl text-[clamp(3rem,6vw,5.8rem)] font-medium leading-[0.93] tracking-[-0.045em]">
                {article.title}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                {article.excerpt}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.14] pt-6 text-xs text-slate-400">
                <span>{formatKnowledgeDate(article.publishedAt)}</span>
                <span className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4" aria-hidden="true" />
                  {article.readingMinutes} min de lectura
                </span>
                <span>{article.author}</span>
              </div>
            </div>
          </header>

          <div className="bg-[#f6f2ea]">
            <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-12 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_16rem] lg:px-8">
              <div className="min-w-0 border border-[#d8d0c4] bg-[#fbf9f4] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
                <div className="mb-10 flex gap-4 border border-[#c7bdaf] bg-[#eee8de] p-5 text-sm leading-7 text-[#4f5d66]">
                  <ShieldAlert
                    className="mt-1 h-5 w-5 shrink-0 text-[#8a693b]"
                    aria-hidden="true"
                  />
                  <p>
                    Archivo editorial migrado del sitio anterior. Su contenido
                    está en revisión de vigencia, fuentes y afirmaciones. Es
                    información general y no constituye recomendación
                    individual, oferta ni opinión jurídica o fiscal.
                  </p>
                </div>
                <RichContent blocks={article.content.blocks} />
              </div>

              <aside className="self-start border-t border-[#c7bdaf] pt-6 lg:sticky lg:top-36">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-[#71562f]">
                  Antes de actuar
                </p>
                <p className="mt-4 text-sm leading-7 text-[#59666e]">
                  Verifique la fecha, las fuentes y la aplicación del contenido
                  a su situación concreta.
                </p>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#071a2b]"
                >
                  Solicitar diagnóstico
                  <ArrowRight
                    className="h-4 w-4 text-[#8a693b]"
                    aria-hidden="true"
                  />
                </Link>
              </aside>
            </div>
          </div>
        </article>
      </main>
      <PublicFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}

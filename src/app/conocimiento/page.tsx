import type { Metadata } from "next";
import { BookOpenText } from "lucide-react";
import { KnowledgeExplorer } from "@/components/site/knowledge-explorer";
import { PublicFooter, PublicHeader } from "@/components/site/public-shell";
import {
  isKnowledgeDraftPreviewEnabled,
  knowledgeArticles,
} from "@/lib/knowledge";

const publishedArticles = knowledgeArticles.filter(
  (article) => article.status === "publicado",
);

export const metadata: Metadata = {
  title: "Centro de Conocimiento",
  description:
    "Análisis y contenidos educativos de AFORTU sobre patrimonio, retiro, legado, empresa, innovación y educación financiera.",
  alternates: { canonical: "/conocimiento" },
  robots: {
    index: publishedArticles.length > 0,
    follow: publishedArticles.length > 0,
  },
};

export default function KnowledgePage() {
  const visibleArticles = isKnowledgeDraftPreviewEnabled
    ? knowledgeArticles
    : publishedArticles;
  const categories = Array.from(
    new Set(visibleArticles.map((article) => article.primaryCategory)),
  ).sort((a, b) => a.localeCompare(b, "es"));
  const summaries = visibleArticles.map(
    ({
      slug,
      title,
      excerpt,
      publishedAt,
      primaryCategory,
      readingMinutes,
      status,
    }) => ({
      slug,
      title,
      excerpt,
      publishedAt,
      primaryCategory,
      readingMinutes,
      status,
    }),
  );

  return (
    <div className="afortu-public min-h-screen">
      <PublicHeader />
      <main>
        <section className="relative overflow-hidden bg-[#071a2b] text-white">
          <div className="afortu-symbol-grid absolute inset-0 opacity-20" />
          <div className="relative mx-auto grid min-h-[500px] max-w-[1240px] items-end gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_auto] lg:px-8 lg:py-24">
            <div>
              <p className="afortu-kicker afortu-kicker-light">
                Centro de Conocimiento
              </p>
              <h1 className="afortu-display mt-7 max-w-5xl text-[clamp(3.2rem,6vw,6rem)] font-medium leading-[0.92] tracking-[-0.045em]">
                Criterio para entender antes de decidir.
              </h1>
              <p className="mt-8 max-w-2xl text-[1.05rem] leading-8 text-slate-300">
                Archivo editorial de AFORTU sobre patrimonio, retiro, legado,
                empresa, innovación y educación financiera.
              </p>
            </div>
            <BookOpenText
              className="hidden h-16 w-16 text-[#c7ab76] lg:block"
              aria-hidden="true"
            />
          </div>
        </section>

        <section className="bg-[#f6f2ea]">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
              <p className="afortu-kicker">Archivo migrado</p>
              <div>
                <h2 className="afortu-display text-4xl font-medium leading-[0.98] tracking-[-0.035em] text-[#071a2b] sm:text-5xl">
                  43 contenidos conservados; cada uno pasa por revisión de
                  vigencia.
                </h2>
                <p className="mt-6 max-w-3xl leading-8 text-[#59666e]">
                  La migración preserva el cuerpo editorial original. Antes de
                  habilitar su indexación pública se revisarán fechas, fuentes,
                  cifras y afirmaciones reguladas.
                </p>
              </div>
            </div>

            <KnowledgeExplorer articles={summaries} categories={categories} />
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { KnowledgeArticle } from "@/lib/knowledge";

type ArticleSummary = Pick<
  KnowledgeArticle,
  | "slug"
  | "title"
  | "excerpt"
  | "publishedAt"
  | "primaryCategory"
  | "readingMinutes"
  | "status"
>;

function formatDate(value: string | null) {
  if (!value) return "Sin fecha";
  return new Intl.DateTimeFormat("es-MX", {
    month: "short",
    year: "numeric",
    timeZone: "America/Mexico_City",
  }).format(new Date(value));
}

export function KnowledgeExplorer({
  articles,
  categories,
}: {
  articles: ArticleSummary[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    return articles.filter((article) => {
      const matchesCategory =
        category === "Todos" || article.primaryCategory === category;
      const matchesQuery =
        !normalized ||
        `${article.title} ${article.excerpt} ${article.primaryCategory}`
          .toLocaleLowerCase("es")
          .includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [articles, category, query]);

  return (
    <div>
      <div className="grid gap-5 border-y border-[#c7bdaf] py-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <label className="relative block">
          <span className="sr-only">Buscar en el Centro de Conocimiento</span>
          <Search
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a693b]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por tema o palabra clave"
            className="min-h-14 w-full border border-[#c7bdaf] bg-[#fbf9f4] pl-12 pr-4 text-sm text-[#071a2b] outline-none transition-colors placeholder:text-[#7a858b] focus:border-[#8a693b]"
          />
        </label>

        <div
          className="flex flex-wrap gap-2"
          aria-label="Filtrar por categoría"
        >
          {["Todos", ...categories].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className="min-h-10 border border-[#b9ad9b] px-4 text-xs font-bold text-[#40515b] transition-colors hover:border-[#8a693b] hover:text-[#071a2b] aria-pressed:border-[#071a2b] aria-pressed:bg-[#071a2b] aria-pressed:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 text-sm text-[#59666e]">
        <p>
          <strong className="text-[#071a2b]">{filtered.length}</strong>{" "}
          contenidos
        </p>
        <p className="hidden sm:block">Ordenados por fecha de publicación</p>
      </div>

      <div className="mt-6 grid gap-px border border-[#c7bdaf] bg-[#c7bdaf] md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((article, index) => (
          <article
            key={article.slug}
            className="flex min-h-[330px] flex-col bg-[#fbf9f4] p-7 transition-colors hover:bg-white sm:p-8"
          >
            <div className="flex items-center justify-between gap-4 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#71562f]">
              <span>{article.primaryCategory}</span>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h2 className="afortu-display mt-8 text-3xl font-medium leading-[1.02] tracking-[-0.025em] text-[#071a2b]">
              <Link
                href={`/conocimiento/${article.slug}`}
                className="hover:text-[#71562f]"
              >
                {article.title}
              </Link>
            </h2>
            <p className="mt-5 line-clamp-3 text-sm leading-7 text-[#59666e]">
              {article.excerpt}
            </p>
            <div className="mt-auto flex items-end justify-between gap-4 border-t border-[#d8d0c4] pt-5 text-xs text-[#7a858b]">
              <span>{formatDate(article.publishedAt)}</span>
              <span>{article.readingMinutes} min</span>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border-x border-b border-[#c7bdaf] bg-[#fbf9f4] px-6 py-14 text-center text-sm text-[#59666e]">
          No encontramos contenidos con esos criterios.
        </div>
      ) : null}
    </div>
  );
}

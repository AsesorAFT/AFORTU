import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PublicFooter, PublicHeader } from "@/components/site/public-shell";

export type AudiencePageData = {
  number: string;
  label: string;
  title: string;
  lead: string;
  Icon: LucideIcon;
  situations: string[];
  decisions: Array<{
    title: string;
    detail: string;
  }>;
  outputs: Array<{
    title: string;
    detail: string;
  }>;
  participants: string[];
  boundary: string;
};

export function AudiencePage({ data }: { data: AudiencePageData }) {
  const {
    number,
    label,
    title,
    lead,
    Icon,
    situations,
    decisions,
    outputs,
    participants,
    boundary,
  } = data;

  return (
    <div className="afortu-public min-h-screen">
      <a
        href="#contenido"
        className="sr-only z-[60] rounded bg-white px-4 py-2 text-[#071a2b] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Ir al contenido
      </a>
      <PublicHeader />
      <main id="contenido">
        <section className="relative overflow-hidden bg-[#071a2b] text-white">
          <div className="afortu-symbol-grid absolute inset-0 opacity-25" />
          <div className="relative mx-auto grid min-h-[590px] max-w-[1240px] items-center gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.55fr] lg:px-8 lg:py-24">
            <div>
              <div className="flex items-center gap-5">
                <span className="text-xs font-extrabold tracking-[0.2em] text-[#b89663]">
                  {number}
                </span>
                <span className="h-px w-12 bg-[#b89663]/60" />
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-[#b89663]">
                  {label}
                </p>
              </div>
              <h1 className="afortu-display mt-8 max-w-4xl text-[clamp(3.2rem,6.5vw,6.3rem)] font-medium leading-[0.91] tracking-[-0.045em]">
                {title}
              </h1>
              <p className="mt-8 max-w-2xl text-[1.05rem] leading-8 text-slate-300">
                {lead}
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/contact" className="afortu-primary-button">
                  Solicitar diagnóstico
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/modelo-afortu"
                  className="afortu-secondary-link text-white"
                >
                  Conocer el modelo
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="border border-[#b89663]/35 bg-[#0c2438]/90 p-8 shadow-[0_34px_90px_rgba(0,0,0,0.28)] sm:p-10">
              <Icon className="h-8 w-8 text-[#c7ab76]" aria-hidden="true" />
              <p className="mt-8 text-[0.64rem] font-extrabold uppercase tracking-[0.2em] text-[#b89663]">
                Punto de partida
              </p>
              <h2 className="afortu-display mt-3 text-3xl font-medium leading-tight">
                Una sola lectura del caso antes de dividirlo por especialidad.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                Objetivo, restricciones, información y responsables se ordenan
                en un expediente coordinado.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f2ea]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="grid gap-10 border-b border-[#c7bdaf] pb-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="afortu-kicker">Cuándo tiene sentido</p>
                <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.98] tracking-[-0.035em] text-[#071a2b] sm:text-5xl">
                  La complejidad aparece cuando varias decisiones dependen entre
                  sí.
                </h2>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {situations.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 border border-[#d1c7b8] bg-[#fbf9f4] p-6 text-sm leading-7 text-[#4f5d66]"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-[#8a693b]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-[#ebe4d9]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <p className="afortu-kicker">Tablero de decisión</p>
            <div className="mt-7 grid gap-6 lg:grid-cols-3">
              {decisions.map((item, index) => (
                <article
                  key={item.title}
                  className="border border-[#c7bdaf] bg-[#f6f2ea] p-7 sm:p-8"
                >
                  <span className="afortu-display text-4xl text-[#8a693b]/55">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="!font-sans mt-8 text-lg font-extrabold text-[#071a2b]">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#59666e]">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#071a2b] text-white">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:px-8 lg:py-32">
            <div>
              <p className="afortu-kicker afortu-kicker-light">
                Salidas utilizables
              </p>
              <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.98] tracking-[-0.035em] sm:text-5xl">
                Cada etapa debe dejar una decisión mejor preparada.
              </h2>
            </div>
            <div className="grid gap-px border border-white/[0.12] bg-white/[0.12] sm:grid-cols-2">
              {outputs.map((item) => (
                <article key={item.title} className="bg-[#0b2235] p-7 sm:p-8">
                  <h3 className="!font-sans font-extrabold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fbf9f4]">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-32">
            <div>
              <p className="afortu-kicker">Gobierno del caso</p>
              <h2 className="afortu-display mt-6 max-w-2xl text-4xl font-medium leading-[0.98] tracking-[-0.035em] text-[#071a2b] sm:text-5xl">
                La coordinación no sustituye la responsabilidad de cada
                especialista.
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-[#59666e]">
                {boundary}
              </p>
            </div>
            <div className="border-t border-[#c7bdaf]">
              {participants.map((item, index) => (
                <div
                  key={item}
                  className="grid grid-cols-[3.5rem_1fr] gap-5 border-b border-[#c7bdaf] py-6"
                >
                  <span className="afortu-display text-3xl text-[#8a693b]/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-bold leading-7 text-[#30434e]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="afortu-v3-contact">
          <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
            <div>
              <p className="afortu-kicker">Primer movimiento</p>
              <h2 className="afortu-display mt-6 max-w-4xl text-4xl font-medium leading-[0.94] tracking-[-0.04em] text-[#071a2b] sm:text-6xl">
                Defina la decisión antes de elegir una solución.
              </h2>
            </div>
            <Link href="/contact" className="afortu-dark-button">
              Iniciar conversación
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

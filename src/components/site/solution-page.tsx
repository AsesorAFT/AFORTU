import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PublicFooter, PublicHeader } from "@/components/site/public-shell";

export type SolutionPageData = {
  number: string;
  label: string;
  title: string;
  lead: string;
  Icon: LucideIcon;
  situations: string[];
  analysis: Array<{
    title: string;
    detail: string;
  }>;
  deliverables: Array<{
    title: string;
    detail: string;
  }>;
  process: Array<{
    title: string;
    detail: string;
  }>;
  limits: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  next: {
    label: string;
    href: string;
  };
};

export function SolutionPage({ data }: { data: SolutionPageData }) {
  const {
    number,
    label,
    title,
    lead,
    Icon,
    situations,
    analysis,
    deliverables,
    process,
    limits,
    faqs,
    next,
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
          <div className="relative mx-auto grid min-h-[570px] max-w-[1240px] items-end gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.42fr] lg:px-8 lg:py-24">
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
              <h1 className="afortu-display mt-8 max-w-5xl text-[clamp(2.85rem,6.6vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.05em]">
                {title}
              </h1>
              <p className="mt-8 max-w-2xl text-[1.04rem] leading-8 text-slate-300 sm:text-[1.12rem] sm:leading-9">
                {lead}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
                <Link href="/contact" className="afortu-primary-button">
                  Solicitar diagnóstico
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/#soluciones"
                  className="afortu-secondary-link text-slate-300 hover:text-white"
                >
                  Ver arquitectura completa
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="border-l border-[#b89663]/35 pb-2 pl-8">
              <Icon className="h-10 w-10 text-[#b89663]" aria-hidden="true" />
              <p
                className="afortu-display mt-10 text-7xl font-medium leading-none text-[#c7ab76]/70"
                aria-hidden="true"
              >
                {number}
              </p>
              <p className="mt-6 text-[0.63rem] font-extrabold uppercase leading-5 tracking-[0.22em] text-slate-400">
                Situación · análisis · entregables · seguimiento
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8d0c4] bg-[#f6f2ea]">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-28">
            <div>
              <p className="afortu-kicker">Cuándo se necesita</p>
              <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-5xl">
                El punto de partida.
              </h2>
            </div>
            <ul className="border-t border-[#c7bdaf]">
              {situations.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[auto_1fr] gap-5 border-b border-[#c7bdaf] py-5 text-sm font-semibold leading-7 text-[#334852] sm:py-6"
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
        </section>

        <section className="bg-[#fbf9f4]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
                <p className="afortu-kicker">Qué analizamos</p>
                <h2 className="afortu-display mt-6 max-w-3xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-6xl">
                  Primero se construye una visión común.
                </h2>
              </div>
              <p className="max-w-xl text-[1.02rem] leading-8 text-[#59666e] lg:justify-self-end">
                El alcance final depende de la información disponible y de la
                decisión que se busca tomar.
              </p>
            </div>

            <div className="mt-16 grid border-l border-t border-[#c7bdaf] md:grid-cols-2">
              {analysis.map((item, index) => (
                <article
                  key={item.title}
                  className="border-b border-r border-[#c7bdaf] p-7 sm:p-9 md:min-h-[240px]"
                >
                  <span className="text-[0.62rem] font-extrabold tracking-[0.2em] text-[#71562f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-9 !font-sans text-lg font-extrabold text-[#071a2b]">
                    {item.title}
                  </h3>
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
                Entregables de trabajo
              </p>
              <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.96] tracking-[-0.04em] sm:text-5xl">
                Cada etapa debe dejar algo utilizable.
              </h2>
              <p className="mt-6 max-w-md leading-7 text-slate-300">
                Los entregables específicos se confirman al definir el alcance
                del diagnóstico o proyecto.
              </p>
            </div>

            <div className="border-l border-t border-white/[0.15]">
              {deliverables.map((item, index) => (
                <article
                  key={item.title}
                  className="grid border-b border-r border-white/[0.15] p-7 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:p-8"
                >
                  <span className="afortu-display text-4xl text-[#c7ab76]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-5 sm:mt-0">
                    <h3 className="!font-sans text-base font-extrabold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {item.detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8d0c4] bg-[#eee8de]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="afortu-kicker">Secuencia de atención</p>
                <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-5xl">
                  Del contexto al seguimiento.
                </h2>
              </div>
              <p className="max-w-2xl text-[1.02rem] leading-8 text-[#59666e]">
                El Asesor Principal conserva la visión del conjunto mientras
                cada especialidad trabaja su parte.
              </p>
            </div>

            <ol className="mt-16 grid border-l border-t border-[#bdb2a3] md:grid-cols-2 xl:grid-cols-4">
              {process.map((step, index) => (
                <li
                  key={step.title}
                  className="border-b border-r border-[#bdb2a3] p-7 sm:p-8 md:min-h-[270px]"
                >
                  <span className="afortu-display text-4xl text-[#71562f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-10 !font-sans text-base font-extrabold text-[#071a2b]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#59666e]">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#fbf9f4]">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-32">
            <div>
              <p className="afortu-kicker">Alcance y límites</p>
              <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-5xl">
                Claridad antes de intervenir.
              </h2>
            </div>
            <ul className="border-t border-[#c7bdaf]">
              {limits.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[auto_1fr] gap-5 border-b border-[#c7bdaf] py-5 text-sm font-semibold leading-7 text-[#334852]"
                >
                  <span className="mt-3 h-px w-5 shrink-0 bg-[#8a693b]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-[#d8d0c4] bg-[#f6f2ea]">
          <div className="mx-auto max-w-[1020px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="text-center">
              <p className="afortu-kicker">Preguntas frecuentes</p>
              <h2 className="afortu-display mx-auto mt-6 max-w-2xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-5xl">
                Antes de iniciar.
              </h2>
            </div>

            <div className="mt-14 border-t border-[#c7bdaf]">
              {faqs.map((item, index) => (
                <article
                  key={item.question}
                  className="grid border-b border-[#c7bdaf] py-7 sm:grid-cols-[4rem_1fr] sm:gap-5"
                >
                  <span className="text-[0.62rem] font-extrabold tracking-[0.2em] text-[#71562f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-4 sm:mt-0">
                    <h3 className="!font-sans text-base font-extrabold text-[#071a2b]">
                      {item.question}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#59666e]">
                      {item.answer}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="afortu-contact-pattern text-white">
          <div className="mx-auto grid max-w-[1240px] gap-9 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
            <div>
              <p className="afortu-kicker afortu-kicker-light">
                Siguiente decisión
              </p>
              <h2 className="afortu-display mt-6 max-w-3xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] sm:text-6xl">
                Defina el alcance antes de elegir una solución.
              </h2>
            </div>
            <div className="grid gap-3">
              <Link href="/contact" className="afortu-primary-button">
                Solicitar diagnóstico
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={next.href}
                className="afortu-secondary-link text-slate-300 hover:text-white"
              >
                Continuar con {next.label}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

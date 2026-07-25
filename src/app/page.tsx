import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Landmark,
  PiggyBank,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { PublicFooter, PublicHeader } from "@/components/site/public-shell";

export const metadata: Metadata = {
  title: "Arquitectura patrimonial para proteger, ordenar y avanzar",
  description:
    "AFORTU coordina decisiones de patrimonio, retiro y legado mediante un Asesor Principal y especialistas económicos, fiscales y jurídicos.",
  alternates: {
    canonical: "/",
  },
};

const pillars = [
  {
    id: "patrimonio",
    number: "01",
    eyebrow: "Patrimonio",
    title: "Orden para decidir con claridad",
    description:
      "Integramos objetivos, flujo de efectivo, activos, obligaciones y riesgos para convertir información dispersa en una estrategia coordinada.",
    items: [
      "Diagnóstico patrimonial",
      "Estrategia financiera",
      "Seguimiento de decisiones",
    ],
  },
  {
    id: "retiro",
    number: "02",
    eyebrow: "Retiro",
    title: "Preparación con horizonte",
    description:
      "Revisamos la situación previsional y financiera para construir una ruta congruente con el tiempo, la liquidez y el nivel de riesgo.",
    items: [
      "Revisión previsional",
      "Proyección de escenarios",
      "Plan de aportaciones",
    ],
  },
  {
    id: "legado",
    number: "03",
    eyebrow: "Legado",
    title: "Continuidad con estructura",
    description:
      "Coordinamos la dimensión financiera, documental y jurídica para reducir fricciones y dar mayor claridad a la transmisión patrimonial.",
    items: [
      "Inventario y documentación",
      "Coordinación jurídica y fiscal",
      "Continuidad familiar o empresarial",
    ],
  },
];

const process = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Definimos objetivos, restricciones, prioridades y riesgos antes de recomendar una ruta.",
  },
  {
    number: "02",
    title: "Diseño e implementación",
    description:
      "Convertimos el diagnóstico en acciones, responsables, documentos y decisiones coordinadas.",
  },
  {
    number: "03",
    title: "Seguimiento",
    description:
      "Revisamos avances y ajustamos la estrategia cuando cambian las circunstancias o los objetivos.",
  },
];

const fitList = [
  "Su patrimonio está fragmentado entre decisiones financieras, fiscales o jurídicas.",
  "Necesita preparar su retiro y no quiere depender de una sola estimación.",
  "Busca ordenar documentos, beneficiarios, activos o continuidad familiar.",
  "Quiere un punto de coordinación, no recomendaciones aisladas.",
];

const coordination = [
  {
    number: "01",
    title: "Contexto centralizado",
    description: "Objetivos, restricciones y antecedentes en una misma visión.",
  },
  {
    number: "02",
    title: "Especialistas por alcance",
    description: "Cada disciplina interviene únicamente cuando corresponde.",
  },
  {
    number: "03",
    title: "Expediente y seguimiento",
    description: "Acuerdos, documentos y siguientes pasos con trazabilidad.",
  },
];

const domains = [
  {
    Icon: ShieldCheck,
    label: "Patrimonio",
    detail: "Activos, flujo y riesgo",
  },
  {
    Icon: PiggyBank,
    label: "Retiro",
    detail: "Tiempo, previsión y liquidez",
  },
  {
    Icon: Landmark,
    label: "Legado",
    detail: "Documentos y continuidad",
  },
];

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AFORTU",
    url: "https://afortu.com.mx",
    description:
      "Coordinación patrimonial para decisiones de patrimonio, retiro y legado mediante un modelo de Asesor Principal.",
    areaServed: {
      "@type": "Country",
      name: "México",
    },
    telephone: "+52 55 4814 4552",
    email: "contacto@afortu.com.mx",
  };

  return (
    <div className="afortu-public min-h-screen">
      <a
        href="#contenido"
        className="sr-only z-[60] rounded bg-white px-4 py-2 text-[#071625] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Ir al contenido
      </a>
      <PublicHeader />

      <main id="contenido">
        <section className="relative isolate overflow-hidden bg-[#071625] text-white">
          <Image
            src="/afortu-architecture-hero-v2.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="afortu-hero-image -z-20 object-cover object-[69%_center] max-md:opacity-55 md:object-center"
          />
          <div className="afortu-hero-surface absolute inset-0 -z-10" />

          <div className="afortu-hero-copy mx-auto grid min-h-[640px] max-w-[1240px] items-center gap-14 px-5 py-16 sm:min-h-[680px] sm:px-6 sm:py-24 lg:min-h-[720px] lg:grid-cols-[minmax(0,1fr)_auto] lg:px-8">
            <div className="max-w-[780px]">
              <p className="afortu-kicker afortu-kicker-light">
                Arquitectura patrimonial
              </p>
              <h1 className="afortu-display mt-8 max-w-[780px] text-[clamp(3.05rem,7vw,6.5rem)] font-medium leading-[0.91] tracking-[-0.047em]">
                Su patrimonio merece una estrategia{" "}
                <em className="font-medium text-[#d3ba84]">completa.</em>
              </h1>
              <p className="mt-8 max-w-[640px] text-base leading-8 text-slate-300 sm:text-[1.08rem] sm:leading-9">
                AFORTU coordina decisiones financieras, fiscales y jurídicas a
                través de un{" "}
                <strong className="font-semibold text-white">
                  Asesor Principal
                </strong>
                , para que cada acción responda a una misma visión.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
                <Link href="/contact" className="afortu-primary-button">
                  Solicitar diagnóstico
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#modelo"
                  className="afortu-secondary-link text-slate-200 hover:text-white"
                >
                  Conocer nuestro modelo
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-5 max-w-xl text-xs leading-5 text-slate-400">
                Primera conversación para identificar necesidades. No implica
                contratación ni recomendación de inversión.
              </p>
            </div>

            <div
              className="hidden items-center gap-8 self-stretch py-16 xl:flex"
              aria-hidden="true"
            >
              <span className="h-full w-px bg-gradient-to-b from-transparent via-[#c2a56d]/45 to-transparent" />
              <div className="afortu-hero-index flex items-center gap-8 text-[0.62rem] font-bold uppercase tracking-[0.32em] text-slate-400">
                <span>Patrimonio</span>
                <span className="h-1 w-1 rounded-full bg-[#c2a56d]" />
                <span>Retiro</span>
                <span className="h-1 w-1 rounded-full bg-[#c2a56d]" />
                <span>Legado</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.12] bg-[#050f1b]/82 backdrop-blur-sm">
            <div className="mx-auto grid max-w-[1240px] divide-y divide-white/[0.1] px-5 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
              {[
                ["01", "Diagnóstico integral", "Antes de recomendar"],
                ["02", "Responsable central", "Un Asesor Principal"],
                ["03", "Ruta documentada", "Decisiones con seguimiento"],
              ].map(([number, title, detail]) => (
                <div
                  key={number}
                  className="grid grid-cols-[auto_1fr] gap-x-4 px-1 py-6 md:px-7 md:first:pl-0 md:last:pr-0"
                >
                  <span className="text-xs font-bold tracking-[0.18em] text-[#c2a56d]">
                    {number}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{title}</p>
                    <p className="mt-1 text-xs text-slate-400">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#ded5c7] bg-[#fcfaf5]">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:px-8 lg:py-32">
            <div>
              <p className="afortu-kicker">Una sola visión</p>
              <h2 className="afortu-display mt-6 max-w-xl text-4xl font-medium leading-[0.98] tracking-[-0.035em] text-[#071625] sm:text-6xl">
                Las decisiones importantes no ocurren de forma aislada.
              </h2>
            </div>
            <div className="border-l border-[#76572a]/45 pl-6 sm:pl-10">
              <p className="afortu-display max-w-2xl text-2xl font-medium leading-[1.15] text-[#29364a] sm:text-[2rem]">
                Una decisión financiera puede transformar su liquidez, retiro,
                carga fiscal o continuidad familiar.
              </p>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-8 text-[#596371]">
                Por eso AFORTU trabaja sobre un tablero común: primero entiende
                el conjunto y después coordina cada especialidad.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#f4efe6]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
              <div>
                <p className="afortu-kicker">Tres horizontes conectados</p>
                <h2 className="afortu-display mt-6 max-w-3xl text-4xl font-medium leading-[0.98] tracking-[-0.035em] text-[#071625] sm:text-6xl">
                  Un solo patrimonio. Tres decisiones que deben conversar.
                </h2>
              </div>
              <p className="max-w-xl text-[1.02rem] leading-8 text-[#596371] lg:justify-self-end">
                Cada eje conserva su especialidad, pero ninguno se diseña sin
                considerar el efecto sobre los otros.
              </p>
            </div>

            <div className="mt-16">
              {pillars.map((pillar) => (
                <article
                  key={pillar.id}
                  id={pillar.id}
                  className="afortu-pillar-row scroll-mt-28"
                >
                  <span className="afortu-pillar-number" aria-hidden="true">
                    {pillar.number}
                  </span>
                  <div>
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#76572a]">
                      {pillar.eyebrow}
                    </p>
                    <h3 className="afortu-display mt-4 text-3xl font-semibold leading-[1.02] text-[#071625] sm:text-[2.35rem]">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="leading-7 text-[#596371]">
                    {pillar.description}
                  </p>
                  <ul className="grid gap-3 text-sm font-semibold leading-6 text-[#334158]">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-3 h-px w-5 shrink-0 bg-[#76572a]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="modelo"
          className="scroll-mt-24 overflow-hidden bg-[#071625] text-white"
        >
          <div className="mx-auto grid max-w-[1240px] gap-16 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:px-8 lg:py-32">
            <div>
              <p className="afortu-kicker afortu-kicker-light">
                Modelo de Asesor Principal
              </p>
              <h2 className="afortu-display mt-6 max-w-xl text-4xl font-medium leading-[0.98] tracking-[-0.035em] sm:text-6xl">
                Una visión. Un responsable de coordinación.
              </h2>
              <p className="mt-7 max-w-xl text-[1.02rem] leading-8 text-slate-300">
                El Asesor Principal organiza el diagnóstico, traduce prioridades
                y coordina la participación de especialistas para reducir
                contradicciones, omisiones y decisiones aisladas.
              </p>

              <div className="mt-10 grid gap-5">
                {coordination.map((item) => (
                  <div
                    key={item.number}
                    className="grid grid-cols-[2.6rem_1fr] border-t border-white/[0.13] pt-5"
                  >
                    <p className="text-xs font-bold tracking-[0.16em] text-[#c2a56d]">
                      {item.number}
                    </p>
                    <div>
                      <h3 className="!font-sans text-sm font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="afortu-secondary-link mt-7 text-[#d5bc87] hover:text-white"
              >
                Iniciar conversación
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="afortu-model-map p-5 sm:p-9 lg:p-12">
              <div className="afortu-model-node mx-auto max-w-[22rem] px-6 py-7 text-center">
                <UserRoundCheck
                  className="mx-auto h-7 w-7 text-[#c2a56d]"
                  aria-hidden="true"
                />
                <p className="mt-4 text-[0.66rem] font-bold uppercase tracking-[0.21em] text-[#c2a56d]">
                  Asesor Principal
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  Coordina prioridades, decisiones y especialistas
                </p>
              </div>

              <div className="mx-auto h-12 w-px bg-[#c2a56d]/55" />
              <div className="relative grid gap-4 border-t border-[#c2a56d]/45 pt-8 sm:grid-cols-3 sm:gap-5">
                {domains.map(({ Icon, label, detail }) => (
                  <div
                    key={label}
                    className="afortu-model-node afortu-model-connector px-4 py-7 text-center"
                  >
                    <Icon
                      className="mx-auto h-5 w-5 text-[#c2a56d]"
                      aria-hidden="true"
                    />
                    <p className="mt-4 font-bold">{label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-8 border-t border-white/[0.11] pt-6 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Un expediente · Una secuencia · Un seguimiento
              </p>
            </div>
          </div>
        </section>

        <section
          id="metodo"
          className="scroll-mt-24 border-b border-[#ded5c7] bg-[#fcfaf5]"
        >
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="afortu-kicker">Método de trabajo</p>
                <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.98] tracking-[-0.035em] text-[#071625] sm:text-6xl">
                  Primero entendemos. Después diseñamos.
                </h2>
              </div>
              <p className="max-w-2xl text-[1.02rem] leading-8 text-[#596371]">
                La recomendación viene después del diagnóstico. Cada etapa debe
                producir una decisión clara y un siguiente paso verificable.
              </p>
            </div>

            <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
              {process.map((step) => (
                <li key={step.number} className="afortu-method-step">
                  <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#76572a] bg-[#fcfaf5]">
                    <span className="h-2 w-2 rounded-full bg-[#76572a]" />
                  </div>
                  <span
                    className="afortu-display mt-8 block text-5xl font-medium text-[#76572a]/70"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <h3 className="mt-4 !font-sans text-lg font-bold text-[#071625]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-sm leading-7 text-[#596371]">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#eae1d3]">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-28">
            <div>
              <p className="afortu-kicker">¿Para quién es AFORTU?</p>
              <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.98] tracking-[-0.035em] text-[#071625] sm:text-5xl">
                Para quien necesita coordinación, no más ruido.
              </h2>
              <p className="mt-6 max-w-md leading-7 text-[#596371]">
                El diagnóstico inicial permite determinar si AFORTU es el
                coordinador adecuado y qué especialidad debe intervenir.
              </p>
            </div>
            <ul className="border-t border-[#b9aa93]">
              {fitList.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[auto_1fr] gap-5 border-b border-[#b9aa93] py-5 text-sm font-semibold leading-6 text-[#334158] sm:py-6"
                >
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#76572a]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="afortu-contact-pattern border-t border-[#c2a56d]/30 text-white">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-9 px-5 py-20 sm:px-6 sm:py-24 lg:flex-row lg:items-end lg:justify-between lg:px-8">
            <div>
              <p className="afortu-kicker afortu-kicker-light">
                Primer movimiento
              </p>
              <h2 className="afortu-display mt-6 max-w-3xl text-4xl font-medium leading-[0.98] tracking-[-0.035em] sm:text-6xl">
                Empiece por ordenar el tablero completo.
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-slate-300">
                Comparta su objetivo principal y le ayudaremos a identificar el
                alcance, la información necesaria y el siguiente paso.
              </p>
            </div>
            <Link href="/contact" className="afortu-primary-button shrink-0">
              Solicitar diagnóstico
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}

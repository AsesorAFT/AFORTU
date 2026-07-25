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
    <div className="min-h-screen bg-[#f7f3ea] text-[#15213a]">
      <a
        href="#contenido"
        className="sr-only z-[60] rounded bg-white px-4 py-2 text-[#07133f] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Ir al contenido
      </a>
      <PublicHeader />

      <main id="contenido">
        <section className="relative isolate overflow-hidden bg-[#07133f] text-white">
          <Image
            src="/afortu-architecture-hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="afortu-hero-image -z-20 object-cover object-[68%_center] lg:object-center"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,14,33,0.99)_0%,rgba(4,14,33,0.94)_38%,rgba(4,14,33,0.64)_62%,rgba(4,14,33,0.18)_100%)] max-lg:bg-[linear-gradient(90deg,rgba(4,14,33,0.96)_0%,rgba(4,14,33,0.86)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_40%,rgba(29,55,92,0.18),transparent_38%)]" />

          <div className="afortu-hero-copy mx-auto flex min-h-[690px] max-w-7xl items-center px-5 py-20 sm:px-6 sm:py-24 lg:px-10">
            <div className="max-w-[760px]">
              <p className="afortu-kicker afortu-kicker-light">
                Patrimonio · Retiro · Legado
              </p>
              <h1 className="afortu-display mt-7 max-w-[750px] text-[clamp(3.55rem,6.5vw,5.9rem)] font-medium leading-[0.96] tracking-[-0.035em]">
                Su patrimonio merece una estrategia completa.
              </h1>
              <p className="mt-7 max-w-[650px] text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
                AFORTU coordina decisiones financieras, fiscales y jurídicas a
                través de un{" "}
                <strong className="font-semibold text-white">
                  Asesor Principal
                </strong>
                , para que cada acción responda a una misma visión.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
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
          </div>

          <div className="border-t border-white/[0.12] bg-[#050f23]/78 backdrop-blur-sm">
            <div className="mx-auto grid max-w-7xl divide-y divide-white/[0.1] px-5 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-10">
              {[
                ["01", "Visión integral", "Decisiones conectadas"],
                ["02", "Coordinación", "Un Asesor Principal"],
                ["03", "Seguimiento", "Ruta documentada"],
              ].map(([number, title, detail]) => (
                <div
                  key={number}
                  className="grid grid-cols-[auto_1fr] gap-x-4 px-1 py-6 md:px-7 md:first:pl-0 md:last:pr-0"
                >
                  <span className="text-xs font-bold tracking-[0.18em] text-[#c5aa72]">
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

        <section className="border-b border-[#ded7ca] bg-[#fffdf8]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:px-10">
            <div>
              <p className="afortu-kicker">Arquitectura patrimonial</p>
              <h2 className="afortu-display mt-6 max-w-xl text-4xl font-medium leading-[1.02] tracking-[-0.025em] text-[#07133f] sm:text-5xl">
                Las decisiones más importantes no ocurren de forma aislada.
              </h2>
            </div>
            <div className="border-l border-[#9c7a3f]/45 pl-6 sm:pl-9">
              <p className="afortu-display max-w-2xl text-2xl font-medium leading-[1.2] text-[#293550] sm:text-3xl">
                Una decisión financiera puede transformar su liquidez, retiro,
                carga fiscal o continuidad familiar.
              </p>
              <p className="mt-5 max-w-2xl leading-7 text-[#596273]">
                Por eso AFORTU trabaja sobre un tablero común: primero entiende
                el conjunto y después coordina cada especialidad.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f3ea]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 lg:px-10">
            <div className="max-w-3xl">
              <p className="afortu-kicker">Tres decisiones conectadas</p>
              <h2 className="afortu-display mt-6 text-4xl font-medium leading-[1.02] tracking-[-0.025em] text-[#07133f] sm:text-5xl">
                Un solo patrimonio. Tres horizontes que deben conversar.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#596273]">
                Cada eje conserva su especialidad, pero ninguno se diseña sin
                considerar el efecto sobre los otros.
              </p>
            </div>

            <div className="mt-14 grid border-y border-[#c9bda9] md:grid-cols-3">
              {pillars.map((pillar, index) => (
                <article
                  key={pillar.id}
                  id={pillar.id}
                  className={`afortu-lift scroll-mt-32 px-1 py-10 md:px-8 md:py-12 ${
                    index > 0
                      ? "border-t border-[#c9bda9] md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#795f2e]">
                      {pillar.eyebrow}
                    </p>
                    <span className="afortu-display text-4xl leading-none text-[#9c7a3f]/45">
                      {pillar.number}
                    </span>
                  </div>
                  <h3 className="afortu-display mt-8 text-3xl font-semibold leading-[1.05] text-[#07133f]">
                    {pillar.title}
                  </h3>
                  <p className="mt-5 min-h-[112px] leading-7 text-[#596273]">
                    {pillar.description}
                  </p>
                  <ul className="mt-7 grid gap-3 border-t border-[#d8cfbf] pt-6 text-sm font-semibold text-[#33405a]">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-px w-5 shrink-0 bg-[#9c7a3f]" />
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
          className="scroll-mt-24 overflow-hidden bg-[#07133f] text-white"
        >
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:px-10">
            <div>
              <p className="afortu-kicker afortu-kicker-light">
                Modelo de Asesor Principal
              </p>
              <h2 className="afortu-display mt-6 max-w-xl text-4xl font-medium leading-[1.02] tracking-[-0.025em] sm:text-5xl">
                Una visión. Un responsable de coordinación.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                El Asesor Principal organiza el diagnóstico, traduce prioridades
                y coordina la participación de especialistas para reducir
                contradicciones, omisiones y decisiones aisladas.
              </p>
              <Link
                href="/contact"
                className="afortu-secondary-link mt-7 text-[#d9c28f] hover:text-white"
              >
                Iniciar conversación
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div>
              <div className="border border-white/[0.14] bg-white/[0.035] p-5 sm:p-8">
                <div className="mx-auto max-w-sm border border-[#c5aa72]/55 bg-[#0d2045] px-6 py-5 text-center">
                  <UserRoundCheck
                    className="mx-auto h-6 w-6 text-[#c5aa72]"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c5aa72]">
                    Asesor Principal
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    Coordina prioridades y especialistas
                  </p>
                </div>

                <div className="mx-auto h-10 w-px bg-[#c5aa72]/55" />

                <div className="grid gap-px bg-white/[0.13] sm:grid-cols-3">
                  {[
                    [ShieldCheck, "Patrimonio", "Activos, flujo y riesgo"],
                    [PiggyBank, "Retiro", "Tiempo, previsión y liquidez"],
                    [Landmark, "Legado", "Documentos y continuidad"],
                  ].map(([Icon, label, detail]) => {
                    const DomainIcon = Icon as typeof ShieldCheck;
                    return (
                      <div
                        key={label as string}
                        className="bg-[#091a38] px-5 py-6 text-center"
                      >
                        <DomainIcon
                          className="mx-auto h-5 w-5 text-[#c5aa72]"
                          aria-hidden="true"
                        />
                        <p className="mt-3 font-bold">{label as string}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          {detail as string}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 grid gap-x-8 sm:grid-cols-3">
                {coordination.map((item) => (
                  <div
                    key={item.number}
                    className="border-t border-white/[0.14] py-5"
                  >
                    <p className="text-xs font-bold tracking-[0.16em] text-[#c5aa72]">
                      {item.number}
                    </p>
                    <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="metodo"
          className="scroll-mt-24 border-b border-[#ded7ca] bg-[#fffdf8]"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <p className="afortu-kicker">Método de trabajo</p>
                <h2 className="afortu-display mt-6 text-4xl font-medium leading-[1.02] tracking-[-0.025em] text-[#07133f] sm:text-5xl">
                  Primero entendemos. Después diseñamos.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-[#596273]">
                La recomendación viene después del diagnóstico. Cada etapa debe
                producir una decisión clara y un siguiente paso verificable.
              </p>
            </div>

            <ol className="mt-14 grid border-y border-[#c9bda9] md:grid-cols-3">
              {process.map((step, index) => (
                <li
                  key={step.number}
                  className={`py-9 md:px-8 md:py-10 ${
                    index > 0
                      ? "border-t border-[#c9bda9] md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <span className="afortu-display text-4xl text-[#9c7a3f]/55">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-[#07133f]">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#596273]">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#eee6d8]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:px-10">
            <div>
              <p className="afortu-kicker">¿Para quién es AFORTU?</p>
              <h2 className="afortu-display mt-6 text-4xl font-medium leading-[1.02] tracking-[-0.025em] text-[#07133f] sm:text-5xl">
                Para quien necesita coordinación, no más ruido.
              </h2>
              <p className="mt-5 max-w-md leading-7 text-[#596273]">
                El diagnóstico inicial sirve para determinar si AFORTU es el
                coordinador adecuado y qué especialidad debe intervenir.
              </p>
            </div>
            <ul className="border-t border-[#bbae98]">
              {fitList.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 border-b border-[#bbae98] py-5 text-sm font-semibold leading-6 text-[#33405a] sm:py-6"
                >
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#795f2e]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-[#c5aa72]/30 bg-[#07133f] text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div>
              <p className="afortu-kicker afortu-kicker-light">
                Primer movimiento
              </p>
              <h2 className="afortu-display mt-5 max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.025em] sm:text-5xl">
                Empiece por ordenar el tablero completo.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
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

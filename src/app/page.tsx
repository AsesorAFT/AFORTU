import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  Compass,
  FileCheck2,
  Landmark,
  LineChart,
  Network,
  PiggyBank,
  Scale,
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
    icon: BriefcaseBusiness,
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
    icon: PiggyBank,
    eyebrow: "Retiro",
    title: "Preparación con horizonte",
    description:
      "Revisamos la situación previsional y financiera para construir una ruta de retiro congruente con el tiempo, la liquidez y el nivel de riesgo.",
    items: [
      "Revisión previsional",
      "Proyección de escenarios",
      "Plan de aportaciones",
    ],
  },
  {
    id: "legado",
    number: "03",
    icon: Landmark,
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
    icon: Compass,
    title: "Diagnóstico",
    description:
      "Definimos objetivos, restricciones, prioridades y riesgos antes de recomendar una ruta.",
  },
  {
    number: "02",
    icon: FileCheck2,
    title: "Diseño e implementación",
    description:
      "Convertimos el diagnóstico en acciones, responsables, documentos y decisiones coordinadas.",
  },
  {
    number: "03",
    icon: LineChart,
    title: "Seguimiento",
    description:
      "Revisamos avances y ajustamos la estrategia cuando cambian las circunstancias o los objetivos.",
  },
];

const fitList = [
  "Su patrimonio está fragmentado entre decisiones financieras, fiscales o jurídicas.",
  "Necesita preparar su retiro y no quiere depender de una sola estimación.",
  "Busca ordenar documentos, beneficiarios, activos o continuidad familiar.",
  "Quiere un punto de coordinación, no una colección de recomendaciones aisladas.",
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
    <div className="min-h-screen bg-[#fbf8f1] text-[#172033]">
      <a
        href="#contenido"
        className="sr-only z-[60] rounded bg-white px-4 py-2 text-[#10243f] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Ir al contenido
      </a>
      <PublicHeader />

      <main id="contenido">
        <section className="relative overflow-hidden border-b border-[#d9d2c3]/70">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(200,169,106,0.14),transparent_30%),radial-gradient(circle_at_10%_85%,rgba(29,73,118,0.09),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-28">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#c8a96a]/35 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#795f2e] shadow-sm">
                <ShieldCheck className="h-4 w-4" />
                Patrimonio · Retiro · Legado
              </div>
              <h1 className="max-w-4xl font-serif text-[clamp(3rem,7vw,5.8rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#10243f]">
                Su patrimonio merece una estrategia completa.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#596273] sm:text-xl sm:leading-9">
                AFORTU coordina decisiones financieras, fiscales y jurídicas a
                través de un{" "}
                <strong className="font-semibold text-[#10243f]">
                  Asesor Principal
                </strong>
                , para que cada acción responda a una misma visión.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#10243f] px-7 py-4 text-sm font-bold text-white shadow-[0_18px_40px_rgba(16,36,63,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#17375f]"
                >
                  Solicitar diagnóstico patrimonial
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#modelo"
                  className="inline-flex items-center justify-center rounded-full border border-[#bcb4a5] bg-white/70 px-7 py-4 text-sm font-bold text-[#10243f] transition-colors hover:bg-white"
                >
                  Conocer el modelo
                </Link>
              </div>
              <p className="mt-5 text-xs leading-5 text-[#7a746a]">
                Primera conversación para identificar necesidades. No implica
                contratación ni recomendación de inversión.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[540px]">
              <div className="absolute -inset-5 rounded-[2.5rem] border border-[#c8a96a]/20" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#10243f] p-6 text-white shadow-[0_35px_100px_rgba(16,36,63,0.28)] sm:p-8">
                <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full border border-[#d4bd8a]/20" />
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-[#d4bd8a]/20" />
                <div className="relative">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d0b77e]">
                        Visión coordinada
                      </p>
                      <p className="mt-2 font-serif text-2xl">
                        Un solo tablero
                      </p>
                    </div>
                    <Network className="h-7 w-7 text-[#d0b77e]" />
                  </div>

                  <div className="my-7 grid gap-3">
                    {[
                      {
                        label: "Patrimonio",
                        detail: "Activos, flujo y riesgo",
                        icon: BarChart3,
                      },
                      {
                        label: "Retiro",
                        detail: "Tiempo, previsión y liquidez",
                        icon: PiggyBank,
                      },
                      {
                        label: "Legado",
                        detail: "Documentos y continuidad",
                        icon: Landmark,
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4"
                        >
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d0b77e]/15 text-[#e2ca95]">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="font-bold">{item.label}</p>
                            <p className="mt-1 text-xs text-slate-300">
                              {item.detail}
                            </p>
                          </div>
                          <Check className="ml-auto h-4 w-4 text-[#d0b77e]" />
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-2xl bg-[#f7f1e5] p-5 text-[#10243f]">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#10243f] text-white">
                        <UserRoundCheck className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8d6c2f]">
                          Asesor Principal
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          Coordina prioridades y especialistas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d9d2c3]/70 bg-[#f2ecdf]">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 text-sm font-semibold text-[#4f5867] sm:px-8 md:grid-cols-3 lg:px-10">
            <div className="flex items-center gap-3">
              <Scale className="h-5 w-5 text-[#8d6c2f]" />
              Coordinación económica, fiscal y jurídica
            </div>
            <div className="flex items-center gap-3">
              <FileCheck2 className="h-5 w-5 text-[#8d6c2f]" />
              Decisiones documentadas y trazables
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#8d6c2f]" />
              Alcance definido antes de implementar
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8d6c2f]">
                Tres decisiones conectadas
              </p>
              <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-[-0.03em] text-[#10243f] sm:text-5xl">
                El patrimonio no se administra por partes.
              </h2>
              <p className="mt-5 max-w-md leading-7 text-[#606979]">
                Una decisión de inversión puede afectar liquidez, impuestos,
                retiro o sucesión. Por eso trabajamos con una arquitectura
                común.
              </p>
            </div>

            <div className="grid gap-5">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <article
                    key={pillar.id}
                    id={pillar.id}
                    className="scroll-mt-28 rounded-[1.75rem] border border-[#d9d2c3] bg-[#fffdf8] p-6 shadow-[0_18px_50px_rgba(16,36,63,0.055)] sm:p-8"
                  >
                    <div className="grid gap-6 md:grid-cols-[auto_1fr_0.8fr] md:items-start">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10243f] text-[#e2ca95]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d6c2f]">
                          {pillar.number} · {pillar.eyebrow}
                        </p>
                        <h3 className="mt-2 font-serif text-2xl font-semibold text-[#10243f] sm:text-3xl">
                          {pillar.title}
                        </h3>
                        <p className="mt-3 leading-7 text-[#626b79]">
                          {pillar.description}
                        </p>
                      </div>
                      <ul className="grid gap-3 border-t border-[#e3dccf] pt-5 text-sm font-semibold text-[#445064] md:border-l md:border-t-0 md:pl-6 md:pt-0">
                        {pillar.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9a7737]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="modelo" className="scroll-mt-24 bg-[#10243f] text-white">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:px-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d0b77e]">
                Modelo de Asesor Principal
              </p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl font-medium leading-tight tracking-[-0.03em] sm:text-5xl">
                Una visión. Un responsable de coordinación.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                El Asesor Principal organiza el diagnóstico, traduce prioridades
                y coordina la participación de especialistas. El objetivo es
                reducir contradicciones, omisiones y decisiones aisladas.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d0b77e] px-6 py-3.5 text-sm font-bold text-[#10243f] transition-colors hover:bg-[#e0c88f]"
              >
                Iniciar conversación
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: UserRoundCheck,
                  title: "Punto de contacto",
                  description:
                    "Centraliza contexto, prioridades y seguimiento.",
                },
                {
                  icon: Scale,
                  title: "Especialistas",
                  description:
                    "Intervienen según el alcance real de cada asunto.",
                },
                {
                  icon: FileCheck2,
                  title: "Expediente",
                  description:
                    "Da trazabilidad a información, acuerdos y documentos.",
                },
                {
                  icon: Network,
                  title: "Coordinación",
                  description:
                    "Conecta decisiones que normalmente se atienden por separado.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.055] p-6"
                  >
                    <Icon className="h-6 w-6 text-[#d0b77e]" />
                    <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="metodo"
          className="scroll-mt-24 mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8d6c2f]">
              Método de trabajo
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-[-0.03em] text-[#10243f] sm:text-5xl">
              Primero entendemos. Después diseñamos.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#606979]">
              La recomendación viene después del diagnóstico. Cada etapa debe
              producir una decisión clara y un siguiente paso verificable.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {process.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.number}
                  className="relative overflow-hidden rounded-[1.75rem] border border-[#d9d2c3] bg-[#fffdf8] p-7"
                >
                  <span className="absolute right-5 top-2 font-serif text-7xl text-[#ede5d6]">
                    {step.number}
                  </span>
                  <div className="relative">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10243f] text-[#e2ca95]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-8 font-serif text-2xl font-semibold text-[#10243f]">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-7 text-[#606979]">
                      {step.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-y border-[#d9d2c3] bg-[#f2ecdf]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:px-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8d6c2f]">
                ¿Para quién es AFORTU?
              </p>
              <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-[-0.03em] text-[#10243f]">
                Para quien necesita coordinación, no más ruido.
              </h2>
              <p className="mt-5 leading-7 text-[#606979]">
                El diagnóstico inicial sirve para determinar si AFORTU es el
                coordinador adecuado y qué especialidad debe intervenir.
              </p>
            </div>
            <ul className="grid gap-3">
              {fitList.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-2xl border border-[#d7cdbb] bg-[#fffdf8] p-5 text-sm font-semibold leading-6 text-[#455064]"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#8d6c2f]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#10243f] px-6 py-14 text-center text-white shadow-[0_30px_80px_rgba(16,36,63,0.2)] sm:px-12 sm:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(208,183,126,0.16),transparent_24%),radial-gradient(circle_at_90%_85%,rgba(46,103,163,0.28),transparent_30%)]" />
            <div className="relative mx-auto max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d0b77e]">
                Primer movimiento
              </p>
              <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-[-0.03em] sm:text-5xl">
                Empiece por ordenar el tablero completo.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Comparta su objetivo principal y le ayudaremos a identificar el
                alcance, la información necesaria y el siguiente paso.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d0b77e] px-7 py-4 text-sm font-bold text-[#10243f] transition-all hover:-translate-y-0.5 hover:bg-[#e0c88f]"
              >
                Solicitar diagnóstico patrimonial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
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

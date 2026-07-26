import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  ChevronRight,
  FileCheck2,
  Landmark,
  Network,
  PiggyBank,
  ShieldCheck,
  Target,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import {
  OfficialEmblem,
  PublicFooter,
  PublicHeader,
} from "@/components/site/public-shell";

export const metadata: Metadata = {
  title: "Patrimonio, retiro y legado bajo una misma arquitectura",
  description:
    "AFORTU coordina el diagnóstico, la estrategia y el seguimiento de decisiones patrimoniales mediante un Asesor Principal.",
  alternates: {
    canonical: "/",
  },
};

const commitments = [
  {
    number: "01",
    title: "Diagnóstico documentado",
    detail: "Primero se entiende el caso; después se define una ruta.",
  },
  {
    number: "02",
    title: "Alcance definido",
    detail: "Cada intervención tiene objetivo, responsable y límite.",
  },
  {
    number: "03",
    title: "Seguimiento continuo",
    detail: "Los acuerdos se convierten en acciones verificables.",
  },
];

const solutions = [
  {
    id: "patrimonio",
    number: "01",
    Icon: ShieldCheck,
    label: "Patrimonio",
    href: "/patrimonio",
    title: "Ordenar antes de mover.",
    situation:
      "Cuando activos, flujo, obligaciones y decisiones compiten entre sí sin una visión común.",
    description:
      "Integramos la información relevante para priorizar decisiones, proteger liquidez y reducir contradicciones.",
    analysis: [
      "Objetivos y restricciones",
      "Activos y obligaciones",
      "Liquidez y exposición al riesgo",
    ],
    output: "Mapa patrimonial y secuencia de prioridades.",
  },
  {
    id: "retiro",
    number: "02",
    Icon: PiggyBank,
    label: "Retiro",
    href: "/retiro",
    title: "Preparar con horizonte.",
    situation:
      "Cuando existe ahorro o cotización, pero no una ruta que conecte tiempo, liquidez y escenarios.",
    description:
      "Revisamos el punto de partida y construimos una estrategia progresiva, ajustable y congruente con el horizonte.",
    analysis: [
      "Situación previsional",
      "Escenarios y brechas",
      "Capacidad de aportación",
    ],
    output: "Comparativo de escenarios y ruta de acción.",
  },
  {
    id: "legado",
    number: "03",
    Icon: Landmark,
    label: "Legado",
    href: "/legado",
    title: "Dar continuidad con estructura.",
    situation:
      "Cuando patrimonio, documentos, beneficiarios y continuidad familiar o empresarial no están alineados.",
    description:
      "Organizamos la dimensión patrimonial y coordinamos la intervención fiscal o jurídica cuando el caso lo requiere.",
    analysis: [
      "Inventario y titularidad",
      "Documentación y beneficiarios",
      "Riesgos de continuidad",
    ],
    output: "Ruta documental y coordinación especializada.",
  },
];

const coordinationLayers = [
  {
    Icon: Target,
    label: "Dirección",
    title: "Objetivo y criterio",
    detail: "Qué se busca, qué se protege y qué restricción manda.",
  },
  {
    Icon: UsersRound,
    label: "Coordinación",
    title: "Especialistas por alcance",
    detail: "Cada disciplina participa en el momento y límite adecuados.",
  },
  {
    Icon: FileCheck2,
    label: "Control",
    title: "Expediente central",
    detail: "Antecedentes, acuerdos y documentos bajo una misma secuencia.",
  },
  {
    Icon: BookOpenCheck,
    label: "Continuidad",
    title: "Seguimiento verificable",
    detail: "Responsables, fechas y próximos movimientos visibles.",
  },
];

const governance = [
  {
    number: "01",
    eyebrow: "Contexto",
    title: "Ficha maestra del caso",
    description:
      "Objetivos, restricciones, antecedentes y documentos relevantes en una sola vista.",
  },
  {
    number: "02",
    eyebrow: "Decisión",
    title: "Matriz de prioridades",
    description:
      "Impacto, urgencia, dependencia, costo y riesgo para decidir la secuencia correcta.",
  },
  {
    number: "03",
    eyebrow: "Ejecución",
    title: "Responsables y entregables",
    description:
      "Cada acción tiene dueño, alcance, información necesaria y resultado esperado.",
  },
  {
    number: "04",
    eyebrow: "Control",
    title: "Ciclo de revisión",
    description:
      "Seguimiento de avances y ajustes cuando cambian las condiciones o los objetivos.",
  },
];

const process = [
  {
    number: "01",
    label: "Exploración",
    title: "Definir bien el problema",
    description:
      "Identificamos la decisión principal, el horizonte y la información disponible.",
    result: "Resultado: brief inicial.",
  },
  {
    number: "02",
    label: "Diagnóstico",
    title: "Entender el tablero completo",
    description:
      "Ordenamos variables financieras, documentales, fiscales o jurídicas según el caso.",
    result: "Resultado: mapa de situación.",
  },
  {
    number: "03",
    label: "Arquitectura",
    title: "Diseñar la ruta",
    description:
      "Comparamos opciones, dependencias y riesgos para definir la secuencia de trabajo.",
    result: "Resultado: plan coordinado.",
  },
  {
    number: "04",
    label: "Seguimiento",
    title: "Convertir criterio en avance",
    description:
      "Damos trazabilidad a acuerdos, documentos, responsables y siguientes decisiones.",
    result: "Resultado: control de ejecución.",
  },
];

const situations = [
  {
    title: "Patrimonio fragmentado",
    detail:
      "Hay activos y decisiones, pero no una estrategia común que ordene prioridades.",
  },
  {
    title: "Retiro sin ruta",
    detail:
      "Existen datos, ahorro o derechos por revisar, pero falta comparar escenarios.",
  },
  {
    title: "Documentación dispersa",
    detail:
      "La continuidad depende de documentos, titulares o beneficiarios aún no coordinados.",
  },
  {
    title: "Transición familiar o empresarial",
    detail:
      "Varias personas y especialidades deben avanzar sin perder el control del conjunto.",
  },
];

const whatWeDo = [
  "Diagnosticar antes de recomendar.",
  "Coordinar especialistas cuando corresponde.",
  "Documentar alcance, decisiones y siguientes pasos.",
  "Revisar la estrategia cuando cambia el contexto.",
];

const whatWeDoNotDo = [
  "Prometer resultados o rendimientos.",
  "Sustituir a profesionales autorizados en materias reservadas.",
  "Tomar decisiones sin información suficiente.",
  "Aplicar la misma solución a todos los casos.",
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
        className="sr-only z-[60] rounded bg-white px-4 py-2 text-[#071a2b] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Ir al contenido
      </a>
      <PublicHeader />

      <main id="contenido">
        <section className="relative isolate overflow-hidden border-b border-[#d8d0c4] bg-[#f6f2ea] text-[#071a2b]">
          <div className="afortu-hero-blueprint absolute inset-0 -z-10 opacity-70" />
          <div className="mx-auto grid min-h-[620px] max-w-[1380px] lg:min-h-[700px] lg:grid-cols-[minmax(0,1.16fr)_minmax(420px,0.84fr)]">
            <div className="flex items-center px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28 xl:px-20">
              <div className="max-w-[780px]">
                <p className="afortu-kicker">Arquitectura patrimonial</p>
                <h1 className="afortu-display mt-8 text-[clamp(2.85rem,6.9vw,6.9rem)] font-medium leading-[0.88] tracking-[-0.052em]">
                  Patrimonio, retiro y legado bajo una misma{" "}
                  <em className="font-medium text-[#8a693b]">arquitectura.</em>
                </h1>
                <p className="mt-9 max-w-[670px] text-[1.04rem] leading-8 text-[#4e5b64] sm:text-[1.12rem] sm:leading-9">
                  AFORTU coordina el diagnóstico, la estrategia y el seguimiento
                  de sus decisiones patrimoniales mediante un{" "}
                  <strong className="font-bold text-[#071a2b]">
                    Asesor Principal
                  </strong>
                  .
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
                  <Link href="/contact" className="afortu-dark-button">
                    Solicitar diagnóstico
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/modelo-afortu"
                    className="afortu-secondary-link text-[#30404a] hover:text-[#071a2b]"
                  >
                    Conocer el modelo AFORTU
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <p className="mt-6 max-w-xl text-xs leading-5 text-[#69747b]">
                  La conversación inicial identifica necesidades y alcance. No
                  implica contratación ni recomendación de inversión.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden bg-[#071a2b] px-5 py-8 text-white sm:px-8 sm:py-14 lg:flex lg:items-center lg:px-12 lg:py-20">
              <div className="afortu-symbol-grid absolute inset-0 opacity-35" />
              <div className="relative mx-auto w-full max-w-[500px]">
                <div className="border border-[#b89663]/35 bg-[#f6f2ea] px-6 py-6 shadow-[0_30px_90px_rgba(0,0,0,0.22)] sm:px-12 sm:py-11">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[#71562f]">
                    Identidad AFORTU
                  </p>
                  <OfficialEmblem className="mx-auto mt-5 h-[175px] w-[175px] sm:h-[245px] sm:w-[245px]" />
                  <div className="mt-7 border-t border-[#c9beae] pt-6 text-center">
                    <p className="text-2xl font-extrabold tracking-[0.22em] text-[#071a2b] sm:text-3xl">
                      AFORTU
                    </p>
                    <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-[#071a2b]">
                      Patrimonio · Retiro · Legado
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-x border-b border-white/[0.13]">
                  {solutions.map((solution) => (
                    <div
                      key={solution.id}
                      className="grid grid-cols-[2.8rem_1fr_auto] items-center gap-3 border-t border-white/[0.13] px-5 py-4"
                    >
                      <span className="text-[0.65rem] font-bold tracking-[0.18em] text-[#b89663]">
                        {solution.number}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {solution.label}
                      </span>
                      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Integrado
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#d8d0c4] bg-[#fbf9f4]">
            <div className="mx-auto grid max-w-[1240px] divide-y divide-[#d8d0c4] px-5 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
              {commitments.map((item) => (
                <div
                  key={item.number}
                  className="grid grid-cols-[auto_1fr] gap-x-4 px-1 py-6 md:px-8 md:first:pl-0 md:last:pr-0"
                >
                  <span className="text-xs font-extrabold tracking-[0.18em] text-[#8a693b]">
                    {item.number}
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-[#071a2b]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#69747b]">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8d0c4] bg-[#fbf9f4]">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:px-8 lg:py-32">
            <div>
              <p className="afortu-kicker">La estructura AFORTU</p>
              <h2 className="afortu-display mt-6 max-w-xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-6xl">
                No sumamos servicios. Integramos decisiones.
              </h2>
            </div>
            <div className="border-l border-[#8a693b]/45 pl-6 sm:pl-10">
              <p className="afortu-display max-w-2xl text-2xl font-medium leading-[1.12] text-[#263946] sm:text-[2.15rem]">
                Una decisión patrimonial puede cambiar liquidez, retiro,
                impuestos, documentos y continuidad familiar.
              </p>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-8 text-[#59666e]">
                Por eso AFORTU gobierna el caso desde un punto central: una
                visión, una secuencia de trabajo y especialistas coordinados por
                alcance.
              </p>
            </div>
          </div>
        </section>

        <section id="soluciones" className="scroll-mt-32 bg-[#eee8de]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.68fr] lg:items-end">
              <div>
                <p className="afortu-kicker">Arquitectura de soluciones</p>
                <h2 className="afortu-display mt-6 max-w-3xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-6xl">
                  Tres áreas. Un solo sistema de decisión.
                </h2>
              </div>
              <p className="max-w-xl text-[1.02rem] leading-8 text-[#59666e] lg:justify-self-end">
                Cada área explica la situación que atiende, lo que se analiza y
                el resultado de trabajo esperado.
              </p>
            </div>

            <div className="mt-16 border-t border-[#bdb2a3]">
              {solutions.map(
                ({
                  id,
                  number,
                  Icon,
                  label,
                  href,
                  title,
                  situation,
                  description,
                  analysis,
                  output,
                }) => (
                  <article
                    key={id}
                    id={id}
                    className="afortu-solution-row scroll-mt-32"
                  >
                    <div className="flex items-start justify-between gap-4 lg:block">
                      <span
                        className="afortu-display block text-5xl font-medium leading-none text-[#8a693b]/55 lg:text-6xl"
                        aria-hidden="true"
                      >
                        {number}
                      </span>
                      <Icon
                        className="h-6 w-6 text-[#8a693b] lg:mt-14"
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.21em] text-[#71562f]">
                        {label}
                      </p>
                      <h3 className="afortu-display mt-4 text-3xl font-semibold leading-[1] text-[#071a2b] sm:text-[2.65rem]">
                        {title}
                      </h3>
                      <p className="mt-5 text-sm font-bold leading-6 text-[#334852]">
                        {situation}
                      </p>
                      <p className="mt-4 leading-7 text-[#59666e]">
                        {description}
                      </p>
                    </div>

                    <div>
                      <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#71562f]">
                        Analizamos
                      </p>
                      <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-[#334852]">
                        {analysis.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-3 h-px w-5 shrink-0 bg-[#8a693b]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-l border-[#bdb2a3] pl-6">
                      <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#71562f]">
                        Resultado de trabajo
                      </p>
                      <p className="mt-5 text-sm font-extrabold leading-6 text-[#071a2b]">
                        {output}
                      </p>
                      <Link
                        href={href}
                        className="afortu-secondary-link mt-4 justify-start text-[#71562f] hover:text-[#071a2b]"
                      >
                        Conocer la solución
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          id="modelo"
          className="scroll-mt-32 overflow-hidden bg-[#071a2b] text-white"
        >
          <div className="mx-auto grid max-w-[1240px] gap-16 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:px-8 lg:py-32">
            <div>
              <p className="afortu-kicker afortu-kicker-light">Modelo AFORTU</p>
              <h2 className="afortu-display mt-6 max-w-xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] sm:text-6xl">
                Un Asesor Principal gobierna el conjunto.
              </h2>
              <p className="mt-7 max-w-xl text-[1.02rem] leading-8 text-slate-300">
                No todas las decisiones requieren a todos los especialistas. El
                Asesor Principal define la secuencia, concentra el contexto y
                coordina únicamente las intervenciones necesarias.
              </p>
              <div className="mt-10 border-t border-white/[0.14]">
                {[
                  "Una visión del caso",
                  "Un responsable de coordinación",
                  "Un expediente y una secuencia",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex min-h-14 items-center gap-4 border-b border-white/[0.14] text-sm font-bold text-slate-200"
                  >
                    <Check
                      className="h-4 w-4 text-[#b89663]"
                      aria-hidden="true"
                    />
                    {item}
                  </div>
                ))}
              </div>
              <Link
                href="/modelo-afortu"
                className="afortu-secondary-link mt-7 justify-start text-[#d5bc87] hover:text-white"
              >
                Ver modelo completo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="afortu-operating-map">
              <div className="afortu-operating-map-header">
                <span>AFORTU / Sistema de coordinación</span>
                <span>01—04</span>
              </div>

              <div className="grid gap-px bg-[#b89663]/25 sm:grid-cols-2">
                {coordinationLayers.map(({ Icon, label, title, detail }) => (
                  <div
                    key={label}
                    className="bg-[#0c2438] p-6 sm:min-h-[190px] sm:p-8"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.21em] text-[#b89663]">
                        {label}
                      </p>
                      <Icon
                        className="h-5 w-5 text-[#b89663]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-7 !font-sans text-base font-extrabold text-white">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid items-center gap-5 border-t border-[#b89663]/30 bg-[#081d2e] p-6 sm:grid-cols-[auto_1fr_auto] sm:p-8">
                <UserRoundCheck
                  className="h-7 w-7 text-[#b89663]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[0.63rem] font-extrabold uppercase tracking-[0.2em] text-[#b89663]">
                    Asesor Principal
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">
                    Integra contexto, criterio, responsables y seguimiento.
                  </p>
                </div>
                <Network
                  className="hidden h-7 w-7 text-slate-500 sm:block"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="gobierno"
          className="scroll-mt-32 border-b border-[#d8d0c4] bg-[#fbf9f4]"
        >
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <p className="afortu-kicker">Gobierno del caso</p>
                <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-6xl">
                  La sofisticación está en el control.
                </h2>
              </div>
              <p className="max-w-2xl text-[1.02rem] leading-8 text-[#59666e]">
                AFORTU debe sentirse estructurada porque el trabajo también lo
                está: información centralizada, criterios visibles, responsables
                definidos y revisiones periódicas.
              </p>
            </div>

            <div className="mt-16 grid border-l border-t border-[#c7bdaf] md:grid-cols-2 xl:grid-cols-4">
              {governance.map((item) => (
                <article
                  key={item.number}
                  className="min-h-[300px] border-b border-r border-[#c7bdaf] p-7 sm:p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="afortu-display text-4xl text-[#8a693b]/55">
                      {item.number}
                    </span>
                    <span className="text-[0.61rem] font-extrabold uppercase tracking-[0.2em] text-[#71562f]">
                      {item.eyebrow}
                    </span>
                  </div>
                  <h3 className="mt-12 !font-sans text-lg font-extrabold text-[#071a2b]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#59666e]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#e5ddd1]">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-28">
            <div>
              <p className="afortu-kicker">Cuándo agrega valor</p>
              <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-5xl">
                Cuando el problema ya no cabe en una sola especialidad.
              </h2>
            </div>
            <div className="grid border-l border-t border-[#b9ab98] sm:grid-cols-2">
              {situations.map((item, index) => (
                <article
                  key={item.title}
                  className="min-h-[220px] border-b border-r border-[#b9ab98] p-6 sm:p-8"
                >
                  <span className="text-[0.62rem] font-extrabold tracking-[0.2em] text-[#71562f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-9 !font-sans text-base font-extrabold text-[#071a2b]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#59666e]">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="metodo"
          className="scroll-mt-32 border-b border-[#d8d0c4] bg-[#f6f2ea]"
        >
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="afortu-kicker">Método de trabajo</p>
                <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-6xl">
                  Del problema al control de ejecución.
                </h2>
              </div>
              <p className="max-w-2xl text-[1.02rem] leading-8 text-[#59666e]">
                Cada etapa produce una salida concreta antes de avanzar a la
                siguiente. Así se evita confundir conversación con progreso.
              </p>
            </div>

            <ol className="mt-16 grid border-l border-t border-[#c7bdaf] md:grid-cols-2 xl:grid-cols-4">
              {process.map((step) => (
                <li
                  key={step.number}
                  className="group min-h-[350px] border-b border-r border-[#c7bdaf] p-7 transition-colors hover:bg-[#fbf9f4] sm:p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="afortu-display text-5xl font-medium text-[#8a693b]/60">
                      {step.number}
                    </span>
                    <span className="text-[0.61rem] font-extrabold uppercase tracking-[0.2em] text-[#71562f]">
                      {step.label}
                    </span>
                  </div>
                  <h3 className="mt-12 !font-sans text-lg font-extrabold leading-6 text-[#071a2b]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#59666e]">
                    {step.description}
                  </p>
                  <p className="mt-8 border-t border-[#c7bdaf] pt-5 text-xs font-bold uppercase leading-5 tracking-[0.12em] text-[#71562f]">
                    {step.result}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="confianza"
          className="scroll-mt-32 bg-[#102a3f] text-white"
        >
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-32">
            <div>
              <p className="afortu-kicker afortu-kicker-light">
                Claridad de alcance
              </p>
              <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.96] tracking-[-0.04em] sm:text-5xl">
                La confianza también se diseña.
              </h2>
              <p className="mt-6 max-w-md leading-7 text-slate-300">
                Una firma seria explica tanto lo que hace como los límites de su
                intervención.
              </p>
            </div>

            <div className="grid border-l border-t border-white/[0.15] md:grid-cols-2">
              <div className="border-b border-r border-white/[0.15] p-7 sm:p-9">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#c7ab76]">
                  Lo que hacemos
                </p>
                <ul className="mt-8 grid gap-5">
                  {whatWeDo.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 text-sm font-semibold leading-6 text-slate-200"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#c7ab76]"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-b border-r border-white/[0.15] p-7 sm:p-9">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#c7ab76]">
                  Lo que no hacemos
                </p>
                <ul className="mt-8 grid gap-5">
                  {whatWeDoNotDo.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 text-sm font-semibold leading-6 text-slate-300"
                    >
                      <span className="mt-3 h-px w-4 shrink-0 bg-[#c7ab76]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="afortu-contact-pattern border-t border-[#b89663]/30 text-white">
          <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
            <div>
              <p className="afortu-kicker afortu-kicker-light">
                Primer movimiento
              </p>
              <h2 className="afortu-display mt-6 max-w-3xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] sm:text-6xl">
                Empiece por definir el problema correctamente.
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-slate-300">
                Comparta su objetivo principal. AFORTU identificará el alcance,
                la información necesaria y el siguiente paso.
              </p>
            </div>
            <div className="lg:text-right">
              <Link href="/contact" className="afortu-primary-button">
                Solicitar diagnóstico
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="mt-4 text-xs text-slate-500">
                Sin obligación de contratación.
              </p>
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

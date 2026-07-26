import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleArrowOutUpRight,
  FileCheck2,
  Landmark,
  Network,
  PiggyBank,
  ScanLine,
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
  title: "Decisiones patrimoniales coordinadas de principio a fin",
  description:
    "AFORTU integra patrimonio, retiro y legado mediante un Asesor Principal, un expediente central y una ruta documentada.",
  alternates: {
    canonical: "/",
  },
};

const commitments = [
  {
    number: "01",
    title: "Diagnóstico documentado",
    detail: "El caso se entiende antes de definir una ruta.",
  },
  {
    number: "02",
    title: "Alcance y responsables",
    detail: "Cada intervención tiene objetivo, responsable y límite.",
  },
  {
    number: "03",
    title: "Seguimiento verificable",
    detail: "Los acuerdos se convierten en próximos movimientos.",
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
    description:
      "Integramos activos, obligaciones, liquidez, riesgos y objetivos para definir qué debe ocurrir primero.",
    output: "Mapa patrimonial y secuencia de prioridades.",
    visual: "map",
  },
  {
    id: "retiro",
    number: "02",
    Icon: PiggyBank,
    label: "Retiro",
    href: "/retiro",
    title: "Preparar con horizonte.",
    description:
      "Comparamos punto de partida, tiempo, capacidad de aportación y escenarios para construir una ruta progresiva.",
    output: "Comparativo de escenarios y ruta de acción.",
    visual: "timeline",
  },
  {
    id: "legado",
    number: "03",
    Icon: Landmark,
    label: "Legado",
    href: "/legado",
    title: "Dar continuidad con estructura.",
    description:
      "Organizamos titularidad, documentos, beneficiarios y riesgos de continuidad, coordinando especialistas cuando corresponde.",
    output: "Ruta documental y coordinación especializada.",
    visual: "network",
  },
];

const coordinationLayers = [
  {
    Icon: Target,
    label: "Dirección",
    title: "Objetivo y criterio",
    detail: "Qué se busca, qué se protege y qué restricción gobierna.",
  },
  {
    Icon: UsersRound,
    label: "Coordinación",
    title: "Especialistas por alcance",
    detail: "Cada disciplina interviene en el momento adecuado.",
  },
  {
    Icon: FileCheck2,
    label: "Control",
    title: "Expediente central",
    detail: "Antecedentes, documentos y acuerdos en una secuencia.",
  },
  {
    Icon: Network,
    label: "Continuidad",
    title: "Seguimiento verificable",
    detail: "Responsables, fechas y próximos movimientos visibles.",
  },
];

const process = [
  {
    number: "01",
    label: "Exploración",
    title: "Definir el problema",
    description:
      "Identificamos la decisión principal, el horizonte y la información disponible.",
    result: "Brief inicial",
  },
  {
    number: "02",
    label: "Diagnóstico",
    title: "Entender el tablero",
    description:
      "Ordenamos variables financieras, documentales, fiscales o jurídicas según el caso.",
    result: "Mapa de situación",
  },
  {
    number: "03",
    label: "Arquitectura",
    title: "Diseñar la ruta",
    description:
      "Comparamos opciones, dependencias y riesgos para definir una secuencia de trabajo.",
    result: "Plan coordinado",
  },
  {
    number: "04",
    label: "Seguimiento",
    title: "Controlar el avance",
    description:
      "Damos trazabilidad a acuerdos, documentos, responsables y siguientes decisiones.",
    result: "Tablero de control",
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

function SolutionSignal({ type }: { type: string }) {
  if (type === "timeline") {
    return (
      <div className="afortu-signal afortu-signal-timeline" aria-hidden="true">
        <div className="afortu-signal-caption">
          <span>Horizonte</span>
          <span>Ruta progresiva</span>
        </div>
        <div className="afortu-timeline-line">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="afortu-timeline-labels">
          <span>Hoy</span>
          <span>Objetivo</span>
        </div>
      </div>
    );
  }

  if (type === "network") {
    return (
      <div className="afortu-signal afortu-signal-network" aria-hidden="true">
        <span className="afortu-network-node afortu-network-node-main">
          Continuidad
        </span>
        <span className="afortu-network-node afortu-network-node-a">
          Titularidad
        </span>
        <span className="afortu-network-node afortu-network-node-b">
          Documentos
        </span>
        <span className="afortu-network-node afortu-network-node-c">
          Beneficiarios
        </span>
      </div>
    );
  }

  return (
    <div className="afortu-signal afortu-signal-map" aria-hidden="true">
      <div className="afortu-signal-caption">
        <span>Mapa de decisión</span>
        <span>Vista integrada</span>
      </div>
      <div className="afortu-map-rings">
        <span className="afortu-map-ring afortu-map-ring-outer" />
        <span className="afortu-map-ring afortu-map-ring-middle" />
        <span className="afortu-map-ring afortu-map-ring-inner" />
        <span className="afortu-map-center">Prioridad</span>
      </div>
    </div>
  );
}

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
        <section className="afortu-v3-hero">
          <div className="afortu-v3-hero-grid">
            <div className="afortu-v3-hero-copy">
              <div className="afortu-v3-hero-index" aria-hidden="true">
                <span>AF / 01</span>
                <span>MX · 2026</span>
              </div>
              <p className="afortu-kicker afortu-kicker-light">
                AFORTU · Coordinación patrimonial
              </p>
              <h1 className="afortu-display mt-8 max-w-[830px] text-[clamp(3.2rem,6.1vw,6.15rem)] font-medium leading-[0.88] tracking-[-0.052em]">
                Decisiones patrimoniales, coordinadas de{" "}
                <em className="font-medium text-[#d3ba84]">principio a fin.</em>
              </h1>
              <p className="mt-9 max-w-[650px] text-[1.04rem] leading-8 text-slate-300 sm:text-[1.12rem] sm:leading-9">
                Un Asesor Principal integra patrimonio, retiro y legado;
                organiza la información, coordina especialistas y mantiene una
                ruta documentada para decidir con mayor contexto y control.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
                <Link href="/contact" className="afortu-primary-button">
                  Solicitar diagnóstico
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#entregable"
                  className="afortu-secondary-link justify-start text-slate-300 hover:text-white"
                >
                  Ver cómo se estructura
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-6 max-w-xl text-xs leading-5 text-slate-400">
                La conversación inicial identifica necesidades y alcance. No
                implica contratación ni recomendación de inversión.
              </p>
            </div>

            <div className="afortu-v3-hero-visual">
              <Image
                src="/afortu-architecture-hero-v2.webp"
                alt="Arquitectura mexicana contemporánea en tonos azul tinta, piedra y latón"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="afortu-v3-hero-image object-cover"
              />
              <div className="afortu-v3-hero-shade" />
              <div className="afortu-v3-brand-plate">
                <OfficialEmblem className="h-16 w-16 sm:h-20 sm:w-20" />
                <div>
                  <p className="text-lg font-extrabold tracking-[0.23em] text-[#071a2b] sm:text-xl">
                    AFORTU
                  </p>
                  <p className="mt-1 text-[0.58rem] font-extrabold uppercase tracking-[0.19em] text-[#71562f]">
                    Patrimonio · Retiro · Legado
                  </p>
                </div>
              </div>
              <div className="afortu-v3-hero-note">
                <span>Arquitectura patrimonial</span>
                <span>Un sistema · una secuencia</span>
              </div>
            </div>
          </div>

          <div className="afortu-v3-commitment-rail">
            <div className="mx-auto grid max-w-[1380px] md:grid-cols-3">
              {commitments.map((item) => (
                <div key={item.number} className="afortu-v3-commitment">
                  <span>{item.number}</span>
                  <div>
                    <p>{item.title}</p>
                    <small>{item.detail}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8d0c4] bg-[#f6f2ea]">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:px-8 lg:py-32">
            <div>
              <p className="afortu-kicker">La estructura AFORTU</p>
              <p className="mt-8 text-[0.68rem] font-extrabold uppercase tracking-[0.21em] text-[#7c6a53]">
                Patrimonio · Retiro · Legado
              </p>
            </div>
            <div>
              <h2 className="afortu-display max-w-4xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-6xl">
                Una decisión puede mover todo el tablero. La arquitectura evita
                que cada parte avance por separado.
              </h2>
              <div className="mt-9 grid gap-5 border-l border-[#8a693b]/45 pl-6 text-[1.02rem] leading-8 text-[#59666e] sm:grid-cols-2 sm:pl-10">
                <p>
                  AFORTU concentra contexto, dependencias, especialistas y
                  siguientes movimientos bajo un mismo gobierno del caso.
                </p>
                <p>
                  El resultado es una secuencia comprensible: qué decidir, por
                  qué, con quién y qué debe ocurrir después.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#071a2b] text-white">
          <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.58fr_1.42fr] lg:items-center lg:px-8 lg:py-32">
            <div>
              <p className="afortu-kicker afortu-kicker-light">
                Cómo trabajamos
              </p>
              <h2 className="afortu-display mt-6 max-w-xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] sm:text-6xl">
                La arquitectura no es adorno. Es una forma de ordenar.
              </h2>
              <p className="mt-7 max-w-xl text-[1.02rem] leading-8 text-slate-300">
                Ver el conjunto, reconocer dependencias y diseñar una secuencia:
                el mismo principio que organiza un espacio puede ordenar una
                decisión patrimonial compleja.
              </p>
              <p className="mt-9 text-[0.62rem] font-extrabold uppercase tracking-[0.19em] text-[#c7ab76]">
                Estructura · perspectiva · continuidad
              </p>
            </div>

            <div className="afortu-editorial-mosaic">
              <figure className="afortu-editorial-tile afortu-editorial-tile-tall">
                <Image
                  src="/media/editorial/estructura.webp"
                  alt="Fachada contemporánea de vidrio enmarcada por vegetación."
                  fill
                  sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) 38vw, (max-width: 1319px) 24vw, 330px"
                  className="object-cover"
                />
                <figcaption>
                  <span>01</span>
                  Estructura
                </figcaption>
              </figure>
              <figure className="afortu-editorial-tile">
                <Image
                  src="/media/editorial/perspectiva.webp"
                  alt="Plaza arquitectónica contemporánea vista desde un patio abierto."
                  fill
                  sizes="(max-width: 639px) calc(50vw - 1.6rem), (max-width: 1023px) 58vw, (max-width: 1319px) 39vw, 520px"
                  className="object-cover"
                />
                <figcaption>
                  <span>02</span>
                  Perspectiva
                </figcaption>
              </figure>
              <figure className="afortu-editorial-tile">
                <Image
                  src="/media/editorial/continuidad.webp"
                  alt="Jardín urbano integrado entre edificios contemporáneos."
                  fill
                  sizes="(max-width: 639px) calc(50vw - 1.6rem), (max-width: 1023px) 58vw, (max-width: 1319px) 39vw, 520px"
                  className="object-cover"
                />
                <figcaption>
                  <span>03</span>
                  Continuidad
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="soluciones" className="scroll-mt-32 bg-[#ebe4d9]">
          <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.62fr] lg:items-end">
              <div>
                <p className="afortu-kicker">Arquitectura de soluciones</p>
                <h2 className="afortu-display mt-6 max-w-3xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-6xl">
                  Tres dimensiones. Una sola lectura patrimonial.
                </h2>
              </div>
              <p className="max-w-xl text-[1.02rem] leading-8 text-[#59666e] lg:justify-self-end">
                Cada área atiende una dimensión distinta, pero comparte
                expediente, criterio, responsables y seguimiento.
              </p>
            </div>

            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {solutions.map(
                ({
                  id,
                  number,
                  Icon,
                  label,
                  href,
                  title,
                  description,
                  output,
                  visual,
                }) => (
                  <article
                    key={id}
                    id={id}
                    className="afortu-v3-solution-card scroll-mt-32"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[0.66rem] font-extrabold tracking-[0.2em] text-[#71562f]">
                        AF / {number}
                      </span>
                      <Icon
                        className="h-5 w-5 text-[#8a693b]"
                        aria-hidden="true"
                      />
                    </div>

                    <SolutionSignal type={visual} />

                    <p className="mt-8 text-[0.67rem] font-extrabold uppercase tracking-[0.21em] text-[#71562f]">
                      {label}
                    </p>
                    <h3 className="afortu-display mt-4 text-[2.35rem] font-semibold leading-[0.98] text-[#071a2b]">
                      {title}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-[#59666e]">
                      {description}
                    </p>

                    <div className="mt-8 border-t border-[#c7bdaf] pt-6">
                      <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-[#806742]">
                        Resultado de trabajo
                      </p>
                      <p className="mt-3 text-sm font-extrabold leading-6 text-[#071a2b]">
                        {output}
                      </p>
                    </div>

                    <Link href={href} className="afortu-v3-card-link">
                      Conocer la solución
                      <CircleArrowOutUpRight
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          id="entregable"
          className="scroll-mt-32 overflow-hidden bg-[#071a2b] text-white"
        >
          <div className="mx-auto grid max-w-[1320px] gap-16 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:px-8 lg:py-32">
            <div>
              <p className="afortu-kicker afortu-kicker-light">
                Evidencia de trabajo
              </p>
              <h2 className="afortu-display mt-6 max-w-xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] sm:text-6xl">
                La estructura debe poder verse, no solo explicarse.
              </h2>
              <p className="mt-7 max-w-xl text-[1.02rem] leading-8 text-slate-300">
                Cada intervención traduce información dispersa en una vista
                común: prioridades, dependencias, responsables, entregables y
                próximos movimientos.
              </p>
              <ul className="mt-10 border-t border-white/[0.14]">
                {[
                  "Una ficha maestra del caso",
                  "Una matriz de decisión y prioridades",
                  "Una ruta con responsables y entregables",
                  "Un ciclo documentado de seguimiento",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex min-h-14 items-center gap-4 border-b border-white/[0.14] text-sm font-bold text-slate-200"
                  >
                    <Check
                      className="h-4 w-4 text-[#b89663]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/modelo-afortu"
                className="afortu-secondary-link mt-7 justify-start text-[#d5bc87] hover:text-white"
              >
                Conocer el Modelo AFORTU
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <article
              className="afortu-dossier"
              aria-label="Ejemplo conceptual de un entregable AFORTU"
            >
              <div className="afortu-dossier-topline">
                <div className="flex items-center gap-3">
                  <OfficialEmblem className="h-10 w-10" />
                  <div>
                    <p>AFORTU</p>
                    <span>Mapa patrimonial</span>
                  </div>
                </div>
                <div className="text-right">
                  <p>Folio / 01</p>
                  <span>Ejemplo ilustrativo</span>
                </div>
              </div>

              <div className="afortu-dossier-title">
                <div>
                  <span>Decisión principal</span>
                  <h3>Ordenar liquidez, horizonte y continuidad.</h3>
                </div>
                <ScanLine className="h-7 w-7" aria-hidden="true" />
              </div>

              <div className="afortu-dossier-grid">
                <div>
                  <span>01 / Patrimonio</span>
                  <p>Activos, obligaciones y liquidez bajo una vista común.</p>
                  <small>Estado · En diagnóstico</small>
                </div>
                <div>
                  <span>02 / Retiro</span>
                  <p>Horizonte, escenarios y capacidad de aportación.</p>
                  <small>Estado · Por modelar</small>
                </div>
                <div>
                  <span>03 / Legado</span>
                  <p>Titularidad, beneficiarios y documentación crítica.</p>
                  <small>Estado · Por integrar</small>
                </div>
              </div>

              <div className="afortu-dossier-priorities">
                <div className="afortu-dossier-section-title">
                  <span>Matriz de prioridades</span>
                  <span>Impacto / dependencia</span>
                </div>
                {[
                  ["Liquidez inmediata", "Prioridad dominante", "84%"],
                  ["Escenario de retiro", "Decisión dependiente", "62%"],
                  ["Ruta documental", "Continuidad", "46%"],
                ].map(([title, label, width]) => (
                  <div key={title} className="afortu-priority-row">
                    <div>
                      <p>{title}</p>
                      <span>{label}</span>
                    </div>
                    <div className="afortu-priority-track">
                      <span style={{ width }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="afortu-dossier-footer">
                <span>Contexto</span>
                <span>Criterio</span>
                <span>Responsables</span>
                <span>Siguiente revisión</span>
              </div>
              <p className="afortu-dossier-disclaimer">
                Representación conceptual. Los entregables y su contenido se
                definen conforme al alcance contratado.
              </p>
            </article>
          </div>
        </section>

        <section id="modelo" className="scroll-mt-32 bg-[#f6f2ea]">
          <div className="mx-auto grid max-w-[1320px] gap-16 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.76fr_1.24fr] lg:items-center lg:px-8 lg:py-32">
            <div>
              <p className="afortu-kicker">Modelo AFORTU</p>
              <h2 className="afortu-display mt-6 max-w-xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-6xl">
                Un Asesor Principal gobierna el conjunto.
              </h2>
              <p className="mt-7 max-w-xl text-[1.02rem] leading-8 text-[#59666e]">
                No todas las decisiones requieren a todos los especialistas. El
                Asesor Principal define la secuencia, concentra el contexto y
                coordina únicamente las intervenciones necesarias.
              </p>
              <Link href="/modelo-afortu" className="afortu-dark-button mt-10">
                Ver modelo completo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="afortu-orbit">
              <div className="afortu-orbit-grid" aria-hidden="true" />
              <div className="afortu-orbit-center">
                <UserRoundCheck className="h-7 w-7" aria-hidden="true" />
                <span>Asesor Principal</span>
                <p>Integra contexto, criterio y seguimiento.</p>
              </div>
              {coordinationLayers.map(
                ({ Icon, label, title, detail }, index) => (
                  <div
                    key={label}
                    className={`afortu-orbit-node afortu-orbit-node-${index + 1}`}
                  >
                    <div>
                      <span>{label}</span>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <p>{title}</p>
                    <small>{detail}</small>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          id="metodo"
          className="scroll-mt-32 border-y border-[#d8d0c4] bg-[#ece5da]"
        >
          <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <p className="afortu-kicker">Método de trabajo</p>
                <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-6xl">
                  Del problema al control de ejecución.
                </h2>
              </div>
              <p className="max-w-2xl text-[1.02rem] leading-8 text-[#59666e]">
                Cada etapa deja una salida utilizable antes de avanzar. Así se
                distingue conversación, diagnóstico, decisión y progreso.
              </p>
            </div>

            <ol className="afortu-process-track">
              {process.map((step) => (
                <li key={step.number} className="afortu-process-step">
                  <div className="afortu-process-marker">
                    <span>{step.number}</span>
                  </div>
                  <p className="afortu-process-label">{step.label}</p>
                  <h3>{step.title}</h3>
                  <p className="afortu-process-description">
                    {step.description}
                  </p>
                  <p className="afortu-process-result">
                    <span>Salida</span>
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
          <div className="mx-auto grid max-w-[1320px] gap-16 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.68fr_1.32fr] lg:items-start lg:px-8 lg:py-32">
            <div className="lg:sticky lg:top-40">
              <p className="afortu-kicker afortu-kicker-light">
                Claridad de alcance
              </p>
              <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.96] tracking-[-0.04em] sm:text-5xl">
                La confianza también se construye con límites.
              </h2>
              <p className="mt-6 max-w-md leading-7 text-slate-300">
                Una firma seria explica tanto lo que coordina como lo que no
                promete.
              </p>
            </div>

            <div className="afortu-trust-ledger">
              <div>
                <p className="afortu-trust-ledger-title">Lo que hacemos</p>
                <ul>
                  {whatWeDo.map((item, index) => (
                    <li key={item}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="afortu-trust-ledger-title">Lo que no hacemos</p>
                <ul>
                  {whatWeDoNotDo.map((item, index) => (
                    <li key={item}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span className="h-px w-4 bg-[#c7ab76]" />
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="afortu-v3-contact">
          <div className="afortu-v3-contact-mark" aria-hidden="true">
            <OfficialEmblem
              className="h-full w-full"
              framed={false}
              sizes="464px"
            />
          </div>
          <div className="relative mx-auto grid max-w-[1320px] gap-10 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
            <div>
              <p className="afortu-kicker">Primer movimiento</p>
              <h2 className="afortu-display mt-6 max-w-4xl text-4xl font-medium leading-[0.94] tracking-[-0.04em] text-[#071a2b] sm:text-6xl">
                Empiece por definir correctamente la decisión que necesita
                tomar.
              </h2>
              <p className="mt-6 max-w-2xl leading-7 text-[#59666e]">
                Comparta su objetivo principal. AFORTU identificará el alcance,
                la información necesaria y el siguiente paso.
              </p>
            </div>
            <div className="lg:text-right">
              <Link href="/contact" className="afortu-dark-button">
                Solicitar diagnóstico
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="mt-4 text-xs text-[#7a858b]">
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

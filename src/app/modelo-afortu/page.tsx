import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  FileCheck2,
  Network,
  Target,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { PublicFooter, PublicHeader } from "@/components/site/public-shell";

export const metadata: Metadata = {
  title: "Modelo AFORTU | Asesor Principal y gobierno del caso",
  description:
    "Conozca cómo el Asesor Principal coordina contexto, especialistas, entregables y seguimiento bajo una misma arquitectura patrimonial.",
  alternates: {
    canonical: "/modelo-afortu",
  },
};

const responsibilities = [
  {
    Icon: Target,
    label: "Dirección",
    title: "Traducir objetivos en criterios",
    detail:
      "Distingue la prioridad dominante, las restricciones y los riesgos que deben gobernar la decisión.",
  },
  {
    Icon: Network,
    label: "Coordinación",
    title: "Definir quién interviene y cuándo",
    detail:
      "Convoca únicamente a las especialidades necesarias y evita trabajos aislados o contradictorios.",
  },
  {
    Icon: FileCheck2,
    label: "Control",
    title: "Conservar el expediente central",
    detail:
      "Integra antecedentes, documentos, acuerdos, entregables y siguientes movimientos.",
  },
  {
    Icon: UsersRound,
    label: "Continuidad",
    title: "Dar seguimiento al conjunto",
    detail:
      "Revisa avances y actualiza la ruta cuando cambian el contexto, los datos o las prioridades.",
  },
];

const roles = [
  {
    role: "Cliente",
    authority: "Decide y autoriza",
    detail:
      "Define objetivos, comparte información, evalúa opciones y conserva la decisión final.",
  },
  {
    role: "Asesor Principal",
    authority: "Coordina y da criterio",
    detail:
      "Organiza el contexto, establece la secuencia y mantiene alineados a los participantes.",
  },
  {
    role: "Especialista",
    authority: "Resuelve su alcance",
    detail:
      "Analiza y ejecuta la materia técnica para la que fue incorporado al caso.",
  },
  {
    role: "Seguimiento AFORTU",
    authority: "Documenta y controla",
    detail:
      "Da trazabilidad a responsables, entregables, fechas, bloqueos y próximos pasos.",
  },
];

const lifecycle = [
  {
    number: "01",
    title: "Contexto",
    output: "Ficha maestra",
    detail: "Objetivo, restricciones, antecedentes y documentación disponible.",
  },
  {
    number: "02",
    title: "Criterio",
    output: "Matriz de decisión",
    detail: "Opciones, impacto, riesgo, dependencia, costo y reversibilidad.",
  },
  {
    number: "03",
    title: "Coordinación",
    output: "Ruta de trabajo",
    detail:
      "Especialistas, responsables, entregables y secuencia de intervención.",
  },
  {
    number: "04",
    title: "Seguimiento",
    output: "Tablero de control",
    detail: "Avances, pendientes, bloqueos, acuerdos y siguiente revisión.",
  },
];

const principles = [
  "Una recomendación no precede al diagnóstico.",
  "Cada especialidad tiene un alcance explícito.",
  "Toda decisión relevante debe dejar evidencia y siguiente paso.",
  "El cliente conserva la decisión y conoce los límites de la intervención.",
];

export default function ModeloAfortuPage() {
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
          <div className="relative mx-auto grid min-h-[610px] max-w-[1240px] items-end gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.4fr] lg:px-8 lg:py-24">
            <div>
              <p className="afortu-kicker afortu-kicker-light">Modelo AFORTU</p>
              <h1 className="afortu-display mt-8 max-w-5xl text-[clamp(2.85rem,6.6vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.05em]">
                Una visión. Un responsable de coordinación.
              </h1>
              <p className="mt-8 max-w-2xl text-[1.04rem] leading-8 text-slate-300 sm:text-[1.12rem] sm:leading-9">
                El Asesor Principal convierte información dispersa en una
                secuencia de decisiones, especialistas y entregables bajo un
                mismo gobierno del caso.
              </p>
              <Link href="/contact" className="afortu-primary-button mt-10">
                Solicitar diagnóstico
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="border-l border-[#b89663]/35 pb-2 pl-8">
              <UserRoundCheck
                className="h-11 w-11 text-[#b89663]"
                aria-hidden="true"
              />
              <p
                className="afortu-display mt-10 text-7xl font-medium leading-none text-[#c7ab76]/70"
                aria-hidden="true"
              >
                AP
              </p>
              <p className="mt-6 text-[0.63rem] font-extrabold uppercase leading-5 tracking-[0.22em] text-slate-400">
                Contexto · criterio · coordinación · control
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8d0c4] bg-[#f6f2ea]">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:px-8 lg:py-32">
            <div>
              <p className="afortu-kicker">La función central</p>
              <h2 className="afortu-display mt-6 max-w-xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-6xl">
                Gobernar el conjunto sin invadir cada especialidad.
              </h2>
            </div>
            <div className="border-l border-[#8a693b]/45 pl-6 sm:pl-10">
              <p className="afortu-display max-w-2xl text-2xl font-medium leading-[1.13] text-[#263946] sm:text-[2.1rem]">
                El valor no está en sumar opiniones. Está en ordenar el
                contexto, la secuencia y las responsabilidades.
              </p>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-8 text-[#59666e]">
                El Asesor Principal conserva la visión del caso y coordina a los
                especialistas necesarios para que cada decisión responda al
                mismo objetivo.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fbf9f4]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <p className="afortu-kicker">Cuatro responsabilidades</p>
                <h2 className="afortu-display mt-6 max-w-3xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-6xl">
                  La estructura visible del Asesor Principal.
                </h2>
              </div>
              <p className="max-w-xl text-[1.02rem] leading-8 text-[#59666e] lg:justify-self-end">
                Cada responsabilidad produce una salida concreta y reduce un
                riesgo distinto del caso.
              </p>
            </div>

            <div className="mt-16 grid border-l border-t border-[#c7bdaf] md:grid-cols-2">
              {responsibilities.map(({ Icon, label, title, detail }) => (
                <article
                  key={label}
                  className="border-b border-r border-[#c7bdaf] p-7 sm:p-9 md:min-h-[270px]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-[#71562f]">
                      {label}
                    </p>
                    <Icon
                      className="h-5 w-5 text-[#8a693b]"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-10 !font-sans text-lg font-extrabold text-[#071a2b]">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#59666e]">
                    {detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#071a2b] text-white">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="afortu-kicker afortu-kicker-light">
                  Quién decide qué
                </p>
                <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.96] tracking-[-0.04em] sm:text-5xl">
                  Autoridad y responsabilidad sin confusión.
                </h2>
              </div>
              <p className="max-w-2xl text-[1.02rem] leading-8 text-slate-300">
                Una coordinación seria distingue la decisión del cliente, el
                criterio del Asesor Principal y el alcance técnico de cada
                especialista.
              </p>
            </div>

            <div className="mt-16 border-l border-t border-white/[0.15]">
              {roles.map((item, index) => (
                <article
                  key={item.role}
                  className="grid border-b border-r border-white/[0.15] p-7 lg:grid-cols-[3rem_0.6fr_0.72fr_1.3fr] lg:items-center lg:gap-6 lg:p-8"
                >
                  <span className="text-[0.62rem] font-extrabold tracking-[0.18em] text-[#b89663]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 !font-sans text-base font-extrabold text-white lg:mt-0">
                    {item.role}
                  </h3>
                  <p className="mt-2 text-sm font-bold text-[#c7ab76] lg:mt-0">
                    {item.authority}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300 lg:mt-0">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="gobierno"
          className="scroll-mt-32 border-b border-[#d8d0c4] bg-[#eee8de]"
        >
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="afortu-kicker">Ciclo de gobierno</p>
                <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-6xl">
                  Del contexto al tablero de control.
                </h2>
              </div>
              <p className="max-w-2xl text-[1.02rem] leading-8 text-[#59666e]">
                El caso avanza únicamente cuando la etapa anterior dejó una
                salida utilizable y un siguiente movimiento.
              </p>
            </div>

            <ol className="mt-16 grid border-l border-t border-[#bdb2a3] md:grid-cols-2 xl:grid-cols-4">
              {lifecycle.map((step) => (
                <li
                  key={step.number}
                  className="border-b border-r border-[#bdb2a3] p-7 sm:p-8 md:min-h-[330px]"
                >
                  <span className="afortu-display text-5xl text-[#71562f]">
                    {step.number}
                  </span>
                  <p className="mt-10 text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-[#71562f]">
                    {step.title}
                  </p>
                  <h3 className="mt-4 !font-sans text-lg font-extrabold text-[#071a2b]">
                    {step.output}
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
              <p className="afortu-kicker">Principios operativos</p>
              <h2 className="afortu-display mt-6 text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-[#071a2b] sm:text-5xl">
                Reglas simples para decisiones complejas.
              </h2>
            </div>
            <ul className="border-t border-[#c7bdaf]">
              {principles.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[auto_1fr] gap-5 border-b border-[#c7bdaf] py-5 text-sm font-semibold leading-7 text-[#334852] sm:py-6"
                >
                  <Check
                    className="mt-1 h-4 w-4 text-[#8a693b]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="afortu-contact-pattern text-white">
          <div className="mx-auto grid max-w-[1240px] gap-9 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
            <div>
              <p className="afortu-kicker afortu-kicker-light">
                Primer movimiento
              </p>
              <h2 className="afortu-display mt-6 max-w-3xl text-4xl font-medium leading-[0.96] tracking-[-0.04em] sm:text-6xl">
                Empiece por ordenar el contexto.
              </h2>
            </div>
            <Link href="/contact" className="afortu-primary-button">
              Solicitar diagnóstico
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

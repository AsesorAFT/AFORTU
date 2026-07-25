import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Mail, MessageCircle, Phone } from "lucide-react";
import { PublicFooter, PublicHeader } from "@/components/site/public-shell";

export const metadata: Metadata = {
  title: "Solicitar diagnóstico patrimonial",
  description:
    "Inicie una conversación con AFORTU para identificar necesidades de patrimonio, retiro o legado y definir el siguiente paso.",
  alternates: {
    canonical: "/contact",
  },
};

const whatsappUrl =
  "https://wa.me/525548144552?text=Hola%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico%20patrimonial%20con%20AFORTU.";

const preparation = [
  {
    number: "01",
    title: "Objetivo",
    detail: "La decisión o necesidad principal que desea atender.",
  },
  {
    number: "02",
    title: "Horizonte",
    detail: "El plazo en el que necesita una respuesta o resultado.",
  },
  {
    number: "03",
    title: "Contexto",
    detail:
      "Las principales restricciones, documentos o antecedentes disponibles.",
  },
];

export default function ContactPage() {
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
        <section className="afortu-contact-pattern relative overflow-hidden text-white">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-12 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_auto] lg:px-8">
            <div>
              <p className="afortu-kicker afortu-kicker-light">Contacto</p>
              <h1 className="afortu-display mt-7 max-w-4xl text-[clamp(3rem,6vw,5.8rem)] font-medium leading-[0.94] tracking-[-0.04em]">
                La primera decisión es definir el problema{" "}
                <em className="font-medium text-[#d3ba84]">correctamente.</em>
              </h1>
              <p className="mt-8 max-w-2xl text-[1.05rem] leading-8 text-slate-300">
                Comparta su objetivo principal. La conversación inicial servirá
                para identificar el alcance, la información necesaria y el
                siguiente paso.
              </p>
            </div>
            <div
              className="hidden border-l border-[#c2a56d]/35 py-8 pl-10 xl:block"
              aria-hidden="true"
            >
              <p className="afortu-display text-8xl font-medium leading-none text-[#c2a56d]/35">
                01
              </p>
              <p className="mt-5 max-w-36 text-[0.62rem] font-bold uppercase leading-5 tracking-[0.24em] text-slate-400">
                Definir · ordenar · avanzar
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fcfaf5]">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-32">
            <div>
              <p className="afortu-kicker">Antes de conversar</p>
              <h2 className="afortu-display mt-6 max-w-xl text-4xl font-medium leading-[0.98] tracking-[-0.035em] text-[#071625] sm:text-6xl">
                Tres datos nos permiten iniciar con claridad.
              </h2>

              <ol className="mt-12 border-t border-[#c5b8a5]">
                {preparation.map((item) => (
                  <li
                    key={item.number}
                    className="grid grid-cols-[auto_1fr] gap-6 border-b border-[#c5b8a5] py-7"
                  >
                    <span className="afortu-display text-4xl text-[#76572a]/55">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="!font-sans font-bold text-[#071625]">
                        {item.title}
                      </h3>
                      <p className="mt-2 leading-7 text-[#596371]">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-8 max-w-2xl text-sm leading-6 text-[#596371]">
                No envíe contraseñas, datos bancarios completos ni documentación
                sensible por mensajería. Si el asunto requiere expediente,
                AFORTU indicará el canal y los documentos pertinentes.
              </p>
            </div>

            <div className="self-start border border-[#c2a56d]/32 bg-[#071625] p-7 text-white shadow-[0_28px_70px_rgba(7,22,37,0.13)] sm:p-10">
              <MessageCircle
                className="h-7 w-7 text-[#c2a56d]"
                aria-hidden="true"
              />
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#c2a56d]">
                Canal directo
              </p>
              <h2 className="afortu-display mt-3 text-4xl font-semibold leading-none">
                Inicie la conversación.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                WhatsApp es el canal más ágil para solicitar el diagnóstico y
                coordinar el primer contacto.
              </p>
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="afortu-primary-button mt-8 w-full"
              >
                Contactar por WhatsApp
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <div className="mt-9 border-t border-white/[0.12]">
                <Link
                  href="tel:+525548144552"
                  className="flex min-h-16 items-center gap-4 border-b border-white/[0.12] text-sm text-slate-300 transition-colors hover:text-white"
                >
                  <Phone
                    className="h-5 w-5 text-[#c2a56d]"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.16em] text-slate-500">
                      Teléfono
                    </span>
                    <span className="mt-1 block font-semibold">
                      +52 55 4814 4552
                    </span>
                  </span>
                </Link>
                <Link
                  href="mailto:contacto@afortu.com.mx?subject=Solicitud%20de%20diagn%C3%B3stico%20patrimonial"
                  className="flex min-h-16 items-center gap-4 border-b border-white/[0.12] text-sm text-slate-300 transition-colors hover:text-white"
                >
                  <Mail className="h-5 w-5 text-[#c2a56d]" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.16em] text-slate-500">
                      Correo
                    </span>
                    <span className="mt-1 block break-words font-semibold">
                      contacto@afortu.com.mx
                    </span>
                  </span>
                </Link>
              </div>

              <p className="mt-7 flex gap-3 text-xs leading-6 text-slate-400">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#c2a56d]"
                  aria-hidden="true"
                />
                La conversación inicial no constituye una recomendación de
                inversión ni obliga a contratar servicios.
              </p>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

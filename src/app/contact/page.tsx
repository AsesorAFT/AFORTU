import type { Metadata } from "next";
import Image from "next/image";
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
    <div className="min-h-screen bg-[#f7f3ea] text-[#15213a]">
      <PublicHeader />
      <main>
        <section className="relative isolate overflow-hidden bg-[#07133f] text-white">
          <Image
            src="/afortu-architecture-hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-[72%_55%] opacity-65"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,14,33,0.99)_0%,rgba(4,14,33,0.9)_48%,rgba(4,14,33,0.42)_100%)]" />
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-10">
            <p className="afortu-kicker afortu-kicker-light">Contacto</p>
            <h1 className="afortu-display mt-6 max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              La primera decisión es definir correctamente el problema.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Comparta su objetivo principal. La conversación inicial servirá
              para identificar el alcance, la información necesaria y el
              siguiente paso.
            </p>
          </div>
        </section>

        <section className="bg-[#fffdf8]">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_0.9fr] lg:px-10">
            <div>
              <p className="afortu-kicker">Antes de conversar</p>
              <h2 className="afortu-display mt-6 max-w-xl text-4xl font-medium leading-[1.02] text-[#07133f] sm:text-5xl">
                Tres datos nos permiten iniciar con claridad.
              </h2>

              <ol className="mt-12 border-t border-[#c9bda9]">
                {preparation.map((item) => (
                  <li
                    key={item.number}
                    className="grid grid-cols-[auto_1fr] gap-5 border-b border-[#c9bda9] py-6"
                  >
                    <span className="afortu-display text-3xl text-[#9c7a3f]/65">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="font-bold text-[#07133f]">{item.title}</h3>
                      <p className="mt-2 leading-7 text-[#596273]">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-7 max-w-2xl text-sm leading-6 text-[#596273]">
                No envíe contraseñas, datos bancarios completos ni documentación
                sensible por mensajería. Si el asunto requiere expediente,
                AFORTU indicará el canal y los documentos pertinentes.
              </p>
            </div>

            <div className="self-start border border-[#c5aa72]/28 bg-[#07133f] p-7 text-white shadow-[0_28px_70px_rgba(7,19,63,0.15)] sm:p-9">
              <MessageCircle
                className="h-7 w-7 text-[#c5aa72]"
                aria-hidden="true"
              />
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#c5aa72]">
                Canal directo
              </p>
              <h2 className="afortu-display mt-3 text-4xl font-semibold">
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
                    className="h-5 w-5 text-[#c5aa72]"
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
                  <Mail className="h-5 w-5 text-[#c5aa72]" aria-hidden="true" />
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
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#c5aa72]"
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

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

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fbf8f1] text-[#172033]">
      <PublicHeader />
      <main>
        <section className="border-b border-[#d9d2c3]/70 bg-[#10243f] text-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d0b77e]">
              Contacto
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              La primera decisión es definir correctamente el problema.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Comparta su objetivo principal. La conversación inicial servirá
              para identificar el alcance, la información necesaria y el
              siguiente paso.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_0.86fr] lg:px-10">
          <div className="rounded-[2rem] border border-[#d9d2c3] bg-[#fffdf8] p-6 shadow-[0_25px_70px_rgba(16,36,63,0.08)] sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d6c2f]">
              Antes de conversar
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#10243f] sm:text-4xl">
              Tenga a la mano tres datos
            </h2>
            <div className="mt-8 grid gap-4">
              {[
                "El objetivo o decisión que necesita atender.",
                "El plazo en el que necesita una respuesta o resultado.",
                "Las principales restricciones, documentos o antecedentes disponibles.",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl border border-[#e2dacc] bg-white p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#10243f] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm font-semibold leading-6 text-[#4f5969]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-[#6c7280]">
              No envíe contraseñas, datos bancarios completos ni documentación
              sensible por mensajería. Si el asunto requiere expediente, AFORTU
              indicará el canal y los documentos pertinentes.
            </p>
          </div>

          <div className="grid gap-5">
            <article className="rounded-[2rem] bg-[#10243f] p-7 text-white sm:p-8">
              <MessageCircle className="h-7 w-7 text-[#d0b77e]" />
              <h2 className="mt-6 font-serif text-3xl font-semibold">
                WhatsApp
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Canal directo para solicitar el diagnóstico y coordinar la
                conversación inicial.
              </p>
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#d0b77e] px-6 py-3.5 text-sm font-bold text-[#10243f] hover:bg-[#e0c88f]"
              >
                Iniciar conversación
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>

            <div className="grid gap-5 sm:grid-cols-2">
              <article className="rounded-[1.5rem] border border-[#d9d2c3] bg-[#fffdf8] p-6">
                <Phone className="h-5 w-5 text-[#8d6c2f]" />
                <h2 className="mt-4 font-bold text-[#10243f]">Teléfono</h2>
                <Link
                  href="tel:+525548144552"
                  className="mt-2 block text-sm text-[#5c6573] hover:text-[#10243f]"
                >
                  +52 55 4814 4552
                </Link>
              </article>
              <article className="rounded-[1.5rem] border border-[#d9d2c3] bg-[#fffdf8] p-6">
                <Mail className="h-5 w-5 text-[#8d6c2f]" />
                <h2 className="mt-4 font-bold text-[#10243f]">Correo</h2>
                <Link
                  href="mailto:contacto@afortu.com.mx?subject=Solicitud%20de%20diagn%C3%B3stico%20patrimonial"
                  className="mt-2 block break-all text-sm text-[#5c6573] hover:text-[#10243f]"
                >
                  contacto@afortu.com.mx
                </Link>
              </article>
            </div>

            <div className="rounded-[1.5rem] border border-[#d9d2c3] bg-[#f2ecdf] p-6">
              <p className="flex gap-3 text-sm font-semibold leading-6 text-[#4f5969]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#8d6c2f]" />
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

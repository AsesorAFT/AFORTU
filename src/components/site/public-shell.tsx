"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Mail, Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { label: "Patrimonio", href: "/#patrimonio" },
  { label: "Retiro", href: "/#retiro" },
  { label: "Legado", href: "/#legado" },
  { label: "Nuestro modelo", href: "/#modelo" },
  { label: "Método", href: "/#metodo" },
];

function BrandLockup({ footer = false }: { footer?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full border ${
          footer
            ? "border-white/15 bg-white"
            : "border-[#c5aa72]/45 bg-white/[0.07]"
        }`}
      >
        <Image
          src="/logo-afortu-icon.svg"
          alt=""
          width={34}
          height={34}
          priority={!footer}
        />
      </span>
      <span>
        <span
          className={`block font-sans text-[1.02rem] font-extrabold tracking-[0.19em] ${
            footer ? "text-white" : "text-white"
          }`}
        >
          AFORTU
        </span>
        <span
          className={`block text-[0.56rem] font-semibold uppercase tracking-[0.2em] ${
            footer ? "text-slate-400" : "text-[#c5aa72]"
          }`}
        >
          Arquitectura patrimonial
        </span>
      </span>
    </span>
  );
}

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#07133f]/95 text-white shadow-[0_1px_0_rgba(197,170,114,0.16)] backdrop-blur-xl">
      <div className="hidden border-b border-white/[0.07] md:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-6 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-slate-400 lg:px-10">
          <span>Patrimonio · Retiro · Legado</span>
          <span>Atención mediante diagnóstico</span>
        </div>
      </div>

      <div className="mx-auto flex h-[74px] max-w-7xl items-center gap-8 px-5 sm:px-6 lg:px-10">
        <Link href="/" aria-label="AFORTU, página de inicio">
          <BrandLockup />
        </Link>

        <nav
          className="ml-auto hidden items-center gap-7 lg:flex"
          aria-label="Navegación principal"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative py-3 text-sm font-semibold text-slate-300 transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[#c5aa72] after:transition-transform hover:text-white hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="ml-auto hidden min-h-11 items-center gap-2 rounded-lg bg-[#c5aa72] px-5 text-sm font-bold text-[#07133f] transition-all hover:-translate-y-0.5 hover:bg-[#d4bd8a] lg:ml-1 lg:inline-flex"
        >
          Solicitar diagnóstico
          <ArrowRight className="h-4 w-4" />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="ml-auto flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/[0.1] lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent className="w-[min(88vw,380px)] border-l border-[#c5aa72]/25 bg-[#07133f] p-5 text-white">
            <SheetTitle className="sr-only">Navegación de AFORTU</SheetTitle>
            <SheetDescription className="sr-only">
              Enlaces principales del sitio público de AFORTU.
            </SheetDescription>
            <Link
              href="/"
              className="inline-flex"
              aria-label="AFORTU, página de inicio"
            >
              <BrandLockup />
            </Link>
            <nav className="mt-10 grid gap-1" aria-label="Navegación móvil">
              {navigation.map((item) => (
                <SheetClose asChild key={item.label}>
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center justify-between rounded-lg px-4 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/[0.07]"
                  >
                    {item.label}
                    <ChevronRight
                      className="h-4 w-4 text-[#c5aa72]"
                      aria-hidden="true"
                    />
                  </Link>
                </SheetClose>
              ))}
              <div className="my-2 h-px bg-white/10" />
              <SheetClose asChild>
                <Link
                  href="/contact"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#c5aa72] px-4 text-center text-sm font-bold text-[#07133f]"
                >
                  Solicitar diagnóstico
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="bg-[#050f23] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 md:grid-cols-[1.25fr_0.7fr_0.85fr] lg:px-10 lg:py-20">
        <div>
          <BrandLockup footer />
          <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
            Coordinación patrimonial para personas, familias y empresas que
            necesitan ordenar decisiones de patrimonio, retiro y legado bajo una
            misma visión.
          </p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#c5aa72]">
            Criterio · Coordinación · Seguimiento
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5aa72]">
            Navegación
          </p>
          <div className="mt-6 grid gap-3.5 text-sm text-slate-400">
            <Link href="/#patrimonio" className="hover:text-white">
              Patrimonio
            </Link>
            <Link href="/#retiro" className="hover:text-white">
              Retiro
            </Link>
            <Link href="/#legado" className="hover:text-white">
              Legado
            </Link>
            <Link href="/#modelo" className="hover:text-white">
              Modelo de Asesor Principal
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contacto
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5aa72]">
            Contacto
          </p>
          <div className="mt-6 grid gap-4 text-sm text-slate-400">
            <Link
              href="tel:+525548144552"
              className="flex items-center gap-3 hover:text-white"
            >
              <Phone className="h-4 w-4 text-[#c5aa72]" />
              +52 55 4814 4552
            </Link>
            <Link
              href="mailto:contacto@afortu.com.mx"
              className="flex items-center gap-3 hover:text-white"
            >
              <Mail className="h-4 w-4 text-[#c5aa72]" />
              contacto@afortu.com.mx
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 text-xs leading-5 text-slate-500 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10">
          <p className="max-w-4xl">
            La información de este sitio es de carácter general y no constituye
            una oferta, recomendación individualizada ni garantía de
            rendimiento. Todo servicio está sujeto a diagnóstico, documentación,
            contrato y, cuando corresponda, a la participación de especialistas
            autorizados.
          </p>
          <p className="shrink-0">© {new Date().getFullYear()} AFORTU</p>
        </div>
      </div>
    </footer>
  );
}

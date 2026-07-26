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
  { label: "Patrimonio", href: "/patrimonio" },
  { label: "Retiro", href: "/retiro" },
  { label: "Legado", href: "/legado" },
  { label: "Modelo AFORTU", href: "/modelo-afortu" },
  { label: "Gobierno del caso", href: "/modelo-afortu#gobierno" },
];

export function OfficialEmblem({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Image
        src="/logo-afortu-oficial.png"
        alt=""
        width={460}
        height={560}
        priority
        className="absolute left-[-41%] top-[-17%] h-auto w-[182%] max-w-none"
      />
    </span>
  );
}

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3.5">
      <OfficialEmblem className={compact ? "h-10 w-10" : "h-11 w-11"} />
      <span>
        <span className="block font-sans text-[1.08rem] font-extrabold tracking-[0.22em] text-[#071a2b]">
          AFORTU
        </span>
        <span className="mt-0.5 block text-[0.59rem] font-bold uppercase tracking-[0.17em] text-[#71562f] max-[399px]:hidden">
          Arquitectura patrimonial
        </span>
      </span>
    </span>
  );
}

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 shadow-[0_10px_35px_rgba(7,26,43,0.08)]">
      <div className="hidden border-b border-white/[0.08] bg-[#071a2b] text-white sm:block">
        <div className="mx-auto flex h-9 max-w-[1240px] items-center justify-between gap-6 px-6 text-[0.61rem] font-bold uppercase tracking-[0.17em] lg:px-8">
          <p className="text-slate-400">
            AFORTU · Coordinación patrimonial en México
          </p>
          <div className="flex items-center gap-6 text-slate-300">
            <Link href="/login" className="transition-colors hover:text-white">
              Acceso a clientes
            </Link>
            <Link
              href="tel:+525548144552"
              className="transition-colors hover:text-white"
            >
              +52 55 4814 4552
            </Link>
            <Link
              href="mailto:contacto@afortu.com.mx"
              className="hidden transition-colors hover:text-white md:block"
            >
              contacto@afortu.com.mx
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-[#d8d0c4] bg-[#f6f2ea]/[0.96] text-[#071a2b] backdrop-blur-xl">
        <div className="mx-auto flex h-[82px] max-w-[1240px] items-center gap-7 px-5 sm:px-6 lg:px-8">
          <Link href="/" aria-label="AFORTU, página de inicio">
            <BrandLockup />
          </Link>

          <nav
            className="ml-auto hidden items-center gap-6 xl:flex"
            aria-label="Navegación principal"
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative py-3 text-[0.73rem] font-bold tracking-[0.01em] text-[#40515b] transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[#8a693b] after:transition-transform hover:text-[#071a2b] hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="ml-auto hidden min-h-11 items-center gap-2 border border-[#071a2b] bg-[#071a2b] px-5 text-[0.74rem] font-extrabold text-white transition-colors hover:border-[#163b56] hover:bg-[#163b56] sm:inline-flex xl:ml-1"
          >
            Solicitar diagnóstico
            <ArrowRight className="h-4 w-4 text-[#c7ab76]" aria-hidden="true" />
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="ml-auto flex h-11 w-11 items-center justify-center border border-[#071a2b]/20 bg-[#071a2b] text-white transition-colors hover:bg-[#163b56] sm:ml-0 xl:hidden"
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent className="w-[min(90vw,400px)] overflow-y-auto border-l border-[#b89663]/30 bg-[#f6f2ea] p-5 text-[#071a2b]">
              <SheetTitle className="sr-only">Navegación de AFORTU</SheetTitle>
              <SheetDescription className="sr-only">
                Enlaces principales del sitio público de AFORTU.
              </SheetDescription>
              <Link
                href="/"
                className="inline-flex"
                aria-label="AFORTU, página de inicio"
              >
                <BrandLockup compact />
              </Link>

              <div className="mt-8 border-y border-[#d8d0c4] py-4">
                <p className="text-[0.61rem] font-extrabold uppercase tracking-[0.2em] text-[#71562f]">
                  Patrimonio · Retiro · Legado
                </p>
              </div>

              <nav className="mt-5 grid gap-1" aria-label="Navegación móvil">
                {navigation.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      className="flex min-h-[3.25rem] items-center justify-between border-b border-[#d8d0c4] px-2 py-4 text-sm font-bold text-[#30434e] transition-colors hover:text-[#071a2b]"
                    >
                      {item.label}
                      <ChevronRight
                        className="h-4 w-4 text-[#8a693b]"
                        aria-hidden="true"
                      />
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <SheetClose asChild>
                <Link
                  href="/contact"
                  className="mt-7 flex min-h-12 items-center justify-center gap-2 bg-[#071a2b] px-4 text-center text-sm font-extrabold text-white"
                >
                  Solicitar diagnóstico
                  <ArrowRight
                    className="h-4 w-4 text-[#c7ab76]"
                    aria-hidden="true"
                  />
                </Link>
              </SheetClose>

              <div className="mt-8 grid gap-3 text-xs text-[#59666e]">
                <Link
                  href="tel:+525548144552"
                  className="flex items-center gap-3"
                >
                  <Phone
                    className="h-4 w-4 text-[#8a693b]"
                    aria-hidden="true"
                  />
                  +52 55 4814 4552
                </Link>
                <Link
                  href="mailto:contacto@afortu.com.mx"
                  className="flex items-center gap-3"
                >
                  <Mail className="h-4 w-4 text-[#8a693b]" aria-hidden="true" />
                  contacto@afortu.com.mx
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="bg-[#061522] text-white">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.25fr_0.65fr_0.7fr_0.9fr] lg:px-8 lg:py-20">
        <div>
          <div className="inline-flex items-center gap-5 border border-[#b89663]/30 bg-[#f6f2ea] px-6 py-5 text-[#071a2b]">
            <OfficialEmblem className="h-20 w-20" />
            <div>
              <p className="text-xl font-extrabold tracking-[0.2em]">AFORTU</p>
              <p className="mt-1 text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-[#71562f]">
                Arquitectura patrimonial
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
            Un sistema de coordinación para decisiones de patrimonio, retiro y
            legado que necesitan diagnóstico, criterio y seguimiento.
          </p>
        </div>

        <nav aria-label="Soluciones">
          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#c7ab76]">
            Soluciones
          </p>
          <div className="mt-6 grid gap-3.5 text-sm text-slate-400">
            <Link href="/patrimonio" className="hover:text-white">
              Patrimonio
            </Link>
            <Link href="/retiro" className="hover:text-white">
              Retiro
            </Link>
            <Link href="/legado" className="hover:text-white">
              Legado
            </Link>
          </div>
        </nav>

        <nav aria-label="Firma">
          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#c7ab76]">
            Firma
          </p>
          <div className="mt-6 grid gap-3.5 text-sm text-slate-400">
            <Link href="/modelo-afortu" className="hover:text-white">
              Modelo AFORTU
            </Link>
            <Link href="/modelo-afortu#gobierno" className="hover:text-white">
              Gobierno del caso
            </Link>
            <Link href="/#metodo" className="hover:text-white">
              Método
            </Link>
            <Link href="/#confianza" className="hover:text-white">
              Confianza
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contacto
            </Link>
            <Link href="/login" className="hover:text-white">
              Acceso a clientes
            </Link>
          </div>
        </nav>

        <address className="not-italic">
          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#c7ab76]">
            Contacto
          </p>
          <div className="mt-6 grid gap-4 text-sm text-slate-400">
            <Link
              href="tel:+525548144552"
              className="flex items-center gap-3 hover:text-white"
            >
              <Phone className="h-4 w-4 text-[#c7ab76]" aria-hidden="true" />
              +52 55 4814 4552
            </Link>
            <Link
              href="mailto:contacto@afortu.com.mx"
              className="flex items-start gap-3 break-all hover:text-white"
            >
              <Mail
                className="mt-0.5 h-4 w-4 shrink-0 text-[#c7ab76]"
                aria-hidden="true"
              />
              contacto@afortu.com.mx
            </Link>
          </div>

          <div className="mt-8 grid gap-3 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-white">
              Privacidad y canales digitales
            </Link>
            <Link href="/terms" className="hover:text-white">
              Términos y alcance
            </Link>
          </div>
        </address>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 py-7 text-xs leading-5 text-slate-500 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
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

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

const navigation = [
  { label: "Patrimonio", href: "/#patrimonio" },
  { label: "Retiro", href: "/#retiro" },
  { label: "Legado", href: "/#legado" },
  { label: "Nuestro modelo", href: "/#modelo" },
  { label: "Método", href: "/#metodo" },
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d9d2c3]/70 bg-[#fbf8f1]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center gap-8 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="AFORTU, página de inicio"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c8a96a]/35 bg-white shadow-sm">
            <Image
              src="/logo-afortu-icon.svg"
              alt=""
              width={34}
              height={34}
              priority
            />
          </span>
          <span>
            <span className="block font-sans text-[1.05rem] font-extrabold tracking-[0.18em] text-[#10243f]">
              AFORTU
            </span>
            <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#786d5c]">
              Arquitectura patrimonial
            </span>
          </span>
        </Link>

        <nav
          className="ml-auto hidden items-center gap-6 lg:flex"
          aria-label="Navegación principal"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-[#4b5563] transition-colors hover:text-[#10243f]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 sm:flex lg:ml-2">
          <Link
            href="/login"
            className="px-3 py-2 text-sm font-semibold text-[#10243f] transition-colors hover:text-[#8d6c2f]"
          >
            Acceso a clientes
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#10243f] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(16,36,63,0.15)] transition-all hover:-translate-y-0.5 hover:bg-[#17375f]"
          >
            Solicitar diagnóstico
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <details className="group relative ml-auto sm:hidden">
          <summary
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-[#d9d2c3] bg-white text-[#10243f] [&::-webkit-details-marker]:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </summary>
          <div className="absolute right-0 top-14 w-[min(86vw,330px)] rounded-2xl border border-[#d9d2c3] bg-[#fffdf8] p-4 shadow-2xl">
            <nav className="grid gap-1" aria-label="Navegación móvil">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-[#344052] hover:bg-[#f2ecdf]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-[#e3dccf]" />
              <Link
                href="/login"
                className="rounded-xl px-4 py-3 text-sm font-semibold text-[#10243f]"
              >
                Acceso a clientes
              </Link>
              <Link
                href="/contact"
                className="mt-1 rounded-xl bg-[#10243f] px-4 py-3 text-center text-sm font-bold text-white"
              >
                Solicitar diagnóstico
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#091a2e] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Image
                src="/logo-afortu-icon.svg"
                alt=""
                width={34}
                height={34}
              />
            </span>
            <span className="font-sans text-lg font-extrabold tracking-[0.18em]">
              AFORTU
            </span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
            Coordinación patrimonial para personas, familias y empresas que
            necesitan ordenar decisiones de patrimonio, retiro y legado con una
            visión integral.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d0b77e]">
            Navegación
          </p>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <Link href="/#modelo" className="hover:text-white">
              Nuestro modelo
            </Link>
            <Link href="/#metodo" className="hover:text-white">
              Método de trabajo
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contacto
            </Link>
            <Link href="/login" className="hover:text-white">
              Acceso a clientes
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d0b77e]">
            Contacto
          </p>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <Link href="tel:+525548144552" className="hover:text-white">
              +52 55 4814 4552
            </Link>
            <Link
              href="mailto:contacto@afortu.com.mx"
              className="hover:text-white"
            >
              contacto@afortu.com.mx
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-xs leading-5 text-slate-400 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-10">
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

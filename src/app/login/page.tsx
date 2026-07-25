import Link from "next/link";
import { ArrowLeft, ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { PublicFooter, PublicHeader } from "@/components/site/public-shell";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f7f3ea] text-[#15213a]">
      <PublicHeader />
      <main className="bg-[#fffdf8]">
        <section className="mx-auto grid min-h-[640px] max-w-7xl items-center gap-14 px-5 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-full border border-[#9c7a3f]/35 bg-[#07133f] shadow-[0_30px_80px_rgba(7,19,63,0.18)] lg:h-64 lg:w-64">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[#c5aa72]/35">
              <LockKeyhole
                className="h-10 w-10 text-[#c5aa72]"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="afortu-kicker">Acceso privado</p>
            <h1 className="afortu-display mt-6 text-5xl font-medium leading-[0.98] tracking-[-0.03em] text-[#07133f] sm:text-6xl">
              El portal público no solicita credenciales.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#596273]">
              Por seguridad, el acceso de clientes no está habilitado desde esta
              versión pública. Si ya es cliente de AFORTU, comuníquese con su
              responsable de atención para confirmar el canal autorizado.
            </p>

            <div className="mt-8 flex gap-4 border-y border-[#c9bda9] py-5 text-sm font-semibold leading-6 text-[#33405a]">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-[#795f2e]"
                aria-hidden="true"
              />
              AFORTU nunca le pedirá contraseñas, códigos de acceso ni datos
              bancarios completos desde esta página.
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
              <Link
                href="/contact"
                className="afortu-primary-button bg-[#07133f] text-white shadow-[0_16px_38px_rgba(7,19,63,0.17)] hover:bg-[#0d2045]"
              >
                Contactar a AFORTU
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/" className="afortu-secondary-link text-[#07133f]">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Volver al inicio
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

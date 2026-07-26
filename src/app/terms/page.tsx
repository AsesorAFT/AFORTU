import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Mail } from "lucide-react";
import { PublicFooter, PublicHeader } from "@/components/site/public-shell";

export const metadata: Metadata = {
  title: "Términos y alcance del sitio",
  description:
    "Alcance general de la información y de los canales públicos de AFORTU.",
  robots: {
    index: false,
    follow: false,
  },
};

const sections = [
  {
    number: "01",
    title: "Naturaleza del sitio",
    body: [
      "El sitio público de AFORTU presenta información general sobre su modelo de coordinación patrimonial, áreas de atención y canales de contacto.",
      "El contenido no constituye por sí mismo una oferta, contratación, recomendación individualizada, opinión legal o fiscal, ni garantía de resultado o rendimiento.",
    ],
  },
  {
    number: "02",
    title: "Diagnóstico y contratación",
    body: [
      "Todo servicio requiere definir previamente el objetivo, el alcance, la información necesaria, los responsables y las condiciones aplicables.",
      "Una conversación, mensaje, material informativo o simulación no sustituye el diagnóstico, la documentación ni el contrato correspondiente.",
    ],
  },
  {
    number: "03",
    title: "Participación de especialistas",
    body: [
      "Cuando una materia requiera autorización, representación, dictamen o intervención profesional específica, la participación deberá realizarse por la persona o entidad facultada para ello.",
      "AFORTU puede coordinar el contexto y la secuencia del caso sin sustituir las responsabilidades propias de cada especialista.",
    ],
  },
  {
    number: "04",
    title: "Uso responsable",
    body: [
      "La persona usuaria se compromete a utilizar el sitio y sus canales para fines lícitos, a no intentar vulnerar su seguridad y a no proporcionar información falsa o perteneciente a terceros sin autorización.",
      "No deben enviarse contraseñas, códigos, datos bancarios completos ni documentación sensible mediante canales ordinarios.",
    ],
  },
  {
    number: "05",
    title: "Contenido y propiedad intelectual",
    body: [
      "La marca AFORTU, sus elementos gráficos, textos, estructura y materiales propios no pueden reproducirse, alterarse o utilizarse comercialmente sin autorización.",
      "Las referencias a terceros conservan los derechos y responsabilidades de sus respectivos titulares.",
    ],
  },
  {
    number: "06",
    title: "Disponibilidad y actualización",
    body: [
      "AFORTU puede actualizar el sitio, corregir contenido o modificar sus canales cuando sea necesario. La disponibilidad continua del sitio no está garantizada.",
      "Los documentos contractuales, avisos específicos y comunicaciones formales de un caso prevalecerán respecto del contenido general de esta página.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="afortu-public min-h-screen">
      <PublicHeader />
      <main>
        <section className="bg-[#071a2b] text-white">
          <div className="mx-auto grid min-h-[420px] max-w-[1240px] items-end gap-8 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_auto] lg:px-8">
            <div>
              <p className="afortu-kicker afortu-kicker-light">
                Centro de confianza
              </p>
              <h1 className="afortu-display mt-7 max-w-4xl text-[clamp(3rem,6vw,5.7rem)] font-medium leading-[0.94] tracking-[-0.045em]">
                Términos y alcance del sitio.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300">
                Límites claros para distinguir información, diagnóstico,
                contratación y participación especializada.
              </p>
            </div>
            <FileText
              className="hidden h-16 w-16 text-[#b89663] lg:block"
              aria-hidden="true"
            />
          </div>
        </section>

        <section className="bg-[#f6f2ea]">
          <div className="mx-auto max-w-[1020px] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="flex flex-col gap-4 border-b border-[#c7bdaf] pb-8 sm:flex-row sm:items-end sm:justify-between">
              <p className="text-sm leading-6 text-[#59666e]">
                Última actualización: 25 de julio de 2026
              </p>
              <Link
                href="mailto:contacto@afortu.com.mx"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#71562f] hover:text-[#071a2b]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                contacto@afortu.com.mx
              </Link>
            </div>

            <div className="border-l border-[#c7bdaf]">
              {sections.map((section) => (
                <section
                  key={section.number}
                  className="grid border-b border-r border-[#c7bdaf] bg-[#fbf9f4] p-7 sm:grid-cols-[5rem_1fr] sm:gap-8 sm:p-10"
                >
                  <span className="afortu-display text-4xl text-[#8a693b]/55">
                    {section.number}
                  </span>
                  <div className="mt-6 sm:mt-0">
                    <h2 className="!font-sans text-xl font-extrabold text-[#071a2b]">
                      {section.title}
                    </h2>
                    <div className="mt-5 grid gap-4 text-sm leading-7 text-[#59666e]">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import { PublicFooter, PublicHeader } from "@/components/site/public-shell";

export const metadata: Metadata = {
  title: "Privacidad y canales digitales",
  description:
    "Información general sobre el uso de datos y canales digitales de AFORTU.",
  robots: {
    index: false,
    follow: false,
  },
};

const sections = [
  {
    number: "01",
    title: "Alcance",
    body: [
      "Esta página describe de forma general cómo se utiliza la información compartida voluntariamente a través del sitio público, correo electrónico, teléfono o mensajería de AFORTU.",
      "Cuando un servicio requiera expediente, documentación adicional o el tratamiento de información específica, se informará el canal, el alcance y las condiciones aplicables antes de recabarla.",
    ],
  },
  {
    number: "02",
    title: "Información que puede recibirse",
    body: [
      "AFORTU puede recibir datos de identificación y contacto, así como el contenido que una persona decida compartir para solicitar información, coordinar una conversación o dar seguimiento a una relación de servicio.",
      "Los proveedores técnicos que permiten entregar el sitio pueden procesar datos de conexión estrictamente necesarios para operar, proteger y diagnosticar el servicio.",
    ],
  },
  {
    number: "03",
    title: "Finalidades",
    body: [
      "La información puede utilizarse para responder solicitudes, identificar el área de atención adecuada, coordinar reuniones, dar seguimiento a acuerdos, mantener la seguridad de los canales y cumplir obligaciones aplicables.",
      "AFORTU no utiliza la conversación inicial para emitir automáticamente una recomendación individualizada ni para asumir una contratación.",
    ],
  },
  {
    number: "04",
    title: "Información sensible",
    body: [
      "No envíe contraseñas, códigos de acceso, datos bancarios completos, expedientes médicos ni documentos personales sensibles por correo o mensajería ordinaria.",
      "Si el caso requiere información reservada, AFORTU indicará previamente el canal y los documentos pertinentes.",
    ],
  },
  {
    number: "05",
    title: "Acceso, corrección y oposición",
    body: [
      "Para solicitar acceso, rectificación, cancelación u oposición respecto de información personal proporcionada a AFORTU, escriba a contacto@afortu.com.mx e identifique la solicitud y el medio para recibir respuesta.",
      "Podrá requerirse información razonable para verificar la identidad de la persona solicitante y proteger los datos frente a accesos no autorizados.",
    ],
  },
  {
    number: "06",
    title: "Actualizaciones",
    body: [
      "Esta información puede actualizarse cuando cambien los canales, proveedores o alcances de atención. Los avisos específicos y documentos contractuales aplicables a un servicio prevalecerán respecto de esta explicación general.",
    ],
  },
];

export default function PrivacyPage() {
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
                Privacidad y uso de canales digitales.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300">
                Información general para utilizar el sitio y contactar a AFORTU
                con mayor seguridad.
              </p>
            </div>
            <ShieldCheck
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

            <p className="border-x border-b border-[#c7bdaf] bg-[#eee8de] px-7 py-6 text-sm leading-7 text-[#4f5d66] sm:px-10">
              Esta guía acompaña los canales públicos de AFORTU y no se presenta
              como sustituto del aviso de privacidad integral aplicable a una
              relación de servicio. Antes de recabar un expediente deberán
              confirmarse el responsable, el domicilio y las condiciones
              específicas de tratamiento.
            </p>

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

import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import { PublicFooter, PublicHeader } from "@/components/site/public-shell";
import { legalIdentity } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Aviso de privacidad integral",
  description:
    "Aviso de privacidad integral de AFORTU para el sitio y sus canales públicos de contacto.",
  robots: {
    index: false,
    follow: false,
  },
};

const sections = [
  {
    number: "01",
    title: "Identidad y domicilio del responsable",
    body: [
      `${legalIdentity.legalName}, que utiliza AFORTU como nombre comercial, es responsable del tratamiento de los datos personales relacionados con este sitio y sus canales públicos.`,
      legalIdentity.address.isConfigured
        ? `Su domicilio es ${legalIdentity.address.formatted}. El canal de privacidad y derechos ARCO es ${legalIdentity.arcoEmail}.`
        : `El domicilio publicable se incorporará desde la configuración privada del sitio antes de habilitar la captación en producción. El canal de privacidad y derechos ARCO es ${legalIdentity.arcoEmail}.`,
    ],
  },
  {
    number: "02",
    title: "Datos personales tratados",
    body: [
      "Cuando una persona contacta voluntariamente a AFORTU, pueden tratarse su nombre, correo electrónico, teléfono, organización o relación con el asunto, el contenido de su solicitud y los datos técnicos mínimos asociados con la operación y seguridad del canal.",
      "Esta versión pública no contiene formularios propios, analítica publicitaria ni decisiones automatizadas. AFORTU no solicita datos sensibles, financieros o patrimoniales por este sitio, correo o mensajería ordinaria.",
    ],
  },
  {
    number: "03",
    title: "Finalidades del tratamiento",
    body: [
      "Las finalidades primarias son recibir y responder solicitudes, identificar el área de atención adecuada, coordinar reuniones, dar seguimiento a acuerdos, proteger los canales, conservar evidencia de la atención y cumplir obligaciones legales o contractuales.",
      "AFORTU no utiliza los datos de la conversación inicial para publicidad conductual, perfiles automatizados ni recomendaciones individuales automáticas. Si un servicio posterior requiere datos financieros, patrimoniales o sensibles, se presentará el aviso y se obtendrá el consentimiento que corresponda antes de recabarlos.",
    ],
  },
  {
    number: "04",
    title: "Limitación y revocación",
    body: [
      `Para limitar el uso o divulgación de sus datos, o revocar su consentimiento, escriba a ${legalIdentity.arcoEmail} con el asunto “Privacidad — limitación o revocación”. Indique su nombre, el medio para recibir respuesta, el canal por el que contactó y el alcance de su solicitud.`,
      "La revocación no tendrá efectos retroactivos ni impedirá tratamientos que deban conservarse por una obligación legal o por responsabilidades derivadas de una relación jurídica.",
    ],
  },
  {
    number: "05",
    title: "Derechos ARCO",
    body: [
      `Para ejercer los derechos de acceso, rectificación, cancelación u oposición, escriba a ${legalIdentity.arcoEmail} con su nombre, un medio para recibir notificaciones, la descripción del derecho que desea ejercer y los datos involucrados. También puede incluir elementos que ayuden a localizarlos.`,
      "AFORTU solicitará la acreditación de identidad o representación por un canal adecuado; no envíe identificaciones por WhatsApp. La determinación se comunicará en un máximo de veinte días hábiles y, si resulta procedente, se hará efectiva dentro de los quince días hábiles siguientes. Los plazos podrán ampliarse una sola vez cuando las circunstancias lo justifiquen.",
    ],
  },
  {
    number: "06",
    title: "Conservación, seguridad y encargados",
    body: [
      "Los datos se conservarán únicamente durante el tiempo necesario para las finalidades informadas y los plazos legales o contractuales aplicables; después se bloquearán y suprimirán cuando corresponda.",
      "AFORTU aplica medidas administrativas, técnicas y físicas razonables. Proveedores de alojamiento, correo, mensajería y sistemas internos de seguimiento pueden tratar datos por cuenta de AFORTU como encargados y deben sujetarse a las finalidades y medidas aplicables.",
    ],
  },
  {
    number: "07",
    title: "Transferencias y canales de terceros",
    body: [
      "AFORTU no realiza, con motivo de este sitio público, transferencias de datos que requieran el consentimiento de la persona titular. Podrá comunicar información sin consentimiento únicamente en los casos permitidos por la ley, por ejemplo para cumplir una obligación, atender a una autoridad competente, proteger un derecho o mantener una relación jurídica.",
      "Si una solicitud llegara a requerir una transferencia distinta, AFORTU identificará al destinatario y la finalidad y solicitará la aceptación correspondiente antes de realizarla. Al elegir WhatsApp, correo u otro canal externo, la persona también queda sujeta a las prácticas de privacidad del proveedor de ese canal.",
    ],
  },
  {
    number: "08",
    title: "Cambios y autoridad competente",
    body: [
      "Los cambios a este aviso se comunicarán mediante esta misma página y, cuando sean materiales para una relación vigente, por el canal de contacto disponible. La fecha de actualización se muestra al inicio.",
      "Si considera que su derecho a la protección de datos personales ha sido vulnerado, puede acudir a la Secretaría Anticorrupción y Buen Gobierno conforme a la legislación aplicable.",
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
                Aviso de privacidad integral.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300">
                Información sobre el responsable, los datos tratados, sus
                finalidades y los medios para ejercer derechos ARCO.
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
                Última actualización: {legalIdentity.lastUpdated}
              </p>
              <Link
                href={`mailto:${legalIdentity.arcoEmail}?subject=Privacidad%20y%20derechos%20ARCO`}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#71562f] hover:text-[#071a2b]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {legalIdentity.arcoEmail}
              </Link>
            </div>

            <p className="border-x border-b border-[#c7bdaf] bg-[#eee8de] px-7 py-6 text-sm leading-7 text-[#4f5d66] sm:px-10">
              Este aviso cubre el sitio público y la conversación inicial. Los
              expedientes o servicios que impliquen otras categorías de datos
              podrán contar con un aviso específico, que complementará este
              documento y prevalecerá respecto de ese tratamiento.
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

import type { Metadata } from "next";
import { Landmark } from "lucide-react";
import {
  SolutionPage,
  type SolutionPageData,
} from "@/components/site/solution-page";

export const metadata: Metadata = {
  title: "Legado | Continuidad con estructura",
  description:
    "AFORTU organiza inventario, documentación, titulares, beneficiarios y dependencias para coordinar una ruta de continuidad patrimonial.",
  alternates: {
    canonical: "/legado",
  },
};

const data: SolutionPageData = {
  number: "03",
  label: "Legado",
  title: "Continuidad con estructura.",
  lead: "Organizamos patrimonio, documentos, titulares, beneficiarios y dependencias para que la continuidad no dependa de información dispersa.",
  Icon: Landmark,
  media: {
    src: "/media/editorial/legado.webp",
    alt: "Un adulto mayor abraza a un niño al aire libre.",
    caption: "Titularidad · beneficiarios · continuidad",
    position: "62% center",
  },
  situations: [
    "Los activos y documentos relevantes no están inventariados en una sola vista.",
    "Existen dudas sobre titulares, beneficiarios o continuidad familiar.",
    "Una sucesión, regularización o transición requiere coordinar varias especialidades.",
    "La operación familiar o empresarial depende de acuerdos que aún no están documentados.",
  ],
  analysis: [
    {
      title: "Inventario y titularidad",
      detail:
        "Activos, derechos, obligaciones, titulares y documentos disponibles para cada elemento.",
    },
    {
      title: "Personas y dependencias",
      detail:
        "Beneficiarios, responsables, participantes y decisiones que dependen de terceros.",
    },
    {
      title: "Brechas documentales",
      detail:
        "Información faltante, inconsistencias y documentos que deben localizarse o actualizarse.",
    },
    {
      title: "Ruta especializada",
      detail:
        "Materias fiscales, notariales o jurídicas que requieren intervención profesional específica.",
    },
  ],
  deliverables: [
    {
      title: "Inventario de continuidad",
      detail:
        "Vista organizada de activos, documentos, responsables, beneficiarios y dependencias.",
    },
    {
      title: "Matriz de brechas",
      detail:
        "Riesgos, documentos faltantes, decisiones pendientes y orden de atención.",
    },
    {
      title: "Ruta de coordinación",
      detail:
        "Secuencia de acciones y especialistas, con responsables y puntos de control.",
    },
  ],
  process: [
    {
      title: "Inventario",
      detail: "Se identifica qué existe, quién participa y qué documentos hay.",
    },
    {
      title: "Brechas",
      detail: "Se distinguen omisiones, contradicciones y dependencias.",
    },
    {
      title: "Coordinación",
      detail:
        "Se define la intervención fiscal, jurídica o notarial necesaria.",
    },
    {
      title: "Continuidad",
      detail:
        "Se da seguimiento a documentos, acuerdos y siguientes decisiones.",
    },
  ],
  limits: [
    "AFORTU no sustituye funciones notariales, judiciales, fiscales o de representación legal.",
    "Los plazos dependen de documentos, autoridades, especialistas y terceras personas.",
    "La coordinación no garantiza resoluciones, autorizaciones ni resultados procesales.",
    "Toda representación o servicio jurídico específico requiere un alcance y contrato independientes.",
  ],
  faqs: [
    {
      question: "¿Legado significa únicamente testamento?",
      answer:
        "No. Puede incluir inventario, documentación, beneficiarios, titularidad, continuidad familiar o empresarial y coordinación especializada.",
    },
    {
      question: "¿AFORTU lleva procedimientos legales?",
      answer:
        "AFORTU puede coordinar el contexto y la ruta. La representación o actuación jurídica corresponde al profesional facultado y al contrato específico.",
    },
    {
      question: "¿Se puede empezar si faltan documentos?",
      answer:
        "Sí. Una primera función del diagnóstico es distinguir qué existe, qué falta y qué no puede concluirse hasta obtener evidencia suficiente.",
    },
  ],
  next: {
    label: "Modelo AFORTU",
    href: "/#modelo",
  },
};

export default function LegadoPage() {
  return <SolutionPage data={data} />;
}

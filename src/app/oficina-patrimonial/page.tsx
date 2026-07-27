import type { Metadata } from "next";
import { BriefcaseBusiness } from "lucide-react";
import {
  AudiencePage,
  type AudiencePageData,
} from "@/components/site/audience-page";

export const metadata: Metadata = {
  title: "Oficina Patrimonial | Gobierno y seguimiento del patrimonio",
  description:
    "Una capa de coordinación para patrimonios con múltiples activos, entidades, especialistas y decisiones relacionadas.",
  alternates: { canonical: "/oficina-patrimonial" },
};

const data: AudiencePageData = {
  number: "03",
  label: "Oficina Patrimonial",
  title:
    "Una mesa de gobierno para patrimonios que ya no caben en decisiones aisladas.",
  lead: "Centralizamos contexto, documentación, responsables y seguimiento para que cada especialista trabaje sobre la misma arquitectura de decisión.",
  Icon: BriefcaseBusiness,
  situations: [
    "Existen múltiples activos, sociedades, inmuebles o relaciones profesionales sin una vista coordinada.",
    "Las decisiones dependen de información repartida entre personas, documentos y proveedores.",
    "El patrimonio necesita continuidad operativa aun cuando cambien las personas o circunstancias.",
    "Se requiere una agenda ejecutiva que distinga dirección, análisis especializado y ejecución.",
  ],
  decisions: [
    {
      title: "Visión consolidada",
      detail:
        "Unificar objetivos, activos, entidades, obligaciones, riesgos y asuntos pendientes.",
    },
    {
      title: "Arquitectura de gobierno",
      detail:
        "Definir autoridad, participantes, límites, entregables y criterios para elevar decisiones.",
    },
    {
      title: "Control y continuidad",
      detail:
        "Dar trazabilidad a expedientes, acuerdos, revisiones y dependencias entre especialistas.",
    },
  ],
  outputs: [
    {
      title: "Libro maestro patrimonial",
      detail:
        "Inventario funcional y mapa de relaciones, sin sustituir registros o custodios oficiales.",
    },
    {
      title: "Agenda ejecutiva",
      detail:
        "Decisiones priorizadas, información faltante y asuntos que requieren autorización.",
    },
    {
      title: "Expediente de gobierno",
      detail:
        "Responsables, alcances, entregables y evidencia de seguimiento por frente de trabajo.",
    },
    {
      title: "Revisión periódica",
      detail:
        "Actualización de riesgos, objetivos, contexto y próximos movimientos.",
    },
  ],
  participants: [
    "El titular o comité conserva autoridad sobre las decisiones.",
    "El Asesor Principal prepara el tablero y coordina la secuencia.",
    "Cada especialista responde por su análisis, dictamen o ejecución.",
    "El control patrimonial conserva contexto, acuerdos y seguimiento.",
  ],
  boundary:
    "La Oficina Patrimonial AFORTU funciona como una capa de coordinación y gobierno. No se presenta como banco, custodio, fiduciario, casa de bolsa ni sustituto de las entidades reguladas que correspondan.",
};

export default function OficinaPatrimonialPage() {
  return <AudiencePage data={data} />;
}

import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import {
  AudiencePage,
  type AudiencePageData,
} from "@/components/site/audience-page";

export const metadata: Metadata = {
  title: "Empresas | Coordinación patrimonial y continuidad",
  description:
    "AFORTU ayuda a ordenar decisiones que conectan empresa, socios, liquidez, riesgo y patrimonio personal.",
  alternates: { canonical: "/empresas" },
};

const data: AudiencePageData = {
  number: "02",
  label: "Empresas",
  title: "Separar, conectar y gobernar las decisiones correctas.",
  lead: "Cuando empresa y patrimonio personal se influyen mutuamente, coordinamos el diagnóstico para evitar soluciones aisladas y dependencias ocultas.",
  Icon: Building2,
  situations: [
    "La liquidez empresarial y las necesidades patrimoniales de los socios se confunden o compiten.",
    "El crecimiento depende demasiado de una persona, relación o fuente de ingresos.",
    "Existen decisiones fiscales, contractuales, financieras y sucesorias que deben seguir una misma secuencia.",
    "La continuidad del negocio no está traducida en responsables, documentos y criterios de decisión.",
  ],
  decisions: [
    {
      title: "Empresa y socios",
      detail:
        "Distinguir qué pertenece a la operación, qué corresponde a cada socio y dónde existen dependencias materiales.",
    },
    {
      title: "Liquidez y exposición",
      detail:
        "Ordenar necesidades de capital, obligaciones, concentración y escenarios que requieren protección.",
    },
    {
      title: "Continuidad y gobierno",
      detail:
        "Definir decisiones críticas, responsables, documentación y especialistas necesarios para ejecutarlas.",
    },
  ],
  outputs: [
    {
      title: "Mapa empresa–patrimonio",
      detail:
        "Relación entre operación, socios, activos, obligaciones y riesgos de concentración.",
    },
    {
      title: "Matriz de decisiones",
      detail:
        "Priorización por impacto, urgencia, dependencia, costo y reversibilidad.",
    },
    {
      title: "Ruta de continuidad",
      detail:
        "Secuencia de asuntos corporativos, patrimoniales, fiscales o sucesorios por validar.",
    },
    {
      title: "Mesa de seguimiento",
      detail:
        "Responsables, entregables, fechas y bloqueos visibles para la dirección.",
    },
  ],
  participants: [
    "La dirección y los socios definen objetivos, restricciones y autoridad.",
    "El Asesor Principal integra el tablero empresarial y patrimonial.",
    "Contadores, abogados, especialistas financieros y otros profesionales resuelven su alcance.",
    "La mesa de seguimiento mantiene trazabilidad sin duplicar responsabilidades.",
  ],
  boundary:
    "La coordinación de AFORTU no sustituye la administración de la empresa, la opinión fiscal o jurídica, la auditoría ni cualquier actividad reservada a una entidad o profesional autorizado.",
};

export default function EmpresasPage() {
  return <AudiencePage data={data} />;
}

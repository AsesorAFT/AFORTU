import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import {
  SolutionPage,
  type SolutionPageData,
} from "@/components/site/solution-page";

export const metadata: Metadata = {
  title: "Patrimonio | Orden para decidir con claridad",
  description:
    "AFORTU integra objetivos, activos, obligaciones, liquidez y riesgos para construir una ruta patrimonial coordinada.",
  alternates: {
    canonical: "/patrimonio",
  },
};

const data: SolutionPageData = {
  number: "01",
  label: "Patrimonio",
  title: "Orden para decidir con claridad.",
  lead: "Integramos objetivos, activos, obligaciones, liquidez y riesgos para que cada decisión responda a una misma visión.",
  Icon: ShieldCheck,
  situations: [
    "Existen activos o ingresos, pero no una jerarquía clara de prioridades.",
    "Varias decisiones compiten por la misma liquidez.",
    "Las obligaciones, riesgos o necesidades familiares no están integrados al plan.",
    "Se necesita coordinar decisiones financieras con implicaciones fiscales, jurídicas o empresariales.",
  ],
  analysis: [
    {
      title: "Objetivos y restricciones",
      detail:
        "Qué se busca lograr, qué debe protegerse y qué condiciones limitan la decisión.",
    },
    {
      title: "Activos y obligaciones",
      detail:
        "Inventario funcional de recursos, compromisos, dependencias y documentación disponible.",
    },
    {
      title: "Liquidez y horizonte",
      detail:
        "Necesidades de efectivo, plazos, capacidad de espera y decisiones que no pueden aplazarse.",
    },
    {
      title: "Riesgo y coordinación",
      detail:
        "Exposiciones relevantes y materias que requieren intervención fiscal, jurídica o especializada.",
    },
  ],
  deliverables: [
    {
      title: "Mapa patrimonial",
      detail:
        "Vista consolidada de objetivos, recursos, obligaciones, riesgos y decisiones pendientes.",
    },
    {
      title: "Matriz de prioridades",
      detail:
        "Comparación por impacto, urgencia, costo, dependencia y reversibilidad.",
    },
    {
      title: "Ruta coordinada",
      detail:
        "Secuencia de acciones, responsables, información necesaria y puntos de revisión.",
    },
  ],
  process: [
    {
      title: "Levantamiento",
      detail: "Se define el objetivo y se organiza la información disponible.",
    },
    {
      title: "Diagnóstico",
      detail: "Se identifican brechas, dependencias y decisiones críticas.",
    },
    {
      title: "Arquitectura",
      detail: "Se comparan rutas y se establece una secuencia de trabajo.",
    },
    {
      title: "Seguimiento",
      detail: "Se controlan acuerdos, entregables y ajustes de contexto.",
    },
  ],
  limits: [
    "El diagnóstico no implica custodia de activos ni ejecución automática de operaciones.",
    "Las cifras, escenarios y recomendaciones dependen de la calidad y actualidad de la información proporcionada.",
    "No se prometen resultados ni rendimientos.",
    "Las materias reservadas se canalizan o coordinan con especialistas facultados.",
  ],
  faqs: [
    {
      question: "¿Necesito tener un patrimonio grande?",
      answer:
        "No necesariamente. El criterio principal es la complejidad de las decisiones y la necesidad de coordinarlas, no una cifra pública predeterminada.",
    },
    {
      question: "¿El diagnóstico obliga a contratar?",
      answer:
        "No. La conversación inicial sirve para determinar si existe un problema que AFORTU pueda coordinar y cuál sería el alcance.",
    },
    {
      question: "¿AFORTU decide por el cliente?",
      answer:
        "No. AFORTU ordena información, compara opciones y coordina la ejecución; la decisión corresponde al cliente dentro del alcance acordado.",
    },
  ],
  next: {
    label: "Retiro",
    href: "/retiro",
  },
};

export default function PatrimonioPage() {
  return <SolutionPage data={data} />;
}

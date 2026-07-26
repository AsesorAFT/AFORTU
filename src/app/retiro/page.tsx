import type { Metadata } from "next";
import { PiggyBank } from "lucide-react";
import {
  SolutionPage,
  type SolutionPageData,
} from "@/components/site/solution-page";

export const metadata: Metadata = {
  title: "Retiro | Preparación con horizonte",
  description:
    "AFORTU revisa el punto de partida, compara escenarios y coordina una ruta de retiro congruente con tiempo, liquidez y capacidad de aportación.",
  alternates: {
    canonical: "/retiro",
  },
};

const data: SolutionPageData = {
  number: "02",
  label: "Retiro",
  title: "Preparación con horizonte.",
  lead: "Revisamos el punto de partida y construimos una ruta que conecte situación previsional, ahorro, tiempo, liquidez y capacidad de aportación.",
  Icon: PiggyBank,
  situations: [
    "Se conocen algunos datos de cotización o ahorro, pero no su efecto conjunto.",
    "Hay dudas sobre el horizonte, las brechas o la secuencia de decisiones.",
    "Las aportaciones actuales no responden a un escenario definido.",
    "La estrategia de retiro debe coordinarse con liquidez, patrimonio o continuidad familiar.",
  ],
  analysis: [
    {
      title: "Punto de partida",
      detail:
        "Información previsional disponible, ahorro, edad, horizonte y objetivos declarados.",
    },
    {
      title: "Escenarios",
      detail:
        "Comparación de rutas bajo supuestos explícitos de tiempo, aportación y liquidez.",
    },
    {
      title: "Brechas y dependencias",
      detail:
        "Datos faltantes, decisiones institucionales y factores que pueden modificar el resultado.",
    },
    {
      title: "Capacidad de aportación",
      detail:
        "Monto, periodicidad y flexibilidad que pueden sostenerse sin deteriorar otras prioridades.",
    },
  ],
  deliverables: [
    {
      title: "Diagnóstico base",
      detail:
        "Resumen del punto de partida, información confirmada, supuestos y datos pendientes.",
    },
    {
      title: "Comparativo de escenarios",
      detail:
        "Rutas posibles con variables, riesgos y diferencias claramente identificadas.",
    },
    {
      title: "Plan de acciones",
      detail:
        "Secuencia de verificaciones, aportaciones, decisiones y fechas de revisión.",
    },
  ],
  process: [
    {
      title: "Verificación",
      detail: "Se reúne y distingue información confirmada de estimaciones.",
    },
    {
      title: "Proyección",
      detail: "Se construyen escenarios comparables bajo supuestos visibles.",
    },
    {
      title: "Decisión",
      detail: "Se elige una ruta congruente con horizonte y liquidez.",
    },
    {
      title: "Revisión",
      detail: "Se actualiza el plan cuando cambian datos, reglas u objetivos.",
    },
  ],
  limits: [
    "Toda proyección es una estimación y depende de supuestos, información y reglas vigentes.",
    "Los derechos, resoluciones y montos oficiales corresponden a las instituciones competentes.",
    "No se garantizan pensiones, rendimientos ni fechas de resolución.",
    "Cuando el caso requiera gestión legal, fiscal o institucional específica, se define un alcance separado.",
  ],
  faqs: [
    {
      question: "¿Una proyección es el monto que recibiré?",
      answer:
        "No. Una proyección permite comparar escenarios; el resultado real depende de datos, reglas, decisiones futuras y determinaciones institucionales.",
    },
    {
      question: "¿Puedo revisar mi retiro aunque falten documentos?",
      answer:
        "Sí, siempre que se identifique con claridad qué está confirmado, qué falta y qué conclusiones no pueden emitirse todavía.",
    },
    {
      question: "¿El plan puede cambiar?",
      answer:
        "Sí. Un plan serio se revisa cuando cambian ingresos, aportaciones, regulación, horizonte o prioridades patrimoniales.",
    },
  ],
  next: {
    label: "Legado",
    href: "/legado",
  },
};

export default function RetiroPage() {
  return <SolutionPage data={data} />;
}

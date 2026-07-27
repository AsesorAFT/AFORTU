import type { Metadata } from "next";
import { UsersRound } from "lucide-react";
import {
  AudiencePage,
  type AudiencePageData,
} from "@/components/site/audience-page";

export const metadata: Metadata = {
  title: "Personas y familias | Decisiones patrimoniales coordinadas",
  description:
    "AFORTU coordina patrimonio, retiro y legado para personas y familias que necesitan ordenar decisiones relacionadas entre sí.",
  alternates: { canonical: "/personas-y-familias" },
};

const data: AudiencePageData = {
  number: "01",
  label: "Personas y familias",
  title: "Una arquitectura para decisiones que atraviesan generaciones.",
  lead: "Integramos objetivos familiares, liquidez, retiro, titularidad y continuidad para definir una secuencia comprensible y documentada.",
  Icon: UsersRound,
  situations: [
    "El patrimonio está distribuido entre inmuebles, cuentas, negocios u obligaciones sin una vista consolidada.",
    "Las decisiones de retiro compiten con necesidades presentes de liquidez o protección familiar.",
    "Existen documentos, beneficiarios o titularidades que deben revisarse de forma coordinada.",
    "La familia necesita distinguir decisiones urgentes, importantes y dependientes de especialistas.",
  ],
  decisions: [
    {
      title: "Patrimonio presente",
      detail:
        "Qué existe, qué obligaciones lo afectan y qué parte necesita liquidez, protección u orden documental.",
    },
    {
      title: "Retiro y horizonte",
      detail:
        "Qué ingreso futuro se busca, con qué plazo y qué decisiones actuales condicionan ese objetivo.",
    },
    {
      title: "Continuidad familiar",
      detail:
        "Cómo se relacionan titularidad, beneficiarios, documentos y acuerdos para reducir dependencias evitables.",
    },
  ],
  outputs: [
    {
      title: "Mapa familiar consolidado",
      detail:
        "Objetivos, activos, obligaciones, riesgos y decisiones pendientes en una sola lectura.",
    },
    {
      title: "Ruta de retiro",
      detail:
        "Escenarios, dependencias y próximos movimientos sujetos a información verificable.",
    },
    {
      title: "Expediente de continuidad",
      detail:
        "Documentos, responsables y asuntos que requieren coordinación jurídica, fiscal o notarial.",
    },
    {
      title: "Agenda de seguimiento",
      detail:
        "Prioridades, responsables, fechas de revisión y evidencia necesaria para avanzar.",
    },
  ],
  participants: [
    "La persona o familia conserva la decisión final y autoriza cada intervención.",
    "El Asesor Principal ordena contexto, dependencias y secuencia.",
    "Los especialistas intervienen únicamente dentro de su materia y alcance.",
    "El seguimiento documenta acuerdos, entregables y próximos movimientos.",
  ],
  boundary:
    "AFORTU organiza el caso y coordina la ruta. Las recomendaciones o actos reservados a profesionales autorizados deben ser emitidos o ejecutados por la persona facultada correspondiente.",
};

export default function PersonasFamiliasPage() {
  return <AudiencePage data={data} />;
}

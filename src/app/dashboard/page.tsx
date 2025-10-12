import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  ArrowUpRight,
  Building,
  CalendarClock,
  CheckCircle2,
  FileText,
  Flag,
  ShieldCheck,
} from 'lucide-react';

const kpis = [
  {
    label: 'Valor patrimonial',
    value: '$48.2M MXN',
    trend: '+4.3% este mes',
  },
  {
    label: 'Liquidez disponible',
    value: '$6.4M MXN',
    trend: 'Objetivo cubierto 82%',
  },
  {
    label: 'Riesgo agregado',
    value: 'Moderado',
    trend: 'Volatilidad anualizada 7.9%',
  },
];

const objectives = [
  {
    name: 'Preservar capital familiar',
    progress: 78,
    deadline: 'Dic 2025',
    status: 'En curso',
  },
  {
    name: 'Expandir holding inmobiliario',
    progress: 52,
    deadline: 'Jun 2026',
    status: 'Explorando oportunidades',
  },
  {
    name: 'Fondo de becas familiares',
    progress: 34,
    deadline: 'Ene 2027',
    status: 'Diseño de fideicomiso',
  },
];

const recommendations = [
  {
    title: 'Rebalanceo táctico',
    description:
      'Reduce 5% exposición a renta variable US y migra a deuda corporativa grado de inversión MX para mantener el perfil moderado.',
    impact: 'Impacto estimado: -0.7% volatilidad',
  },
  {
    title: 'Blindaje fiscal',
    description:
      'Activa la estructura holding en España antes del cierre trimestral para aprovechar el convenio de doble tributación.',
    impact: 'Recomendado por mesa fiscal AFORTU',
  },
  {
    title: 'Gobierno corporativo',
    description:
      'Agenda comité familiar extraordinario para actualizar protocolo de sucesión conforme a nueva incorporación accionaria.',
    impact: 'Propuesto por asesor jurídico',
  },
];

const timeline = [
  {
    title: 'Comité de inversión',
    description: 'Revisión trimestral con estrategas AFORTU PRO',
    date: '11 marzo · 10:00 h',
    icon: CalendarClock,
  },
  {
    title: 'Entrega de reporte fiscal',
    description: 'Resumen multi-país + documentación CFDI',
    date: '18 marzo · 13:00 h',
    icon: FileText,
  },
  {
    title: 'Workshop sucesión',
    description: 'Sesión con familia y notario asignado',
    date: '27 marzo · 17:00 h',
    icon: Building,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-6 lg:p-10">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Badge className="bg-[#f7c873] text-[#0a1931]">Cuenta PRO</Badge>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 lg:text-4xl">Bienvenido de nuevo, Usuario Demo</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Esta es tu vista consolidada. Los datos de portafolio, métricas fiscales y objetivos se actualizan cada 15 minutos.
            Usa las acciones recomendadas para mantener tu estrategia alineada.
          </p>
        </div>
        <Button className="self-start bg-[#0a1931] hover:bg-[#132a4c] text-white" size="lg">
          Ver reporte mensual
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="border-slate-200/80 shadow-md">
            <CardHeader>
              <CardDescription className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                {kpi.label}
              </CardDescription>
              <CardTitle className="text-3xl text-[#0a1931]">{kpi.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle className="text-2xl text-[#0a1931]">Objetivos estratégicos</CardTitle>
            <CardDescription className="text-slate-600">
              Seguimiento directo de tus metas clave configuradas con tu asesor AFORTU.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {objectives.map((objective) => (
              <div key={objective.name} className="space-y-3 rounded-xl border border-slate-200/70 bg-white p-5">
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-[#0a1931]">{objective.name}</p>
                    <p className="text-sm text-slate-500">Meta {objective.status} · Hito {objective.deadline}</p>
                  </div>
                  <Badge className="bg-[#0a1931]/10 text-[#0a1931]">{objective.progress}% avance</Badge>
                </div>
                <Progress value={objective.progress} className="h-2 bg-slate-100" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle className="text-2xl text-[#0a1931]">Recomendaciones recientes</CardTitle>
            <CardDescription className="text-slate-600">
              Insights generados por la IA y validados por tu equipo de asesores.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {recommendations.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200/70 bg-slate-50 p-5">
                <p className="text-base font-semibold text-[#0a1931]">{item.title}</p>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a1931]/70">{item.impact}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle className="text-2xl text-[#0a1931]">Próximos hitos</CardTitle>
            <CardDescription className="text-slate-600">
              Mantén al equipo sincronizado y evita vencimientos críticos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {timeline.map((event) => (
              <div key={event.title} className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white p-5">
                <div className="rounded-full bg-[#0a1931]/10 p-2 text-[#0a1931]">
                  <event.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#0a1931]">{event.title}</p>
                  <p className="text-sm text-slate-600">{event.description}</p>
                  <p className="mt-1 text-xs font-medium text-[#0a1931]/70">{event.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle className="text-2xl text-[#0a1931]">Checklist de cumplimiento</CardTitle>
            <CardDescription className="text-slate-600">
              Acciones sugeridas para mantener el blindaje legal y regulatorio activo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white p-4">
              <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-500" />
              <div>
                <p className="text-sm font-semibold text-[#0a1931]">Validar KYC de socios internacionales</p>
                <p className="text-xs text-slate-500">Última actualización hace 12 días</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white p-4">
              <ShieldCheck className="mt-1 h-5 w-5 text-[#f7c873]" />
              <div>
                <p className="text-sm font-semibold text-[#0a1931]">Actualizar pólizas de seguro patrimonial</p>
                <p className="text-xs text-slate-500">Vencen en 28 días · Contacto: seguros@afortu.com.mx</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white p-4">
              <Flag className="mt-1 h-5 w-5 text-[#0a1931]" />
              <div>
                <p className="text-sm font-semibold text-[#0a1931]">Confirmar onboarding de entidad en Delaware</p>
                <p className="text-xs text-slate-500">Documentación pendiente de firma digital</p>
              </div>
            </div>
            <Button variant="outline" className="border-[#0a1931] text-[#0a1931] hover:bg-[#0a1931]/5">
              Ver checklist completo
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, PieChart, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const assetBlocks = [
  {
    title: 'Estrategia multi-activo',
    description:
      'Definimos una asignación estratégica entre renta variable, deuda, alternativos y cash management con monitoreo constante.',
    icon: PieChart,
  },
  {
    title: 'Ejecución y rebalanceo',
    description:
      'Automatizamos rebalanceos y cobertura de riesgos respetando el mandato aprobado por el comité de inversión.',
    icon: TrendingUp,
  },
  {
    title: 'Analytics y reporting',
    description:
      'KPIs diarios, alertas de concentración y escenarios what-if con inteligencia artificial aplicada a tu portafolio.',
    icon: LineChart,
  },
];

export default function AssetManagementPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-14">
      <div className="container mx-auto space-y-10 px-6 lg:px-12">
        <section className="rounded-3xl bg-white p-10 shadow-xl">
          <Badge className="bg-[#0a1931] text-white">Asset Management</Badge>
          <h1 className="mt-6 text-3xl font-bold text-[#0a1931] lg:text-4xl">Orquestamos tu portafolio global</h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            Desde la investigación hasta la ejecución, AFORTU integra banca privada, brokers y custodios en un solo tablero. Las
            decisiones se registran y documentan para cumplir con regulaciones locales e internacionales.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild className="bg-[#0a1931] text-white hover:bg-[#132a4c]">
              <Link href="/dashboard">Ver dashboard de inversión</Link>
            </Button>
            <Button asChild variant="outline" className="border-[#0a1931] text-[#0a1931] hover:bg-[#0a1931]/5">
              <Link href="/contact?interest=gestion-activos">Agendar comité</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {assetBlocks.map((block) => (
            <Card key={block.title} className="border-slate-200/80">
              <CardHeader>
                <div className="rounded-full bg-[#0a1931]/10 p-3 text-[#0a1931]">
                  <block.icon className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4 text-xl text-[#0a1931]">{block.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">{block.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-10 shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#0a1931]">Mesa de inversión AFORTU PRO</h2>
              <p className="mt-2 max-w-2xl text-slate-600">
                Para cuentas PRO, habilitamos oportunidades club-deal, acceso a fondos alternativos y análisis ESG avanzado con
                reportes personalizados.
              </p>
            </div>
            <Button asChild className="bg-[#f7c873] text-[#0a1931] hover:bg-[#ffd700]">
              <Link href="/pro">Solicitar acceso PRO</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

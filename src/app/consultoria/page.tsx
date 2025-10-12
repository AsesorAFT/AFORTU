import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, FileSignature, Scale, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const consultingPillars = [
  {
    title: 'Gobierno corporativo',
    description: 'Diseñamos consejos consultivos, protocolos familiares y mecanismos de resolución de conflictos.',
    icon: Building2,
  },
  {
    title: 'Blindaje legal y fiscal',
    description: 'Implementamos estructuras internacionales con cumplimiento CRS/FATCA, contratos y registros necesarios.',
    icon: ShieldCheck,
  },
  {
    title: 'M&A y corporate finance',
    description: 'Evaluaciones de adquisición, valuaciones y acceso a financiamiento para expansión de negocios.',
    icon: Scale,
  },
];

export default function ConsultoriaPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-14">
      <div className="container mx-auto space-y-10 px-6 lg:px-12">
        <section className="rounded-3xl bg-white p-10 shadow-xl">
          <Badge className="bg-[#0a1931] text-white">Consultoría</Badge>
          <h1 className="mt-6 text-3xl font-bold text-[#0a1931] lg:text-4xl">Consultoría empresarial y patrimonial</h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            Acompañamos a empresas familiares y corporativos en retos legales, fiscales y financieros. Nuestro equipo coordina especialistas externos para ejecutar desde la estrategia hasta la implementación.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild className="bg-[#0a1931] text-white hover:bg-[#132a4c]">
              <Link href="/contact?interest=consultoria">Agendar diagnóstico</Link>
            </Button>
            <Button asChild variant="outline" className="border-[#0a1931] text-[#0a1931] hover:bg-[#0a1931]/5">
              <Link href="/pro">Ver paquete consultoría PRO</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {consultingPillars.map((pillar) => (
            <Card key={pillar.title} className="border-slate-200/80">
              <CardHeader>
                <div className="rounded-full bg-[#0a1931]/10 p-3 text-[#0a1931]">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4 text-xl text-[#0a1931]">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">{pillar.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="border-slate-200/80 bg-white p-10 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-[#0a1931]">
              <FileSignature className="h-6 w-6 text-[#f7c873]" /> Entregables clave
            </CardTitle>
            <CardDescription className="text-slate-600">
              Cada proyecto se ejecuta con documentación homologada para auditorías y compliance internacional.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm text-slate-600 md:grid-cols-2">
            <div>
              <p className="font-semibold text-[#0a1931]">Roadmap de implementación</p>
              <p>Con fases, responsables y KPIs asociados a cada entregable.</p>
            </div>
            <div>
              <p className="font-semibold text-[#0a1931]">Data room seguro</p>
              <p>Repositorio cifrado con control de versiones y acceso granular.</p>
            </div>
            <div>
              <p className="font-semibold text-[#0a1931]">Memorándum fiscal y legal</p>
              <p>Resumen ejecutivo con implicaciones y próximos pasos validados por expertos.</p>
            </div>
            <div>
              <p className="font-semibold text-[#0a1931]">Sesiones de alineación</p>
              <p>Workshops con stakeholders clave y actas digitales integradas al dashboard.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

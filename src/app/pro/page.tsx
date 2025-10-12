import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Crown, ShieldCheck, LineChart, Users, Workflow } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AFORTU PRO | Wealth Management de Élite',
  description:
    'Descubre AFORTU PRO: automatización fiscal, gobierno corporativo y estrategias de inversión exclusivas para alto patrimonio.'
};

const features = [
  {
    icon: Crown,
    title: 'Mesa de inversión dedicada',
    description:
      'Accede a oportunidades exclusivas, due diligence y seguimiento semanal con nuestros estrategas sénior.',
  },
  {
    icon: Workflow,
    title: 'Automatización fiscal y compliance',
    description:
      'Estructuramos reportes fiscales, flujos KYC/AML y tableros ESG integrados a tus entidades legales.',
  },
  {
    icon: Users,
    title: 'Gobierno corporativo integral',
    description:
      'Diseñamos protocolos familiares, consejos y estructuras fiduciarias para proteger la sucesión patrimonial.',
  },
  {
    icon: LineChart,
    title: 'Modelos predictivos con IA',
    description:
      'Modelamos escenarios multi-activo con Gemini 2.5 Pro, alertando desalineaciones contra tu plan maestro.',
  },
  {
    icon: ShieldCheck,
    title: 'Custodia y seguros premium',
    description:
      'Blindamos tus activos globales con aseguradoras A-rated y bóvedas con segregación de cuentas.',
  },
];

const comparison = [
  { label: 'Análisis de portafolio con IA', standard: true, pro: true },
  { label: 'Chat Asesor AFORTU 24/7', standard: true, pro: true },
  { label: 'Mesa de inversión dedicada', standard: false, pro: true },
  { label: 'Gobierno corporativo y sucesión', standard: 'Proyecto bajo demanda', pro: true },
  { label: 'Automatización fiscal multi-país', standard: false, pro: true },
  { label: 'Reportes ESG personalizados', standard: false, pro: 'Mensual' },
  { label: 'Acceso a partners legales internacionales', standard: 'A solicitud', pro: 'Incluido' },
  { label: 'Reuniones estratégicas', standard: 'Trimestral', pro: 'Mensual + on-demand' },
];

export default function ProPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050b1a] via-[#0a1931] to-[#132a4c] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(24,90,219,0.35),_transparent_60%)]" />
        <div className="relative container mx-auto px-6 py-24 text-center lg:px-12">
          <Badge className="bg-white/10 text-[#f7c873] border border-[#f7c873]/40 uppercase tracking-[0.25em]">
            Plan patrimonial PRO
          </Badge>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-white lg:text-6xl">
            El estándar de oro en gestión patrimonial integral
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">
            Construido para familias y empresas que buscan control total de su patrimonio global, cumplimiento impecable y una
            visión estratégica respaldada por datos en tiempo real.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-[#f7c873] text-[#0a1931] hover:bg-[#ffd700] font-semibold">
              <Link href="/contact">Solicitar demo personalizada</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
              <Link href="/services">Ver portafolio de servicios</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-8 px-6 py-16 lg:grid-cols-3 lg:px-12">
        {features.map((feature) => (
          <Card key={feature.title} className="bg-white/5 border-white/10 backdrop-blur-md shadow-xl">
            <CardHeader className="flex items-center gap-4">
              <div className="rounded-full bg-[#f7c873]/20 p-3 text-[#f7c873]">
                <feature.icon className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-100 leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="bg-[#050b1a]/70 py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-white lg:text-4xl">Comparativa de planes</h2>
            <p className="mt-4 text-blue-100">
              Comprende qué capacidades adicionales desbloqueas con AFORTU PRO frente a la experiencia estándar.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
            <div className="grid grid-cols-[2fr,1fr,1fr] bg-white/10 text-sm uppercase tracking-wider text-blue-100">
              <div className="px-6 py-4">Capacidad</div>
              <div className="px-6 py-4 text-center">Estándar</div>
              <div className="px-6 py-4 text-center">AFORTU PRO</div>
            </div>
            <div>
              {comparison.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[2fr,1fr,1fr] items-center px-6 py-5 text-sm lg:text-base ${
                    index % 2 === 0 ? 'bg-white/0' : 'bg-white/5'
                  }`}
                >
                  <span className="font-medium text-white">{row.label}</span>
                  <span className="text-center text-blue-100">
                    {typeof row.standard === 'boolean' ? (
                      row.standard ? <Check className="mx-auto h-5 w-5 text-[#f7c873]" /> : '—'
                    ) : (
                      row.standard
                    )}
                  </span>
                  <span className="text-center text-blue-50 font-semibold">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? <Check className="mx-auto h-5 w-5 text-[#f7c873]" /> : '—'
                    ) : (
                      row.pro
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto flex flex-col gap-10 px-6 text-center lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div className="lg:text-left">
            <h2 className="text-3xl font-bold lg:text-4xl">¿Listo para evolucionar tu gobierno patrimonial?</h2>
            <p className="mt-4 max-w-2xl text-blue-100">
              Integramos tu banca privada, family office y estructuras corporativas bajo un mismo orquestador. Nuestro equipo PRO acompaña cada decisión crítica.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild className="bg-[#f7c873] text-[#0a1931] hover:bg-[#ffd700] font-semibold">
              <Link href="/contact">Hablar con un especialista</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/10">
              <Link href="/dashboard">Ver demo del tablero</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

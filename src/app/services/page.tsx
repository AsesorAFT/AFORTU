'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Briefcase, DollarSign, Handshake, LineChart, ShieldCheck, Users } from 'lucide-react';

const serviceHighlights = [
  {
    id: 'gestion-activos',
    icon: DollarSign,
    title: 'Gestión de Activos',
    summary:
      'Administramos portafolios locales e internacionales con monitoreo en tiempo real y rebalanceos automáticos controlados por asesores sénior.',
    deliverables: ['Portafolio multi-activo', 'Alertas de rebalanceo con IA', 'Reportes de performance mensuales'],
  },
  {
    id: 'consultoria',
    icon: Briefcase,
    title: 'Consultoría Empresarial',
    summary:
      'Soluciones fiscales, legales y financieras para empresas familiares y corporativos en expansión.',
    deliverables: ['Diagnóstico fiscal y legal', 'Diseño de protocolos familiares', 'Gobierno corporativo en 90 días'],
  },
  {
    id: 'ia',
    icon: BrainCircuit,
    title: 'Asesor AFT con IA',
    summary:
      'Chat estratégico conectado a tus metas y al comportamiento del portafolio para recomendar acciones inmediatas.',
    deliverables: ['Monitoreo 24/7', 'Modelos predictivos con Gemini 2.5 Pro', 'Seguimiento personalizado por objetivos'],
  },
  {
    id: 'atencion',
    icon: Users,
    title: 'Atención Personalizada',
    summary:
      'Un equipo multidisciplinario (asesor financiero, fiscalista y legal) acompañando cada hito patrimonial.',
    deliverables: ['Mesa de inversión dedicada', 'Plan de sucesión y seguros', 'Sesiones estratégicas trimestrales'],
  },
];

const complementaryServices = [
  {
    title: 'Blindaje fiscal internacional',
    description:
      'Estructuramos holdings, fideicomisos y vehículos internacionales cumpliendo con normativas CRS, FATCA y BEPS.',
  },
  {
    title: 'Family office as a Service',
    description:
      'Creamos la oficina patrimonial sin inversión inicial: gobierno, tesorería, reporting consolidado y orquestación de terceros.',
  },
  {
    title: 'Wealth planning multigeneracional',
    description:
      'Protocolos familiares, educación financiera para herederos y simulaciones de escenarios de sucesión.',
  },
  {
    title: 'Estrategias ESG y filantropía',
    description:
      'Diseñamos vehículos y métricas de impacto para alinear tu capital con causas estratégicas.',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center">
          <Badge className="bg-[#0a1931] text-white hover:bg-[#132a4c]">Portafolio AFORTU</Badge>
          <h1 className="mt-6 text-4xl font-bold text-[#0a1931] lg:text-5xl">Servicios alineados a tu estrategia</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            Conectamos asesoría humana de alto nivel con analítica inteligente. Cada módulo puede contratarse de manera individual o como parte de un plan AFORTU PRO.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {serviceHighlights.map((service) => (
            <Card key={service.id} id={service.id} className="border-slate-200/80 shadow-xl">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="rounded-full bg-[#0a1931]/10 p-3 text-[#0a1931]">
                  <service.icon className="h-7 w-7" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-[#0a1931]">{service.title}</CardTitle>
                  <CardDescription className="text-base text-slate-600">
                    {service.summary}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="grid gap-2 text-sm text-slate-600">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-4 w-4 text-[#f7c873]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="sm" className="bg-[#0a1931] text-white hover:bg-[#132a4c]">
                    <Link href={`/contact?interest=${service.id}`}>Solicitar propuesta</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="border-[#0a1931] text-[#0a1931] hover:bg-[#0a1931]/5">
                    <Link href="#pro">Ver cómo escala en PRO</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-16 rounded-3xl bg-[#0a1931] px-8 py-12 text-white" id="pro">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#f7c873]">AFORTU PRO</p>
              <h2 className="mt-4 text-3xl font-semibold lg:text-4xl">De la consultoría puntual al acompañamiento integral</h2>
              <p className="mt-4 text-blue-100">
                Activa automatización fiscal, reportes consolidados por holding y gobierno corporativo sin fricciones. Elige qué módulos quieres delegar y nosotros los operamos con indicadores accionables.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge className="bg-white/10 text-[#f7c873] border border-[#f7c873]/40">Family Office virtual</Badge>
                <Badge className="bg-white/10 text-[#f7c873] border border-[#f7c873]/40">Mesa de inversión dedicada</Badge>
                <Badge className="bg-white/10 text-[#f7c873] border border-[#f7c873]/40">Compliance automatizado</Badge>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-[#f7c873] text-[#0a1931] hover:bg-[#ffd700] font-semibold">
                  <Link href="/pro">Explorar beneficios PRO</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/contact">Agendar diagnóstico</Link>
                </Button>
              </div>
            </div>
            <Card className="border-white/20 bg-white/10 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <Handshake className="h-5 w-5 text-[#f7c873]" /> Qué incluye el onboarding PRO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-blue-50">
                <div>
                  <p className="font-semibold text-white">Semana 1-2</p>
                  <p>Inventario patrimonial, auditoría fiscal y definición de indicadores críticos.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Semana 3-4</p>
                  <p>Implementación de tableros, conexión con custodios y activación de alertas IA.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Semana 5+</p>
                  <p>Gobierno continuo, sesiones mensuales y soporte on-demand para eventos extraordinarios.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-20">
          <div className="grid gap-6 lg:grid-cols-2">
            {complementaryServices.map((service) => (
              <Card key={service.title} className="border-slate-200/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#0a1931]">
                    <LineChart className="h-5 w-5 text-[#f7c873]" /> {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600">{service.description}</CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

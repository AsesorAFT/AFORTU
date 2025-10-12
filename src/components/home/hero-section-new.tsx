'use client';

import Link from 'next/link';
import AfortuProSerious from '@/components/ui/afortu-pro-serious';
import { 
  ArrowRight, 
  Calendar, 
  TrendingUp, 
  Shield, 
  Scale, 
  Lightbulb,
  UserCheck,
  Building2,
  Landmark,
  PiggyBank
} from 'lucide-react';
import { ServicePillarCard } from '@/components/ui/service-pillar-card';
import { TeamSpecialistCard } from '@/components/ui/team-specialist-card';

// Los 4 pilares oficiales de AFORTU
const servicePillars = [
  {
    icon: TrendingUp,
    title: 'Gestión Patrimonial',
    description: 'Estrategias personalizadas para maximizar y proteger tu patrimonio con análisis en tiempo real.',
    href: '/services/gestion-patrimonial',
  },
  {
    icon: Shield,
    title: 'Optimización Fiscal',
    description: 'Cumplimiento normativo y eficiencia tributaria para reducir cargas fiscales legalmente.',
    href: '/services/optimizacion-fiscal',
  },
  {
    icon: Scale,
    title: 'Asesoría Legal',
    description: 'Protección jurídica integral para estructuras patrimoniales y operaciones complejas.',
    href: '/services/asesoria-legal',
  },
  {
    icon: Lightbulb,
    title: 'Consultoría Estratégica',
    description: 'Visión holística para decisiones de inversión, crecimiento y planificación de largo plazo.',
    href: '/services/consultoria-estrategica',
  },
];

// Equipo especializado
const teamSpecialists = [
  {
    icon: UserCheck,
    role: 'Asesor Principal',
    description: 'Tu punto de contacto único para coordinar todas las áreas de tu gestión patrimonial.',
    color: 'gold' as const,
  },
  {
    icon: Building2,
    role: 'Asesor Patrimonial',
    description: 'Especialista en inversiones y optimización de carteras de alto rendimiento.',
    color: 'blue' as const,
  },
  {
    icon: Landmark,
    role: 'Estructurador de Legado',
    description: 'Experto en planificación sucesoria y protección de patrimonio familiar.',
    color: 'teal' as const,
  },
  {
    icon: PiggyBank,
    role: 'Planificador de Retiro',
    description: 'Diseño de estrategias para asegurar tu independencia financiera futura.',
    color: 'purple' as const,
  },
];

export function HeroSectionNew() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a1931]">
      {/* Fondo sólido con acentos sutiles */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#185adb]/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[#f7c873]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Logo y Badge */}
        <div className="mb-12 flex flex-col items-center gap-6 text-center">
          <div className="relative" style={{ width: '280px', height: '140px' }}>
            <AfortuProSerious size="lg" variant="light" className="h-full w-full" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#f7c873]/20 bg-[#f7c873]/10 px-5 py-2 text-sm font-semibold text-[#f7c873] backdrop-blur-sm">
            <TrendingUp className="h-4 w-4" />
            Gestión Patrimonial de Alto Impacto
          </div>
        </div>

        {/* Heading Principal */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Potenciamos tu{' '}
            <span className="bg-gradient-to-r from-[#f7c873] via-[#ffd700] to-[#f7c873] bg-clip-text text-transparent">
              Patrimonio
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Asesoría integral con <strong className="text-white">Asesor Principal</strong> y equipo especializado en{' '}
            <strong className="text-white">Patrimonio</strong>, <strong className="text-white">Legado</strong> y{' '}
            <strong className="text-white">Retiro</strong>. Diseñamos estrategias personalizadas para proteger y
            multiplicar tu riqueza.
          </p>
        </div>

        {/* CTA Dual */}
        <div className="mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/signup?type=diagnostico"
            className="group inline-flex items-center gap-2 rounded-xl bg-[#f7c873] px-8 py-4 text-lg font-bold text-[#0a1931] shadow-lg shadow-[#f7c873]/25 transition-all hover:bg-[#ffd700] hover:shadow-xl hover:shadow-[#f7c873]/40"
          >
            Diagnóstico Inicial
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact?type=estrategia"
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
          >
            <Calendar className="h-5 w-5" />
            Agendar Estrategia
          </Link>
        </div>

        {/* Los 4 Pilares de Servicio */}
        <div className="mb-20">
          <h2 className="mb-10 text-center text-3xl font-bold text-white md:text-4xl">
            Nuestros 4 Pilares de Servicio
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {servicePillars.map((pillar, idx) => (
              <ServicePillarCard key={idx} {...pillar} />
            ))}
          </div>
        </div>

        {/* Equipo Especializado */}
        <div className="mb-12">
          <h2 className="mb-8 text-center text-3xl font-bold text-white md:text-4xl">Tu Equipo Especializado</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-300">
            Un <strong className="text-[#f7c873]">Asesor Principal</strong> coordina a especialistas en cada área para
            ofrecerte una visión integral y resultados medibles.
          </p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {teamSpecialists.map((specialist, idx) => (
              <TeamSpecialistCard key={idx} {...specialist} />
            ))}
          </div>
        </div>

        {/* Proceso en 3 Etapas */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-12">
          <h2 className="mb-8 text-center text-2xl font-bold text-white md:text-3xl">Nuestro Proceso</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Etapa 1 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f7c873] text-2xl font-bold text-[#0a1931]">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Diagnóstico y Diseño</h3>
              <p className="text-sm leading-relaxed text-slate-300">
                Analizamos tu situación actual y diseñamos una estrategia personalizada con objetivos claros.
              </p>
            </div>

            {/* Etapa 2 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#185adb] text-2xl font-bold text-white">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Implementación</h3>
              <p className="text-sm leading-relaxed text-slate-300">
                Ejecutamos la estrategia con herramientas de vanguardia y seguimiento en tiempo real.
              </p>
            </div>

            {/* Etapa 3 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#14b8a6] text-2xl font-bold text-white">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Evolución y Adaptabilidad</h3>
              <p className="text-sm leading-relaxed text-slate-300">
                Ajustamos continuamente la estrategia según cambios en el mercado y tus necesidades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

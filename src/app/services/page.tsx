'use client';

import Link from 'next/link';
import {
  TrendingUp,
  Shield,
  Scale,
  Lightbulb,
  UserCheck,
  Building2,
  Landmark,
  PiggyBank,
  CheckCircle2,
  ArrowRight,
  Calendar,
} from 'lucide-react';

const services = [
  {
    id: 'gestion-patrimonial',
    icon: TrendingUp,
    title: 'Gestión Patrimonial',
    description:
      'Diseñamos estrategias personalizadas para maximizar el rendimiento de tus activos y proteger tu patrimonio a largo plazo.',
    features: [
      'Análisis integral de cartera de inversiones',
      'Diversificación estratégica de activos',
      'Seguimiento en tiempo real con dashboards ejecutivos',
      'Rebalanceo automático según objetivos',
      'Reportes trimestrales de desempeño',
    ],
    deliverables: [
      'Plan de Gestión Patrimonial personalizado',
      'Modelo de asignación de activos',
      'Plataforma de seguimiento 24/7',
      'Reuniones trimestrales de revisión',
    ],
    color: 'from-[#f7c873] to-[#ffd700]',
  },
  {
    id: 'optimizacion-fiscal',
    icon: Shield,
    title: 'Optimización Fiscal',
    description:
      'Estrategias integrales para reducir cargas fiscales de forma legal, maximizando eficiencia tributaria y asegurando cumplimiento normativo.',
    features: [
      'Análisis de situación fiscal actual',
      'Planeación fiscal anual y plurianual',
      'Estructuras legales para minimizar impuestos',
      'Cumplimiento regulatorio continuo',
      'Defensa ante auditorías fiscales',
    ],
    deliverables: [
      'Diagnóstico fiscal completo',
      'Estrategia de optimización tributaria',
      'Calendario de obligaciones fiscales',
      'Soporte en declaraciones y pagos',
    ],
    color: 'from-[#185adb] to-[#3b82f6]',
  },
  {
    id: 'asesoria-legal',
    icon: Scale,
    title: 'Asesoría Legal',
    description:
      'Protección jurídica integral para estructuras patrimoniales, operaciones complejas y transacciones de alto valor.',
    features: [
      'Estructuración de entidades corporativas',
      'Contratos y acuerdos patrimoniales',
      'Protección de activos ante litigios',
      'Compliance regulatorio y corporativo',
      'Asesoría en fusiones y adquisiciones',
    ],
    deliverables: [
      'Revisión legal de estructuras existentes',
      'Diseño de arquitectura corporativa',
      'Documentación legal completa',
      'Representación legal cuando se requiera',
    ],
    color: 'from-[#14b8a6] to-[#06b6d4]',
  },
  {
    id: 'consultoria-estrategica',
    icon: Lightbulb,
    title: 'Consultoría Estratégica',
    description:
      'Visión holística para decisiones de inversión, crecimiento empresarial y planificación de largo plazo con enfoque integral.',
    features: [
      'Planificación estratégica de crecimiento',
      'Análisis de oportunidades de inversión',
      'Modelado financiero y proyecciones',
      'Estrategias de sucesión y legado',
      'Asesoría en expansión internacional',
    ],
    deliverables: [
      'Plan estratégico a 3-5 años',
      'Roadmap de implementación',
      'Modelos financieros proyectados',
      'Sesiones ejecutivas trimestrales',
    ],
    color: 'from-[#a855f7] to-[#c084fc]',
  },
];

const teamMembers = [
  {
    icon: UserCheck,
    role: 'Asesor Principal',
    description:
      'Tu punto de contacto único. Coordina a todo el equipo especializado y garantiza que todas las áreas trabajen en sincronía para alcanzar tus objetivos.',
    color: 'gold' as const,
  },
  {
    icon: Building2,
    role: 'Asesor Patrimonial',
    description:
      'Especialista en inversiones y optimización de carteras. Diseña estrategias de alto rendimiento adaptadas a tu perfil de riesgo.',
    color: 'blue' as const,
  },
  {
    icon: Landmark,
    role: 'Estructurador de Legado',
    description:
      'Experto en planificación sucesoria y protección de patrimonio familiar. Diseña estructuras para preservar tu legado generacional.',
    color: 'teal' as const,
  },
  {
    icon: PiggyBank,
    role: 'Planificador de Retiro',
    description:
      'Diseña estrategias para asegurar tu independencia financiera futura. Proyecta escenarios y optimiza recursos para tu retiro.',
    color: 'purple' as const,
  },
];

const process = [
  {
    number: 1,
    title: 'Diagnóstico y Diseño',
    description:
      'Realizamos un análisis profundo de tu situación patrimonial, fiscal, legal y estratégica. Diseñamos un plan personalizado con objetivos claros y métricas de éxito.',
    color: 'bg-[#f7c873]',
  },
  {
    number: 2,
    title: 'Implementación',
    description:
      'Ejecutamos la estrategia con herramientas de vanguardia, seguimiento en tiempo real y coordinación multidisciplinaria de especialistas.',
    color: 'bg-[#185adb]',
  },
  {
    number: 3,
    title: 'Evolución y Adaptabilidad',
    description:
      'Ajustamos continuamente la estrategia según cambios en mercados, normativas y tus necesidades. Revisiones trimestrales y optimización constante.',
    color: 'bg-[#14b8a6]',
  },
];

const colorClasses = {
  gold: 'from-[#f7c873] to-[#ffd700]',
  blue: 'from-[#185adb] to-[#3b82f6]',
  teal: 'from-[#14b8a6] to-[#06b6d4]',
  purple: 'from-[#a855f7] to-[#c084fc]',
};

export default function ServicesPageNew() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero de Servicios */}
      <section className="bg-[#0a1931] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              Nuestros <span className="text-[#f7c873]">Servicios</span>
            </h1>
            <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
              Cuatro pilares de excelencia para proteger, optimizar y hacer crecer tu patrimonio. Un equipo
              especializado coordinado por tu Asesor Principal.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact?type=diagnostico"
                className="inline-flex items-center gap-2 rounded-xl bg-[#f7c873] px-8 py-4 font-bold text-[#0a1931] shadow-lg transition-all hover:bg-[#ffd700]"
              >
                Solicitar Diagnóstico
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact?type=consulta"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                <Calendar className="h-5 w-5" />
                Agendar Consulta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Servicios Detallados */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-20">
            {services.map((service, idx) => (
              <div
                key={service.id}
                id={service.id}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg md:p-12"
              >
                <div className="mb-8 flex items-start gap-6">
                  <div
                    className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} shadow-lg`}
                  >
                    <service.icon className="h-8 w-8 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">{service.title}</h2>
                    <p className="text-lg leading-relaxed text-slate-600">{service.description}</p>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {/* Qué Incluye */}
                  <div>
                    <h3 className="mb-4 text-xl font-semibold text-slate-900">Qué Incluye</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#14b8a6]" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Entregables */}
                  <div>
                    <h3 className="mb-4 text-xl font-semibold text-slate-900">Entregables</h3>
                    <ul className="space-y-3">
                      {service.deliverables.map((deliverable, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#f7c873]" />
                          <span className="text-slate-700">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Link
                    href={`/contact?service=${service.id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition-all hover:bg-slate-800"
                  >
                    Contratar {service.title}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo Responsable */}
      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">Tu Equipo Especializado</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Cada servicio cuenta con especialistas dedicados, coordinados por tu{' '}
              <strong className="text-[#f7c873]">Asesor Principal</strong> para garantizar resultados excepcionales.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all hover:shadow-lg"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${colorClasses[member.color]} shadow-md`}
                >
                  <member.icon className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">{member.role}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso en 3 Etapas */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">Nuestro Proceso</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Un enfoque estructurado en tres etapas para garantizar resultados medibles y sostenibles.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {process.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${step.color} text-3xl font-bold text-white shadow-lg`}>
                  {step.number}
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-slate-900">{step.title}</h3>
                <p className="leading-relaxed text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-[#0a1931] py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-6 text-4xl font-bold">¿Listo para Potenciar tu Patrimonio?</h2>
          <p className="mb-10 text-lg leading-relaxed text-slate-300">
            Agenda una consulta inicial sin compromiso con tu futuro Asesor Principal. Conoce cómo nuestro equipo
            especializado puede ayudarte a alcanzar tus objetivos patrimoniales.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact?type=consulta-inicial"
              className="inline-flex items-center gap-2 rounded-xl bg-[#f7c873] px-8 py-4 text-lg font-bold text-[#0a1931] shadow-lg transition-all hover:bg-[#ffd700]"
            >
              Agendar Consulta Inicial
              <Calendar className="h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              Conocer a AFORTU
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

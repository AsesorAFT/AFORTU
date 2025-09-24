'use client';

import Link from 'next/link';
import { ShieldCheck, DollarSign, TrendingUp, MessageSquareHeart, Briefcase, BookOpen } from 'lucide-react'; // Added icons

export default function ServicesPage() {
  // Placeholder data for services - Replace with actual content
  const benefits = [
    { icon: DollarSign, text: "Optimización de tu patrimonio" },
    { icon: TrendingUp, text: "Acceso a oportunidades de inversión exclusivas" },
    { icon: MessageSquareHeart, text: "Asesoramiento financiero personalizado con IA" },
    { icon: ShieldCheck, text: "Planificación para proteger tu futuro financiero" },
  ];

  const complementaryServices = [
    {
      title: "Planificación Patrimonial",
      description: "Desarrollamos estrategias personalizadas para la gestión y crecimiento de tu patrimonio a largo plazo, considerando tus objetivos y situación actual.",
      link: "#", // Replace with actual link
    },
    {
      title: "Blindaje Fiscal",
      description: "Te ofrecemos soluciones para optimizar tu carga fiscal de manera legal y eficiente, protegiendo tus activos.",
      link: "#", // Replace with actual link
    },
    {
      title: "Asesoría en Inversiones Avanzadas",
      description: "Accede a asesoramiento experto sobre instrumentos de inversión más complejos y estrategias sofisticadas.",
      link: "#", // Replace with actual link
    },
     {
      title: "Servicios Fiduciarios",
      description: "Te apoyamos en la gestión y administración de activos a través de estructuras fiduciarias.",
      link: "#", // Replace with actual link
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 py-8 px-4 md:px-12 flex flex-col gap-10"> {/* Consistent background */}
      {/* Título principal */}
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="h-9 w-9 text-[#0A233E]" /> {/* Consistent color */}
        <h1 className="text-4xl font-extrabold text-[#0A233E] tracking-tight"> {/* Consistent color */}
          Nuestros Servicios y Beneficios
        </h1>
      </div>

      {/* Beneficios de ser Cliente AFORTU */}
      <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-7 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-6 w-6 text-[#0A233E]" /> {/* Consistent color */}
          <h2 className="text-2xl font-bold text-[#0A233E]">Beneficios Exclusivos para Clientes</h2> {/* Consistent color */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 p-5 flex flex-col items-center text-center gap-3 shadow-sm">
              <benefit.icon className="h-10 w-10 text-[#FFC629]" /> {/* Consistent color */}
              <p className="text-md font-semibold text-[#0A233E]">{benefit.text}</p> {/* Consistent color */}
            </div>
          ))}
        </div>
      </section>

      {/* Servicios Complementarios */}
      <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-7">
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck className="h-6 w-6 text-[#0A233E]" /> {/* Consistent color */}
          <h2 className="text-2xl font-bold text-[#0A233E]">Servicios Complementarios</h2> {/* Consistent color */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complementaryServices.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-[#0A233E]">{service.title}</h3> {/* Consistent color */}
              <p className="text-gray-700">{service.description}</p>
              <Link href={service.link} className="inline-flex items-center gap-2 text-[#0A233E] hover:underline font-semibold mt-auto"> {/* Consistent color */}
                 Más Información <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

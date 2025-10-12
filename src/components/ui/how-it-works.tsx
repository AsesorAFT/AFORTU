'use client';

import { motion } from 'framer-motion';
import { UserPlus, TrendingUp, Shield, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="h-8 w-8" />,
    title: 'Regístrate',
    description: 'Crea tu cuenta en menos de 2 minutos',
    step: '01',
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: 'Conecta tus Activos',
    description: 'Sincroniza tus inversiones y cuentas',
    step: '02',
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'IA Analiza',
    description: 'Nuestra IA optimiza tu estrategia',
    step: '03',
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: 'Crece tu Patrimonio',
    description: 'Observa resultados en tiempo real',
    step: '04',
  },
];

export function HowItWorks() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 rounded-full text-sm font-semibold text-blue-200 backdrop-blur-sm mb-6">
            🚀 Proceso Simple
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-300 mb-6">
            Cómo Funciona
          </h2>
          <p className="text-xl text-slate-300 font-light max-w-3xl mx-auto">
            Cuatro pasos simples para transformar tu gestión patrimonial
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-blue-400/50 to-purple-400/50" />
              )}

              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 group">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-[#f7c873] to-[#ffd700] rounded-full flex items-center justify-center font-bold text-[#0a1931] text-lg shadow-lg">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                  <div className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20 p-4 rounded-xl text-cyan-400 group-hover:text-blue-300 transition-colors duration-300">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-slate-300 font-light leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

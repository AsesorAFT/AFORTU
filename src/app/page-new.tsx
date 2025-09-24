'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BarChart, BrainCircuit, DollarSign, Shield, Users, TrendingUp, Globe, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AfortuProSerious from '@/components/ui/afortu-pro-serious';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section - Estilo Binance/Corporate */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-blue-900/10"></div>
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo Principal */}
            <div className="flex justify-center mb-12">
              <AfortuProSerious 
                size="lg" 
                animated={true} 
                variant="dark"
                className="transform hover:scale-105 transition-transform duration-300" 
              />
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight text-gray-900">
              Gestión Patrimonial{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                de Clase Mundial
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Plataforma premium para inversionistas institucionales y clientes de alto patrimonio. 
              Tecnología avanzada, análisis profundo, resultados excepcionales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white font-semibold text-lg px-8 py-4 rounded-lg">
                <Link href="/login">
                  Acceder a la Plataforma <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-lg px-8 py-4 rounded-lg">
                <Link href="/services">
                  Conocer Servicios
                </Link>
              </Button>
            </div>

            {/* Métricas de Impacto */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-lg mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">$2.5B+</h3>
                <p className="text-gray-600 text-sm">Activos Bajo Gestión</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">15.3%</h3>
                <p className="text-gray-600 text-sm">Rendimiento Promedio Anual</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
                <p className="text-gray-600 text-sm">Clientes Institucionales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Premium */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Servicios Institucionales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluciones sofisticadas diseñadas para los estándares más exigentes 
              del mercado financiero global.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gestión de Portafolios */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-900 rounded-xl mb-6 group-hover:bg-gray-800 transition-colors">
                  <BarChart className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Gestión de Portafolios</h3>
                <p className="text-gray-600 mb-4">
                  Estrategias de inversión personalizadas con análisis cuantitativo avanzado 
                  y gestión de riesgos institucional.
                </p>
                <Link href="/services#portfolio" className="text-gray-900 hover:text-amber-600 font-semibold inline-flex items-center transition-colors">
                  Más información <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Asesoría Estratégica */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-900 rounded-xl mb-6 group-hover:bg-gray-800 transition-colors">
                  <Globe className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Asesoría Estratégica</h3>
                <p className="text-gray-600 mb-4">
                  Consultoría especializada en estructuración patrimonial, planificación fiscal 
                  y optimización de inversiones internacionales.
                </p>
                <Link href="/services#advisory" className="text-gray-900 hover:text-amber-600 font-semibold inline-flex items-center transition-colors">
                  Más información <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Inteligencia Artificial */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-900 rounded-xl mb-6 group-hover:bg-gray-800 transition-colors">
                  <BrainCircuit className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Análisis con IA</h3>
                <p className="text-gray-600 mb-4">
                  Modelos predictivos y análisis de mercado impulsados por inteligencia artificial 
                  para decisiones de inversión superiores.
                </p>
                <Link href="/services#ai" className="text-gray-900 hover:text-amber-600 font-semibold inline-flex items-center transition-colors">
                  Más información <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seguridad y Confianza */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Seguridad Institucional
            </h2>
            <p className="text-xl text-gray-600 mb-16">
              Estándares de seguridad bancaria y cumplimiento regulatorio internacional.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full mx-auto mb-6">
                  <Lock className="h-10 w-10 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cifrado Bancario</h3>
                <p className="text-gray-600">
                  Protocolos de seguridad nivel bancario con cifrado AES-256 
                  y autenticación multifactor.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full mx-auto mb-6">
                  <Shield className="h-10 w-10 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cumplimiento</h3>
                <p className="text-gray-600">
                  Regulaciones CNBV, SOX y estándares internacionales 
                  de gestión patrimonial.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full mx-auto mb-6">
                  <Users className="h-10 w-10 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Confianza</h3>
                <p className="text-gray-600">
                  Más de una década gestionando patrimonios de familias 
                  y empresas líderes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            ¿Listo para Maximizar su Patrimonio?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únase a la élite de inversionistas que confían en AFORTU PRO 
            para gestionar y hacer crecer su patrimonio.
          </p>
          <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-lg px-12 py-4 rounded-lg">
            <Link href="/contact">
              Solicitar Consulta Privada <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

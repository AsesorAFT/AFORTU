import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, ArrowRight, BarChart, BrainCircuit, DollarSign, Shield, Zap, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AfortuPremiumLogo from '@/components/ui/afortu-premium-logo';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1931] via-[#0d2449] to-[#185adb]">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Logo Animado Premium */}
            <div className="flex justify-center mb-12">
              <AfortuPremiumLogo 
                size="xl" 
                animated={true} 
                className="transform hover:scale-105 transition-transform duration-700 filter drop-shadow-2xl" 
              />
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Tu Futuro Financiero,{' '}
              <span className="bg-gradient-to-r from-[#f7c873] to-[#ffd700] bg-clip-text text-transparent">
                Inteligente y Seguro.
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              Gestiona tu patrimonio, optimiza tus inversiones y recibe asesoría exclusiva
              potenciada por IA, en una sola plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#f7c873] hover:bg-[#ffd700] text-[#0a1931] font-bold text-lg px-8 py-4">
                <Link href="/login">
                  Acceder a mi cuenta <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-4">
                <Link href="/services">
                  Conocer los servicios de AFORTU
                </Link>
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-[#f7c873] rounded-lg mx-auto mb-4">
                  <BrainCircuit className="h-6 w-6 text-[#0a1931]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Análisis IA</h3>
                <p className="text-blue-200 text-sm">Insights avanzados con Gemini 2.5 Pro</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-[#f7c873] rounded-lg mx-auto mb-4">
                  <BarChart className="h-6 w-6 text-[#0a1931]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Portafolios a Medida</h3>
                <p className="text-blue-200 text-sm">Gestión profesional personalizada</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-[#f7c873] rounded-lg mx-auto mb-4">
                  <Shield className="h-6 w-6 text-[#0a1931]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Seguridad Total</h3>
                <p className="text-blue-200 text-sm">Protección de alto nivel para tu patrimonio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="container mx-auto px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/afortu.firebasestorage.app/o/Disen%CC%83o%20sin%20ti%CC%81tulo(3).png?alt=media&token=f3e96a27-f7fb-4f05-b12e-fe7d94c31bd9"
                alt="Captura de dashboard financiero AFORTU mostrando métricas de inversión"
                width={800}
                height={500}
                className="w-full rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0a1931] mb-6">
              Una Plataforma, Todas las Soluciones
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desde la gestión de tus activos personales hasta la consultoría estratégica 
              corporativa, AFORTU te respalda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Gestión de Activos */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-[#0a1931] rounded-xl mb-6 group-hover:bg-[#185adb] transition-colors">
                  <DollarSign className="h-8 w-8 text-[#f7c873]" />
                </div>
                <h3 className="text-xl font-bold text-[#0a1931] mb-3">Gestión de Activos</h3>
                <p className="text-gray-600 mb-4">
                  Portafolios diversificados gestionados por expertos para maximizar tu rendimiento.
                </p>
                <Link href="/services#gestion-activos" className="text-[#185adb] hover:text-[#0a1931] font-semibold inline-flex items-center">
                  Saber más <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Consultoría Empresarial */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-[#0a1931] rounded-xl mb-6 group-hover:bg-[#185adb] transition-colors">
                  <Briefcase className="h-8 w-8 text-[#f7c873]" />
                </div>
                <h3 className="text-xl font-bold text-[#0a1931] mb-3">Consultoría Empresarial</h3>
                <p className="text-gray-600 mb-4">
                  Soluciones fiscales, legales y de gobierno corporativo para potenciar tu negocio.
                </p>
                <Link href="/services#consultoria" className="text-[#185adb] hover:text-[#0a1931] font-semibold inline-flex items-center">
                  Saber más <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Asesor AFT (IA) */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-[#0a1931] rounded-xl mb-6 group-hover:bg-[#185adb] transition-colors">
                  <BrainCircuit className="h-8 w-8 text-[#f7c873]" />
                </div>
                <h3 className="text-xl font-bold text-[#0a1931] mb-3">Asesor AFT (con IA)</h3>
                <p className="text-gray-600 mb-4">
                  Tu asistente financiero inteligente 24/7 impulsado por IA para insights y análisis.
                </p>
                <Link href="/services#ia" className="text-[#185adb] hover:text-[#0a1931] font-semibold inline-flex items-center">
                  Saber más <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Atención Personalizada */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-[#0a1931] rounded-xl mb-6 group-hover:bg-[#185adb] transition-colors">
                  <Users className="h-8 w-8 text-[#f7c873]" />
                </div>
                <h3 className="text-xl font-bold text-[#0a1931] mb-3">Atención Personalizada</h3>
                <p className="text-gray-600 mb-4">
                  Asesores dedicados a entender y acompañar tu estrategia financiera.
                </p>
                <Link href="/services#atencion" className="text-[#185adb] hover:text-[#0a1931] font-semibold inline-flex items-center">
                  Saber más <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0a1931] mb-6">
              Tu Éxito Financiero en 3 Pasos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-[#0a1931] rounded-full mx-auto mb-6">
                <span className="text-3xl font-bold text-[#f7c873]">1</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0a1931] mb-4">Regístrate en minutos</h3>
              <p className="text-gray-600 text-lg">
                Crea tu cuenta segura y completa tu perfil inicial.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-[#185adb] rounded-full mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0a1931] mb-4">Define tus metas</h3>
              <p className="text-gray-600 text-lg">
                Establece objetivos financieros y configura tu portafolio base.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-[#f7c873] rounded-full mx-auto mb-6">
                <span className="text-3xl font-bold text-[#0a1931]">3</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0a1931] mb-4">Optimiza y crece</h3>
              <p className="text-gray-600 text-lg">
                Monitorea resultados y ajusta estrategia con tu asesor e IA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0a1931] to-[#185adb]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            ¿Listo para tomar el control?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a la comunidad de AFORTU y comienza a construir tu futuro financiero hoy mismo.
          </p>
          <Button asChild size="lg" className="bg-[#f7c873] hover:bg-[#ffd700] text-[#0a1931] font-bold text-lg px-12 py-4">
            <Link href="/signup">
              Regístrate Ahora <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
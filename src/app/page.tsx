'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  AreaChart, 
  Bot, 
  ShieldCheck, 
  Linkedin, 
  Twitter,
  ArrowRight,
  BrainCircuit,
  BarChart,
  Shield,
  DollarSign,
  Briefcase,
  Users
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AfortuPremiumLogo } from '@/components/icons';

// --- Constantes y Datos ---
const features = [
  {
    icon: <AreaChart className="h-8 w-8 text-cyan-400" />,
    title: 'Gestión de Portafolio',
    description: 'Visualiza y optimiza tus inversiones con análisis avanzado y datos en tiempo real.',
    href: '/asset-management',
  },
  {
    icon: <Bot className="h-8 w-8 text-blue-400" />,
    title: 'Asesoría con IA',
    description: 'Resuelve dudas y recibe recomendaciones estratégicas 24/7 de nuestro asistente inteligente.',
    href: '/chat',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-cyan-400" />,
    title: 'Seguridad Integral',
    description: 'Tus activos y datos están protegidos con encriptación de grado bancario y protocolos de última generación.',
    href: '/contracts',
  },
];

// --- Componentes de la Página ---

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
      <nav className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Página de inicio de AFORTU PRO">
          <Image 
            src="https://firebasestorage.googleapis.com/v0/b/afortu.firebasestorage.app/o/LOGO%20DE%20AFORTU.PNG?alt=media&token=2e8530a1-30d3-4c0d-974e-46451594f7fb"
            alt="AFORTU Logo"
            width={120}
            height={35}
            className="h-8 w-auto"
          />
          <span className="hidden sm:inline text-xl font-bold text-[#C9A961]">
            PRO
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login" className="text-slate-200 hover:text-white font-semibold transition-colors">Iniciar Sesión</Link>
          </Button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button
              asChild
              className="bg-[#C9A961] text-white font-bold hover:bg-[#D4B76E] shadow-lg"
            >
              <Link href="/signup">Registrarse</Link>
            </Button>
          </motion.div>
        </div>
      </nav>
    </header>
  );
}

function HeroSection() {
  const router = useRouter();
// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
    },
  },
};  return (
    <section className="relative w-full overflow-hidden py-24 sm:py-32 flex flex-col items-center justify-center text-center">
      {/* MEJORA: Efecto de aurora animado para el fondo */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[#0a1931]">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(24,90,219,.15),rgba(255,255,255,0))]"></div>
      </div>
      
      <motion.div
        className="container max-w-4xl px-4 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-300"
          variants={itemVariants}
        >
          Inteligencia Financiera para tu Patrimonio
        </motion.h1>
        <motion.p
          className="mb-10 max-w-2xl mx-auto text-lg sm:text-xl text-slate-300"
          variants={itemVariants}
        >
          La nueva era de la gestión patrimonial. Combina tu visión con nuestra inteligencia artificial para construir un futuro financiero más sólido y seguro.
        </motion.p>
        
        <motion.div 
          className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl mb-10 border-2 border-blue-500/30 bg-black"
          variants={itemVariants}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/Es8PIJVpcko?si=ULyUEkcu7LfYT2rp&autoplay=1&mute=1&controls=0&loop=1&playlist=Es8PIJVpcko"
            title="Video AFORTU PRO"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="w-full h-full"
          />
        </motion.div>

        <motion.div className="flex flex-col sm:flex-row justify-center items-center gap-4" variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button
              size="lg"
              className="bg-[#C9A961] text-white font-bold text-lg px-8 py-6 hover:bg-[#D4B76E] shadow-lg shadow-[#C9A961]/20"
              onClick={() => router.push('/signup')}
            >
              Comienza Ahora
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-transparent border-slate-400 text-slate-200 hover:bg-white/10 hover:text-white hover:border-white px-8 py-6 text-lg"
            >
              <Link href="#features">Descubrir Funciones</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-black/20">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Todo el control en una sola plataforma.</h2>
          <p className="mt-4 text-lg text-slate-300">
            Desde análisis de activos hasta planificación fiscal, hemos construido las herramientas que necesitas para triunfar.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* MEJORA: Hover con efecto "lift" y "glow" */}
              <motion.div
                className="h-full group"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="h-full text-center bg-slate-900/50 border-blue-500/20 backdrop-blur-lg shadow-xl relative overflow-hidden transition-all duration-300 group-hover:border-cyan-400/50">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="pt-8 relative z-10">
                    <Link href={feature.href} className="flex flex-col items-center">
                        <div className="inline-block rounded-xl bg-blue-600/20 p-4 mb-4 ring-1 ring-blue-400/30">{feature.icon}</div>
                        <h3 className="mt-2 text-2xl font-semibold text-white">{feature.title}</h3>
                        <p className="mt-3 text-base text-slate-300 min-h-[72px]">{feature.description}</p>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const router = useRouter();
  return (
    <section className="py-20 sm:py-32 text-center">
      <div className="container px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Toma el control de tu futuro financiero hoy</h2>
        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">Únete a miles de inversionistas que ya están construyendo su patrimonio con inteligencia y precisión.</p>
        <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="inline-block mt-10"
        >
        <Button
          size="lg"
          className="bg-[#C9A961] text-white font-bold text-lg px-8 py-6 hover:bg-[#D4B76E] shadow-lg shadow-[#C9A961]/20"
          onClick={() => router.push('/signup')}
        >
          Crear Cuenta
        </Button>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900/50 border-t border-white/10">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} AFORTU PRO. Todos los derechos reservados.</p>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <Link href="/terms" className="text-xs text-slate-400 hover:text-white transition-colors">Términos de Servicio</Link>
              <Link href="/privacy" className="text-xs text-slate-400 hover:text-white transition-colors">Política de Privacidad</Link>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6">
            <motion.a href="https://linkedin.com/company/afortu" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" whileHover={{ scale: 1.2, color: '#FFFFFF' }} className="text-slate-400">
              <Linkedin className="h-6 w-6"/>
            </motion.a>
            <motion.a href="https://twitter.com/afortu" target="_blank" rel="noopener noreferrer" aria-label="Twitter" whileHover={{ scale: 1.2, color: '#FFFFFF' }} className="text-slate-400">
              <Twitter className="h-6 w-6"/>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Botón flotante de WhatsApp con logo AFORTU
function WhatsAppButton() {
  const whatsappNumber = "529982399177"; // Número de WhatsApp de AFORTU
  const message = encodeURIComponent("Hola, me gustaría obtener más información sobre AFORTU PRO");
  
  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-2xl overflow-hidden border-2 border-[#C9A961]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contactar por WhatsApp"
    >
      <Image 
        src="https://firebasestorage.googleapis.com/v0/b/afortu.firebasestorage.app/o/LOGO%20DE%20AFORTU.PNG?alt=media&token=2e8530a1-30d3-4c0d-974e-46451594f7fb"
        alt="Contactar AFORTU"
        width={64}
        height={64}
        className="w-full h-full object-cover"
      />
      {/* Indicador de pulso */}
      <span className="absolute inset-0 rounded-full bg-[#C9A961] opacity-75 animate-ping"></span>
    </motion.a>
  );
}


// --- Página Principal ---

export default function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#0a1931] via-[#0a1931] to-[#182952] text-white font-sans antialiased">
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

      {/* PRO Section */}
      <section className="py-20 bg-[#0a1931]">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-[#f7c873]">AFORTU PRO</p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                La experiencia integral para patrimonios exigentes
              </h2>
              <p className="text-blue-100 text-lg">
                Automatización fiscal, gobierno corporativo y acceso a mesas de inversión exclusivas. Orquestamos tu family
                office sin fricciones, con reportes personalizados y supervisión de expertos.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-[#f7c873] text-[#0a1931] hover:bg-[#ffd700] font-semibold">
                  <Link href="/pro">Descubrir AFORTU PRO</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold"
                >
                  <Link href="/contact">Agendar consulta estratégica</Link>
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Gobierno corporativo 360°</h3>
                <p className="text-blue-100 text-sm">
                  Protocolos familiares, data rooms seguros y actas digitales integradas a tu dashboard.
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Analítica avanzada</h3>
                <p className="text-blue-100 text-sm">
                  Modelos predictivos con IA, alertas de riesgo y reportes ESG personalizados.
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Mesa de inversión dedicada</h3>
                <p className="text-blue-100 text-sm">
                  Acceso a oportunidades club-deal y seguimiento semanal con estrategas sénior.
                </p>
              </div>
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

      {/* Footer */}
      <footer className="bg-[#0a1931] text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4 text-[#f7c873]">AFORTU</h4>
              <p className="text-blue-200 text-sm">
                Tu plataforma integral de gestión financiera y patrimonial.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/services#gestion-activos" className="text-blue-200 hover:text-[#f7c873]">Gestión de Activos</Link></li>
                <li><Link href="/services#consultoria" className="text-blue-200 hover:text-[#f7c873]">Consultoría Empresarial</Link></li>
                <li><Link href="/services#ia" className="text-blue-200 hover:text-[#f7c873]">Asesor con IA</Link></li>
                <li><Link href="/pro" className="text-blue-200 hover:text-[#f7c873]">AFORTU PRO</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-blue-200 hover:text-[#f7c873]">Acerca de</Link></li>
                <li><Link href="/contact" className="text-blue-200 hover:text-[#f7c873]">Contacto</Link></li>
                <li><Link href="/privacy" className="text-blue-200 hover:text-[#f7c873]">Privacidad</Link></li>
                <li><Link href="/terms" className="text-blue-200 hover:text-[#f7c873]">Términos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contacto</h4>
              <p className="text-blue-200 text-sm mb-2">contacto@afortu.com</p>
              <p className="text-blue-200 text-sm">+52 998 239 9177</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-blue-200">
            <p>&copy; {new Date().getFullYear()} AFORTU. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <WhatsAppButton />
    </main>
  );
}
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import AfortuProSerious from '@/components/ui/afortu-pro-serious';
import { 
  ArrowRight, 
  Calendar, 
  Sparkles, 
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

const TYPING_SPEED = 80;
const TYPING_PAUSE = 1800;

const typingWords = ['de Clase Mundial', 'Impulsada por IA', 'Altamente Personalizada'];

function useTypingLoop(words: string[]) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, displayed.length + 1);
        setDisplayed(next);
        if (next === current) {
          setDeleting(true);
        }
      } else {
        const next = current.slice(0, displayed.length - 1);
        setDisplayed(next);
        if (next === '') {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, deleting ? TYPING_SPEED / 1.5 : TYPING_SPEED);

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words]);

  useEffect(() => {
    if (!deleting && displayed === words[index % words.length]) {
      const pause = setTimeout(() => setDeleting(true), TYPING_PAUSE);
      return () => clearTimeout(pause);
    }
  }, [deleting, displayed, index, words]);

  return displayed;
}

function AnimatedStatistic({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const start = performance.now();

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplayValue(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  const formattedValue = useMemo(() => displayValue.toLocaleString('es-MX'), [displayValue]);

  return (
    <div ref={ref} className="rounded-2xl border border-white/20 bg-white/10 p-6 text-left text-white shadow-lg backdrop-blur-md">
      <p className="text-3xl font-bold md:text-4xl">
        {formattedValue}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-slate-200/80">{label}</p>
    </div>
  );
}

const heroStats = [
  { value: 50000000, suffix: ' USD+', label: 'Patrimonio gestionado globalmente' },
  { value: 1200, suffix: '+', label: 'Clientes de alto patrimonio' },
  { value: 18, suffix: ' países', label: 'Presencia internacional' },
];

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
      className="relative mx-auto mt-16 w-full max-w-5xl"
    >
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-400/10 to-purple-500/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/60 shadow-2xl backdrop-blur-xl">
        <div className="grid gap-4 p-6 md:grid-cols-[2fr,1fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-200">Rendimiento Total</p>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">+15.3% anual</span>
            </div>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
              className="mt-6 h-36 rounded-xl bg-gradient-to-r from-amber-400 via-blue-500 to-purple-500"
            />
            <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-slate-300">
              <div>
                <p className="text-slate-400">Sharpe Ratio</p>
                <p className="text-base font-semibold text-white">1.42</p>
              </div>
              <div>
                <p className="text-slate-400">Volatilidad</p>
                <p className="text-base font-semibold text-white">6.8%</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
            >
              <p className="text-sm font-semibold text-white">Alerta Inteligente</p>
              <p className="mt-2 text-sm text-slate-300">
                Oportunidad detectada en mercados emergentes. Potencial alfa anualizado del 6.2%.
              </p>
              <Button variant="secondary" size="sm" className="mt-4 bg-white/10 text-white">
                Ver recomendación
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
            >
              <p className="text-sm font-semibold text-white">Balance Multiactivo</p>
              <div className="mt-4 space-y-3 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Renta variable</span>
                  <span className="font-semibold text-amber-300">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Bonos Globales</span>
                  <span className="font-semibold text-blue-300">27%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Alternativos</span>
                  <span className="font-semibold text-violet-300">18%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Liquidez</span>
                  <span className="font-semibold text-slate-200">10%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

type ParticleConfig = {
  id: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
};

function ParticleAurora() {
  const particles: ParticleConfig[] = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, idx) => ({
        id: idx,
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 90}%`,
        duration: 10 + Math.random() * 6,
        delay: Math.random() * 4,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(88,199,247,0.25),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(148,71,255,0.25),_transparent_60%)]" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-16 w-16 rounded-full bg-gradient-to-br from-white/10 to-transparent"
          style={{ top: particle.top, left: particle.left }}
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            opacity: [0.1, 0.35, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const typedText = useTypingLoop(typingWords);

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-1/4 top-3/4 h-80 w-80 animate-pulse rounded-full bg-purple-600/10 blur-3xl delay-1000" />
      </div>

      <div className="relative mx-auto flex min-h-[85vh] w-full max-w-6xl flex-col items-center px-6 pb-20 pt-28 text-center md:pt-32">
        {/* Logo & Badge */}
        <div className="flex flex-col items-center gap-6 opacity-100">
          <div
            className="relative flex items-center justify-center overflow-visible after:absolute after:-inset-4 after:bg-gradient-to-r after:from-[#d9c08a]/20 after:via-[#f7c873]/25 after:to-transparent after:blur-2xl after:content-[''] drop-shadow-[0_12px_38px_rgba(23,91,219,0.35)]"
            style={{ width: '280px', height: '140px' }}
          >
            <AfortuProSerious size="lg" animated variant="light" className="relative h-full w-full" />
          </div>

          <div className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 backdrop-blur-lg">
            <Sparkles className="h-4 w-4 text-amber-300" />
            Plataforma Administrada con IA
          </div>
        </div>

        {/* Main Heading with Typing Effect */}
        <h1 className="mt-10 text-4xl font-bold leading-tight text-white md:text-6xl opacity-100">
          Potenciamos la gestión patrimonial
          <span className="block text-transparent">
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-white bg-clip-text">
              {typedText}
              <span className="ml-1 inline-block h-8 w-[3px] animate-pulse rounded-full bg-amber-300 align-middle" />
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-3xl text-lg text-slate-200 md:text-xl opacity-100">
          Inteligencia financiera de próxima generación para inversionistas institucionales y clientes de alto
          patrimonio. Datos en tiempo real, modelos predictivos y asesoría personalizada desde un único panel
          estratégico.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row opacity-100">
          <Link
            href="/signup"
            className="group flex items-center gap-2 rounded-xl bg-amber-400 px-8 py-4 text-lg font-semibold text-slate-950 transition-all hover:bg-amber-300"
          >
            Comenzar Ahora
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#como-funciona"
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-medium text-white backdrop-blur-md transition-all hover:bg-white/10"
          >
            Ver cómo funciona
            <ShieldCheck className="h-5 w-5" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mt-14 grid w-full gap-4 md:grid-cols-3 opacity-100">
          {heroStats.map((stat, idx) => (
            <AnimatedStatistic key={idx} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>

        {/* Dashboard Preview */}
        <DashboardPreview />
      </div>

      {/* Particle Aurora Effect */}
      <ParticleAurora />
    </section>
  );
}
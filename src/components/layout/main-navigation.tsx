'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Bell, ChevronDown, Menu, X } from 'lucide-react';
import AfortuProSerious from '@/components/ui/afortu-pro-serious';

const megaMenu = [
  {
    title: 'Nuestros Servicios',
    items: [
      { label: 'Gestión Patrimonial', description: 'Estrategias personalizadas para maximizar y proteger tu patrimonio.', href: '/services/gestion-patrimonial' },
      { label: 'Optimización Fiscal', description: 'Cumplimiento normativo y eficiencia tributaria integral.', href: '/services/optimizacion-fiscal' },
    ],
  },
  {
    title: 'Asesoría Especializada',
    items: [
      { label: 'Asesoría Legal', description: 'Protección jurídica para estructuras patrimoniales complejas.', href: '/services/asesoria-legal' },
      { label: 'Consultoría Estratégica', description: 'Visión holística para decisiones de inversión y crecimiento.', href: '/services/consultoria-estrategica' },
    ],
  },
  {
    title: 'Tu Equipo',
    items: [
      { label: 'Asesor Principal', description: 'Tu contacto único para coordinar todas las áreas.', href: '/team#asesor-principal' },
      { label: 'Equipo Especializado', description: 'Expertos en Patrimonio, Legado y Retiro.', href: '/team' },
    ],
  },
];

export function MainNavigation() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 150, damping: 25, mass: 0.3 });

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <motion.div className="h-1 bg-gradient-to-r from-amber-400 via-blue-500 to-purple-500" style={{ scaleX: width, transformOrigin: '0% 50%' }} />
      <header className="mx-auto mt-3 w-[min(96%,1100px)] rounded-3xl border border-white/20 bg-white/10 px-4 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur-3xl">
        <nav className="flex items-center gap-6 text-sm text-slate-800">
          <Link href="/" className="flex items-center">
            <AfortuProSerious size="sm" animated variant="light" />
          </Link>

          <button
            type="button"
            className="ml-auto flex items-center gap-2 rounded-xl border border-white/40 bg-white/60 px-3 py-2 text-slate-800 hover:bg-white"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="text-xs font-semibold uppercase tracking-[0.25em]">menú</span>
          </button>

          <div className="ml-auto hidden items-center gap-6 md:flex">
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button type="button" className="flex items-center gap-1 font-semibold text-slate-800 transition-colors hover:text-slate-950">
                Servicios
                <ChevronDown className="h-4 w-4" />
              </button>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="absolute left-0 top-full mt-4 w-[640px] rounded-3xl border border-white/30 bg-white/90 p-6 text-left shadow-2xl backdrop-blur-2xl"
                >
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    {megaMenu.map((column) => (
                      <div key={column.title} className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{column.title}</p>
                        {column.items.map((item) => (
                          <Link key={item.label} href={item.href} className="block rounded-2xl p-3 transition-colors hover:bg-slate-100/80">
                            <p className="font-semibold text-slate-900">{item.label}</p>
                            <p className="mt-1 text-xs text-slate-600">{item.description}</p>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            <Link href="/about" className="font-semibold text-slate-800 transition-colors hover:text-slate-950">
              Nosotros
            </Link>
            <Link href="/dashboard" className="relative flex items-center gap-2 font-semibold text-slate-950">
              Plataforma
              <span className="inline-flex h-5 items-center rounded-full bg-amber-400 px-2 text-xs font-semibold text-slate-950">
                Nueva
              </span>
              <span className="absolute -top-2 -right-2 flex h-4 w-4 animate-ping rounded-full bg-amber-400/70" />
              <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-amber-500" />
              <Bell className="h-4 w-4 text-amber-500" />
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-slate-200 bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Acceder
            </Link>
          </div>
        </nav>

        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 space-y-4 rounded-2xl border border-white/30 bg-white/80 p-4 text-sm text-slate-800 backdrop-blur-2xl md:hidden"
          >
            <details className="rounded-xl bg-white/60 p-3">
              <summary className="flex cursor-pointer items-center justify-between font-semibold">
                Servicios
                <ChevronDown className="h-4 w-4" />
              </summary>
              <div className="mt-3 space-y-3">
                {megaMenu.flatMap((section) => section.items).map((item) => (
                  <Link key={item.label} href={item.href} className="block rounded-xl bg-white/60 p-3 text-xs shadow-sm">
                    <p className="font-semibold">{item.label}</p>
                    <p className="mt-1 text-[11px] text-slate-600">{item.description}</p>
                  </Link>
                ))}
              </div>
            </details>
            <Link href="/about" className="block rounded-xl bg-white/60 p-3 font-semibold">
              Nosotros
            </Link>
            <Link href="/dashboard" className="flex items-center justify-between rounded-xl bg-white/60 p-3 font-semibold">
              Plataforma
              <span className="flex items-center gap-2 text-xs font-semibold text-amber-500">
                Nueva
                <Bell className="h-4 w-4" />
              </span>
            </Link>
            <Link
              href="/login"
              className="block rounded-xl bg-slate-900 p-3 text-center text-sm font-semibold text-white"
            >
              Acceder
            </Link>
          </motion.div>
        )}
      </header>
    </div>
  );
}

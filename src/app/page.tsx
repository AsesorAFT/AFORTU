
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, ArrowRight, BarChart, BrainCircuit, DollarSign } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 448 512" {...props}>
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.2-26.7l-7-4.1-69.8 18.3L72 359.2l-4.4-7.3c-18.5-30.6-28.2-66.3-28.2-103.3 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
);

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <header className="flex h-16 items-center px-4 lg:px-6 bg-background border-b">
         <Link href="/" className="flex items-center gap-2 font-semibold">
            <Briefcase className="h-6 w-6" />
            <span className="font-bold text-xl">AFORTU</span>
          </Link>
          <div className="ml-auto">
            <Button asChild>
                <Link href="/login">Iniciar Sesión <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-1 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 text-center items-center">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
                    Alcanza la Libertad Financiera
                  </h1>
                   <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    La plataforma inteligente para la gestión de tu patrimonio, tus inversiones y tu retiro.
                  </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Nuestras Funcionalidades</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Una suite completa para tu futuro</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Desde la planificación patrimonial hasta la inteligencia de negocio, nuestras herramientas están diseñadas para construir y proteger tu legado.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1 text-center">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                <h3 className="text-xl font-bold">Gestión Patrimonial</h3>
                <p className="text-muted-foreground">Visualice el crecimiento de su patrimonio con dashboards interactivos y reportes detallados.</p>
              </div>
              <div className="grid gap-1 text-center">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <BarChart className="h-8 w-8 text-primary" />
                  </div>
                <h3 className="text-xl font-bold">Análisis para el Retiro</h3>
                <p className="text-muted-foreground">Analice la composición y el rendimiento de sus carteras para asegurar un retiro próspero.</p>
              </div>
              <div className="grid gap-1 text-center">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                  </div>
                <h3 className="text-xl font-bold">Asesoría Financiera con IA</h3>
                <p className="text-muted-foreground">Obtenga insights y predicciones con nuestra IA para tomar decisiones estratégicas e informadas.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} AFORTU. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-xs hover:underline underline-offset-4" href="https://www.AFORTU.com.mx" target="_blank" rel="noopener noreferrer">
            www.AFORTU.com.mx
          </Link>
          <a
            href="https://wa.me/525548144552"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:underline underline-offset-4 flex items-center gap-1"
           >
            <WhatsAppIcon className="h-4 w-4" />
            Contáctanos
          </a>
          <Link className="text-xs hover:underline underline-offset-4" href="/terms">
            Términos de Servicio
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/privacy">
            Política de Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
}

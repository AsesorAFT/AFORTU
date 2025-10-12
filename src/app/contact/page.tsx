import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { Mail, Phone, CalendarDays } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto | AFORTU',
  description:
    'Agenda una sesión con AFORTU. Comparte tus objetivos patrimoniales y conoce los planes corporativos y PRO disponibles.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Card className="shadow-xl border-slate-200/70">
            <CardHeader className="pb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Agenda una reunión</p>
              <CardTitle className="text-3xl font-bold text-slate-900">
                Conversemos sobre tu estrategia patrimonial
              </CardTitle>
              <p className="text-slate-600">
                Cuéntanos tus objetivos y un especialista de AFORTU se comunicará en menos de 24 horas para proponerte un plan a medida.
              </p>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-1">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="name">
                    Nombre completo
                  </label>
                  <Input id="name" name="name" placeholder="María Pérez" required />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="email">
                    Correo electrónico
                  </label>
                  <Input id="email" name="email" type="email" placeholder="maria@empresa.com" required />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="company">
                    Empresa (opcional)
                  </label>
                  <Input id="company" name="company" placeholder="AFORTU Holdings" />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="objective">
                    Objetivo principal
                  </label>
                  <Textarea
                    id="objective"
                    name="objective"
                    placeholder="Protección patrimonial, inversión internacional, sucesión familiar..."
                    className="min-h-[120px]"
                  />
                </div>
                <Button type="submit" className="mt-2 bg-[#0a1931] hover:bg-[#132a4c] text-white font-semibold">
                  Enviar solicitud
                </Button>
                <p className="text-xs text-slate-500">
                  Este formulario es informativo. Un asesor validará tus datos y coordinará la próxima sesión estratégica.
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-slate-200/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Phone className="h-5 w-5 text-[#f7c873]" /> Contacto directo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-slate-600">
                <p className="font-medium">Llámanos</p>
                <Link href="tel:+525548144552" className="text-[#0a1931] font-semibold hover:underline">
                  +52 55 4814 4552
                </Link>
                <p className="pt-2 text-sm text-slate-500">Horario: Lunes a viernes · 9:00 - 19:00 h (GMT-6)</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Mail className="h-5 w-5 text-[#f7c873]" /> Escríbenos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-slate-600">
                <p className="font-medium">Equipo de atención patrimonial</p>
                <Link href="mailto:contacto@afortu.com.mx" className="text-[#0a1931] font-semibold hover:underline">
                  contacto@afortu.com.mx
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <CalendarDays className="h-5 w-5 text-[#f7c873]" /> ¿Buscas AFORTU PRO?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-slate-600">
                <p>
                  Solicita una demostración personalizada para conocer la automatización fiscal, reportes premium y mesas de inversión exclusivas de la versión PRO.
                </p>
                <Button asChild variant="outline" className="w-full border-[#0a1931] text-[#0a1931] font-semibold">
                  <Link href="/pro">Ver beneficios de AFORTU PRO</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

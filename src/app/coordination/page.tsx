import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Share2 } from 'lucide-react';
import Link from 'next/link';

const logEntries = [
  {
    title: 'Seguimiento a protocolo familiar',
    description: 'Notas y acuerdos del comité del 1 de marzo, tareas asignadas a jurídico y fiscal.',
    owner: 'Asesor legal AFORTU',
    status: 'En proceso',
  },
  {
    title: 'Actualización de inversiones privadas',
    description: 'Entrada a fondo inmobiliario CDMX · Documentación subida y aprobada por compliance.',
    owner: 'Mesa de inversión',
    status: 'Completado',
  },
  {
    title: 'Solicitud de póliza patrimonial',
    description: 'Cotización Zurich – Póliza global arte + colecciones · pendiente validación de inventario.',
    owner: 'Seguros',
    status: 'En revisión',
  },
];

export default function CoordinationPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-14">
      <div className="container mx-auto space-y-10 px-6 lg:px-12">
        <section className="rounded-3xl bg-white p-10 shadow-xl">
          <Badge className="bg-[#0a1931] text-white">Bitácora</Badge>
          <h1 className="mt-6 text-3xl font-bold text-[#0a1931] lg:text-4xl">Coordinación AFORTU</h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            Centraliza las tareas entre tu familia, empresas y el equipo AFORTU. Cada interacción queda registrada con responsables, fechas y adjuntos para mantener todo bajo control.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild className="bg-[#0a1931] text-white hover:bg-[#132a4c]">
              <Link href="/calendar">Ver calendario compartido</Link>
            </Button>
            <Button asChild variant="outline" className="border-[#0a1931] text-[#0a1931] hover:bg-[#0a1931]/5">
              <Link href="/contact?interest=coordination">Solicitar acceso a familiares</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {logEntries.map((entry) => (
            <Card key={entry.title} className="border-slate-200/80">
              <CardHeader>
                <CardTitle className="text-lg text-[#0a1931]">{entry.title}</CardTitle>
                <CardDescription className="text-slate-600">{entry.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-500">
                <p><span className="font-semibold text-[#0a1931]">Responsable:</span> {entry.owner}</p>
                <p><span className="font-semibold text-[#0a1931]">Estado:</span> {entry.status}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-10 shadow-xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-3">
              <Calendar className="h-8 w-8 text-[#0a1931]" />
              <h2 className="text-xl font-semibold text-[#0a1931]">Agenda integrada</h2>
              <p className="text-slate-600">Sincroniza tus agendas de Google/Microsoft para recibir recordatorios automáticos.</p>
            </div>
            <div className="space-y-3">
              <MessageSquare className="h-8 w-8 text-[#0a1931]" />
              <h2 className="text-xl font-semibold text-[#0a1931]">Hilos comentados</h2>
              <p className="text-slate-600">Cada tarea tiene un hilo de comentarios y archivos adjuntos para documentar decisiones.</p>
            </div>
            <div className="space-y-3">
              <Share2 className="h-8 w-8 text-[#0a1931]" />
              <h2 className="text-xl font-semibold text-[#0a1931]">Roles y permisos</h2>
              <p className="text-slate-600">Controla qué familiares, directivos o despachos externos pueden ver y editar cada flujo.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

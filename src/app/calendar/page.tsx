
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { PlusCircle, Clock, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { es } from 'date-fns/locale';

interface Appointment {
  id: string;
  time: string;
  title: string;
  client: string;
  status: 'confirmada' | 'pendiente' | 'cancelada';
}

const mockAppointments: Record<string, Appointment[]> = {
  '2024-08-15': [
    { id: '1', time: '10:00', title: 'Revisión de Portafolio', client: 'Cliente AFORTU', status: 'confirmada' },
    { id: '2', time: '12:30', title: 'Onboarding nuevo cliente', client: 'Prospecto Principal', status: 'pendiente' },
  ],
  '2024-08-22': [
    { id: '3', time: '16:00', title: 'Firma de Contrato Tasa Fija', client: 'Cliente AFORTU', status: 'confirmada' },
  ],
};

function getStatusBadge(status: Appointment['status']) {
  switch (status) {
    case 'confirmada':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'cancelada':
      return 'bg-red-100 text-red-800 border-red-200';
  }
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDateString = date ? date.toISOString().split('T')[0] : '';
  const appointmentsForDay = mockAppointments[selectedDateString] || [];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f6f8fb] via-[#eaf3fa] to-[#d6e4f0] py-10 px-4 md:px-12 flex flex-col gap-8">
       <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center ring-1 ring-primary/20">
                <Clock className="h-7 w-7" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Calendario de Citas</h1>
                <p className="text-muted-foreground">Gestiona tus reuniones y seguimientos.</p>
            </div>
        </div>
         <Button asChild variant="outline">
            <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a General
            </Link>
        </Button>
      </header>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <Card className="shadow-lg border-gray-200 md:col-span-1">
          <CardContent className="p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={es}
            />
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-gray-200 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Citas para el {date ? date.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }) : '...'}</CardTitle>
                <CardDescription>
                    {appointmentsForDay.length > 0 ? `Tienes ${appointmentsForDay.length} cita(s) programada(s).` : 'No hay citas para este día.'}
                </CardDescription>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nueva Cita
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {appointmentsForDay.length === 0 ? (
                     <div className="text-center py-12 text-muted-foreground">
                        <p>Selecciona otro día o agrega una nueva cita.</p>
                    </div>
                ) : (
                    appointmentsForDay.map(apt => (
                        <div key={apt.id} className="flex items-center gap-4 p-3 rounded-lg border bg-background/50">
                            <div className="text-lg font-bold text-primary">{apt.time}</div>
                            <div className="flex-grow">
                                <p className="font-semibold">{apt.title}</p>
                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{apt.client}</span>
                                </div>
                            </div>
                            <div>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusBadge(apt.status)}`}>
                                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    

'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import { Clock, PlusCircle, Edit, Trash2, Flame, AlertTriangle, CheckCircle, ListTodo, Hourglass, PartyPopper, UserCheck } from "lucide-react";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { auth, db } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc, query, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const appointmentSchema = z.object({
    time: z.string().regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, "El formato debe ser HH:MM AM/PM"),
    title: z.string().min(3, "El título debe tener al menos 3 caracteres."),
    description: z.string().optional(),
    priority: z.enum(['baja', 'media', 'alta'], { required_error: 'Debes seleccionar una prioridad.' }),
    status: z.enum(['pendiente', 'en_progreso', 'completada'], { required_error: 'Debes seleccionar un estado.' }),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

type Appointment = {
  id: string;
  time: string;
  title: string;
  description?: string;
  priority: 'baja' | 'media' | 'alta';
  status: 'pendiente' | 'en_progreso' | 'completada';
  date: string;
};

type AccountLog = {
    id: string;
    date: string;
    activity: string;
    advisor: string;
    details: string;
}


function AppointmentForm({
    selectedDate,
    onFormSubmit,
    existingAppointment,
    children
}: {
    selectedDate: Date,
    onFormSubmit: (data: AppointmentFormValues) => void,
    existingAppointment?: Appointment | null,
    children: React.ReactNode,
}) {
    const [open, setOpen] = React.useState(false);
    const form = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: existingAppointment ? {
            ...existingAppointment
        } : {
            time: "",
            title: "",
            description: "",
            priority: "media",
            status: "pendiente",
        },
    });

    React.useEffect(() => {
        if (existingAppointment) {
            form.reset(existingAppointment);
        } else {
            form.reset({ time: "", title: "", description: "", priority: "media", status: "pendiente" });
        }
    }, [existingAppointment, form]);


    const onSubmit = (data: AppointmentFormValues) => {
        onFormSubmit(data);
        form.reset();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{existingAppointment ? 'Editar Actividad' : 'Añadir Actividad'}</DialogTitle>
                    <DialogDescription>
                        {existingAppointment ? 'Modifica los detalles de tu actividad.' : `Añade una nueva cita o recordatorio para el día ${format(selectedDate, "PPP", { locale: es })}.`}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título de la Actividad</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej: Llamada de seguimiento" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción (Opcional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Añade más detalles sobre la actividad..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hora</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej: 02:30 PM" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prioridad</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Selecciona una prioridad" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="baja">Baja</SelectItem>
                                        <SelectItem value="media">Media</SelectItem>
                                        <SelectItem value="alta">Alta</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                         <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un estado" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="pendiente">Pendiente</SelectItem>
                                    <SelectItem value="en_progreso">En Progreso</SelectItem>
                                    <SelectItem value="completada">Completada</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">{existingAppointment ? 'Guardar Cambios' : 'Guardar Actividad'}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const [user, userLoading] = useAuthState(auth);

  const appointmentsCollectionRef = user ? collection(db, `users/${user.uid}/appointments`) : null;
  const [appointmentsSnapshot, loading, error] = useCollection(appointmentsCollectionRef ? query(appointmentsCollectionRef) : null);

  const accountLogCollectionRef = user ? collection(db, `users/${user.uid}/accountLog`) : null;
  const [accountLogSnapshot, accountLogLoading, accountLogError] = useCollection(accountLogCollectionRef ? query(accountLogCollectionRef) : null);


  const appointments = React.useMemo(() => {
    if (!appointmentsSnapshot) return [];
    return appointmentsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Appointment));
  }, [appointmentsSnapshot]);

  const accountLogData = React.useMemo(() => {
    if (!accountLogSnapshot) return [];
    return accountLogSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as AccountLog)).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [accountLogSnapshot]);
  
  const selectedAppointments = React.useMemo(() => {
    if (!date || !appointments) return [];
    const dateKey = format(date, 'yyyy-MM-dd');
    return appointments
      .filter(apt => apt.date === dateKey)
      .sort((a, b) => new Date(`1970/01/01 ${a.time}`) > new Date(`1970/01/01 ${b.time}`) ? 1 : -1);
  }, [date, appointments]);
  
  const eventDates = React.useMemo(() => {
    const datesWithEvents = new Set(appointments.map(apt => apt.date));
    return Array.from(datesWithEvents).map(dateStr => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    });
  }, [appointments]);

  const priorityCounts = React.useMemo(() => {
    const counts: { [key in 'alta' | 'media' | 'baja']: number } = { alta: 0, media: 0, baja: 0 };
    selectedAppointments.forEach(apt => {
        counts[apt.priority]++;
    });
    return counts;
  }, [selectedAppointments]);

  const statusCounts = React.useMemo(() => {
    const counts: { [key in 'pendiente' | 'en_progreso' | 'completada']: number } = { pendiente: 0, en_progreso: 0, completada: 0 };
    selectedAppointments.forEach(apt => {
        if (apt.status) {
            counts[apt.status]++;
        }
    });
    return counts;
  }, [selectedAppointments]);


  const modifiers = {
    hasEvent: eventDates,
  };

  const modifiersStyles = {
    hasEvent: {
      '.rdp-day_hasEvent': {
        position: 'relative'
      },
      '.rdp-day_hasEvent::after': {
        content: '""',
        position: 'absolute',
        bottom: '4px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: 'hsl(var(--primary))',
      },
    },
  };
  
  const handleAddAppointment = async (data: AppointmentFormValues) => {
    if (!date || !user || !appointmentsCollectionRef) return;
    const dateKey = format(date, 'yyyy-MM-dd');
    
    const newAppointment = { ...data, date: dateKey };

    try {
        await addDoc(appointmentsCollectionRef, newAppointment);
        toast({
            title: "¡Actividad Añadida!",
            description: `Se ha añadido "${data.title}" a tu bitácora.`,
        });
    } catch (e) {
        console.error("Error adding document: ", e);
        toast({
            variant: "destructive",
            title: "Error al guardar",
            description: "No se pudo añadir la actividad. Inténtalo de nuevo.",
        });
    }
  };

  const handleUpdateAppointment = async (id: string, data: AppointmentFormValues) => {
    if (!user) return;
    const docRef = doc(db, `users/${user.uid}/appointments`, id);
    try {
        await updateDoc(docRef, data as any);
        toast({
            title: "¡Actividad Actualizada!",
            description: `Se ha actualizado "${data.title}".`,
        });
    } catch (e) {
        console.error("Error updating document: ", e);
        toast({
            variant: "destructive",
            title: "Error al actualizar",
            description: "No se pudo actualizar la actividad. Inténtalo de nuevo.",
        });
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!user) return;
    const docRef = doc(db, `users/${user.uid}/appointments`, id);
    try {
        await deleteDoc(docRef);
        toast({
            title: "¡Actividad Eliminada!",
        });
    } catch (e) {
        console.error("Error deleting document: ", e);
        toast({
            variant: "destructive",
            title: "Error al eliminar",
            description: "No se pudo eliminar la actividad. Inténtalo de nuevo.",
        });
    }
  }
  
  const priorityColorClass = {
      baja: 'bg-green-500',
      media: 'bg-yellow-500',
      alta: 'bg-red-500',
  }
  
   const statusBadgeVariant = {
        pendiente: 'bg-gray-100 text-gray-800 border-gray-200',
        en_progreso: 'bg-blue-100 text-blue-800 border-blue-200',
        completada: 'bg-green-100 text-green-800 border-green-200',
    };

  const isLoading = userLoading || loading || accountLogLoading;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight font-headline">Bitácora de Actividades</h1>
      <p className="text-muted-foreground">
        Registra, organiza y prioriza tus citas y tareas. Un control claro de tu día a día para que no se te escape nada importante.
      </p>
      <div className="grid lg:grid-cols-3 gap-6 mt-2">
        <div className="lg:col-span-2">
           <Card>
            <CardContent className="p-2 md:p-6 flex justify-center">
              {isLoading ? (
                <Skeleton className="p-2 md:p-6 w-[292px] h-[345px] sm:w-[502px] sm:h-[377px] rounded-md" />
              ) : (
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                  modifiers={modifiers}
                  modifiersClassNames={modifiersStyles}
                  locale={es}
                />
              )}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="flex flex-col h-full min-h-[400px]">
            <CardHeader>
              <CardTitle>Actividades y Citas</CardTitle>
              <CardDescription>
                {date ? format(date, "PPP", { locale: es }) : "Selecciona una fecha"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
               {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                ) : error ? (
                    <div className="text-center text-destructive py-8">Error al cargar datos.</div>
                ) : selectedAppointments.length > 0 ? (
                    <div className='space-y-4'>
                        <div className="space-y-2">
                             <Card>
                                <CardHeader className="p-4">
                                    <CardTitle className="text-base">Resumen de Prioridad</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <div className="flex rounded-md overflow-hidden text-xs font-semibold text-white">
                                        <div className="flex-1 bg-red-500 p-2 flex flex-col items-center justify-center text-center">
                                            <Flame className="h-4 w-4 mb-1" />
                                            <div>{priorityCounts.alta} Alta</div>
                                        </div>
                                        <div className="flex-1 bg-yellow-500 p-2 flex flex-col items-center justify-center text-center">
                                            <AlertTriangle className="h-4 w-4 mb-1" />
                                            <div>{priorityCounts.media} Media</div>
                                        </div>
                                        <div className="flex-1 bg-green-500 p-2 flex flex-col items-center justify-center text-center">
                                            <CheckCircle className="h-4 w-4 mb-1" />
                                            <div>{priorityCounts.baja} Baja</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="p-4">
                                    <CardTitle className="text-base">Resumen de Progreso</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <div className="flex rounded-md overflow-hidden text-xs font-semibold">
                                        <div className="flex-1 bg-gray-500 text-white p-2 flex flex-col items-center justify-center text-center">
                                            <ListTodo className="h-4 w-4 mb-1" />
                                            <div>{statusCounts.pendiente} Pendiente</div>
                                        </div>
                                        <div className="flex-1 bg-blue-500 text-white p-2 flex flex-col items-center justify-center text-center">
                                            <Hourglass className="h-4 w-4 mb-1" />
                                            <div>{statusCounts.en_progreso} En Progreso</div>
                                        </div>
                                        <div className="flex-1 bg-green-500 text-white p-2 flex flex-col items-center justify-center text-center">
                                            <PartyPopper className="h-4 w-4 mb-1" />
                                            <div>{statusCounts.completada} Completada</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <ul className="space-y-3">
                        {selectedAppointments.map((apt) => (
                            <li key={apt.id}>
                                <Card className={cn("relative overflow-hidden")}>
                                    <div className={cn("absolute left-0 top-0 h-full w-1.5", priorityColorClass[apt.priority])}></div>
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-start gap-4">
                                            <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="font-semibold">{apt.time}</p>
                                                    {apt.status && (
                                                        <Badge variant="outline" className={cn('text-xs', statusBadgeVariant[apt.status])}>
                                                            {apt.status.replace('_', ' ')}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="font-semibold">{apt.title}</p>
                                                {apt.description && <p className="text-sm text-muted-foreground mt-1">{apt.description}</p>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <AppointmentForm 
                                                selectedDate={date!} 
                                                onFormSubmit={(data) => handleUpdateAppointment(apt.id, data)}
                                                existingAppointment={apt}
                                            >
                                                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                            </AppointmentForm>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Esta acción no se puede deshacer. Esto eliminará permanentemente la actividad "{apt.title}".
                                                    </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteAppointment(apt.id)} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </CardContent>
                                </Card>
                            </li>
                        ))}
                        </ul>
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground py-8 flex flex-col items-center justify-center h-full">
                        <p>No hay actividades programadas para este día.</p>
                        {date && (
                             <AppointmentForm selectedDate={date} onFormSubmit={handleAddAppointment}>
                                <Button variant="link" className="mt-2">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Añadir Actividad
                                </Button>
                            </AppointmentForm>
                        )}
                    </div>
                )}
            </CardContent>
             {date && !isLoading && selectedAppointments.length > 0 && (
                <CardFooter>
                    <AppointmentForm selectedDate={date} onFormSubmit={handleAddAppointment}>
                        <Button variant="outline" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Añadir Otra Actividad
                        </Button>
                    </AppointmentForm>
                </CardFooter>
            )}
          </Card>
        </div>
      </div>
      <div className="mt-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-6 w-6 text-primary" />
                    Bitácora de Seguimiento de Cuenta
                </CardTitle>
                <CardDescription>
                    Registro de actividades y gestiones realizadas por tu asesor y el equipo de AFORTU.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Actividad Realizada</TableHead>
                            <TableHead>Asesor</TableHead>
                            <TableHead>Detalles</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                             <TableRow><TableCell colSpan={4} className="text-center"><Skeleton className="h-8 w-full" /></TableCell></TableRow>
                        ) : accountLogError ? (
                             <TableRow><TableCell colSpan={4} className="text-center text-destructive">Error al cargar la bitácora de seguimiento.</TableCell></TableRow>
                        ) : accountLogData.length > 0 ? (
                            accountLogData.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-medium">{log.date}</TableCell>
                                    <TableCell>{log.activity}</TableCell>
                                    <TableCell>{log.advisor}</TableCell>
                                    <TableCell className="text-muted-foreground">{log.details}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                             <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">No hay actividades de seguimiento registradas.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
    

    
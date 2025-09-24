
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/lib/firebase";
import { collection, doc, writeBatch, setDoc, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, formatISO } from "date-fns";
import { es } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// SECURITY: Client-side validation schemas using Zod
// CRITICAL: All these validations MUST be duplicated on the server-side/backend
// when processing sensitive financial data to prevent client-side bypass attacks
const metricsSchema = z.object({
    totalAfortuAccounts: z.string().min(1, 'Este campo es requerido'),
    newAppointments: z.string().min(1, 'Este campo es requerido'),
});
type MetricsFormValues = z.infer<typeof metricsSchema>;

const fixedRatePerformanceSchema = z.object({
    interestRate: z.coerce.number().positive("La tasa debe ser un número positivo."),
    termInMonths: z.coerce.number().int().positive("El plazo debe ser un número positivo."),
});
type FixedRatePerformanceFormValues = z.infer<typeof fixedRatePerformanceSchema>;

const fixedRateCapitalSchema = z.object({
    totalCapital: z.coerce.number().positive("El capital debe ser un número positivo."),
});
type FixedRateCapitalFormValues = z.infer<typeof fixedRateCapitalSchema>;

const portfolioItemSchema = z.object({
    name: z.string().min(1, 'El nombre del activo es requerido'),
    symbol: z.string().min(1, 'El símbolo es requerido').toUpperCase(),
    shares: z.coerce.number().positive("El número de títulos debe ser positivo."),
    purchasePrice: z.coerce.number().positive("El precio de compra debe ser positivo."),
    purchaseDate: z.date({
        required_error: "Se requiere una fecha de compra.",
    }),
});
type PortfolioFormValues = z.infer<typeof portfolioItemSchema>;

const accountLogSchema = z.object({
    date: z.date({ required_error: "Se requiere una fecha." }),
    activity: z.string().min(3, "La actividad es requerida."),
    advisor: z.string().min(2, "El nombre del asesor es requerido."),
    details: z.string().min(5, "Los detalles son requeridos."),
});
type AccountLogFormValues = z.infer<typeof accountLogSchema>;


type PortfolioItem = {
    id: string;
    name: string;
    symbol: string;
    shares: number;
    purchasePrice: number;
    purchaseDate: { seconds: number, nanoseconds: number };
};

type AccountLogItem = {
    id: string;
    date: string;
    activity: string;
    advisor: string;
    details: string;
};


export default function ToolsPage() {
    const [user, loading] = useAuthState(auth);
    const { toast } = useToast();

    // Forms
    const metricsForm = useForm<MetricsFormValues>({ resolver: zodResolver(metricsSchema), defaultValues: { totalAfortuAccounts: '$0.00', newAppointments: '0' } });
    const fixedRatePerformanceForm = useForm<FixedRatePerformanceFormValues>({ resolver: zodResolver(fixedRatePerformanceSchema), defaultValues: { interestRate: 18, termInMonths: 24 } });
    const fixedRateCapitalForm = useForm<FixedRateCapitalFormValues>({ resolver: zodResolver(fixedRateCapitalSchema), defaultValues: { totalCapital: 100000 } });
    const portfolioForm = useForm<PortfolioFormValues>({ resolver: zodResolver(portfolioItemSchema), defaultValues: { name: 'NVIDIA Inc.', symbol: 'NVDA', shares: 30, purchasePrice: 125.50, purchaseDate: new Date('2024-05-10') } });
    const accountLogForm = useForm<AccountLogFormValues>({ resolver: zodResolver(accountLogSchema), defaultValues: { date: new Date(), activity: '', advisor: '', details: '' } });

    // Firestore Refs
    const portfolioCollectionRef = user ? collection(db, 'users', user.uid, 'portfolio') : null;
    const accountLogCollectionRef = user ? collection(db, 'users', user.uid, 'accountLog') : null;
    const fixedRateRef = user ? doc(db, 'users', user.uid, 'metrics', 'fixedRate') : null;
    const metricsRef = user ? doc(db, 'users', user.uid, 'metrics', 'summary') : null;

    // Data Hooks
    const [portfolioSnapshot, portfolioLoading, portfolioError] = useCollection(portfolioCollectionRef);
    const [accountLogSnapshot, accountLogLoading, accountLogError] = useCollection(accountLogCollectionRef);
    const [fixedRateData, fixedRateLoading, fixedRateError] = useDocumentData(fixedRateRef);
    const [metricsData, metricsLoading, metricsError] = useDocumentData(metricsRef);


    React.useEffect(() => {
        if(fixedRateData){
            fixedRatePerformanceForm.reset({ interestRate: fixedRateData.interestRate, termInMonths: fixedRateData.termInMonths });
            fixedRateCapitalForm.reset({ totalCapital: fixedRateData.totalCapital });
        }
        if(metricsData){
            metricsForm.reset({ totalAfortuAccounts: metricsData.totalAfortuAccounts, newAppointments: metricsData.newAppointments });
        }
    }, [fixedRateData, metricsData, fixedRatePerformanceForm, fixedRateCapitalForm, metricsForm]);

    const portfolioItems = portfolioSnapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id } as PortfolioItem)) || [];
    const accountLogItems = accountLogSnapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id } as AccountLogItem)).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];
    const portfolioTotal = portfolioItems.reduce((acc, item) => acc + (item.shares * item.purchasePrice), 0);

    const handleSaveMetrics = async (data: MetricsFormValues) => {
        if (!metricsRef) return;
        try {
            await setDoc(metricsRef, data, { merge: true });
            toast({ title: "¡Métricas Guardadas!", description: "Los datos del dashboard han sido actualizados." });
        } catch (error) {
             console.error("Error al guardar las métricas:", error);
            toast({ variant: "destructive", title: "Error", description: "No se pudieron guardar las métricas." });
        }
    }
    
    const handleSaveFixedRate = async (data: FixedRatePerformanceFormValues | FixedRateCapitalFormValues) => {
        if (!fixedRateRef) return;
        try {
            await setDoc(fixedRateRef, data, { merge: true });
            toast({ title: "¡Tasa Fija Guardada!", description: "Los datos de tasa fija han sido actualizados." });
        } catch (error) {
             console.error("Error al guardar la tasa fija:", error);
            toast({ variant: "destructive", title: "Error", description: "No se pudo guardar la configuración de tasa fija." });
        }
    }

    const handleAddPortfolioItem = async (data: PortfolioFormValues) => {
        if (!portfolioCollectionRef) return;
        try {
            await addDoc(portfolioCollectionRef, data);
            toast({ title: "¡Activo Añadido!", description: `${data.name} ha sido añadido a tu portafolio.` });
            portfolioForm.reset({ name: '', symbol: '', shares: 10, purchasePrice: 150, purchaseDate: new Date() });
        } catch (error) {
            console.error("Error al añadir activo:", error);
            toast({ variant: "destructive", title: "Error", description: "No se pudo añadir el activo." });
        }
    }

    const handleDeletePortfolioItem = async (itemId: string) => {
        if (!user) return;
        try {
            await deleteDoc(doc(db, 'users', user.uid, 'portfolio', itemId));
            toast({ title: "Activo Eliminado" });
        } catch (error) {
            console.error("Error al eliminar activo:", error);
            toast({ variant: "destructive", title: "Error", description: "No se pudo eliminar el activo." });
        }
    }

    const handleClearPortfolio = async () => {
        if (!portfolioCollectionRef) return;
        try {
            const snapshot = await getDocs(portfolioCollectionRef);
            const batch = writeBatch(db);
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            toast({ title: "Portafolio Limpiado", description: "Todos los activos han sido eliminados." });
        } catch (error) {
            console.error("Error al limpiar el portafolio:", error);
            toast({ variant: "destructive", title: "Error", description: "No se pudo limpiar el portafolio." });
        }
    }

    const handleAddAccountLog = async (data: AccountLogFormValues) => {
        if (!accountLogCollectionRef) return;
        try {
            const dataToSave = { ...data, date: formatISO(data.date, { representation: 'date' }) };
            await addDoc(accountLogCollectionRef, dataToSave);
            toast({ title: "¡Registro Añadido!", description: "La bitácora de seguimiento ha sido actualizada." });
            accountLogForm.reset({ date: new Date(), activity: '', advisor: '', details: '' });
        } catch (error) {
             console.error("Error al añadir a bitácora:", error);
            toast({ variant: "destructive", title: "Error", description: "No se pudo añadir el registro." });
        }
    }

     const handleDeleteAccountLog = async (itemId: string) => {
        if (!user) return;
        try {
            await deleteDoc(doc(db, 'users', user.uid, 'accountLog', itemId));
            toast({ title: "Registro Eliminado" });
        } catch (error) {
            console.error("Error al eliminar registro:", error);
            toast({ variant: "destructive", title: "Error", description: "No se pudo eliminar el registro." });
        }
    }


    if (loading || portfolioLoading || fixedRateLoading || metricsLoading || accountLogLoading) {
        return (
            <div className="container mx-auto py-10 space-y-8">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    if (!user) {
        return <div className="container mx-auto py-10 text-center">Necesitas iniciar sesión para acceder a esta página.</div>
    }

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle>Configuración de Datos del Usuario</CardTitle>
                        <CardDescription>
                            Esta página contiene acciones para configurar los datos de un usuario. Los totales de inversión en el dashboard se calculan automáticamente a partir de los productos que se configuran a continuación.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    <AccordionItem value="item-1" className="border-none">
                       <Card>
                           <AccordionTrigger className="p-6 hover:no-underline">
                                <CardHeader className="p-0 text-left">
                                    <CardTitle>Gestión de la Bitácora de Seguimiento</CardTitle>
                                    <CardDescription>Añade o elimina registros de la bitácora de seguimiento de cuenta que se muestra en la página de "Bitácora".</CardDescription>
                                </CardHeader>
                           </AccordionTrigger>
                           <AccordionContent>
                                <CardContent>
                                    <Form {...accountLogForm}>
                                        <form onSubmit={accountLogForm.handleSubmit(handleAddAccountLog)} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField control={accountLogForm.control} name="activity" render={({ field }) => (
                                                    <FormItem><FormLabel>Actividad</FormLabel><FormControl><Input placeholder="Revisión de portafolio" {...field} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                                <FormField control={accountLogForm.control} name="advisor" render={({ field }) => (
                                                    <FormItem><FormLabel>Asesor</FormLabel><FormControl><Input placeholder="Asesor AFT" {...field} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                        </div>
                                        <FormField control={accountLogForm.control} name="details" render={({ field }) => (
                                            <FormItem><FormLabel>Detalles</FormLabel><FormControl><Textarea placeholder="Se discutieron las proyecciones..." {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                                <FormField control={accountLogForm.control} name="date" render={({ field }) => (
                                                    <FormItem className="flex flex-col pt-2">
                                                        <FormLabel>Fecha del Registro</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                                    {field.value ? format(field.value, "PPP", {locale: es}) : <span>Elige una fecha</span>}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}/>
                                                <div className="md:col-span-2">
                                                    <Button type="submit" className="w-full">Añadir a Bitácora</Button>
                                                </div>
                                        </div>
                                        </form>
                                    </Form>
                                    <div className="mt-6">
                                        <h4 className="font-semibold mb-2">Registros Actuales</h4>
                                        <div className="max-h-60 overflow-y-auto">
                                            <Table>
                                                <TableHeader><TableRow><TableHead>Fecha</TableHead><TableHead>Actividad</TableHead><TableHead>Asesor</TableHead><TableHead className="text-right">Acción</TableHead></TableRow></TableHeader>
                                                <TableBody>
                                                    {accountLogItems.map(item => (
                                                        <TableRow key={item.id}>
                                                            <TableCell className="font-medium">{item.date}</TableCell>
                                                            <TableCell>{item.activity}</TableCell>
                                                            <TableCell>{item.advisor}</TableCell>
                                                            <TableCell className="text-right">
                                                                <Button variant="ghost" size="icon" onClick={() => handleDeleteAccountLog(item.id)}>
                                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </CardContent>
                           </AccordionContent>
                       </Card>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2" className="border-none">
                       <Card>
                            <AccordionTrigger className="p-6 hover:no-underline">
                                <CardHeader className="p-0 text-left">
                                    <CardTitle>Configurar Métricas Generales</CardTitle>
                                    <CardDescription>Establece los valores para las tarjetas de estadísticas que no se calculan a partir de otras inversiones.</CardDescription>
                                </CardHeader>
                            </AccordionTrigger>
                            <AccordionContent>
                                <CardContent>
                                    <Form {...metricsForm}>
                                        <form onSubmit={metricsForm.handleSubmit(handleSaveMetrics)} className="space-y-4">
                                            <FormField control={metricsForm.control} name="totalAfortuAccounts" render={({ field }) => (
                                                <FormItem><FormLabel>Liquidez Estructurada</FormLabel><FormControl><Input placeholder="$10,000.00" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <FormField control={metricsForm.control} name="newAppointments" render={({ field }) => (
                                                <FormItem><FormLabel>Citas de Seguimiento</FormLabel><FormControl><Input placeholder="12" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <Button type="submit" className="w-full">Guardar Métricas Generales</Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </AccordionContent>
                       </Card>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3" className="border-none">
                       <Card>
                            <AccordionTrigger className="p-6 hover:no-underline">
                                 <CardHeader className="p-0 text-left">
                                    <CardTitle>Configurar Capital de Tasa Fija</CardTitle>
                                    <CardDescription>Establece el monto total invertido en el producto de tasa fija.</CardDescription>
                                </CardHeader>
                            </AccordionTrigger>
                            <AccordionContent>
                                 <CardContent>
                                    <Form {...fixedRateCapitalForm}>
                                        <form onSubmit={fixedRateCapitalForm.handleSubmit(handleSaveFixedRate)} className="space-y-4">
                                            <FormField control={fixedRateCapitalForm.control} name="totalCapital" render={({ field }) => (
                                                <FormItem><FormLabel>Capital Total Invertido</FormLabel><FormControl><Input type="number" placeholder="100000" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <Button type="submit" className="w-full">Guardar Capital</Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </AccordionContent>
                       </Card>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border-none">
                       <Card>
                             <AccordionTrigger className="p-6 hover:no-underline">
                                <CardHeader className="p-0 text-left">
                                    <CardTitle>Configurar Rendimiento de Tasa Fija</CardTitle>
                                    <CardDescription>Define la tasa de interés y el plazo para tu producto de tasa fija.</CardDescription>
                                </CardHeader>
                            </AccordionTrigger>
                            <AccordionContent>
                                <CardContent>
                                    <Form {...fixedRatePerformanceForm}>
                                        <form onSubmit={fixedRatePerformanceForm.handleSubmit(handleSaveFixedRate)} className="space-y-4">
                                            <FormField control={fixedRatePerformanceForm.control} name="interestRate" render={({ field }) => (
                                                <FormItem><FormLabel>Tasa de Interés Anual (%)</FormLabel><FormControl><Input type="number" step="0.01" placeholder="18" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <FormField control={fixedRatePerformanceForm.control} name="termInMonths" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Plazo (en meses)</FormLabel>
                                                    <FormControl><Input type="number" placeholder="24" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}/>
                                            <Button type="submit" className="w-full">Guardar Rendimiento</Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </AccordionContent>
                       </Card>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5" className="border-none">
                       <Card>
                             <AccordionTrigger className="p-6 hover:no-underline">
                                <CardHeader className="p-0 text-left">
                                    <CardTitle>Gestionar Activos del Portafolio (Asset Management)</CardTitle>
                                    <CardDescription>Añade o elimina activos de renta variable de tu portafolio. El total se calculará en el dashboard.</CardDescription>
                                </CardHeader>
                            </AccordionTrigger>
                            <AccordionContent>
                                <CardContent>
                                    <Form {...portfolioForm}>
                                        <form onSubmit={portfolioForm.handleSubmit(handleAddPortfolioItem)} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField control={portfolioForm.control} name="name" render={({ field }) => (
                                                    <FormItem><FormLabel>Nombre Activo</FormLabel><FormControl><Input placeholder="Apple Inc." {...field} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                                <FormField control={portfolioForm.control} name="symbol" render={({ field }) => (
                                                    <FormItem><FormLabel>Símbolo</FormLabel><FormControl><Input placeholder="AAPL" {...field} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <FormField control={portfolioForm.control} name="shares" render={({ field }) => (
                                                    <FormItem><FormLabel>N° de Títulos</FormLabel><FormControl><Input type="number" placeholder="100" {...field} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                                <FormField control={portfolioForm.control} name="purchasePrice" render={({ field }) => (
                                                    <FormItem><FormLabel>Precio de Compra (c/u)</FormLabel><FormControl><Input type="number" step="0.01" placeholder="150.75" {...field} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                                <FormField control={portfolioForm.control} name="purchaseDate" render={({ field }) => (
                                                    <FormItem className="flex flex-col pt-2">
                                                        <FormLabel>Fecha de Compra</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                    >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP", {locale: es})
                                                                    ) : (
                                                                        <span>Elige una fecha</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}/>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button type="submit" className="w-full">Añadir Activo al Portafolio</Button>
                                                <Button type="button" variant="destructive" onClick={handleClearPortfolio} className="w-full">Limpiar Portafolio</Button>
                                            </div>
                                        </form>
                                    </Form>
                                    <div className="mt-6">
                                        <h4 className="font-semibold mb-2">Activos Actuales en Portafolio</h4>
                                        <div className="max-h-60 overflow-y-auto">
                                            <Table>
                                                <TableHeader><TableRow><TableHead>Activo</TableHead><TableHead className="text-right">Títulos</TableHead><TableHead className="text-right">Precio Compra</TableHead><TableHead>Fecha Compra</TableHead><TableHead className="text-right">Acción</TableHead></TableRow></TableHeader>
                                                <TableBody>
                                                    {portfolioItems.map(item => {
                                                        const date = item.purchaseDate ? new Date(item.purchaseDate.seconds * 1000) : null;
                                                        const formattedDate = date ? format(date, "P", { locale: es }) : 'N/A';
                                                        return (
                                                            <TableRow key={item.id}>
                                                                <TableCell className="font-medium">{item.name} <span className="text-muted-foreground">({item.symbol})</span></TableCell>
                                                                <TableCell className="text-right">{item.shares}</TableCell>
                                                                <TableCell className="text-right">${item.purchasePrice?.toFixed(2)}</TableCell>
                                                                <TableCell>{formattedDate}</TableCell>
                                                                <TableCell className="text-right">
                                                                    <Button variant="ghost" size="icon" onClick={() => handleDeletePortfolioItem(item.id)}>
                                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <div className="w-full text-right font-bold text-lg">
                                        Total en Portafolio (a coste): {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(portfolioTotal)}
                                    </div>
                                </CardFooter>
                            </AccordionContent>
                       </Card>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}

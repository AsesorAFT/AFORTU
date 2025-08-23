
'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Target, Trash2, Wallet, PiggyBank, Handshake, AlertTriangle, ArrowRight, TrendingUp, Edit, CalendarDays } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
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
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';
import { collection, doc, query } from 'firebase/firestore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';
import { format, addYears } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChatAsesor } from '@/components/dashboard/chat-asesor';


const initialObjectives = [
    { id: 1, title: 'Plan de Retiro 2040', monthlyContribution: 5000, termYears: 20, currentAmount: 450000, initialMonthlyContribution: 5000, startDate: new Date('2022-01-15') },
    { id: 2, title: 'Fondo Universitario', monthlyContribution: 2500, termYears: 15, currentAmount: 120000, initialMonthlyContribution: 2500, startDate: new Date('2023-08-01') },
];

const investmentPlanSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres."),
  monthlyContribution: z.coerce.number().positive("La aportación debe ser positiva."),
  termYears: z.coerce.number().int().min(1, "El plazo debe ser de al menos 1 año.").max(40, "El plazo no puede superar los 40 años."),
});

type InvestmentPlanFormValues = z.infer<typeof investmentPlanSchema>;
type ObjectiveData = {
    id: number;
    title: string;
    monthlyContribution: number;
    initialMonthlyContribution: number;
    termYears: number;
    currentAmount: number;
    startDate: Date;
};

const contributionSchema = z.object({
    amount: z.preprocess(
        (a) => parseFloat(z.string().parse(a)),
        z.number().positive("La aportación debe ser un número positivo.")
    ),
});
type ContributionFormValues = z.infer<typeof contributionSchema>;


const liquidityContributionSchema = z.object({
    amount: z.coerce.number().positive("El monto a aportar debe ser positivo."),
    objectiveId: z.string({ required_error: "Debes seleccionar un objetivo." }),
});

const liquidityWithdrawalSchema = z.object({
    amount: z.coerce.number().positive("El monto a retirar debe ser positivo."),
});

type PortfolioItem = {
    shares: number;
    purchasePrice: number;
};

function AddContributionForm({ objective, onContribute }: { objective: ObjectiveData, onContribute: (id: number, amount: number) => void }) {
    const [open, setOpen] = React.useState(false);
    const form = useForm<ContributionFormValues>({
        resolver: zodResolver(contributionSchema),
        defaultValues: {
            amount: 0,
        },
    });

    const onSubmit = (data: ContributionFormValues) => {
        onContribute(objective.id, data.amount);
        form.reset();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="w-full">Aportación Extraordinaria</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Aportación Extraordinaria a &quot;{objective.title}&quot;</DialogTitle>
                    <DialogDescription>
                        Ingresa el monto que deseas añadir a tu plan. ¡Cada paso cuenta!
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                         <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Monto de la Aportación</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="1,000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Añadir Aportación</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function CreateInvestmentPlanForm({ onAdd }: { onAdd: (data: InvestmentPlanFormValues) => void }) {
    const [open, setOpen] = React.useState(false);
    const form = useForm<InvestmentPlanFormValues>({
        resolver: zodResolver(investmentPlanSchema),
        defaultValues: {
            title: "",
            monthlyContribution: 5000,
            termYears: 10,
        },
    });

    const watchMonthly = form.watch("monthlyContribution");
    const watchTerm = form.watch("termYears");

    const calculateFutureValue = React.useCallback(() => {
        const P = watchMonthly;
        const r = 0.1850 / 12; // Tasa de interés mensual
        const n = watchTerm * 12; // Número total de aportaciones
        if (P > 0 && n > 0 && r > 0) {
            const FV = P * (((Math.pow(1 + r, n)) - 1) / r);
            return {
                futureValue: FV,
                totalContribution: P * n,
                totalInterest: FV - (P * n)
            };
        }
        return { futureValue: 0, totalContribution: 0, totalInterest: 0 };
    }, [watchMonthly, watchTerm]);

    const { futureValue, totalContribution, totalInterest } = calculateFutureValue();


    const onSubmit = (data: InvestmentPlanFormValues) => {
        onAdd(data);
        form.reset();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                 <Button className="w-full md:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Crear Plan de Inversión
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Crear Plan de Inversión</DialogTitle>
                    <DialogDescription>
                       Define tu plan de aportaciones mensuales y visualiza el poder del interés compuesto.
                       Tasa preferencial del 18.50% anual.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre del Plan</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej: Mi Plan de Retiro" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="monthlyContribution"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Aportación Mensual: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(field.value)}</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="monthlyContribution"
                                            control={form.control}
                                            render={({ field }) => (
                                                <Slider
                                                    min={500}
                                                    max={50000}
                                                    step={500}
                                                    value={[field.value]}
                                                    onValueChange={(vals) => field.onChange(vals[0])}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </FormItem>
                                )}
                            />

                             <FormField
                                control={form.control}
                                name="termYears"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Plazo: {field.value} años</FormLabel>
                                    <FormControl>
                                         <Controller
                                            name="termYears"
                                            control={form.control}
                                            render={({ field }) => (
                                                <Slider
                                                    min={1}
                                                    max={40}
                                                    step={1}
                                                    value={[field.value]}
                                                    onValueChange={(vals) => field.onChange(vals[0])}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </FormItem>
                                )}
                            />

                        </div>

                        <div className="p-6 bg-muted/50 rounded-lg space-y-4 flex flex-col justify-center">
                            <h3 className="font-semibold text-center text-lg">Proyección de tu Inversión</h3>
                             <div className="text-center">
                                <p className="text-sm text-muted-foreground">Valor Futuro Estimado</p>
                                <p className="text-3xl font-bold text-primary">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(futureValue)}</p>
                                <p className="text-xs text-muted-foreground">(Antes de impuestos)</p>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Total Aportado:</span>
                                    <span className="font-medium">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(totalContribution)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Rendimiento Generado:</span>
                                    <span className="font-medium text-green-600">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(totalInterest)}</span>
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="md:col-span-2">
                            <Button type="submit" size="lg">Guardar Plan de Inversión</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function InvestmentPlanDetailsDialog({ plan, onUpdate }: { plan: ObjectiveData, onUpdate: (id: number, data: Omit<InvestmentPlanFormValues, 'termYears'>) => void }) {
    const [open, setOpen] = React.useState(false);
    const form = useForm<Omit<InvestmentPlanFormValues, 'termYears'>>({
        resolver: zodResolver(investmentPlanSchema.omit({ termYears: true })),
        defaultValues: {
            title: plan.title,
            monthlyContribution: plan.monthlyContribution,
        },
    });

    const watchMonthly = form.watch("monthlyContribution");

    const calculateFutureValue = React.useCallback(() => {
        const P = watchMonthly;
        const r = 0.1850 / 12; // Tasa de interés mensual
        const n = plan.termYears * 12; // El plazo no se modifica, se usa el del plan original
        if (P > 0 && n > 0 && r > 0) {
            const FV = P * (((Math.pow(1 + r, n)) - 1) / r);
            return {
                futureValue: FV,
                totalContribution: P * n,
                totalInterest: FV - (P * n)
            };
        }
        return { futureValue: 0, totalContribution: 0, totalInterest: 0 };
    }, [watchMonthly, plan.termYears]);

    const { futureValue, totalContribution, totalInterest } = calculateFutureValue();

    const onSubmit = (data: Omit<InvestmentPlanFormValues, 'termYears'>) => {
        onUpdate(plan.id, data);
        setOpen(false);
    };
    
     React.useEffect(() => {
        form.reset({
            title: plan.title,
            monthlyContribution: plan.monthlyContribution,
        });
    }, [plan, form]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Ver Detalles</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Detalles del Plan: {plan.title}</DialogTitle>
                    <DialogDescription>
                       Revisa y ajusta los parámetros de tu plan de inversión.
                    </DialogDescription>
                </DialogHeader>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre del Plan</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej: Mi Plan de Retiro" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="monthlyContribution"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Aportación Mensual: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(field.value)}</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="monthlyContribution"
                                            control={form.control}
                                            render={({ field }) => (
                                                <Slider
                                                    min={plan.initialMonthlyContribution}
                                                    max={50000}
                                                    step={500}
                                                    value={[field.value]}
                                                    onValueChange={(vals) => field.onChange(vals[0])}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                             <Alert>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Aviso Importante</AlertTitle>
                                <AlertDescription>
                                    Para reestructuras de plan de aportaciones mensuales, <a href="https://wa.me/525548144552" target="_blank" rel="noopener noreferrer" className="font-semibold underline">contacta a tu asesor por WhatsApp</a>.
                                </AlertDescription>
                            </Alert>
                        </div>

                        <div className="p-6 bg-muted/50 rounded-lg space-y-4 flex flex-col justify-center">
                            <h3 className="font-semibold text-center text-lg">Proyección Actualizada</h3>
                             <div className="text-center">
                                <p className="text-sm text-muted-foreground">Valor Futuro Estimado (a {plan.termYears} años)</p>
                                <p className="text-3xl font-bold text-primary">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(futureValue)}</p>
                                <p className="text-xs text-muted-foreground">(Antes de impuestos)</p>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Total Aportado:</span>
                                    <span className="font-medium">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(totalContribution)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Rendimiento Generado:</span>
                                    <span className="font-medium text-green-600">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(totalInterest)}</span>
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="md:col-span-2">
                            <Button type="submit" size="lg">Guardar Cambios</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}


export default function ObjectivesPage() {
    const { toast } = useToast();
    const [objectives, setObjectives] = React.useState<ObjectiveData[]>(initialObjectives);
    const [user, userLoading] = useAuthState(auth);
    
    const portfolioRef = user ? collection(db, `users/${user.uid}/portfolio`) : null;
    const [portfolioSnapshot, portfolioLoading] = useCollection(portfolioRef ? query(portfolioRef) : null);
    const fixedRateRef = user ? doc(db, `users/${user.uid}/metrics/fixedRate`) : null;
    const [fixedRateData, fixedRateLoading] = useDocumentData(fixedRateRef);
    
    const [structuredLiquidityBalance, setStructuredLiquidityBalance] = React.useState(0);
    const [openLiquidityDialog, setOpenLiquidityDialog] = React.useState(false);
    const [openWithdrawalDialog, setOpenWithdrawalDialog] = React.useState(false);

    const liquidityForm = useForm<z.infer<typeof liquidityContributionSchema>>({
        resolver: zodResolver(liquidityContributionSchema),
    });

    const withdrawalForm = useForm<z.infer<typeof liquidityWithdrawalSchema>>({
        resolver: zodResolver(liquidityWithdrawalSchema),
    });
    
    const loading = userLoading || portfolioLoading || fixedRateLoading;

    const totalInvestment = React.useMemo(() => {
        const portfolioCost = portfolioSnapshot?.docs.reduce((acc, doc) => {
            const item = doc.data() as PortfolioItem;
            return acc + (item.shares * item.purchasePrice);
        }, 0) || 0;
        const fixedRateCapital = fixedRateData?.totalCapital || 0;
        return portfolioCost + fixedRateCapital;
    }, [portfolioSnapshot, fixedRateData]);
    
    React.useEffect(() => {
        if (!loading) {
            const initialLiquidity = totalInvestment * 0.10; // Use 10%
            setStructuredLiquidityBalance(initialLiquidity);
        }
    }, [totalInvestment, loading]);


    const onAddObjective = (data: InvestmentPlanFormValues) => {
        const newObjective: ObjectiveData = {
            id: Date.now(),
            currentAmount: 0, // New plans start with 0
            initialMonthlyContribution: data.monthlyContribution,
            startDate: new Date(),
            ...data
        };
        setObjectives(prev => [...prev, newObjective]);
        toast({
            title: "¡Plan de Inversión Creado!",
            description: `Tu plan "${data.title}" ha sido añadido.`,
        });
    };
    
    const onUpdateObjective = (id: number, data: Omit<InvestmentPlanFormValues, 'termYears'>) => {
        setObjectives(prev => prev.map(obj => obj.id === id ? { ...obj, ...data } : obj));
        toast({
            title: "¡Plan Actualizado!",
            description: `Tu plan "${data.title}" ha sido modificado con éxito.`,
        });
    };

    const onContribute = (id: number, amount: number) => {
        const objectiveToUpdate = objectives.find(obj => obj.id === id);
        if (objectiveToUpdate) {
            toast({
                title: "¡Aportación Exitosa!",
                description: `Has añadido ${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount)} a tu plan "${objectiveToUpdate.title}".`,
            });
        }
        
        setObjectives(prev => 
            prev.map(obj => {
                if (obj.id === id) {
                    const newCurrentAmount = obj.currentAmount + amount;
                    return { ...obj, currentAmount: newCurrentAmount };
                }
                return obj;
            })
        );
    };

     const handleLiquidityContribution = (values: z.infer<typeof liquidityContributionSchema>) => {
        const { amount, objectiveId } = values;
        const objective = objectives.find(o => o.id === parseInt(objectiveId));
        if (!objective || amount > structuredLiquidityBalance) {
            toast({
                variant: 'destructive',
                title: 'Error en la Aportación',
                description: amount > structuredLiquidityBalance ? 'No tienes saldo suficiente.' : 'No se encontró el plan.',
            });
            return;
        }

        setStructuredLiquidityBalance(prev => prev - amount);
        onContribute(objective.id, amount);

        toast({
            title: "Aportación desde Liquidez Realizada",
            description: `Se han añadido ${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount)} a tu plan "${objective.title}" con una tasa preferencial del 18.50% anual.`,
        });
        setOpenLiquidityDialog(false);
        liquidityForm.reset();
    }
    
     const handleWithdrawal = (values: z.infer<typeof liquidityWithdrawalSchema>) => {
        const { amount } = values;
        
        if(amount > structuredLiquidityBalance) {
             toast({
                variant: 'destructive',
                title: 'Error en el Retiro',
                description: 'No tienes saldo suficiente para realizar este retiro.',
            });
            return;
        }
        
        const fee = amount * 0.04;
        const netAmount = amount - fee;

        setStructuredLiquidityBalance(prev => prev - amount);

        toast({
            title: "Retiro Procesado",
            description: `Se ha procesado tu retiro de ${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount)}. Recibirás ${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(netAmount)}.`,
        });
        setOpenWithdrawalDialog(false);
        withdrawalForm.reset();
    }
    
    const calculateFutureValue = (plan: ObjectiveData) => {
        const P = plan.monthlyContribution;
        const r = 0.1850 / 12;
        const n = plan.termYears * 12;
        if (P > 0 && n > 0 && r > 0) {
            return P * (((Math.pow(1 + r, n)) - 1) / r);
        }
        return 0;
    };
    
    const withdrawalAmount = withdrawalForm.watch('amount');
    const withdrawalFee = withdrawalAmount > 0 ? withdrawalAmount * 0.04 : 0;
    const netWithdrawal = withdrawalAmount > 0 ? withdrawalAmount - withdrawalFee : 0;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Centro de Planes de Inversión</h1>
            </div>
             <p className="text-muted-foreground">
                Aquí puedes gestionar tus aportaciones mensuales y dar seguimiento a tus objetivos financieros a largo plazo.
            </p>
            
            <Card className="mt-4">
                 <CardHeader>
                    {loading ? (
                        <Skeleton className="h-10 w-48" />
                    ) : (
                        <div>
                            <p className="text-sm text-muted-foreground">Saldo Disponible</p>
                            <p className="text-3xl font-bold text-primary">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(structuredLiquidityBalance)}</p>
                        </div>
                    )}
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-0">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="flex flex-col gap-2">
                             <CardTitle className="flex items-center gap-2 mt-1">
                                <Wallet className="h-6 w-6 text-primary" />
                                Liquidez Estructurada
                            </CardTitle>
                            <CardDescription>
                                Un fondo flexible calculado a partir de tus inversiones. Úsalo para potenciar tus planes o dispón de él cuando lo necesites.
                            </CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <Dialog open={openLiquidityDialog} onOpenChange={setOpenLiquidityDialog}>
                                <DialogTrigger asChild>
                                    <Button variant="secondary" className="w-full"><PiggyBank className="mr-2"/>Aportar a Plan</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Aportar a un Plan de Inversión</DialogTitle>
                                        <DialogDescription>
                                            Mueve fondos de tu liquidez a un plan para acelerar tu progreso. Esta aportación tendrá un rendimiento preferencial del 18.50% anual.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form {...liquidityForm}>
                                        <form onSubmit={liquidityForm.handleSubmit(handleLiquidityContribution)} className="space-y-4">
                                            <FormField
                                                control={liquidityForm.control}
                                                name="amount"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Monto a Aportar</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" placeholder="5,000" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={liquidityForm.control}
                                                name="objectiveId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Plan de Destino</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecciona un plan" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {objectives.map(o => <SelectItem key={o.id} value={String(o.id)}>{o.title}</SelectItem>)}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <DialogFooter>
                                                <Button type="submit">Realizar Aportación</Button>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                             <CreateInvestmentPlanForm onAdd={onAddObjective} />
                             <ChatAsesor />
                        </div>
                    </div>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-sm">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    ¿Cómo funciona mi Liquidez Estructurada?
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-xs text-muted-foreground pt-2">
                                Tu saldo disponible corresponde al 10% del total de tus depósitos en contratos de inversión. Puedes retirarlo con una comisión del 4% a través del botón <Dialog open={openWithdrawalDialog} onOpenChange={setOpenWithdrawalDialog}><DialogTrigger asChild><Button variant="link" className="p-0 h-auto text-xs">Retirar Saldo</Button></DialogTrigger><DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Retirar Saldo de Liquidez</DialogTitle>
                                        <DialogDescription>
                                        Indica el monto a retirar. Se aplicará una comisión del 4% sobre el monto retirado.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form {...withdrawalForm}>
                                        <form onSubmit={withdrawalForm.handleSubmit(handleWithdrawal)} className="space-y-4">
                                            <FormField
                                                control={withdrawalForm.control}
                                                name="amount"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Monto a Retirar</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" placeholder="10,000" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {withdrawalAmount > 0 && (
                                                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                                                    <div className="flex justify-between text-sm"><span>Comisión (4%):</span> <span>-{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(withdrawalFee)}</span></div>
                                                    <div className="flex justify-between font-bold text-base"><span>Recibirás:</span> <span>{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(netWithdrawal)}</span></div>
                                                </div>
                                            )}
                                            <DialogFooter>
                                                <Button type="submit" variant="destructive">Confirmar Retiro</Button>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </DialogContent></Dialog>. Si lo aportas a un plan de inversión, este generará un rendimiento preferencial del 18.50% anual.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} className="flex flex-col">
                            <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                            <CardContent className="flex-grow space-y-4">
                                <Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-8 w-1/3" />
                            </CardContent>
                             <CardFooter><Skeleton className="h-10 w-full" /></CardFooter>
                        </Card>
                    ))
                ) : objectives.length === 0 ? (
                     <div className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground py-16">
                        <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-xl font-semibold">Aún no tienes planes de inversión</h3>
                        <p>Crea tu primer plan para empezar a construir tu futuro financiero.</p>
                    </div>
                ) : (
                    objectives.map((plan) => {
                        const futureValue = calculateFutureValue(plan);
                        const endDate = addYears(plan.startDate, plan.termYears);
                        return (
                            <Card key={plan.id} className="flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="flex items-center gap-2">
                                            <Target className="h-5 w-5 text-primary" /> {plan.title}
                                        </CardTitle>
                                    </div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-4 pt-1">
                                        <div className="flex items-center gap-1.5">
                                            <CalendarDays className="h-3 w-3" />
                                            <span>Inicio: {format(plan.startDate, 'MMM yyyy', { locale: es })}</span>
                                        </div>
                                         <div className="flex items-center gap-1.5">
                                            <CalendarDays className="h-3 w-3" />
                                            <span>Fin: {format(endDate, 'MMM yyyy', { locale: es })}</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Aportación Mensual</span>
                                            <span className="font-medium">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(plan.monthlyContribution)}</span>
                                        </div>
                                         <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Plazo</span>
                                            <span className="font-medium">{plan.termYears} años</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Aportado Actualmente</span>
                                            <span className="font-medium">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(plan.currentAmount)}</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                                        <p className="text-sm text-muted-foreground">Valor Futuro Proyectado</p>
                                        <p className="text-2xl font-bold text-primary">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(futureValue)}</p>
                                    </div>
                                </CardContent>
                                 <CardFooter className="flex flex-col gap-2">
                                    <AddContributionForm objective={plan} onContribute={onContribute} />
                                    <InvestmentPlanDetailsDialog plan={plan} onUpdate={onUpdateObjective} />
                                 </CardFooter>
                            </Card>
                        )
                    })
                )}
            </div>
        </div>
    );
}

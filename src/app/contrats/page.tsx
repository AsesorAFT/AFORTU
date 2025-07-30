
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Landmark, FileText, Briefcase, AlarmClock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, addYears, differenceInMonths, differenceInDays, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Dummy data for service contracts
const serviceContractsData = [
  { id: "SERV-001", service: "Planificación Patrimonial", startDate: "2023-08-15", status: "Liquidado", termInYears: 1 },
  { id: "SERV-002", service: "Blindaje Patrimonial", startDate: "2024-03-01", status: "Pago Intermedio", termInYears: 2 },
  { id: "SERV-003", service: "Asesoría para el Retiro", startDate: "2024-05-10", status: "Pago Inicial", termInYears: 5 },
  { id: "SERV-004", service: "Planificación Educativa", startDate: "2022-06-20", status: "Pendiente de Pago", termInYears: 10 },
];

// Dummy data for investment contracts
const fixedRateContractsData = [
    { id: "INV-TF-01", type: "Tasa Fija 18% Anual", startDate: "2024-07-29", amount: "$150,000.00", termInYears: 2 },
];

const assetManagementContractsData = [
    { id: "INV-AM-01", type: "Portafolio Equilibrado Global", startDate: "2022-11-15", amount: "$320,000.00", termInYears: 5 },
    { id: "INV-AM-02", type: "Portafolio Crecimiento Tecnológico", startDate: "2023-02-20", amount: "$500,000.00", termInYears: 5 },
];

type Contract = {
    id: string;
    startDate: string;
    termInYears: number;
    [key: string]: any;
};


export default function ContractsPage() {
  const { toast } = useToast();
  const [user] = useAuthState(auth);

  const handleDownload = (contractId: string, contractService: string) => {
    if (!user) {
         toast({
            variant: "destructive",
            title: "Error de Autenticación",
            description: "Debes iniciar sesión para descargar contratos.",
        });
        return;
    }

    try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.text("AFORTU", 20, 20);
        doc.setFontSize(10);
        doc.text("Contrato de Prestación de Servicios", 20, 26);

        // Contract Title
        doc.setFontSize(18);
        doc.text("CONTRATO", pageWidth - 20, 30, { align: 'right' });
        doc.setFontSize(12);
        doc.text(`ID: ${contractId}`, pageWidth - 20, 36, { align: 'right' });
        
        doc.setLineWidth(0.5);
        doc.line(20, 45, pageWidth - 20, 45);

        // Parties Info
        doc.setFontSize(12);
        doc.text("REUNIDOS", 20, 55);
        doc.setFont('helvetica', 'normal');
        doc.text("De una parte, AFORTU S.A. de C.V., en adelante 'EL PRESTADOR'.", 20, 65);
        doc.text(`De otra parte, D./Dña. ${user.displayName || '[Nombre del Cliente]'}, en adelante 'EL CLIENTE'.`, 20, 75);

        // Clauses
        doc.setFont('helvetica', 'bold');
        doc.text("CLÁUSULAS", 20, 95);
        doc.setFont('helvetica', 'normal');
        
        const contractBody = `
1. OBJETO DEL CONTRATO: El presente contrato tiene por objeto la prestación de servicios de "${contractService}" por parte de EL PRESTADOR a EL CLIENTE.

2. DURACIÓN: El contrato entrará en vigor en la fecha ${new Date().toLocaleDateString()} y tendrá una duración indefinida, salvo denuncia de alguna de las partes.

3. OBLIGACIONES DEL PRESTADOR: EL PRESTADOR se compromete a ejercer sus funciones con la máxima diligencia, velando por los intereses de EL CLIENTE.

4. OBLIGACIONES DEL CLIENTE: EL CLIENTE se compromete a facilitar toda la documentación e información necesaria para la correcta prestación del servicio.

Este es un extracto del contrato. El documento completo ha sido firmado por ambas partes.
        `;
        doc.text(contractBody, 20, 105, { maxWidth: pageWidth - 40, lineHeightFactor: 1.5 });
        
        // Signatures
        const finalY = 200;
        doc.text("Firma de EL PRESTADOR", 20, finalY + 40);
        doc.text("Firma de EL CLIENTE", pageWidth - 20, finalY + 40, { align: 'right' });
        doc.line(20, finalY + 35, 70, finalY + 35);
        doc.line(pageWidth - 70, finalY + 35, pageWidth - 20, finalY + 35);


        doc.save(`Contrato_${contractId}.pdf`);
         toast({
          title: "Descarga Iniciada",
          description: `Se está descargando el contrato ${contractId}.pdf.`,
        });

    } catch (error) {
        console.error("Error al generar PDF de contrato:", error);
         toast({
            variant: "destructive",
            title: "Error de Descarga",
            description: "No se pudo generar el documento PDF. Inténtalo de nuevo.",
        });
    }
  };
  
    const renderContractRow = (contract: Contract, type: 'service' | 'investment') => {
        const today = startOfDay(new Date());
        const startDate = startOfDay(new Date(contract.startDate));
        const expiryDate = addYears(startDate, contract.termInYears);

        const totalDurationInDays = differenceInDays(expiryDate, startDate);
        const elapsedDays = differenceInDays(today, startDate);
        const progress = Math.max(0, Math.min(100, (elapsedDays / totalDurationInDays) * 100));

        const daysUntilExpiry = differenceInDays(expiryDate, today);
        const isExpiringSoon = daysUntilExpiry > 0 && daysUntilExpiry <= 30;

        return (
            <>
                <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.id}</TableCell>
                    <TableCell>{type === 'service' ? contract.service : contract.type}</TableCell>
                    {type === 'investment' && <TableCell>{contract.amount}</TableCell>}
                    <TableCell>
                        <div>{format(startDate, 'P', { locale: es })}</div>
                        <div className="text-xs text-muted-foreground">Inicio</div>
                    </TableCell>
                    <TableCell>
                        <div>{format(expiryDate, 'P', { locale: es })}</div>
                        <div className="text-xs text-muted-foreground">Vencimiento</div>
                    </TableCell>
                    <TableCell>
                        <Progress value={progress} className="h-2" />
                        <div className="text-xs text-muted-foreground text-center mt-1">{progress.toFixed(0)}% completado</div>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleDownload(contract.id, type === 'service' ? contract.service : contract.type)}>
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Descargar</span>
                        </Button>
                    </TableCell>
                </TableRow>
                {isExpiringSoon && (
                    <TableRow>
                        <TableCell colSpan={type === 'service' ? 6 : 7} className="p-0">
                            <Alert variant="default" className="border-l-4 border-yellow-500 rounded-none">
                                <AlarmClock className="h-4 w-4" />
                                <AlertTitle>¡Próximo a Vencer!</AlertTitle>
                                <AlertDescription>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            Este contrato vence en {daysUntilExpiry} días. Puedes renovarlo ahora para asegurar una tasa preferencial.
                                        </div>
                                        <Button size="sm" onClick={() => toast({ title: "Renovación Solicitada", description: "Tu asesor se pondrá en contacto para formalizar la renovación con una tasa del 18.5% anual."})}>
                                            Renovar Ahora con 18.5% Anual
                                        </Button>
                                    </div>
                                </AlertDescription>
                            </Alert>
                        </TableCell>
                    </TableRow>
                )}
            </>
        );
    };


  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight font-headline">Gestión de Contratos</h1>
      <p className="text-muted-foreground">
        Consulta el progreso de tus contratos y gestiona las renovaciones de forma proactiva.
      </p>
      
      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="services">
                <FileText className="mr-2" />
                Contratos de Servicios
            </TabsTrigger>
            <TabsTrigger value="investment">
                <Landmark className="mr-2" />
                Contratos de Inversión
            </TabsTrigger>
        </TabsList>
        <TabsContent value="services">
            <Card>
                <CardHeader>
                <CardTitle>Mis Contratos de Servicios</CardTitle>
                <CardDescription>
                    Listado de todos tus contratos de servicios y el progreso de su vigencia.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Contrato ID</TableHead>
                                <TableHead>Servicio Contratado</TableHead>
                                <TableHead>Fecha de Inicio</TableHead>
                                <TableHead>Fecha de Vencimiento</TableHead>
                                <TableHead className="w-[150px]">Progreso</TableHead>
                                <TableHead className="text-right">Acción</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {serviceContractsData.map((contract) => renderContractRow(contract, 'service'))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="investment">
           <div className="space-y-6">
               <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary"/> Contratos de Tasa Fija</CardTitle>
                        <CardDescription>
                            Contratos de inversión con rendimiento de tasa fija.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Contrato ID</TableHead>
                                    <TableHead>Tipo de Contrato</TableHead>
                                    <TableHead>Monto</TableHead>
                                    <TableHead>Fecha de Inicio</TableHead>
                                    <TableHead>Fecha de Vencimiento</TableHead>
                                    <TableHead className="w-[150px]">Progreso</TableHead>
                                    <TableHead className="text-right">Acción</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {fixedRateContractsData.map((contract) => renderContractRow(contract, 'investment'))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary"/>Contratos de Asset Management</CardTitle>
                        <CardDescription>
                            Contratos de gestión de activos y portafolios de inversión.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Contrato ID</TableHead>
                                    <TableHead>Tipo de Contrato</TableHead>
                                    <TableHead>Monto</TableHead>
                                    <TableHead>Fecha de Inicio</TableHead>
                                    <TableHead>Fecha de Vencimiento</TableHead>
                                    <TableHead className="w-[150px]">Progreso</TableHead>
                                    <TableHead className="text-right">Acción</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {assetManagementContractsData.map((contract) => renderContractRow(contract, 'investment'))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

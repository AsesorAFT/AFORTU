
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Shield, FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import React, { useState } from "react";
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
} from "@/components/ui/alert-dialog";
import axios from "axios";

const PayPalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><path fill="#003087" d="M8.32 7.394c.25-.138.497-.28.753-.423.414-.23.82-.415 1.23-.55C11.1 6 12.02 6 13.06 6c2.34 0 4.14.77 4.14 2.37 0 .96-.68 1.63-1.63 1.9-1.12.31-2.43.08-3.7-.02-.12-.01-.23-.01-.34-.01-1.2 0-2.32.33-2.61 1.18-.21.61.38 1.12 1.05 1.12.72 0 1.29-.38 1.52-.96.2-.5.67-1.16 1.77-1.16 1.4 0 2.22.67 2.22 1.69 0 .82-.57 1.4-1.4 1.68-1.02.33-2.33.1-3.65.02-.12 0-.24-.01-.36-.01-1.33 0-2.93.38-3.48 1.71-.34.82.26 1.57 1.13 1.57.9 0 1.5-.47 1.71-1.15.17-.55.67-1.39 1.9-1.39.63 0 1.13.2 1.48.51.18.16.35.33.5.51.05.06.11.12.16.18.13.15.21.26.21.35 0 .21-.21.39-.46.39H9.4c-1.34 0-2.31-.83-2.31-2.05 0-1.05.68-1.76 1.74-2.02 1.1-.27 2.45-.05 3.75.02.12.01.24.01.36.01 1.25 0 2.46-.36 2.76-1.25.22-.65-.33-1.2-.99-1.2-.7 0-1.22.38-1.46.99-.22.58-.72 1.34-1.92 1.34-.6 0-1.08-.18-1.42-.48-.18-.16-.35-.33-.51-.51-.05-.06-.11-.12-.17-.18-.1-.12-.16-.2-.16-.28 0-.21.22-.4.48-.4h6.43c.96 0 1.7-.63 1.7-1.48 0-1.15-1.1-1.84-2.65-1.84-1.32 0-2.27.31-2.96.51-.43.12-.85.29-1.26.49-.3.14-.59.29-.87.44C9.5 8.314 9.49 8.31 9.48 8.31c-.3.16-.6.31-.89.47-.24.13-.48.26-.71.39-.55.31-.96.52-1.02.55-.42.22-.67.34-.67.41 0 .19.46.42.98.42h.01c.06 0 .12 0 .18-.01.3-.06.63-.19.98-.36.22-.11.44-.22.66-.34.02-.01.04-.02.06-.03z"/></svg>
);


// Dummy data for invoices
const initialInvoicesData = [
  { id: "FACT-001", date: "2024-06-15", amount: "$1,250.00", status: "Pagada", service: "Planificación Patrimonial", contractId: "SERV-001", items: [{description: "Consultoría Financiera Q2", qty: 1, price: 1250}] },
  { id: "FACT-002", date: "2024-07-01", amount: "$850.50", status: "Pendiente", service: "Blindaje Patrimonial", contractId: "SERV-002", items: [{description: "Análisis de Portafolio", qty: 1, price: 850.50}] },
  { id: "FACT-003", date: "2024-05-20", amount: "$2,300.00", status: "Pagada", service: "Asesoría para el Retiro", contractId: "SERV-003", items: [{description: "Plan de Retiro", qty: 1, price: 2000}, {description: "Seguro Patrimonial", qty: 1, price: 300}] },
  { id: "FACT-004", date: "2024-04-10", amount: "$500.00", status: "Vencida", service: "Planificación Educativa", contractId: "SERV-004", items: [{description: "Comisión de Gestión", qty: 1, price: 500}] },
];

const deductiblePlansData = [
    { id: "POL-PPR-01", type: "Plan Personal de Retiro", policy: "PPR-12345", annualPremium: "$36,000.00", invoiceId: "FACT-PPR-2023", interestGenerated: 6480, isrRetained: 1296 },
    { id: "POL-GMM-01", type: "Gastos Médicos Mayores", policy: "GMM-67890", annualPremium: "$25,000.00", invoiceId: "FACT-GMM-2023", interestGenerated: 0, isrRetained: 0 },
];

type Invoice = typeof initialInvoicesData[0];

export default function BillingPage() {
  const { toast } = useToast();
  const [user] = useAuthState(auth);
  const [invoicesData, setInvoicesData] = useState(initialInvoicesData);

  const handleDownload = (invoice: Invoice) => {
    if (!user) {
         toast({
            variant: "destructive",
            title: "Error de Autenticación",
            description: "Debes iniciar sesión para descargar facturas.",
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
        doc.text("Soluciones Financieras Integrales", 20, 26);

        // Invoice Title
        doc.setFontSize(28);
        doc.text("FACTURA", pageWidth - 20, 30, { align: 'right' });
        doc.setFontSize(12);
        doc.text(invoice.id, pageWidth - 20, 36, { align: 'right' });
        
        doc.setLineWidth(0.5);
        doc.line(20, 45, pageWidth - 20, 45);

        // Billing Info
        doc.setFont('helvetica', 'bold');
        doc.text("Facturar a:", 20, 55);
        doc.setFont('helvetica', 'normal');
        doc.text(user.displayName || 'N/A', 20, 61);
        doc.text(user.email || 'N/A', 20, 67);

        doc.setFont('helvetica', 'bold');
        doc.text("Fecha:", pageWidth - 60, 55);
        doc.setFont('helvetica', 'normal');
        doc.text(invoice.date, pageWidth - 20, 55, { align: 'right' });
        
        doc.setFont('helvetica', 'bold');
        doc.text("Estado:", pageWidth - 60, 61);
        const statusColor = invoice.status === 'Pagada' ? [0, 128, 0] : invoice.status === 'Pendiente' ? [255, 165, 0] : [255, 0, 0];
        doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
        doc.text(invoice.status, pageWidth - 20, 61, { align: 'right' });
        doc.setTextColor(0, 0, 0);


        // Invoice Table
        const tableBody = invoice.items.map(item => [item.description, item.qty, `$${item.price.toFixed(2)}`, `$${(item.qty * item.price).toFixed(2)}`]);
        const subtotal = invoice.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
        const tax = subtotal * 0.16; // 16% IVA example
        const total = subtotal + tax;
                tableBody.push(
            ['', '', 'Subtotal', `$${subtotal.toFixed(2)}`],
            ['', '', 'IVA (16%)', `$${tax.toFixed(2)}`],
            ['', '', 'Total', `$${total.toFixed(2)}`]
        );

        autoTable(doc, {
            head: [['Descripción', 'Cantidad', 'Precio Unitario', 'Total']],
            body: tableBody,
            startY: 80,
            theme: 'striped',
            headStyles: { fillColor: [38, 70, 83] },
            didDrawCell: (data) => {
                // Negrita SOLO en la última fila (Total)
                if (
                    data.section === 'body' &&
                    data.row.index === tableBody.length - 1
                ) {
                    data.cell.styles.fontStyle = 'bold';
                }
                // Alinea a la derecha los montos de las filas de totales
                if (
                    data.section === 'body' &&
                    data.column.index >= 2 &&
                    data.row.index >= invoice.items.length
                ) {
                    data.cell.styles.halign = 'right';
                }
            }
        });

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("Gracias por su preferencia.", pageWidth / 2, doc.internal.pageSize.getHeight() - 20, { align: 'center' });
        doc.text("AFORTU | www.afortu.com.mx | contacto@afortu.com.mx", pageWidth / 2, doc.internal.pageSize.getHeight() - 15, { align: 'center' });

        doc.save(`Factura_${invoice.id}.pdf`);
         toast({
          title: "Descarga Iniciada",
          description: `Se está descargando la factura ${invoice.id}.pdf.`,
        });

    } catch (error) {
        console.error("Error al generar PDF de factura:", error);
         toast({
            variant: "destructive",
            title: "Error de Descarga",
            description: "No se pudo generar el documento PDF. Inténtalo de nuevo.",
        });
    }
  };

  const handleDownloadTaxStatement = () => {
    if (!user) {
        toast({ variant: "destructive", title: "Error de Autenticación", description: "Debes iniciar sesión para descargar constancias." });
        return;
    }
    try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const today = new Date();

        // Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.text("AFORTU", 20, 20);
        doc.setFontSize(10);
        doc.text("Soluciones Financieras Integrales", 20, 26);
        doc.text("RFC: AFO123456XYZ", pageWidth - 20, 20, { align: 'right' });
        doc.text("Av. Siempre Viva 742", pageWidth - 20, 26, { align: 'right' });


        // Title
        doc.setFontSize(16);
        doc.text("CONSTANCIA DE RETENCIÓN DE IMPUESTOS", pageWidth / 2, 45, { align: 'center' });
        doc.setFontSize(12);
        doc.text(`Ejercicio Fiscal 2023`, pageWidth / 2, 51, { align: 'center' });
        
        doc.setLineWidth(0.5);
        doc.line(20, 60, pageWidth - 20, 60);

        // Client Info
        doc.setFont('helvetica', 'bold');
        doc.text("Datos del Contribuyente:", 20, 70);
        doc.setFont('helvetica', 'normal');
        doc.text(`Nombre: ${user.displayName || 'N/A'}`, 20, 76);
        doc.text(`Email: ${user.email || 'N/A'}`, 20, 82);
        doc.text(`Fecha de Emisión: ${today.toLocaleDateString('es-MX')}`, pageWidth - 20, 70, { align: 'right' });


        // Summary Table
        const head = [['Póliza', 'Plan Deducible', 'Intereses Reales Generados', 'ISR Retenido (20%)', 'Monto Neto Recibido']];
        const body = deductiblePlansData.filter(p => p.interestGenerated > 0).map(p => {
             const netAmount = p.interestGenerated - p.isrRetained;
             return [
                 p.policy,
                 p.type,
                 `$${p.interestGenerated.toFixed(2)}`,
                 `$${p.isrRetained.toFixed(2)}`,
                 `$${netAmount.toFixed(2)}`,
             ]
        });

        const totalInterest = deductiblePlansData.reduce((sum, p) => sum + p.interestGenerated, 0);
        const totalISR = deductiblePlansData.reduce((sum, p) => sum + p.isrRetained, 0);
        const totalNet = totalInterest - totalISR;
        
        const foot = [[
            { content: 'Totales', colSpan: 2, styles: { fontStyle: 'bold' as const, halign: 'right' as const } },
            `$${totalInterest.toFixed(2)}`,
            `$${totalISR.toFixed(2)}`,
            `$${totalNet.toFixed(2)}`,
        ]];

        autoTable(doc, {
            head,
            body,
            foot,
            startY: 95,
            theme: 'striped',
            headStyles: { fillColor: [38, 70, 83] },
            footStyles: { fontStyle: 'bold', fillColor: [230, 230, 230], textColor: [0,0,0] },
            didDrawCell: (data) => {
                if (data.section === 'body' || data.section === 'foot') {
                    if(data.column.index >= 2) {
                        data.cell.styles.halign = 'right';
                    }
                }
            }
        });

        // Legal Text & Footer
        const finalY = (doc as any).lastAutoTable.finalY + 15;
        doc.setFontSize(8);
        doc.setTextColor(100);
        const legalText = "Esta constancia se emite de conformidad con las disposiciones fiscales vigentes en los Estados Unidos Mexicanos. El contribuyente es responsable de la correcta declaración de estos ingresos e impuestos ante el Servicio de Administración Tributaria (SAT). Este documento es una representación informativa de las retenciones efectuadas.";
        doc.text(legalText, 20, finalY, { maxWidth: pageWidth - 40, align: 'justify' });
        
        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.text("_________________________", pageWidth / 2, finalY + 40, { align: 'center' });
        doc.text("Representante Legal de AFORTU", pageWidth / 2, finalY + 45, { align: 'center' });
        

        doc.save(`Constancia_Fiscal_2023_${user.uid}.pdf`);
        toast({ title: "Descarga Iniciada", description: "Se está descargando tu constancia fiscal de 2023." });
    } catch (error) {
        console.error("Error al generar PDF de constancia:", error);
        toast({ variant: "destructive", title: "Error de Descarga", description: "No se pudo generar el documento PDF." });
    }
  };

  const handleSetupBilling = async (invoiceId: string) => {
    try {
      const response = await axios.post('/api/paypal/setup-billing', { invoiceId });
      const { approvalUrl } = response.data;
      if (approvalUrl) {
          window.location.href = approvalUrl;
      }
      setInvoicesData(invoicesData.map(inv => 
        inv.id === invoiceId ? { ...inv, status: 'Domiciliada' } : inv
      ));
      toast({
        title: "Redirigiendo a PayPal...",
        description: "Completa la autorización para configurar el pago recurrente.",
      });
    } catch (error) {
      console.error("Error al configurar la domiciliación:", error);
      toast({
        variant: "destructive",
        title: "Error en Domiciliación",
        description: "No se pudo configurar el pago recurrente. Inténtalo de nuevo.",
      });
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case "Pagada":
            return "bg-green-100 text-green-800 border-green-200";
        case "Pendiente":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "Vencida":
            return "bg-red-100 text-red-800 border-red-200";
        case "Domiciliada":
            return "bg-blue-100 text-blue-800 border-blue-200";
        default:
            return "";
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight font-headline">Facturas y Fiscal</h1>
      
       <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="services"><FileText className="mr-2"/>Facturación de Servicios</TabsTrigger>
                <TabsTrigger value="deductible"><Shield className="mr-2"/>Planes Deducibles</TabsTrigger>
                <TabsTrigger value="tax"><FileDown className="mr-2"/>Constancias Fiscales</TabsTrigger>
            </TabsList>
            <TabsContent value="services">
                <Card>
                    <CardHeader>
                    <CardTitle>Historial de Facturación de Servicios</CardTitle>
                    <CardDescription>
                        Aquí podrás ver tus facturas por servicios profesionales contratados.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Factura ID</TableHead>
                                    <TableHead>Servicio Contratado</TableHead>
                                    <TableHead>Contrato ID</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Monto</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoicesData.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-medium">{invoice.id}</TableCell>
                                        <TableCell>{invoice.service}</TableCell>
                                        <TableCell>
                                           <Button variant="link" asChild className="p-0 h-auto">
                                                <Link href="/contracts">{invoice.contractId}</Link>
                                           </Button>
                                        </TableCell>
                                        <TableCell>{invoice.date}</TableCell>
                                        <TableCell>{invoice.amount}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={getStatusBadgeClass(invoice.status)}>
                                                {invoice.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="icon" onClick={() => handleDownload(invoice)}>
                                                <Download className="h-4 w-4" />
                                                <span className="sr-only">Descargar</span>
                                            </Button>
                                            {(invoice.status === 'Pendiente' || invoice.status === 'Vencida') && (
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="h-8">
                                                            <PayPalIcon className="mr-2 h-4 w-4" />
                                                            Domiciliar
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Domiciliar Pago con PayPal</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Estás a punto de configurar un pago recurrente para la factura {invoice.id} por {invoice.amount}.
                                                                Se te redirigirá a PayPal para autorizar. ¿Deseas continuar?
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleSetupBilling(invoice.id)}>
                                                                Continuar a PayPal
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="deductible">
                 <Card>
                    <CardHeader>
                        <CardTitle>Facturación de Planes Deducibles</CardTitle>
                        <CardDescription>
                            Gestiona las facturas de tus planes deducibles como PPR y Gastos Médicos Mayores.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tipo de Plan</TableHead>
                                    <TableHead>Póliza</TableHead>
                                    <TableHead>Prima Anual</TableHead>
                                    <TableHead>Factura</TableHead>
                                    <TableHead className="text-right">Acción</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {deductiblePlansData.map((plan) => (
                                    <TableRow key={plan.id}>
                                        <TableCell className="font-medium">{plan.type}</TableCell>
                                        <TableCell>{plan.policy}</TableCell>
                                        <TableCell>{plan.annualPremium}</TableCell>
                                        <TableCell>{plan.invoiceId}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => alert('Descargando factura del plan deducible.')}>
                                                <Download className="h-4 w-4" />
                                                <span className="sr-only">Descargar</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                 </Card>
            </TabsContent>
            <TabsContent value="tax">
                <Card>
                    <CardHeader>
                        <CardTitle>Constancias Fiscales</CardTitle>
                        <CardDescription>
                           Descarga tus constancias de retención y otros documentos fiscales relevantes para tu declaración anual.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="border p-4 rounded-lg flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">Constancia de Retención de Impuestos (Ejercicio 2023)</h3>
                                <p className="text-sm text-muted-foreground">Documento oficial para tu declaración de impuestos.</p>
                            </div>
                            <Button onClick={handleDownloadTaxStatement}>
                                <Download className="mr-2"/>
                                Descargar Constancia
                            </Button>
                       </div>
                    </CardContent>
                </Card>
            </TabsContent>
       </Tabs>
    </div>
  );
}

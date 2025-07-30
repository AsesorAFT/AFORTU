// src/app/dashboard/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { YearChart } from '@/components/dashboard/year-chart';
import { PortfolioPieChart } from '@/components/dashboard/portfolio-pie-chart';
import { PortfolioTable } from '@/components/dashboard/portfolio-table';
import { Download, MessageCircle, Bot } from 'lucide-react';
import { ChatAsesor } from '@/components/dashboard/chat-asesor';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import axios from 'axios';

interface PortfolioItem {
  id: string;
  name: string;
  symbol: string;
  shares: number;
  purchasePrice: number;
  purchaseDate: string;
  currentPrice?: number;
}

interface Transaction {
  description: string;
  type: string;
  amount: string;
  status: string;
  category: 'inversion' | 'servicio';
}


const initialPortfolio: PortfolioItem[] = [
    { id: '1', name: 'NVIDIA Inc.', symbol: 'NVDA', shares: 10, purchasePrice: 95.50, purchaseDate: '2024-01-15' },
    { id: '2', name: 'Tesla', symbol: 'TSLA', shares: 15, purchasePrice: 160.00, purchaseDate: '2023-08-20' },
    { id: '3', name: 'Apple Inc.', symbol: 'AAPL', shares: 50, purchasePrice: 150.75, purchaseDate: '2023-05-10' },
    { id: '4', name: 'Microsoft', symbol: 'MSFT', shares: 25, purchasePrice: 380.34, purchaseDate: '2024-03-01' },
];


export default function Dashboard() {
  const [user] = useAuthState(auth);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(initialPortfolio);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/transactions');
            setTransactions(response.data);
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
        }
    };
    fetchTransactions();
  }, []);

  const totalPortfolioValue = portfolio.reduce((acc, item) => acc + (item.currentPrice || item.purchasePrice) * item.shares, 0);
  const totalPurchaseValue = portfolio.reduce((acc, item) => acc + item.purchasePrice * item.shares, 0);
  const totalGainLoss = totalPortfolioValue - totalPurchaseValue;
  
  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`Estado de Cuenta Patrimonial - ${user?.displayName || 'Cliente'}`, 14, 22);
    doc.setFontSize(11);
    doc.text("Fecha: " + new Date().toLocaleDateString(), 14, 30);
    
    doc.setFontSize(14);
    doc.text("Resumen General", 14, 45);
    const summaryData = [
        ["Inversión Total", `$${(1050000 + totalPortfolioValue).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`],
        ["Rendimiento Total", `$${(150250 + totalGainLoss).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`],
    ];
    (doc as any).autoTable({
        startY: 50,
        head: [['Concepto', 'Valor']],
        body: summaryData,
        theme: 'striped',
        headStyles: { fillColor: [75, 0, 130] },
    });


    doc.addPage();
    doc.setFontSize(14);
    doc.text("Inversión a Tasa Fija (Contrato ID: INV-TF-01)", 14, 22);
     (doc as any).autoTable({
        startY: 30,
        head: [['Capital Inicial', 'Rendimiento Generado', 'Plazo', 'Vencimiento']],
        body: [
            ['$1,050,000.00', '$150,250.00', '24 meses', '29 de julio de 2026']
        ],
        theme: 'grid',
    });


    doc.setFontSize(14);
    doc.text("Asset Management (Contrato ID: INV-AM-01)", 14, (doc as any).lastAutoTable.finalY + 15);
    const portfolioBody = portfolio.map(item => [
      item.name,
      item.shares,
      `$${item.purchasePrice.toFixed(2)}`,
      `$${(item.currentPrice || item.purchasePrice).toFixed(2)}`,
      `$${((item.currentPrice || item.purchasePrice) * item.shares).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
    ]);
    (doc as any).autoTable({
        startY: (doc as any).lastAutoTable.finalY + 20,
        head: [['Activo', 'Títulos', 'Precio Compra', 'Precio Actual', 'Valor Mercado']],
        body: portfolioBody,
        theme: 'striped',
        headStyles: { fillColor: [75, 0, 130] },
    });

    doc.save("estado-de-cuenta.pdf");
  };

  const portfolioPieData = portfolio.map(item => ({
      name: item.symbol,
      value: (item.currentPrice || item.purchasePrice) * item.shares,
  }));
  
  const investmentTransactions = transactions.filter(t => t.category === 'inversion');
  const serviceTransactions = transactions.filter(t => t.category === 'servicio');


  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Hola, {user?.displayName || 'Cliente'}</h2>
            <p className="text-muted-foreground">Bienvenido a tu centro de gestión patrimonial.</p>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <ChatAsesor />
          <Button onClick={generatePDF}><Download className="mr-2 h-4 w-4" /> Estado de Cuenta</Button>
           <a href="https://wa.me/5215512345678?text=Hola,%20necesito%20solicitar%20un%20CFDI." target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">
                <MessageCircle className="mr-2 h-4 w-4" /> Solicitar CFDI
              </Button>
            </a>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Patrimonio Total" value={`$${(1050000 + totalPortfolioValue).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} iconName="dollarSign" description="Tasa Fija + Asset Management" />
        <StatCard title="Rendimiento Total" value={`$${(150250 + totalGainLoss).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} iconName="trendingUp" trend={totalGainLoss >= 0 ? 'up' : 'down'} description="Ganancia/pérdida total" />
        <StatCard title="Tasa Fija" value="$1,211,187.69" iconName="banknote" description="Valor actual del contrato" />
        <StatCard 
            title="Asset Management" 
            value={`$${totalPurchaseValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} 
            iconName="briefcase" 
            description="Capital Invertido"
        />
      </div>

       <Card>
          <CardHeader>
            <CardTitle>Inversión a Tasa Fija</CardTitle>
             <CardDescription>
                Contrato ID: INV-TF-01 | Interés anual: 19.23% | Plazo: 24 meses.
             </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2 flex flex-col gap-4">
                 <h3 className="text-lg font-semibold">Resumen de Inversión</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                    <StatCard title="Capital Inicial" value="$1,050,000" iconName="dollarSign" description={null} />
                    <StatCard title="Rendimiento Proyectado" value="$350,250" iconName="trendingUp" description={null} />
                    <StatCard title="Vencimiento" value="29 jul, 2026" iconName="calendar" description={null} />
                 </div>
            </div>
            <div className="lg:col-span-3 h-[300px]">
                <h3 className="text-lg font-semibold mb-2">Evolución del Capital</h3>
                 <YearChart 
                    data={[
                        { time: '2025-02-01', value: 1065025 },
                        { time: '2025-04-01', value: 1115025 },
                        { time: '2025-06-01', value: 1211187.68824685 },
                        { time: '2025-08-01', value: 1165025 },
                        { time: '2025-10-01', value: 1195025 },
                        { time: '2025-12-01', value: 1225025 },
                    ]}
                 />
            </div>
          </CardContent>
        </Card>
      
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
            <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>Asset Management</CardTitle>
                <CardDescription>Contrato ID: INV-AM-01 | Portafolio de Renta Variable.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <PortfolioTable portfolio={portfolio} setPortfolio={setPortfolio} />
            </CardContent>
            </Card>
            <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Distribución de Activos</CardTitle>
                <CardDescription>Composición de tu portafolio de Asset Management.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <PortfolioPieChart data={portfolioPieData} />
            </CardContent>
            </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
             <RecentTransactions 
                transactions={investmentTransactions}
                title="Movimientos de Inversión"
                description="Aportaciones, retiros y vencimientos."
            />
             <RecentTransactions 
                transactions={serviceTransactions}
                title="Servicios y Comisiones"
                description="Pagos de asesoría y otros servicios."
            />
        </div>
    </div>
  );
}

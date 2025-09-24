'use server';

import { auth, db } from "@/lib/firebase";
import { getDocs, collection, query } from "firebase/firestore";
import { headers } from "next/headers";

type PortfolioItem = {
    name: string;
    symbol: string;
    shares: number;
    purchasePrice: number;
};

// This is a placeholder for a real user resolution mechanism.
// In a real app, you would resolve the user from the session/token.
async function getCurrentUserId() {
    // For this example, we'll assume a static user ID.
    // In a real app, you'd get this from the authentication state.
    // E.g., const user = await auth.currentUser; return user.uid;
    
    // SECURITY FIX: Proper async handling for headers
    const headersList = await headers();
    const referer = headersList.get("referer");
    
    // A simple heuristic to check if we're in a user-specific context
    if (referer?.includes('/dashboard') || referer?.includes('/analysis')) {
        return "sample-user-id"; 
    }
    // In a real app, you might throw an error or handle anonymous users.
    return "sample-user-id"; 
}


export async function fetchUserPortfolio(): Promise<string> {
    const userId = await getCurrentUserId();
    if (!userId) {
        throw new Error("User not authenticated.");
    }

    const portfolioCollectionRef = collection(db, 'users', userId, 'portfolio');
    const portfolioSnapshot = await getDocs(query(portfolioCollectionRef));

    if (portfolioSnapshot.empty) {
        return "El usuario no tiene activos en su portafolio de Asset Management.";
    }

    const portfolioItems = portfolioSnapshot.docs.map(doc => doc.data() as PortfolioItem);
    const portfolioDescription = portfolioItems.map(item => 
        `${item.shares} acciones de ${item.name} (${item.symbol}) compradas a $${item.purchasePrice.toFixed(2)}`
    ).join(', ');

    return portfolioDescription;
}

export async function fetchBusinessData(): Promise<string> {
     const userId = await getCurrentUserId();
     if (!userId) {
        throw new Error("User not authenticated.");
    }
    // In a real app, you would fetch this from Firestore.
    // For now, returning a placeholder.
    return "Ingresos trimestrales: Q1 $50k, Q2 $55k, Q3 $60k. Gastos: 60% de los ingresos. Clientes: 150 activos.";
}

export async function fetchBusinessGoals(): Promise<string> {
    const userId = await getCurrentUserId();
     if (!userId) {
        throw new Error("User not authenticated.");
    }
    // In a real app, you would fetch this from Firestore.
    // For now, returning a placeholder.
    return "Expandir a una nueva ciudad y aumentar la base de clientes en un 20% para el próximo año.";
}


// Dummy data for new functions
const invoicesData = [
  { id: "FACT-001", date: "2024-06-15", amount: "$1,250.00", status: "Pagada" },
  { id: "FACT-002", date: "2024-07-01", amount: "$850.50", status: "Pendiente" },
];

const serviceContractsData = [
  { id: "SERV-001", service: "Planificación Patrimonial", date: "2024-01-15", status: "Liquidado" },
  { id: "SERV-002", service: "Blindaje Patrimonial", date: "2024-03-01", status: "Pago Intermedio" },
];

const investmentPlansData = [
    { id: 1, title: 'Plan de Retiro 2040', monthlyContribution: 5000, termYears: 20, currentAmount: 450000 },
    { id: 2, title: 'Fondo Universitario', monthlyContribution: 2500, termYears: 15, currentAmount: 120000 },
];

const accountLogData = [
    { date: "2024-07-29", activity: "Revisión trimestral de portafolio", advisor: "Asesor AFT", details: "Se ajustó la ponderación en acciones tecnológicas." },
    { date: "2024-07-15", activity: "Llamada de seguimiento", advisor: "Asesor AFT", details: "Se discutieron las proyecciones económicas para el Q3." },
];

export async function fetchInvoices(): Promise<string> {
    return `El usuario tiene ${invoicesData.length} facturas. Detalles: ${invoicesData.map(i => `${i.id} por ${i.amount} con estado ${i.status}`).join('; ')}.`;
}

export async function fetchContracts(): Promise<string> {
    return `El usuario tiene ${serviceContractsData.length} contratos de servicio. Detalles: ${serviceContractsData.map(c => `${c.id} para ${c.service} con estado ${c.status}`).join('; ')}.`;
}

export async function fetchInvestmentPlans(): Promise<string> {
    return `El usuario tiene ${investmentPlansData.length} planes de inversión. Detalles: ${investmentPlansData.map(p => `${p.title} con aportación de $${p.monthlyContribution}/mes y un saldo actual de $${p.currentAmount}`).join('; ')}.`;
}

export async function fetchAccountLog(): Promise<string> {
    return `El usuario tiene ${accountLogData.length} registros en su bitácora. El más reciente es: ${accountLogData[0].activity} el ${accountLogData[0].date} por ${accountLogData[0].advisor}.`;
}

'use server';

import { getAdminAuth, getAdminFirestore } from '@/lib/firebase-admin';
import { headers } from 'next/headers';

type PortfolioItem = {
  id: string;
  name: string;
  symbol: string;
  shares: number;
  purchasePrice: number;
  purchaseDate?: any;
};

type BusinessData = {
  quarterlyRevenue: Record<string, number>;
  expenses: number;
  activeClients: number;
};

type BusinessGoals = {
  goals: string[];
  targetDate: string;
};

/**
 * Get current user ID from authenticated session
 * This should be called from a server context with proper authentication
 */
async function getCurrentUserId(): Promise<string | null> {
  try {
    // In a real app, you would get this from the session/JWT token
    // For now, we'll try to get it from the authorization header
    const headersList = headers();
    const authHeader = headersList.get('authorization');
    
    if (!authHeader) {
      throw new Error('No authorization header found');
    }

    const token = authHeader.replace('Bearer ', '');
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.error('Error verifying token:', error);
    // For development purposes, return a sample user ID if no auth
    // In production, this should throw an error
    return process.env.NODE_ENV === 'development' ? 'sample-user-id' : null;
  }
}

export async function fetchUserPortfolio(): Promise<string> {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    throw new Error("User not authenticated.");
  }

  try {
    const db = getAdminFirestore();
    const portfolioSnapshot = await db
      .collection('users')
      .doc(userId)
      .collection('portfolio')
      .get();

    if (portfolioSnapshot.empty) {
      return "El usuario no tiene activos en su portafolio de Asset Management.";
    }

    const portfolioItems = portfolioSnapshot.docs.map(doc => {
      const data = doc.data() as Omit<PortfolioItem, 'id'>;
      return {
        id: doc.id,
        ...data
      } as PortfolioItem;
    });

    const portfolioDescription = portfolioItems.map(item => 
      `${item.shares} acciones de ${item.name} (${item.symbol}) compradas a $${item.purchasePrice.toFixed(2)}`
    ).join(', ');

    return portfolioDescription;
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    throw new Error('Failed to fetch portfolio data');
  }
}

export async function fetchBusinessData(): Promise<string> {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    throw new Error("User not authenticated.");
  }

  try {
    const db = getAdminFirestore();
    const businessDoc = await db
      .collection('users')
      .doc(userId)
      .collection('business')
      .doc('data')
      .get();

    if (!businessDoc.exists) {
      // Return fallback data if no business data exists
      return "Ingresos trimestrales: Q1 $50k, Q2 $55k, Q3 $60k. Gastos: 60% de los ingresos. Clientes: 150 activos.";
    }

    const businessData = businessDoc.data() as BusinessData;
    const revenue = businessData.quarterlyRevenue || {};
    const revenueStr = Object.entries(revenue)
      .map(([quarter, amount]) => `${quarter} $${amount}k`)
      .join(', ');
    
    return `Ingresos trimestrales: ${revenueStr}. Gastos: ${businessData.expenses}% de los ingresos. Clientes: ${businessData.activeClients} activos.`;
  } catch (error) {
    console.error('Error fetching business data:', error);
    throw new Error('Failed to fetch business data');
  }
}

export async function fetchBusinessGoals(): Promise<string> {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    throw new Error("User not authenticated.");
  }

  try {
    const db = getAdminFirestore();
    const goalsDoc = await db
      .collection('users')
      .doc(userId)
      .collection('business')
      .doc('goals')
      .get();

    if (!goalsDoc.exists) {
      // Return fallback data if no goals exist
      return "Expandir a una nueva ciudad y aumentar la base de clientes en un 20% para el próximo año.";
    }

    const goalsData = goalsDoc.data() as BusinessGoals;
    return goalsData.goals.join('. ') + ` (objetivo para ${goalsData.targetDate}).`;
  } catch (error) {
    console.error('Error fetching business goals:', error);
    throw new Error('Failed to fetch business goals');
  }
}

export async function fetchInvoices(): Promise<string> {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    throw new Error("User not authenticated.");
  }

  try {
    const db = getAdminFirestore();
    const invoicesSnapshot = await db
      .collection('users')
      .doc(userId)
      .collection('invoices')
      .orderBy('date', 'desc')
      .limit(10)
      .get();

    if (invoicesSnapshot.empty) {
      return "El usuario no tiene facturas registradas.";
    }

    const invoices = invoicesSnapshot.docs.map(doc => doc.data());
    return `El usuario tiene ${invoices.length} facturas. Detalles: ${invoices.map(i => 
      `${i.id} por ${i.amount} con estado ${i.status}`
    ).join('; ')}.`;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw new Error('Failed to fetch invoices');
  }
}

export async function fetchContracts(): Promise<string> {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    throw new Error("User not authenticated.");
  }

  try {
    const db = getAdminFirestore();
    const contractsSnapshot = await db
      .collection('users')
      .doc(userId)
      .collection('contracts')
      .orderBy('date', 'desc')
      .limit(10)
      .get();

    if (contractsSnapshot.empty) {
      return "El usuario no tiene contratos de servicio registrados.";
    }

    const contracts = contractsSnapshot.docs.map(doc => doc.data());
    return `El usuario tiene ${contracts.length} contratos de servicio. Detalles: ${contracts.map(c => 
      `${c.id} para ${c.service} con estado ${c.status}`
    ).join('; ')}.`;
  } catch (error) {
    console.error('Error fetching contracts:', error);
    throw new Error('Failed to fetch contracts');
  }
}

export async function fetchInvestmentPlans(): Promise<string> {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    throw new Error("User not authenticated.");
  }

  try {
    const db = getAdminFirestore();
    const plansSnapshot = await db
      .collection('users')
      .doc(userId)
      .collection('investment-plans')
      .get();

    if (plansSnapshot.empty) {
      return "El usuario no tiene planes de inversión activos.";
    }

    const plans = plansSnapshot.docs.map(doc => doc.data());
    return `El usuario tiene ${plans.length} planes de inversión. Detalles: ${plans.map(p => 
      `${p.title} con aportación de $${p.monthlyContribution}/mes y un saldo actual de $${p.currentAmount}`
    ).join('; ')}.`;
  } catch (error) {
    console.error('Error fetching investment plans:', error);
    throw new Error('Failed to fetch investment plans');
  }
}

export async function fetchAccountLog(): Promise<string> {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    throw new Error("User not authenticated.");
  }

  try {
    const db = getAdminFirestore();
    const logSnapshot = await db
      .collection('users')
      .doc(userId)
      .collection('account-log')
      .orderBy('date', 'desc')
      .limit(5)
      .get();

    if (logSnapshot.empty) {
      return "El usuario no tiene registros en su bitácora.";
    }

    const logs = logSnapshot.docs.map(doc => doc.data());
    const latestLog = logs[0];
    
    return `El usuario tiene ${logs.length} registros en su bitácora. El más reciente es: ${latestLog.activity} el ${latestLog.date} por ${latestLog.advisor}.`;
  } catch (error) {
    console.error('Error fetching account log:', error);
    throw new Error('Failed to fetch account log');
  }
}

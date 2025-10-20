/**
 * Hook para gestionar la configuración de AFORTU desde Firestore
 * Centraliza toda la lógica de negocio y cálculos de la aplicación
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CAVSettings, CAVContract, CAVPortfolioSummary, DEFAULT_CAV_SETTINGS } from '@/types/cav';

interface UseAfortuSettingsReturn {
  // CAV Data
  cavContracts: CAVContract[];
  cavPortfolio: CAVPortfolioSummary;
  investmentPlans: CAVSettings['investmentPlans'];
  
  // Additional properties for asset management page
  settings: CAVSettings;
  enrichedFixedContracts: CAVContract[];
  enrichedContributionPlans: CAVSettings['investmentPlans'];
  portfolioSummary: CAVPortfolioSummary;
  isLoaded: boolean;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addContract: (contract: Omit<CAVContract, 'id' | 'daysRemaining' | 'returns'>) => Promise<void>;
  updateContract: (id: string, updates: Partial<CAVContract>) => Promise<void>;
  deleteContract: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
  
  // Calculations
  calculateReturns: (amount: number, apr: number, days: number) => number;
  calculateDaysRemaining: (endDate: string) => number;
  recalculatePortfolio: () => CAVPortfolioSummary;
}

export function useAfortuSettings(userId?: string): UseAfortuSettingsReturn {
  const [cavSettings, setCavSettings] = useState<CAVSettings>(DEFAULT_CAV_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ID del documento en Firestore (usa userId si está disponible, sino usa 'demo')
  const settingsDocId = userId || 'demo';

  /**
   * Calcula los rendimientos de un contrato
   */
  const calculateReturns = useCallback((amount: number, apr: number, days: number): number => {
    // Fórmula: Capital * (APR / 100) * (días / 365)
    return amount * (apr / 100) * (days / 365);
  }, []);

  /**
   * Calcula los días restantes hasta el vencimiento
   */
  const calculateDaysRemaining = useCallback((endDate: string): number => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, []);

  /**
   * Recalcula el resumen del portfolio
   */
  const recalculatePortfolio = useCallback((): CAVPortfolioSummary => {
    const activeContracts = cavSettings.contracts.filter(c => c.status === 'active');
    const completedContracts = cavSettings.contracts.filter(c => c.status === 'completed');
    
    const totalInvested = cavSettings.contracts.reduce((sum, c) => sum + c.amount, 0);
    const totalReturns = cavSettings.contracts.reduce((sum, c) => sum + c.returns, 0);
    const avgAPR = activeContracts.length > 0
      ? activeContracts.reduce((sum, c) => sum + c.apr, 0) / activeContracts.length
      : 0;
    
    const nextMaturity = activeContracts.length > 0
      ? Math.min(...activeContracts.map(c => c.daysRemaining))
      : 0;

    return {
      totalInvested,
      totalReturns,
      avgAPR: Math.round(avgAPR * 100) / 100,
      activeContracts: activeContracts.length,
      completedContracts: completedContracts.length,
      nextMaturity: Math.max(0, nextMaturity),
    };
  }, [cavSettings.contracts]);

  /**
   * Carga los datos desde Firestore
   */
  const loadSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const docRef = doc(db, 'afortu_settings', settingsDocId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as CAVSettings;
        
        // Recalcular días restantes y rendimientos con datos actuales
        const updatedContracts = data.contracts.map(contract => {
          const daysRemaining = calculateDaysRemaining(contract.endDate);
          const totalDays = Math.ceil(
            (new Date(contract.endDate).getTime() - new Date(contract.startDate).getTime()) 
            / (1000 * 60 * 60 * 24)
          );
          const returns = calculateReturns(contract.amount, contract.apr, totalDays);
          
          return {
            ...contract,
            daysRemaining,
            returns,
            status: daysRemaining < 0 ? 'completed' as const : contract.status,
          };
        });

        setCavSettings({
          ...data,
          contracts: updatedContracts,
        });
      } else {
        // Documento no existe, crear uno con datos por defecto
        await setDoc(docRef, DEFAULT_CAV_SETTINGS);
        setCavSettings(DEFAULT_CAV_SETTINGS);
      }
    } catch (err) {
      console.error('Error loading AFORTU settings:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      // Usar datos por defecto en caso de error
      setCavSettings(DEFAULT_CAV_SETTINGS);
    } finally {
      setIsLoading(false);
    }
  }, [settingsDocId, calculateDaysRemaining, calculateReturns]);

  /**
   * Añade un nuevo contrato
   */
  const addContract = useCallback(async (
    contractData: Omit<CAVContract, 'id' | 'daysRemaining' | 'returns'>
  ) => {
    try {
      const newId = `CAV-${String(cavSettings.contracts.length + 1).padStart(3, '0')}`;
      const totalDays = Math.ceil(
        (new Date(contractData.endDate).getTime() - new Date(contractData.startDate).getTime()) 
        / (1000 * 60 * 60 * 24)
      );
      
      const newContract: CAVContract = {
        ...contractData,
        id: newId,
        daysRemaining: calculateDaysRemaining(contractData.endDate),
        returns: calculateReturns(contractData.amount, contractData.apr, totalDays),
      };

      const updatedContracts = [...cavSettings.contracts, newContract];
      const updatedSettings = {
        ...cavSettings,
        contracts: updatedContracts,
        lastUpdated: new Date().toISOString(),
      };

      // Actualizar en Firestore
      const docRef = doc(db, 'afortu_settings', settingsDocId);
      await updateDoc(docRef, { 
        contracts: updatedContracts,
        lastUpdated: updatedSettings.lastUpdated,
      });

      // Actualizar estado local
      setCavSettings(updatedSettings);
    } catch (err) {
      console.error('Error adding contract:', err);
      setError(err instanceof Error ? err.message : 'Error al añadir contrato');
      throw err;
    }
  }, [cavSettings, settingsDocId, calculateDaysRemaining, calculateReturns]);

  /**
   * Actualiza un contrato existente
   */
  const updateContract = useCallback(async (id: string, updates: Partial<CAVContract>) => {
    try {
      const updatedContracts = cavSettings.contracts.map(contract => {
        if (contract.id === id) {
          const updated = { ...contract, ...updates };
          
          // Recalcular si se modificaron fechas o monto
          if (updates.endDate || updates.startDate || updates.amount || updates.apr) {
            const totalDays = Math.ceil(
              (new Date(updated.endDate).getTime() - new Date(updated.startDate).getTime()) 
              / (1000 * 60 * 60 * 24)
            );
            updated.daysRemaining = calculateDaysRemaining(updated.endDate);
            updated.returns = calculateReturns(updated.amount, updated.apr, totalDays);
          }
          
          return updated;
        }
        return contract;
      });

      const updatedSettings = {
        ...cavSettings,
        contracts: updatedContracts,
        lastUpdated: new Date().toISOString(),
      };

      // Actualizar en Firestore
      const docRef = doc(db, 'afortu_settings', settingsDocId);
      await updateDoc(docRef, {
        contracts: updatedContracts,
        lastUpdated: updatedSettings.lastUpdated,
      });

      // Actualizar estado local
      setCavSettings(updatedSettings);
    } catch (err) {
      console.error('Error updating contract:', err);
      setError(err instanceof Error ? err.message : 'Error al actualizar contrato');
      throw err;
    }
  }, [cavSettings, settingsDocId, calculateDaysRemaining, calculateReturns]);

  /**
   * Elimina un contrato
   */
  const deleteContract = useCallback(async (id: string) => {
    try {
      const updatedContracts = cavSettings.contracts.filter(c => c.id !== id);
      const updatedSettings = {
        ...cavSettings,
        contracts: updatedContracts,
        lastUpdated: new Date().toISOString(),
      };

      // Actualizar en Firestore
      const docRef = doc(db, 'afortu_settings', settingsDocId);
      await updateDoc(docRef, {
        contracts: updatedContracts,
        lastUpdated: updatedSettings.lastUpdated,
      });

      // Actualizar estado local
      setCavSettings(updatedSettings);
    } catch (err) {
      console.error('Error deleting contract:', err);
      setError(err instanceof Error ? err.message : 'Error al eliminar contrato');
      throw err;
    }
  }, [cavSettings, settingsDocId]);

  /**
   * Refresca los datos desde Firestore
   */
  const refreshData = useCallback(async () => {
    await loadSettings();
  }, [loadSettings]);

  // Cargar datos al montar el componente
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Escuchar cambios en tiempo real (opcional)
  useEffect(() => {
    const docRef = doc(db, 'afortu_settings', settingsDocId);
    
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data() as CAVSettings;
        
        // Recalcular días restantes
        const updatedContracts = data.contracts.map(contract => ({
          ...contract,
          daysRemaining: calculateDaysRemaining(contract.endDate),
        }));
        
        setCavSettings({
          ...data,
          contracts: updatedContracts,
        });
      }
    }, (err) => {
      console.error('Error listening to settings:', err);
    });

    return () => unsubscribe();
  }, [settingsDocId, calculateDaysRemaining]);

  // Recalcular portfolio cuando cambien los contratos
  const portfolioSummary = useMemo(() => {
    return recalculatePortfolio();
  }, [recalculatePortfolio]);

  return {
    // Data
    cavContracts: cavSettings.contracts,
    cavPortfolio: portfolioSummary,
    investmentPlans: cavSettings.investmentPlans,
    
    // Additional properties for asset management
    settings: cavSettings,
    enrichedFixedContracts: cavSettings.contracts,
    enrichedContributionPlans: cavSettings.investmentPlans,
    portfolioSummary,
    isLoaded: !isLoading,
    
    // States
    isLoading,
    error,
    
    // Actions
    addContract,
    updateContract,
    deleteContract,
    refreshData,
    
    // Utilities
    calculateReturns,
    calculateDaysRemaining,
    recalculatePortfolio,
  };
}

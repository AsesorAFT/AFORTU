'use client';

import { useEffect } from 'react';

/**
 * Componente para atajos de teclado en la página de inversiones
 * Actualmente es un placeholder para futuras funcionalidades
 */
export function InversionesHotkeys() {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Atajos de teclado futuros:
      // - R: Refresh data
      // - C: Toggle currency
      // - T: Toggle timeframe
      // - etc.
      
      // Por ahora solo loguea para debug
      if (e.ctrlKey || e.metaKey) {
        console.log('Hotkey pressed:', e.key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return null;
}

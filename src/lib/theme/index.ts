/**
 * AFORTU Theme System
 * Sistema de diseño unificado
 */

export { fortuneColors, colorUtils, cssVariables } from './colors';

// Exportaciones condicionales (si existen los archivos)
export type { } from './animations';
export type { } from './typography';
export type { } from './spacing';

// Re-exportar directamente desde colors por ahora
import { fortuneColors } from './colors';
export default fortuneColors;

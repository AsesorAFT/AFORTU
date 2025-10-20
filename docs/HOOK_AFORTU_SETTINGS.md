# 🎯 Hook `useAfortuSettings` - Documentación

## Descripción General

El hook `useAfortuSettings` es el **centro neurálgico** de la aplicación AFORTU. Centraliza toda la lógica de negocio, cálculos financieros y gestión de datos desde Firestore, proporcionando una **única fuente de verdad** para la aplicación.

## 🎨 Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    useAfortuSettings                         │
│  (Firestore Integration + Business Logic)                   │
└───────────────────┬─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
   ┌────▼────┐            ┌────▼────┐
   │   CAV   │            │  Tools  │
   │  Page   │            │  Page   │
   └─────────┘            └─────────┘
```

## 📦 Instalación y Uso

### 1. Importar el Hook

```tsx
import { useAfortuSettings } from '@/hooks/use-afortu-settings';
```

### 2. Uso Básico

```tsx
export default function MyComponent() {
  const {
    // Datos CAV
    cavContracts,
    cavPortfolio,
    investmentPlans,
    
    // Estados
    isLoading,
    error,
    
    // Acciones
    addContract,
    updateContract,
    deleteContract,
    refreshData,
  } = useAfortuSettings();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>Total Invertido: ${cavPortfolio.totalInvested}</h1>
      {cavContracts.map(contract => (
        <ContractCard key={contract.id} contract={contract} />
      ))}
    </div>
  );
}
```

## 📊 API del Hook

### Datos Retornados

#### `cavContracts: CAVContract[]`
Array de contratos de ahorro con valor.

```typescript
interface CAVContract {
  id: string;
  title: string;
  amount: number;
  currency: 'MXN' | 'USD' | 'EUR';
  apr: number;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  status: 'active' | 'completed' | 'pending';
  returns: number;
  type: 'fixed-rate' | 'variable-rate';
  investmentPlan?: string;
}
```

#### `cavPortfolio: CAVPortfolioSummary`
Resumen calculado del portfolio.

```typescript
interface CAVPortfolioSummary {
  totalInvested: number;
  totalReturns: number;
  avgAPR: number;
  activeContracts: number;
  completedContracts: number;
  nextMaturity: number;
}
```

#### `investmentPlans: InvestmentPlan[]`
Planes de inversión disponibles.

```typescript
interface InvestmentPlan {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  minTerm: number; // días
  maxTerm: number; // días
  baseAPR: number;
  riskLevel: 'bajo' | 'moderado' | 'alto';
}
```

### Estados

#### `isLoading: boolean`
Indica si los datos están cargando desde Firestore.

#### `error: string | null`
Mensaje de error si algo falló al cargar/guardar datos.

### Acciones

#### `addContract(contract: Omit<CAVContract, 'id' | 'daysRemaining' | 'returns'>): Promise<void>`

Añade un nuevo contrato. El hook calcula automáticamente:
- `id` único
- `daysRemaining` 
- `returns` proyectados

```tsx
const handleAddContract = async () => {
  try {
    await addContract({
      title: 'Nuevo Contrato',
      amount: 1000000,
      currency: 'MXN',
      apr: 12.5,
      startDate: '2025-01-01',
      endDate: '2026-01-01',
      status: 'active',
      type: 'fixed-rate',
    });
  } catch (err) {
    console.error('Error:', err);
  }
};
```

#### `updateContract(id: string, updates: Partial<CAVContract>): Promise<void>`

Actualiza un contrato existente. Recalcula automáticamente rendimientos si se modifican fechas o montos.

```tsx
await updateContract('CAV-001', {
  amount: 2000000,
  apr: 13.0,
});
```

#### `deleteContract(id: string): Promise<void>`

Elimina un contrato.

```tsx
await deleteContract('CAV-001');
```

#### `refreshData(): Promise<void>`

Fuerza la recarga de datos desde Firestore.

```tsx
<Button onClick={refreshData}>
  <RefreshCw /> Actualizar
</Button>
```

### Utilidades de Cálculo

#### `calculateReturns(amount: number, apr: number, days: number): number`

Calcula los rendimientos de una inversión.

```tsx
const returns = calculateReturns(1000000, 12.5, 365);
// Resultado: 125,000 MXN
```

#### `calculateDaysRemaining(endDate: string): number`

Calcula días restantes hasta el vencimiento.

```tsx
const days = calculateDaysRemaining('2025-12-31');
// Resultado: número de días hasta fin de año
```

#### `recalculatePortfolio(): CAVPortfolioSummary`

Recalcula el resumen del portfolio. Se ejecuta automáticamente cuando cambian los contratos.

## 🔥 Firestore Integration

### Estructura de Datos

```
afortu_settings/
  └── {userId}/
      ├── contracts: CAVContract[]
      ├── portfolioSummary: CAVPortfolioSummary
      ├── investmentPlans: InvestmentPlan[]
      └── lastUpdated: string (ISO timestamp)
```

### Tiempo Real

El hook escucha cambios en Firestore en tiempo real mediante `onSnapshot`. Cualquier cambio en la base de datos se refleja automáticamente en la UI.

## 🎯 Casos de Uso

### 1. Página CAV (Actual)

```tsx
// src/app/cav/page.tsx
export default function CAVPage() {
  const { cavContracts, cavPortfolio, isLoading } = useAfortuSettings();
  
  return (
    <div>
      <StatCard 
        title="Total Invertido" 
        value={cavPortfolio.totalInvested} 
      />
      {cavContracts.map(contract => (
        <ContractCard key={contract.id} contract={contract} />
      ))}
    </div>
  );
}
```

### 2. Centro de Configuración (Futuro)

```tsx
// src/app/tools/page.tsx
export default function ToolsPage() {
  const { investmentPlans, addContract } = useAfortuSettings();
  
  const handleCreateContract = async (plan: InvestmentPlan) => {
    await addContract({
      title: `Inversión ${plan.name}`,
      amount: 500000,
      currency: 'MXN',
      apr: plan.baseAPR,
      startDate: new Date().toISOString(),
      endDate: addDays(new Date(), plan.minTerm).toISOString(),
      status: 'active',
      type: 'fixed-rate',
      investmentPlan: plan.id,
    });
  };
  
  return (
    <div>
      {investmentPlans.map(plan => (
        <PlanCard 
          key={plan.id} 
          plan={plan} 
          onSelect={handleCreateContract}
        />
      ))}
    </div>
  );
}
```

### 3. Dashboard

```tsx
// src/app/dashboard/page.tsx
export default function DashboardPage() {
  const { cavPortfolio } = useAfortuSettings();
  
  return (
    <div>
      <h1>Patrimonio Total</h1>
      <StatCard value={cavPortfolio.totalInvested + cavPortfolio.totalReturns} />
    </div>
  );
}
```

## 🔧 Mantenimiento y Extensión

### Añadir Nuevos Campos a CAVContract

1. Actualizar el tipo en `src/types/cav.ts`:

```typescript
export interface CAVContract {
  // ... campos existentes
  newField: string; // 👈 Nuevo campo
}
```

2. Actualizar `DEFAULT_CAV_SETTINGS` si es necesario

3. Listo! El hook manejará automáticamente el nuevo campo

### Añadir Nuevos Cálculos

```typescript
// En use-afortu-settings.ts
const calculateNewMetric = useCallback((data: SomeData): number => {
  // Tu lógica aquí
  return result;
}, [dependencies]);

return {
  // ... exports existentes
  calculateNewMetric, // 👈 Exportar
};
```

## ⚡ Performance

### Optimizaciones Implementadas

1. **useMemo**: Portfolio se recalcula solo cuando cambian los contratos
2. **useCallback**: Funciones de cálculo memoizadas
3. **Real-time Sync**: Solo actualizaciones incrementales desde Firestore
4. **Batch Updates**: Múltiples cambios se agrupan en una sola escritura

### Mejores Prácticas

```tsx
// ✅ CORRECTO - Usar el hook en el componente raíz
function App() {
  const afortuSettings = useAfortuSettings();
  
  return (
    <AfortuContext.Provider value={afortuSettings}>
      <MyComponents />
    </AfortuContext.Provider>
  );
}

// ❌ INCORRECTO - Usar el hook en muchos componentes hijos
function ChildComponent() {
  const { cavContracts } = useAfortuSettings(); // Múltiples conexiones a Firestore
}
```

## 🐛 Manejo de Errores

```tsx
const { error, refreshData } = useAfortuSettings();

if (error) {
  return (
    <ErrorBoundary>
      <p>{error}</p>
      <Button onClick={refreshData}>Reintentar</Button>
    </ErrorBoundary>
  );
}
```

## 🧪 Testing

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useAfortuSettings } from './use-afortu-settings';

test('loads contracts from Firestore', async () => {
  const { result } = renderHook(() => useAfortuSettings('test-user'));
  
  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });
  
  expect(result.current.cavContracts).toHaveLength(4);
});
```

## 📚 Recursos Adicionales

- [Tipos TypeScript](/src/types/cav.ts)
- [Implementación del Hook](/src/hooks/use-afortu-settings.ts)
- [Ejemplo de Uso](/src/app/cav/page.tsx)
- [Firestore Rules](/firestore.rules)

---

**Última actualización**: 19 de octubre de 2025
**Versión**: 1.0.0

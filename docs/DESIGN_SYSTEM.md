# 🎨 Sistema de Diseño AFORTU Premium

Sistema de diseño de lujo para la aplicación de gestión patrimonial AFORTU.

## 🌟 Características Principales

### 1. **Sistema de Colores Premium**
- **Paleta de Oro**: Colores dorados elegantes (#D4AF37, #FFD700)
- **Luxury Navy**: Azul marino profundo para contraste (#0A1628)
- **Acentos de Piedras Preciosas**: Esmeralda, Rubí, Zafiro
- **Gradientes de Riqueza**: Gradientes premium con efectos de lujo

### 2. **Glassmorphism**
- Efectos de vidrio esmerilado con `backdrop-blur`
- Transparencias sofisticadas
- Bordes sutiles con opacidad

### 3. **Animaciones Fluidas**
- Transiciones suaves con cubic-bezier
- Animaciones de entrada (fade, slide, scale)
- Efectos de brillo dorado
- Animaciones de shimmer para loading

### 4. **Optimización de Performance**
- Componentes memoizados con React.memo
- Hooks de optimización (useMemo, useCallback)
- Formatters memoizados para números/moneda
- Lazy loading de componentes pesados

## 📦 Estructura de Archivos

```
src/
├── lib/theme/
│   ├── colors.ts         # Sistema de colores Fortune
│   ├── animations.ts     # Animaciones y transiciones
│   ├── typography.ts     # Sistema tipográfico
│   ├── spacing.ts        # Espaciado y radios
│   └── index.ts          # Exportaciones centralizadas
├── components/ui/
│   ├── premium-card.tsx      # Tarjetas con glassmorphism
│   ├── premium-button.tsx    # Botones con ripple effect
│   ├── stat-card.tsx         # Cards de estadísticas animadas
│   └── skeleton.tsx          # Loading states elegantes
├── hooks/
│   ├── use-interactions.ts   # Hooks para interacciones
│   └── use-performance.ts    # Hooks de optimización
└── app/dashboard/
    └── page-premium.tsx      # Dashboard rediseñado
```

## 🎨 Uso del Sistema de Colores

```typescript
import { fortuneColors } from '@/lib/theme/colors';

// Colores primarios
fortuneColors.primary.gold           // #D4AF37
fortuneColors.primary.darkGold       // #B8960F
fortuneColors.primary.champagne      // #F7E7CE

// Colores de lujo
fortuneColors.luxury.navy            // #0A1628
fortuneColors.luxury.slate           // #1E293B
fortuneColors.luxury.pearl           // #F8FAFC

// Acentos
fortuneColors.accent.emerald         // #059669 (éxito)
fortuneColors.accent.ruby            // #DC2626 (error)
fortuneColors.accent.sapphire        // #2563EB (info)

// Gradientes
fortuneColors.gradients.goldShine
fortuneColors.gradients.luxuryDark
fortuneColors.gradients.wealth

// Sombras
fortuneColors.shadows.goldGlow
fortuneColors.shadows.luxuryCard
fortuneColors.shadows.premium
```

## 🧩 Componentes Premium

### PremiumCard

```tsx
import { PremiumCard } from '@/components/ui/premium-card';

<PremiumCard variant="glass" hover glow>
  <h2>Contenido Premium</h2>
  <p>Con efectos de glassmorphism</p>
</PremiumCard>
```

**Variants:**
- `glass`: Efecto de vidrio con backdrop-blur
- `elevated`: Tarjeta elevada con sombra profunda
- `gold`: Gradiente dorado con brillo
- `luxury`: Fondo navy con borde dorado

### PremiumButton

```tsx
import { PremiumButton } from '@/components/ui/premium-button';

<PremiumButton 
  variant="gold" 
  size="lg"
  ripple
  leftIcon={<Icon />}
>
  Acción Premium
</PremiumButton>
```

**Variants:**
- `gold`: Botón dorado principal
- `navy`: Botón navy con texto dorado
- `outline`: Transparente con borde dorado
- `ghost`: Sin fondo, hover sutil

### StatCard

```tsx
import { StatCard } from '@/components/ui/stat-card';

<StatCard
  title="Valor Patrimonial"
  value={48200000}
  format="currency"
  currency="MXN"
  trend={{
    value: 4.3,
    label: "este mes",
    isPositive: true
  }}
  icon={<TrendingUp />}
/>
```

### Skeleton Loaders

```tsx
import { 
  Skeleton, 
  SkeletonCard, 
  SkeletonDashboard,
  LoadingSpinner,
  LoadingOverlay 
} from '@/components/ui/skeleton';

// Loading individual
<Skeleton variant="text" width="60%" animation="shimmer" />

// Card completo
<SkeletonCard />

// Dashboard completo
<SkeletonDashboard />

// Spinner
<LoadingSpinner size="lg" />

// Overlay fullscreen
<LoadingOverlay message="Cargando datos..." />
```

## 🎬 Animaciones

### Clases CSS

```tsx
// Fade in con movimiento hacia arriba
<div className="animate-fade-in-up">...</div>

// Slide desde la izquierda
<div className="animate-slide-in-left">...</div>

// Scale in suave
<div className="animate-scale-in">...</div>

// Shimmer effect para loading
<div className="animate-shimmer">...</div>

// Gold glow pulsante
<div className="animate-gold-glow">...</div>
```

### Hooks de Animación

```tsx
import { 
  useIntersectionObserver,
  useAnimatedNumber,
  useDelayedRender 
} from '@/hooks/use-interactions';

// Animar al entrar en viewport
const { ref, isIntersecting } = useIntersectionObserver();

// Animar números
const animatedValue = useAnimatedNumber(1000000, 1500);

// Stagger animations
const isReady = useDelayedRender(300);
```

## ⚡ Optimización de Performance

### Hooks de Optimización

```tsx
import {
  useFormatCurrency,
  useFormatNumber,
  useFormatPercentage,
  useDebounce,
  useThrottle,
} from '@/hooks/use-performance';

// Formatters memoizados
const formatCurrency = useFormatCurrency('es-MX', 'MXN');
const formatNumber = useFormatNumber('es-MX');
const formatPercentage = useFormatPercentage('es-MX', 2);

// Optimización de eventos
const debouncedSearch = useDebounce(handleSearch, 500);
const throttledScroll = useThrottle(handleScroll, 100);
```

### Memoización de Componentes

```tsx
import { memo, useMemo, useCallback } from 'react';

// Memoizar componente
export const MyComponent = memo(({ data }) => {
  // Memoizar cálculos costosos
  const processedData = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);

  // Memoizar callbacks
  const handleClick = useCallback(() => {
    console.log(data);
  }, [data]);

  return <div onClick={handleClick}>...</div>;
});
```

## 🎯 Configuración de Tailwind

Las configuraciones personalizadas ya están incluidas en `tailwind.config.ts`:

```typescript
// Colores personalizados
fortune: {
  gold: '#D4AF37',
  navy: '#0A1628',
  emerald: '#059669',
  // ...
}

// Sombras personalizadas
boxShadow: {
  'gold-glow': '0 8px 32px rgba(212, 175, 55, 0.15)',
  'luxury-card': '0 20px 60px rgba(10, 22, 40, 0.12)',
}

// Animaciones
animation: {
  'shimmer': 'shimmer 2s linear infinite',
  'gold-glow': 'goldGlow 3s ease-in-out infinite',
}
```

## 🚀 Dashboard Premium

El nuevo dashboard incluye:

1. **Hero Section con Gradiente**: Fondo luxury navy con efectos decorativos
2. **KPI Cards con Glassmorphism**: Tarjetas de métricas con efectos de vidrio
3. **Animaciones Stagger**: Entrada secuencial de elementos
4. **Números Animados**: Contadores que se animan al cargar
5. **Micro-interacciones**: Hover, scale, shadow effects
6. **Responsive Design**: Optimizado para móvil, tablet y desktop

## 📱 Responsive

Todos los componentes son responsive:

```tsx
// Grid adaptativo
<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
  ...
</div>

// Padding adaptativo
<div className="p-4 md:p-6 lg:p-10">
  ...
</div>

// Texto adaptativo
<h1 className="text-3xl md:text-4xl lg:text-5xl">
  ...
</h1>
```

## 🎨 Mejores Prácticas

1. **Usar componentes premium** para consistencia visual
2. **Memoizar** componentes costosos
3. **Lazy load** componentes grandes
4. **Usar hooks de performance** para formateo
5. **Aplicar animaciones** con moderación
6. **Mantener** paleta de colores consistente
7. **Testing** en diferentes dispositivos

## 📚 Recursos

- [Documentación de Tailwind CSS](https://tailwindcss.com)
- [React Performance](https://react.dev/reference/react/memo)
- [Framer Motion](https://www.framer.com/motion/) (opcional para animaciones avanzadas)

## 🎉 Implementado

- ✅ Sistema de colores premium
- ✅ Componentes con glassmorphism
- ✅ Animaciones fluidas
- ✅ Skeleton loaders elegantes
- ✅ Hooks de optimización
- ✅ Dashboard premium rediseñado
- ✅ Componentes memoizados
- ✅ Micro-interacciones

## 📝 Próximos Pasos

Para continuar mejorando:

1. Implementar modo oscuro completo
2. Añadir más variantes de componentes
3. Crear biblioteca de iconos personalizados
4. Implementar animaciones con Framer Motion
5. A/B testing de diseños
6. Accessibility improvements (ARIA labels)
7. Performance monitoring

---

**AFORTU** - Tu patrimonio, nuestra prioridad 💰✨

# Inventario de fusión: AFORTU (legacy) → AFORTU OS

Documento de trabajo para portar los módulos de asesoría IA (Genkit) e inversiones de este repositorio (Next 14 + Firebase) a **AFORTU OS** (vinext/Vite RSC sobre Cloudflare, `app.afortu.com.mx`).

Destinos:
- **Núcleo 02** — `apps/afortu-sites` vía `api/portal/**` (portal de inversiones/cliente).
- **Núcleo 03** — AFORTU Intelligence, bajo Risk Guardian y aprobación humana (ADR-003).

Leyenda de **Estado real**: `funcional` = código operativo; `stub` = firma correcta pero implementación vacía/mínima; `mock` = devuelve datos simulados presentados como reales.

> Sin datos de clientes ni claves. Las variables de entorno se citan solo por nombre.

---

## 1. Capa IA — `src/ai/**` → Núcleo 03

| Módulo/archivo | Qué hace | Estado real | Dependencias externas/secretos | Veredicto | Destino en afortu-os | Notas |
|---|---|---|---|---|---|---|
| `src/ai/genkit.ts` | Debería inicializar Genkit con plugin `googleAI` | **mock** (`{ chat, flow }` que devuelven `null`; `genkit()` y `googleAI()` comentados) | `GEMINI_API_KEY` (comentado); `@genkit-ai/googleai` **no instalado** | reescribir | Núcleo 03 | Causa raíz de los 43 errores TS (`defineTool/definePrompt/defineFlow` no existen en el mock). En AFORTU OS la inicialización debe vivir detrás de Risk Guardian. |
| `src/ai/dev.ts` | Registra flows/schemas/tools para `genkit start` | stub | `dotenv` | descartar | — | Importa `flows/portfolio-analyzer.ts` (ruta inexistente; el archivo es `portfolio.analyzer.ts`). |
| `src/ai/flows/business-insights-from-portfolio-data.ts` | Prompt + flow: analiza datos de portafolio y produce insights de negocio (schema zod inline) | stub sobre mock | Gemini vía `ai` | portar (lógica de prompt/schema) | Núcleo 03 | Redundante con `generate-business-insights.ts`; unificar en un solo flow. |
| `src/ai/flows/generate-business-insights.ts` | Prompt + flow: insights de negocio desde `schemas/business.ts` | stub sobre mock | Gemini vía `ai` | portar | Núcleo 03 | Fuente canónica de la versión anterior. |
| `src/ai/flows/market-trend-analyzer.ts` | Prompt + flow: análisis de tendencias de mercado (`schemas/market.ts`) | stub sobre mock | Gemini vía `ai` | portar | Núcleo 03 | Salida textual; requiere aprobación humana antes de mostrarse como recomendación (ADR-003). |
| `src/ai/flows/portfolio.analyzer.ts` | Prompt + flow con tools `getStockPrice` y `getUserPortfolio`: analiza portafolio del usuario | stub sobre mock | Gemini; Alpha Vantage y Firestore vía tools | portar | Núcleo 03 (tools → `api/portal/**`) | Nombre con punto (`portfolio.analyzer.ts`) rompe el import de `dev.ts`. |
| `src/ai/flows/conversational-advisor.ts` | Chat asesor con historial (`ChatMessageSchema`) | stub sobre mock | Gemini vía `ai` | portar | Núcleo 03 | Versión canónica (importa `zod`). |
| `src/ai/flows/conversational-advirsor.ts` | Igual que el anterior | stub sobre mock | Gemini vía `ai` | **descartar** | — | **Duplicado con typo**; importa `z` de `genkit` en vez de `zod`. |
| `src/ai/flows/unified-advisor.ts` | Debería ser el flow unificado que consume `chat-client.tsx` | **vacío (0 líneas)** | — | reescribir | Núcleo 03 | Provoca `TS2306: not a module` en `components/analysis/chat-client.tsx`. |
| `src/ai/flows/unified-advisor-disabled.ts` | `unifiedChat()` que devuelve un texto fijo "temporalmente deshabilitado" | mock | — | descartar | — | Reemplazado por el flow unificado real en Núcleo 03. |
| `src/ai/schemas/chat.ts` | Zod: `ChatMessageSchema`, `ChatHistorySchema` | funcional | `zod` | portar | Núcleo 03 | Tipos limpios, portables tal cual. |
| `src/ai/schemas/portfolio.ts` | Zod: entrada/salida de análisis de portafolio | funcional | `zod` | portar | Núcleo 03 | — |
| `src/ai/schemas/business.ts` | Zod: entrada/salida de insights de negocio | funcional | `zod` (vía `genkit`) | portar | Núcleo 03 | Cambiar `import { z } from 'genkit'` → `'zod'`. |
| `src/ai/schemas/market.ts` | Zod: entrada/salida de tendencias de mercado | funcional | `zod` | portar | Núcleo 03 | — |
| `src/ai/tools/stock-tool.ts` | Tool Genkit `getStockPrice` → `services/stock-price-service` | stub sobre mock | Alpha Vantage (`FINANCE_API_KEY`) | portar | Núcleo 03 → llama a `api/portal/**` | Redefinir con la API de tools real de Genkit. |
| `src/ai/tools/user-data-tools.ts` | 7 tools: portafolio, datos de negocio, metas, facturas, contratos, planes de inversión, log de cuenta → `services/user-data-service` | stub sobre mock | Firestore (`users/{uid}/…`) vía Firebase client SDK | reescribir | Núcleo 03 (datos servidos por `api/portal/**`) | El servicio usa SDK cliente + `next/headers` en servidor: no portable directamente a Cloudflare. |
| `src/ai/core/history.ts` | `trimHistory` y `semanticSummarize` (recorte/resumen de historial) | funcional (resumen es heurístico, no LLM) | — | portar | Núcleo 03 | — |
| `src/ai/core/summarizer.ts` | `semanticSummarize` duplicado | stub | — | descartar | — | Duplicado de `history.ts`. |
| `src/ai/core/types.ts` | Tipos `ChatMessage`/`ChatMessageRole` | funcional | — | descartar | — | Duplicado de `schemas/chat.ts`. |
| `src/components/analysis/chat-client.tsx` | UI de chat que invoca `unifiedChat` | funcional (UI), roto por import | `@/ai/flows/unified-advisor` (vacío) | portar (UI) | Núcleo 02 (UI) → Núcleo 03 (backend) | Consumidor único del flow unificado. |
| `src/services/user-data-service.ts` | Lecturas Firestore de portafolio/negocio/facturas/contratos/planes | funcional (Firestore) | Firebase (`NEXT_PUBLIC_FIREBASE_*`); `next/headers` | reescribir | `api/portal/**` | Base para los endpoints del portal. |

## 2. Inversiones — `src/components/inversiones/**`, servicios y hooks → Núcleo 02

| Módulo/archivo | Qué hace | Estado real | Dependencias externas/secretos | Veredicto | Destino en afortu-os | Notas |
|---|---|---|---|---|---|---|
| `components/inversiones/AssetManagementCard.tsx` | Tarjeta de portafolio Asset Management | funcional (UI) | `@/lib/formatters`, shadcn UI, `next/link` | portar | Núcleo 02 `apps/afortu-sites` | Sustituir `next/link` por el router de vinext. |
| `components/inversiones/ContributionPlansCard.tsx` | Tarjeta de planes de aportación | funcional (UI), **5 errores TS** | `@/types/cav` (`InvestmentPlan`) | portar tras corregir tipos | Núcleo 02 | Usa `status/accumulated/monthlyAmount/frequency` que no existen en `InvestmentPlan`. |
| `components/inversiones/FixedRateContractsCard.tsx` | Tarjeta de contratos a tasa fija (CAV) | funcional (UI), **4 errores TS** | `@/types/cav` (`CAVContract`) | portar tras corregir tipos | Núcleo 02 | Usa `currentValue/name/rate/maturityDate` no definidos en `CAVContract`. |
| `components/inversiones/TotalInvestmentCard.tsx` | KPI de inversión total | funcional (UI) | shadcn UI | portar | Núcleo 02 | — |
| `components/inversiones/StatCard.tsx` | KPI genérico | funcional (UI) | shadcn UI | portar | Núcleo 02 | Posible duplicado de `components/ui/stat-card.tsx`. |
| `components/inversiones/CompareBadge.tsx` | Badge de variación % vs periodo anterior | funcional (UI) | — | portar | Núcleo 02 | — |
| `components/inversiones/Hotkeys.tsx` | Atajos de teclado para el panel | funcional (UI) | — | portar (opcional) | Núcleo 02 | — |
| `components/inversiones/LoadingSkeleton.tsx` | Skeleton de carga | funcional (UI) | — | portar | Núcleo 02 | — |
| `components/inversiones/PreferencesBar.tsx` | Selector timeframe/granularidad/moneda | funcional (UI) | — | portar | Núcleo 02 | Alimenta `use-kpi-series-extended`. |
| `src/app/asset-management/page.tsx` | Página que compone lo anterior | funcional (UI) | hooks mock | portar | Núcleo 02 | Consumidor único de `components/inversiones`. |
| `src/types/cav.ts` | Tipos `CAVContract`, `InvestmentPlan`, `CAVPortfolioSummary`, `CAVSettings` | funcional (incompleto) | — | portar y completar | Núcleo 02 | Fuente de verdad de tipos; completar con los campos que usan las cards. |
| `src/services/stock-price-service.ts` | Cotización global por símbolo vía Alpha Vantage | **funcional** (con test jest) | `alphavantage` npm; **`FINANCE_API_KEY`** (servidor) | portar | `api/portal/**` (server-only) | Nunca exponer la clave al cliente; en OS va como secret de Cloudflare. |
| `src/app/api/stock-price/route.ts` | Endpoint REST que envuelve el servicio | funcional (con test) | — | portar | `api/portal/**` | — |
| `src/hooks/use-fx-latest.ts` | Tipo de cambio USD→MXN | **mock** (valor fijo simulado) | Ninguna; comentarios sugieren exchangerate-api / fixer / Banxico | reescribir | `api/portal/**` + hook en Núcleo 02 | Hoy se muestra como dato real en UI. |
| `src/hooks/use-kpi-series-extended.ts` | Series KPI (total, tasa fija, asset mgmt, aportaciones) por timeframe/granularidad/moneda + comparativa | **mock** (`setTimeout` 300 ms + datos fijos) | Ninguna | reescribir | `api/portal/**` + hook en Núcleo 02 | Conservar la interfaz `KpiData/KpiSeries/KpiCompare`; sustituir la fuente. |
| `src/app/api/metrics/route.ts` | Métricas de dashboard | **mock** (declarado en el propio archivo) | — | reescribir | `api/portal/**` | — |
| `src/app/api/chart/route.ts` | Serie de crecimiento por interés compuesto (parámetros por query) | funcional (cálculo puro) | — | portar | `api/portal/**` | Lógica reutilizable para simuladores. |
| `src/app/api/transactions/route.ts` | Listado de transacciones | **mock** (array hardcodeado) | — | descartar | — | Reemplazar por datos reales del portal. |
| `src/lib/afortu/apiClient.ts` | Cliente HTTP a `api.afortu.com` con timeout | funcional | `AFORTU_API_BASE_URL`, **`AFORTU_API_KEY`** | descartar / evaluar | — | En AFORTU OS el portal es la API; probablemente obsoleto. |
| `src/app/api/paypal/setup-billing/route.ts` | Alta de suscripción PayPal | funcional | `@paypal/*`; **`PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_PLAN_ID`** | evaluar aparte | fuera de alcance 02/03 | Fuera del alcance de este inventario; se lista por sus secretos. |

---

## Orden sugerido de portado

1. **Tipos y schemas primero** (`src/types/cav.ts` completado, `src/ai/schemas/*` con `zod`): son puros y desbloquean el resto. Corregir aquí los 9 errores TS de las cards de inversiones.
2. **Endpoints de datos en `api/portal/**`** (Núcleo 02): `stock-price` (Alpha Vantage, secret en Cloudflare), `chart` (cálculo puro), y nuevos endpoints reales para KPI series, FX y transacciones que reemplacen los mocks.
3. **UI de inversiones** (`components/inversiones/**`, `asset-management/page.tsx`) sobre los endpoints anteriores; reescribir `use-fx-latest` y `use-kpi-series-extended` como hooks que consumen `api/portal/**`.
4. **Inicialización Genkit real** en Núcleo 03 (`googleAI` + `GEMINI_API_KEY` como secret), detrás de Risk Guardian.
5. **Flows y tools**: portar `conversational-advisor`, `portfolio.analyzer`, `market-trend-analyzer`, `generate-business-insights` (unificando con `business-insights-from-portfolio-data`); reescribir `unified-advisor` y `user-data-tools` para que lean de `api/portal/**`. Toda salida pasa por aprobación humana (ADR-003).
6. **UI de chat** (`chat-client.tsx`) conectada al flow unificado; eliminar duplicados (`conversational-advirsor.ts`, `unified-advisor-disabled.ts`, `core/summarizer.ts`, `core/types.ts`).

## Riesgos

- **Mocks presentados como datos reales**: `use-fx-latest`, `use-kpi-series-extended`, `api/metrics`, `api/transactions` y `unified-advisor-disabled` devuelven valores simulados sin indicarlo en UI. Riesgo de que un cliente los tome como información financiera real; no deben llegar a producción de AFORTU OS.
- **Capa IA inoperativa**: `genkit.ts` es un mock y `@genkit-ai/googleai` no está instalado; ningún flow funciona hoy. El "asesor IA" del legacy nunca estuvo activo en esta versión del código.
- **Secretos de servidor**: `FINANCE_API_KEY`, `GEMINI_API_KEY`, `PAYPAL_CLIENT_SECRET`, `AFORTU_API_KEY` deben vivir como secrets de Cloudflare y usarse solo en server-only. No se hallaron claves hardcodeadas en `src`; `.env.example` solo contiene placeholders.
- **Firebase client SDK en servidor**: `user-data-service.ts` mezcla SDK cliente con `next/headers`; en Cloudflare Workers requiere Admin SDK/REST o mover la lógica al portal.
- **Duplicados y archivos rotos**: `conversational-advirsor.ts` (typo), `unified-advisor.ts` (vacío), `core/summarizer.ts`, `core/types.ts`, import a `portfolio-analyzer.ts` inexistente en `dev.ts`. Portar solo las versiones canónicas indicadas.
- **Tipos incompletos**: `InvestmentPlan` y `CAVContract` no tienen los campos que usan las cards → 9 errores TS; deben resolverse antes de portar la UI.
- **PR #45 `redesign/sitio-publico-v2`** sigue abierto y toca el sitio público; su relación con la fusión queda pendiente de decisión.

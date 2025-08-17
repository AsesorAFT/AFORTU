"""markdown
# AFORTU

Plataforma / código base del proyecto AFORTU.

> Nota: Se resolvió un conflicto previo en este README que contenía marcadores de merge (`<<<<<<<`).

## Contenido
- [Descripción](#descripción)
- [Integración API](#integración-api)
- [Estructura del código](#estructura-del-código)
- [Variables de entorno](#variables-de-entorno)
- [Scripts de desarrollo](#scripts-de-desarrollo)
- [Guía de contribución](#guía-de-contribución)

## Descripción
Repositorio principal del proyecto. Aquí se integran frontend (Next.js, App Router) y utilidades compartidas.

## Integración API
Consulta la guía completa en: `docs/api/INTEGRATION.md`.

Resumen rápido:
```bash
# .env.local
AFORTU_API_BASE_URL=https://api.afortu.com
AFORTU_API_KEY=sk_... # (NO compartir)
```
Uso básico server-side:
```ts
import { AFORTUApiClient } from '@/lib/afortu';
const client = new AFORTUApiClient();
const me = await client.get('/v1/users/me');
```

## Estructura del código
```
src/
  lib/
    afortu/
      apiClient.ts
      index.ts
  server/
    middleware/
      verifyAfortuApiKey.ts
  ...
docs/
  api/
    INTEGRATION.md
```

## Variables de entorno
Ver `.env.example`. Crea `.env.local` para desarrollo y NO lo comitees.

## Scripts de desarrollo
(Añadir aquí según package.json – actualizar si procede.)

## Guía de contribución
1. Crear ramas feature/descripcion-corta
2. Commits claros (Convencional Commits sugerido)
3. PR con descripción y pasos de prueba

---
© AFORTU
"""
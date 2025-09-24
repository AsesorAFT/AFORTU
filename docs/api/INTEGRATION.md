"""markdown
# Integración con la API de AFORTU

Esta guía explica cómo autenticar, consumir y ampliar la API de AFORTU dentro del proyecto.

## 1. Autenticación
Todas las solicitudes requieren una clave secreta. Usa uno de estos encabezados:

```
Authorization: Bearer <AFORTU_API_KEY>
```
O alternativamente:
```
X-API-Key: <AFORTU_API_KEY>
```

Nunca expongas la clave secreta en el frontend público (componentes React cliente). Limita su uso a código de servidor (Route Handlers, Server Actions, Edge / Node runtime, jobs).

## 2. Variables de entorno
Defínelas en tu `.env.local` (no se comitea):
```
AFORTU_API_BASE_URL=https://api.afortu.com
AFORTU_API_KEY=sk_... (tu clave secreta real)
```
Ejemplo de plantilla: ver `.env.example`.

## 3. Cliente TypeScript
Archivo: `src/lib/afortu/apiClient.ts`

```ts
import { AFORTUApiClient } from '@/lib/afortu';

const client = new AFORTUApiClient();
const usuario = await client.get('/v1/users/me');
```

### Reintentos & timeouts
- Reintenta 3 veces (configurable) en errores 5xx, 429 y fallos de red.
- Backoff exponencial con jitter.
- Timeout por defecto: 15000 ms.

### Manejo de errores
El cliente lanza `AFORTUApiError`:
```ts
try {
  await client.get('/v1/users/no-existe');
} catch (e) {
  if (e instanceof AFORTUApiError) {
    console.error(e.status, e.code, e.details);
  }
}
```

## 4. Ejemplo con Next.js (Route Handler)
```ts
// app/api/me/route.ts
import { AFORTUApiClient } from '@/lib/afortu';

export async function GET() {
  const client = new AFORTUApiClient();
  const data = await client.get('/v1/users/me');
  return Response.json(data);
}
```

## 5. Validación de API key entrante (si expones endpoints internos)
Archivo: `src/server/middleware/verifyAfortuApiKey.ts`
```ts
import { NextRequest } from 'next/server';
import { verifyAfortuApiKey } from '@/server/middleware/verifyAfortuApiKey';

export async function GET(req: NextRequest) {
  if (!verifyAfortuApiKey(req)) {
    return new Response(JSON.stringify({ error: 'Invalid API key' }), { status: 401 });
  }
  return Response.json({ ok: true });
}
```

## 6. Webhooks (recomendado futuro)
Eventos sugeridos:
- `user.created`
- `transaction.created`
- `transaction.settled`
- `kyc.verified`

Seguridad: cabecera `X-Afortu-Signature` (HMAC SHA256 del cuerpo + timestamp). Incluir tolerancia temporal (ej. 5 min) para prevenir replays.

## 7. Buenas prácticas
| Tema | Recomendación |
|------|---------------|
| Rotación claves | Cada 90 días o al detectar exposición |
| Rate limiting | p.e. 60 req/min por clave (429 si excede) |
| Logging | Guardar (key_id, endpoint, status, latency) |
| Versionado | Prefijo `/v1` en rutas públicas |
| Idempotencia | `Idempotency-Key` en POST críticos (pagos, transacciones) |
| Paginación | Cursor-based (`?cursor=`) evita inconsistencias |

## 8. Roadmap sugerido
1. Implementar endpoint de listado de claves y revocación.
2. Webhooks firmados.
3. Scopes granulares (read:users, write:transactions, admin:keys).
4. Portal desarrolladores (dashboard uso, regenerar claves).
5. Soporte OAuth2 si terceros operan en nombre de usuarios finales.

## 9. FAQ breve
**¿Puedo usar la clave secreta en el navegador?** No. Usa un endpoint server que intermedie.

**¿Cómo cambio la base URL para staging?** Ajusta `AFORTU_API_BASE_URL` en `.env.local`.

**¿Cómo manejar paginación?** El backend debe devolver `{ data: [...], next_cursor: string | null }` y llamas `client.get('/v1/recursos', { cursor: next });

---
Si falta algo en esta guía, edita `docs/api/INTEGRATION.md` o abre un issue.
"""
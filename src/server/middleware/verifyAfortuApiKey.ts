"""typescript
import { NextRequest } from 'next/server';

/**
 * Middleware-like helper para validar la API key entrante en peticiones a handlers internos.
 * Uso (App Router):
 * import { verifyAfortuApiKey } from '@/server/middleware/verifyAfortuApiKey';
 * export async function GET(req: NextRequest) {
 *   const valid = verifyAfortuApiKey(req);
 *   if (!valid) return new Response(JSON.stringify({ error: 'Invalid API key' }), { status: 401 });
 *   // continuar lógica...
 * }
 */
export function verifyAfortuApiKey(req: NextRequest): boolean {
  const headerKey = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || req.headers.get('x-api-key');
  const expected = process.env.AFORTU_API_KEY;
  if (!expected) {
    console.error('AFORTU_API_KEY no configurada en el entorno del servidor.');
    return false;
  }
  if (!headerKey || headerKey !== expected) {
    return false;
  }
  return true;
}
"""
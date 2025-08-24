/**
 * Cliente genérico para la API de AFORTU.
 * - Usa fetch nativo.
 * - Reintentos exponenciales en errores de red / 5xx / 429.
 * - Timeouts configurables.
 * - Errores tipados (AFORTUApiError).
 *
 * NOTAS PARA Next.js (App Router):
 * - Este cliente está pensado para ejecutarse en entorno server (Route Handlers, Server Actions, API Routes legacy) porque usa la API key secreta.
 * - NO importes este cliente directamente en componentes client-side con la clave secreta. Para el frontend crea endpoints intermedios seguros.
 */
export interface ApiClientOptions {
  baseUrl?: string;
  apiKey?: string;          // Si no se pasa, intenta leer de process.env.AFORTU_API_KEY
  maxRetries?: number;      // Reintentos ante 5xx / 429 / red
  retryBaseDelayMs?: number;// Delay base para backoff exponencial
  useBearerAuth?: boolean;  // true => Authorization: Bearer <key>; false => X-API-Key
  timeoutMs?: number;       // Timeout en ms
}

export class AFORTUApiError extends Error {
  status: number;
  code?: string;
  details?: any;
  constructor(message: string, status: number, code?: string, details?: any) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class AFORTUApiClient {
  private baseUrl: string;
  private apiKey: string;
  private maxRetries: number;
  private retryBaseDelayMs: number;
  private useBearerAuth: boolean;
  private timeoutMs: number;

  constructor(opts: ApiClientOptions = {}) {
    this.baseUrl = (opts.baseUrl || process.env.AFORTU_API_BASE_URL || 'https://api.afortu.com').replace(/\/+$/, '');
    this.apiKey = opts.apiKey || process.env.AFORTU_API_KEY || '';
    this.maxRetries = opts.maxRetries ?? 3;
    this.retryBaseDelayMs = opts.retryBaseDelayMs ?? 300;
    this.useBearerAuth = opts.useBearerAuth ?? true;
    this.timeoutMs = opts.timeoutMs ?? 15000;

    if (!this.apiKey) {
      console.warn('[AFORTUApiClient] No API key provided. Set AFORTU_API_KEY.');
    }
  }

  private buildHeaders(extra?: HeadersInit): Headers {
    const headers = new Headers(extra || {});
    headers.set('Accept', 'application/json');
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    if (this.apiKey) {
      if (this.useBearerAuth) {
        headers.set('Authorization', `Bearer ${this.apiKey}`);
      } else {
        headers.set('X-API-Key', this.apiKey);
      }
    }
    return headers;
  }

  private async sleep(ms: number) {
    return new Promise(res => setTimeout(res, ms));
  }

  private async doFetch<T>(path: string, init?: RequestInit, attempt = 0): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const res = await fetch(`${this.baseUrl}${path}`, { ...init, signal: controller.signal });

      const contentType = res.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const body = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => undefined);

      if (!res.ok) {
        // Reintentos en 5xx / 429
        if ((res.status >= 500 || res.status === 429) && attempt < this.maxRetries) {
          const delay = this.retryBaseDelayMs * Math.pow(2, attempt) + Math.random() * 100;
          await this.sleep(delay);
          return this.doFetch<T>(path, init, attempt + 1);
        }
        throw new AFORTUApiError(
          `AFORTU API error ${res.status}`,
          res.status,
          (body && (body.code || body.error_code)) || undefined,
          body
        );
      }

      return body as T;
    } catch (err: any) {
      // Errores de red / timeout
      const retriable = err.name === 'AbortError' || err.code === 'ECONNRESET' || err.message?.includes('network');
      if (retriable && attempt < this.maxRetries) {
        const delay = this.retryBaseDelayMs * Math.pow(2, attempt) + Math.random() * 100;
        await this.sleep(delay);
        return this.doFetch<T>(path, init, attempt + 1);
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }
  }

  private buildQuery(query?: Record<string, any>): string {
    if (!query) return '';
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null) continue;
      params.append(k, String(v));
    }
    const qs = params.toString();
    return qs ? `?${qs}` : '';
  }

  public get<T>(path: string, query?: Record<string, any>, init?: RequestInit) {
    const qs = this.buildQuery(query);
    return this.doFetch<T>(`${path}${qs}`, {
      method: 'GET',
      headers: this.buildHeaders(init?.headers),
      ...init
    });
  }

  public post<T, B = any>(path: string, body?: B, init?: RequestInit) {
    return this.doFetch<T>(path, {
      method: 'POST',
      headers: this.buildHeaders(init?.headers),
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...init
    });
  }

  public put<T, B = any>(path: string, body?: B, init?: RequestInit) {
    return this.doFetch<T>(path, {
      method: 'PUT',
      headers: this.buildHeaders(init?.headers),
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...init
    });
  }

  public patch<T, B = any>(path: string, body?: B, init?: RequestInit) {
    return this.doFetch<T>(path, {
      method: 'PATCH',
      headers: this.buildHeaders(init?.headers),
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...init
    });
  }

  public delete<T>(path: string, init?: RequestInit) {
    return this.doFetch<T>(path, {
      method: 'DELETE',
      headers: this.buildHeaders(init?.headers),
      ...init
    });
  }
}

// Ejemplo de uso (server-side en Next.js Route Handler):
// import { AFORTUApiClient } from '@/lib/afortu';
// export async function GET() {
//   const client = new AFORTUApiClient();
//   const me = await client.get('/v1/users/me');
//   return Response.json(me);
// }

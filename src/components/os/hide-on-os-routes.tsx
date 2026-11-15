'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Oculta elementos globales del sitio (p. ej. el botón flotante) dentro de /os. */
export function HideOnOsRoutes({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/os' || pathname?.startsWith('/os/')) return null;
  return <>{children}</>;
}

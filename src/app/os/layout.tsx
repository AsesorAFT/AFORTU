import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import './os.css';
import { OsBottomNav } from '@/components/os/os-bottom-nav';
import { OsHeader } from '@/components/os/os-header';
import { PrivacyProvider } from '@/components/os/privacy';
import { demoClient } from '@/lib/os/demo-data';
import { PRIVACY_COOKIE } from '@/lib/os/privacy';

export const metadata: Metadata = {
  title: { absolute: 'AFORTU OS · Prototipo' },
  description: 'Prototipo independiente de AFORTU OS con datos de demostración.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#101317',
};

export default function OsLayout({ children }: { children: ReactNode }) {
  const initialHidden = cookies().get(PRIVACY_COOKIE)?.value === '1';

  return (
    <div className="afortu-os os-app">
      <a href="#os-contenido" className="os-skip">
        Saltar al contenido
      </a>
      <PrivacyProvider initialHidden={initialHidden}>
        <OsHeader client={demoClient} />
        <div id="os-contenido" className="os-content" tabIndex={-1}>
          {children}
        </div>
        <OsBottomNav />
      </PrivacyProvider>
    </div>
  );
}

import type { Metadata } from 'next';
import { PendingScreen } from '@/components/os/pending-screen';

export const metadata: Metadata = {
  title: { absolute: 'Servicios · AFORTU OS · Prototipo' },
};

export default function OsServiciosPage() {
  return <PendingScreen title="Servicios" />;
}

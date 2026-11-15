import type { Metadata } from 'next';
import { PendingScreen } from '@/components/os/pending-screen';

export const metadata: Metadata = {
  title: { absolute: 'Asesor · AFORTU OS · Prototipo' },
};

export default function OsAsesorPage() {
  return <PendingScreen title="Asesor" />;
}

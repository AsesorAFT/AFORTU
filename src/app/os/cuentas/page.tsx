import type { Metadata } from 'next';
import { PendingScreen } from '@/components/os/pending-screen';

export const metadata: Metadata = {
  title: { absolute: 'Cuentas · AFORTU OS · Prototipo' },
};

export default function OsCuentasPage() {
  return <PendingScreen title="Cuentas" />;
}

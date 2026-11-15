import type { Metadata } from 'next';
import { PendingScreen } from '@/components/os/pending-screen';

export const metadata: Metadata = {
  title: { absolute: 'OS+ · AFORTU OS · Prototipo' },
};

export default function OsPlusPage() {
  return <PendingScreen title="OS+" />;
}

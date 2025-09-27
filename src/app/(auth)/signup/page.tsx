'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { AuthLayout } from '../AuthLayout';
import { SignupForm } from './SignupForm';

export default function SignupPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // No mostrar nada si el usuario ya está autenticado y redirigiendo
  if (user) {
    return null;
  }

  return (
    <AuthLayout
      title="Crear una Cuenta"
      description="Ingresa tus datos para comenzar tu viaje financiero."
    >
      <SignupForm />
    </AuthLayout>
  );
}

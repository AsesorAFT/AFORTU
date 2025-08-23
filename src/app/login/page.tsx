'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, loading] = useAuthState(auth);

  // Estado para login con email
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        return;
      }
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: "No se pudo iniciar sesión con Google. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: "Correo o contraseña incorrectos.",
      });
    } finally {
      setEmailLoading(false);
    }
  };

  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a1931]">
        <div className="flex flex-col items-center gap-4">
          <Briefcase className="h-12 w-12 animate-pulse text-[#f7c873]" />
          <p className="text-[#f7c873]">Cargando tu experiencia AFORTU...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a1931] to-[#185adb] p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95">
        <CardHeader>
          <div className="flex flex-col items-center mb-2">
            <Briefcase className="h-10 w-10 text-[#f7c873] mb-1" />
            <span className="font-extrabold text-3xl text-[#0a1931] tracking-tight">AFORTU</span>
          </div>
          <CardTitle className="text-xl font-semibold text-center text-[#185adb]">Bienvenido a tu espacio financiero</CardTitle>
          <CardDescription className="text-center text-[#0a1931]/80">
            Gestiona tu patrimonio, inversiones y retiro con seguridad y confianza.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full bg-[#f7c873] hover:bg-[#ffe29a] text-[#0a1931] font-bold py-2 rounded-lg flex items-center justify-center shadow"
            size="lg"
          >
            <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 62.3l-66.5 64.6C305.5 114.6 279.8 96 248 96c-88.8 0-160 72.5-160 160s71.2 160 160 160c98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
            Acceder con Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#185adb]/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/95 px-2 text-[#185adb] font-semibold">
                o con tu correo electrónico
              </span>
            </div>
          </div>
          <form className="grid gap-2" onSubmit={handleEmailSignIn}>
            <input
              type="email"
              required
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border border-[#185adb]/40 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f7c873]"
            />
            <input
              type="password"
              required
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border border-[#185adb]/40 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f7c873]"
            />
            <Button type="submit" className="w-full bg-[#185adb] hover:bg-[#0a1931] text-white font-bold" disabled={emailLoading}>
              {emailLoading ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
          <div className="mt-4 text-center text-xs text-[#0a1931]/70">
            ¿Olvidaste tu contraseña?{' '}
            <a href="mailto:contacto@afortu.com.mx" className="underline text-[#185adb]">
              Contáctanos
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, loading] = useAuthState(auth);

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
      // Don't show a toast if the user closes the popup
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        return;
      }
      console.error("Error during Google sign-in:", error);
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: "No se pudo iniciar sesión con Google. Por favor, inténtalo de nuevo.",
      });
    }
  };

  if (loading || user) {
     return (
       <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="flex flex-col items-center gap-4">
              <Briefcase className="h-12 w-12 animate-pulse text-primary" />
              <p className="text-muted-foreground">Cargando AFORTU...</p>
          </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-muted/20 to-muted/40 p-4">
      <Card className="w-full max-w-sm">
         <CardHeader>
           <div className="grid gap-2 text-center mb-4">
             <Link href="/" className="flex items-center gap-2 font-semibold text-muted-foreground hover:text-foreground justify-center">
              <Briefcase className="h-6 w-6" />
              <span className="font-bold text-xl">AFORTU</span>
            </Link>
           </div>
          <CardTitle className="text-2xl font-bold text-center">Acceso a Clientes</CardTitle>
          <CardDescription className="text-center">
            Inicia sesión para gestionar tu portafolio.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button onClick={handleGoogleSignIn} className="w-full">
             <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 62.3l-66.5 64.6C305.5 114.6 279.8 96 248 96c-88.8 0-160 72.5-160 160s71.2 160 160 160c98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
            Acceder con Google
          </Button>
           <div className="mt-4 text-center text-sm">
            ¿Problemas para acceder?{' '}
            <a href="mailto:contacto@afortu.com.mx" className="underline">
              Contáctanos
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

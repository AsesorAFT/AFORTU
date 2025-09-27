'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { GoogleIcon } from '@/components/icons';

import { signupSchema, SignupFormValues, signupWithEmail, signupWithGoogle } from '@/lib/auth-service';

export function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = React.useState(false);
  const [isAfortuPro, setIsAfortuPro] = React.useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', isAfortuPro: false },
  });

  const handleGoogleSignup = async () => {
    setIsGoogleSubmitting(true);
    try {
      await signupWithGoogle(isAfortuPro);
      toast({
        title: '¡Bienvenido a AFORTU!',
        description: 'Tu cuenta ha sido creada con éxito.',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error de registro',
        description: 'No se pudo crear tu cuenta con Google. Inténtalo de nuevo.',
      });
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  async function onSubmit(values: SignupFormValues) {
    setIsSubmitting(true);
    try {
      await signupWithEmail(values);
      toast({
        title: '¡Bienvenido a AFORTU!',
        description: 'Tu cuenta ha sido creada con éxito.',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error de registro',
        description:
          error.code === 'auth/email-already-in-use'
            ? 'Este correo ya está en uso. Por favor, inicia sesión.'
            : 'Ocurrió un error. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6">
      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignup}
        disabled={isGoogleSubmitting || isSubmitting}
      >
        {isGoogleSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="mr-2 h-4 w-4" />
        )}
        Registrarse con Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O continuar con
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="nombre@ejemplo.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isAfortuPro"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel>Iniciar con AFORTU Asset Management</FormLabel>
                        <p className="text-sm text-muted-foreground">
                            Accede a herramientas y asesoría avanzada.
                        </p>
                    </div>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting || isGoogleSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Crear Cuenta
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        ¿Ya tienes una cuenta?{' '}
        <Link href="/login" className="underline">
          Inicia Sesión
        </Link>
      </div>
    </div>
  );
}

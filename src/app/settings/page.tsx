'use client';

import * as React from "react";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

const settingsSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres."),
  emailNotifications: z.boolean(),
  theme: z.enum(["light", "dark", "system"]),
});

type SettingsForm = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [user, loading, authError] = useAuthState(auth);
  const { toast } = useToast();

  const form = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: "",
      emailNotifications: true,
      theme: "light",
    },
    mode: "onChange",
  });

  const { control, handleSubmit, reset, formState } = form;
  const { isSubmitting, isDirty } = formState;

  // Valores iniciales derivados del usuario (evita resets innecesarios)
  const initialValues = React.useMemo<SettingsForm>(() => {
    return {
      name: user?.displayName ?? "",
      emailNotifications: true,
      theme: "light",
    };
  }, [user?.displayName]);

  React.useEffect(() => {
    reset(initialValues);
  }, [reset, initialValues]);

  async function onSubmit(values: SettingsForm) {
    try {
      // Simulación de llamada API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Configuración guardada",
        description: "Tus preferencias han sido actualizadas.",
      });
    } catch (e) {
      toast({
        title: "Error al guardar",
        description: "Inténtalo nuevamente en unos segundos.",
        variant: "destructive",
      });
    }
  }

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-2xl flex flex-col gap-10 pb-16">
        <div>
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-5 w-72" />
        </div>
        <Card className="shadow-xl border-[#e0e4ea]">
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex justify-end">
            <Skeleton className="h-10 w-32" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen py-12 px-2 flex justify-center items-start">
        <div className="mx-auto w-full max-w-2xl">
          <Card className="shadow-xl border-[#e0e4ea]">
            <CardHeader>
              <CardTitle>Hubo un problema</CardTitle>
              <CardDescription>No pudimos cargar tu sesión.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Detalles: {authError.message}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen py-12 px-2 flex justify-center items-start">
        <div className="mx-auto w-full max-w-2xl">
          <Card className="shadow-xl border-[#e0e4ea]">
            <CardHeader>
              <CardTitle>Sesión requerida</CardTitle>
              <CardDescription>
                Inicia sesión para gestionar tu configuración.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f8fb] via-[#eaf3fa] to-[#d6e4f0] py-12 px-2 flex justify-center">
      <div className="mx-auto w-full max-w-2xl flex flex-col gap-10 pb-16">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#185adb] font-headline">
            Configuración General
          </h1>
          <p className="text-muted-foreground mt-1">
            Ajusta las preferencias de tu cuenta y la apariencia de la plataforma.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Card className="shadow-xl border-[#e0e4ea]">
              <CardHeader>
                <CardTitle>Preferencias de la Cuenta</CardTitle>
                <CardDescription>
                  Gestiona la información de tu perfil y las notificaciones.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de Usuario</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tu nombre"
                          autoComplete="name"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={user.email ?? ""}
                    disabled
                    readOnly
                    autoComplete="email"
                  />
                  <FormDescription>
                    No puedes cambiar tu dirección de correo electrónico.
                  </FormDescription>
                </FormItem>

                <FormField
                  control={control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tema Visual</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un tema" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="light">Claro</SelectItem>
                          <SelectItem value="dark">Oscuro</SelectItem>
                          <SelectItem value="system">Automático (del sistema)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Personaliza la apariencia de tu dashboard.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Notificaciones por Correo
                        </FormLabel>
                        <FormDescription>
                          Recibe resúmenes y alertas importantes en tu email.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="border-t px-6 py-4 flex justify-end">
                <Button type="submit" disabled={!isDirty || isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Guardar Preferencias
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}

'use client';

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const settingsSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
    emailNotifications: z.boolean().default(false),
    theme: z.enum(["light", "dark", "system"]),
});

export default function SettingsPage() {
    const [user, loading] = useAuthState(auth);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            name: user?.displayName || "",
            emailNotifications: true,
            theme: "light",
        },
    });
    
    React.useEffect(() => {
        if (user) {
            form.reset({
                name: user.displayName || "",
                emailNotifications: true,
                theme: "light",
            });
        }
    }, [user, form]);

    function onSubmit(values: z.infer<typeof settingsSchema>) {
        console.log(values);
        toast({
            title: "Configuración Guardada",
            description: "Tus preferencias han sido actualizadas.",
        });
    }

    if (loading) {
        return (
             <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Configuración</h1>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/2" />
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
                         <div className="flex items-center space-x-2">
                           <Skeleton className="h-6 w-12 rounded-full" />
                           <Skeleton className="h-4 w-48" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Skeleton className="h-10 w-24" />
                    </CardFooter>
                </Card>
            </div>
        )
    }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight font-headline">Configuración</h1>
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                <CardTitle>Perfil y Cuenta</CardTitle>
                <CardDescription>
                    Gestiona tu perfil y preferencias de la plataforma.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Nombre</Label>
                                <FormControl>
                                    <Input placeholder="Tu nombre" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormItem>
                        <Label>Email</Label>
                        <Input type="email" value={user?.email || ""} disabled />
                        <FormDescription>
                            No puedes cambiar tu dirección de correo electrónico.
                        </FormDescription>
                    </FormItem>

                     <FormField
                        control={form.control}
                        name="theme"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tema</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Selecciona un tema" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="light">Claro</SelectItem>
                                <SelectItem value="dark">Oscuro</SelectItem>
                                <SelectItem value="system">Sistema</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormDescription>
                            Selecciona el tema para tu dashboard.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="emailNotifications"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                    Notificaciones por Correo
                                    </FormLabel>
                                    <FormDescription>
                                    Recibe correos sobre la actividad de tu cuenta.
                                    </FormDescription>
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
                </CardContent>
                <CardFooter>
                    <Button type="submit">Guardar Cambios</Button>
                </CardFooter>
            </Card>
        </form>
       </Form>
    </div>
  );
}


'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart2, Briefcase, Shield, Target, GraduationCap, Landmark, HandCoins, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { ChatAsesor } from "@/components/dashboard/chat-asesor";

const services = [
  {
    icon: Briefcase,
    title: "Planificación Patrimonial y de Legado",
    description: "Creamos un mapa de ruta financiero personalizado para ayudarte a construir y proteger tu patrimonio para las futuras generaciones."
  },
  {
    icon: BarChart2,
    title: "Gestión de Inversiones para el Futuro",
    description: "Diseñamos y gestionamos carteras de inversión diversificadas y adaptadas a tu perfil de riesgo, buscando siempre el crecimiento a largo plazo."
  },
  {
    icon: Target,
    title: "Asesoría Estratégica para el Retiro",
    description: "Te ayudamos a planificar un futuro financiero sólido, asegurando que tu jubilación sea tan próspera y tranquila como la imaginas."
  },
  {
    icon: Shield,
    title: "Blindaje Patrimonial y Familiar",
    description: "Protegemos lo que más valoras. Analizamos tus necesidades y te ofrecemos las mejores soluciones en seguros para blindar tu patrimonio y a tu familia."
  },
  {
    icon: GraduationCap,
    title: "Planificación Educativa y de Futuro",
    description: "Asegura el futuro académico de tus hijos. Diseñamos estrategias de ahorro e inversión para cubrir los costos de su educación superior."
  },
  {
    icon: Landmark,
    title: "Créditos Personales e Hipotecarios",
    description: "Te asesoramos para encontrar las mejores opciones de financiamiento para tus proyectos personales o para la adquisición de tu vivienda."
  },
   {
    icon: HandCoins,
    title: "Gestión y Consolidación de Deudas",
    description: "Te ayudamos a organizar y consolidar tus deudas, buscando mejores condiciones y un plan de pago que se ajuste a tu capacidad financiera."
  },
];

export default function ServicesPage() {
  const { toast } = useToast();
  const [openDialogs, setOpenDialogs] = useState(services.map(() => false));
  const [user] = useAuthState(auth);

  const handleSubmit = (serviceTitle: string) => (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Solicitud Enviada",
      description: `Gracias por tu interés en ${serviceTitle}. Nos pondremos en contacto contigo pronto.`,
    });
    setOpenDialogs(openDialogs.map(() => false));
  };
  
  const handleOpenChange = (index: number, open: boolean) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = open;
    setOpenDialogs(newOpenDialogs);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Servicios Complementarios</h1>
          <p className="text-muted-foreground">
            En AFORTU, ofrecemos una gama de servicios diseñados para potenciar tu bienestar financiero y asegurar tu futuro.
          </p>
        </div>
      </div>

       <Card className="mt-4 bg-primary/5">
        <CardHeader className="text-center items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                <Bot className="h-8 w-8" />
            </div>
            <CardTitle>¿Tienes dudas? Habla con un experto</CardTitle>
            <CardDescription>Nuestro Asesor AFT está disponible para resolver al instante cualquier pregunta sobre nuestros servicios.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
            <ChatAsesor />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {services.map((service, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <service.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col text-center">
              <p className="text-sm text-muted-foreground flex-grow">{service.description}</p>
              <Dialog open={openDialogs[index]} onOpenChange={(open) => handleOpenChange(index, open)}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="mt-6 w-full">Solicitar Información</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{service.title}</DialogTitle>
                    <DialogDescription>
                      Déjanos tus datos y nos pondremos en contacto para darte más información.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(service.title)}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor={`name-${index}`} className="text-right">
                          Nombre
                        </Label>
                        <Input id={`name-${index}`} defaultValue={user?.displayName || ''} className="col-span-3" required />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor={`email-${index}`} className="text-right">
                          Email
                        </Label>
                        <Input id={`email-${index}`} type="email" defaultValue={user?.email || ''} className="col-span-3" required/>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor={`message-${index}`} className="text-right">
                          Mensaje
                        </Label>
                        <Textarea id={`message-${index}`} placeholder="¿Tienes alguna pregunta específica?" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Enviar Solicitud</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

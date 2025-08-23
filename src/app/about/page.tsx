
'use client';

import { Briefcase, ArrowRight, Users, Target, Heart, Scale } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const teamMembers = [
  {
    name: "Carlos Mendoza",
    role: "CEO & Fundador",
    image: "https://placehold.co/400x400.png",
    description: "Con más de 20 años de experiencia en mercados financieros, Carlos fundó AFORTU con la misión de democratizar la asesoría patrimonial de alta calidad.",
    aiHint: "professional man portrait"
  },
  {
    name: "Sofía Ramírez",
    role: "Directora de Inversiones",
    image: "https://placehold.co/400x400.png",
    description: "Sofía lidera la estrategia de inversión, especializándose en la creación de portafolios resilientes y alineados con los objetivos de nuestros clientes.",
    aiHint: "professional woman portrait"
  },
  {
    name: "Javier Torres",
    role: "Director de Planificación Financiera",
    image: "https://placehold.co/400x400.png",
    description: "Experto en planificación para el retiro y blindaje patrimonial, Javier se dedica a asegurar el futuro financiero de las familias que confían en nosotros.",
     aiHint: "smiling financial advisor"
  },
];


export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="flex h-16 items-center px-4 lg:px-6 bg-background/80 backdrop-blur-sm fixed top-0 w-full z-50 border-b">
         <Link href="/" className="flex items-center gap-2 font-semibold">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">AFORTU</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4">
             <Button variant="ghost" asChild>
                <Link href="/services">Servicios</Link>
             </Button>
             <Button variant="ghost" asChild>
                 <Link href="/about">Nosotros</Link>
             </Button>
            <Button asChild>
                <Link href="/login">Iniciar Sesión <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </nav>
      </header>

      <main className="flex-1 mt-16">
        <section className="w-full py-20 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">Conoce a AFORTU</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Somos más que asesores; somos tus socios estratégicos en el camino hacia la libertad financiera. Descubre quiénes somos y por qué existimos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
            <div className="container grid gap-12 px-4 md:px-6 lg:grid-cols-2">
                <Card className="flex flex-col justify-center p-8">
                    <CardHeader className="p-0">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                            <Target className="h-8 w-8"/>
                        </div>
                        <CardTitle className="text-2xl font-bold">Nuestra Misión</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                        <p className="text-muted-foreground">
                            Empoderar a nuestros clientes con las herramientas, el conocimiento y la asesoría experta para que tomen decisiones financieras inteligentes, construyan un patrimonio sólido y alcancen sus metas más ambiciosas.
                        </p>
                    </CardContent>
                </Card>
                <Card className="flex flex-col justify-center p-8">
                    <CardHeader className="p-0">
                         <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                            <Heart className="h-8 w-8"/>
                        </div>
                        <CardTitle className="text-2xl font-bold">Nuestra Visión</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                        <p className="text-muted-foreground">
                            Ser la firma de asesoría patrimonial líder en innovación y confianza, reconocida por transformar la vida financiera de las personas y empresas en México, combinando la mejor tecnología con un trato humano y cercano.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
        
        <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold">Nuestro Equipo</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Las mentes detrás de tu éxito</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Conoce a los líderes que guían a AFORTU con pasión, experiencia e integridad.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 lg:grid-cols-3 lg:gap-12">
              {teamMembers.map((member) => (
                <Card key={member.name} className="text-center hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Image
                      src={member.image}
                      alt={`Foto de ${member.name}`}
                      width={120}
                      height={120}
                      className="mx-auto mb-4 rounded-full"
                      data-ai-hint={member.aiHint}
                    />
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm font-semibold text-primary">{member.role}</p>
                    <p className="mt-2 text-muted-foreground text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-24 lg:py-32">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">¿Listo para transformar tu futuro financiero?</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-4">
              Descubre cómo nuestras estrategias personalizadas pueden ayudarte a alcanzar tus metas.
            </p>
            <div className="mt-6">
              <Button asChild size="lg">
                <Link href="/services">Ver Nuestros Servicios</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} AFORTU. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

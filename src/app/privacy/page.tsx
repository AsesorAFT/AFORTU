
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <header className="flex h-16 items-center px-4 lg:px-6 bg-background border-b">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Briefcase className="h-6 w-6" />
          <span className="font-bold text-xl">AFORTU</span>
        </Link>
        <div className="ml-auto">
          <Button asChild variant="outline">
            <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" />Volver al Inicio</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <article className="prose prose-stone mx-auto max-w-4xl dark:prose-invert">
            <div className="space-y-4 not-prose">
                <h1 className="text-4xl font-bold tracking-tight">Política de Privacidad</h1>
                <p className="text-muted-foreground">Última actualización: 30 de Julio de 2024</p>
            </div>

            <p>AFORTU (&ldquo;nosotros&rdquo;, &ldquo;nuestro&rdquo; o &ldquo;nos&rdquo;) opera la plataforma AFORTU (en adelante, el &ldquo;Servicio&rdquo;). Esta página le informa de nuestras políticas en materia de recopilación, uso y divulgación de datos personales cuando utiliza nuestro Servicio y las opciones que tiene asociadas a dichos datos.</p>

            <h2>1. Información que Recopilamos</h2>
            <p>Recopilamos varios tipos diferentes de información con diversos fines para prestarle y mejorar nuestro Servicio.</p>
            <h3>Tipos de Datos Recopilados</h3>
            <ul>
              <li>
                <strong>Datos Personales:</strong> Mientras utiliza nuestro Servicio, podemos pedirle que nos proporcione cierta información de identificación personal que puede ser utilizada para contactarle o identificarle (&ldquo;Datos Personales&rdquo;). La información de identificación personal se obtiene a través del proceso de inicio de sesión con Google e incluye, entre otros, su nombre y dirección de correo electrónico.
              </li>
              <li>
                <strong>Datos Financieros:</strong> Para utilizar las funcionalidades de la plataforma, como la gestión de portafolios y el análisis, usted puede proporcionar datos relacionados con sus finanzas, como detalles de activos de inversión, objetivos financieros, datos de negocio y otros datos relacionados. Esta información se almacena de forma segura en la base de datos de Firebase asociada a su cuenta.
              </li>
              <li>
                <strong>Datos de Uso:</strong> La información que nos proporciona al interactuar con nuestras herramientas de IA, como el &ldquo;Asesor AFT&rdquo;, se utiliza para procesar sus solicitudes y se maneja de acuerdo con las políticas de privacidad de los modelos de IA de Google (Gemini).
              </li>
            </ul>

            <h2>2. Uso de los Datos</h2>
            <p>AFORTU utiliza los datos recopilados para diversos fines:</p>
            <ul>
              <li>Para proporcionar y mantener nuestro Servicio.</li>
              <li>Para permitirle participar en las funciones interactivas de nuestro Servicio cuando decida hacerlo.</li>
              <li>Para proporcionar soporte al cliente.</li>
              <li>Para recopilar análisis o información valiosa para que podamos mejorar nuestro Servicio.</li>
              <li>Para supervisar el uso de nuestro Servicio.</li>
              <li>Para detectar, prevenir y abordar problemas técnicos.</li>
            </ul>

            <h2>3. Almacenamiento y Seguridad de los Datos</h2>
            <p>Utilizamos los servicios de Firebase de Google para almacenar de forma segura la información de su cuenta y los datos que proporciona. La seguridad de sus datos es importante para nosotros, pero recuerde que ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por utilizar medios comercialmente aceptables para proteger sus Datos Personales, no podemos garantizar su seguridad absoluta.</p>

            <h2>4. Divulgación de Datos</h2>
            <p>No vendemos, comercializamos ni transferimos de otro modo a terceros su información de identificación personal. No compartiremos sus datos financieros con terceros sin su consentimiento explícito, excepto cuando sea requerido por la ley.</p>

            <h2>5. Sus Derechos de Protección de Datos</h2>
            <p>Usted tiene ciertos derechos de protección de datos. AFORTU tiene como objetivo tomar medidas razonables para permitirle corregir, modificar, eliminar o limitar el uso de sus Datos Personales. Si desea ser informado sobre qué Datos Personales tenemos sobre usted y si desea que se eliminen de nuestros sistemas, por favor contáctenos.</p>
            
            <h2>6. Cambios en esta Política de Privacidad</h2>
            <p>Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página. Se le aconseja que revise esta Política de Privacidad periódicamente para cualquier cambio. Los cambios a esta Política de Privacidad son efectivos cuando se publican en esta página.</p>

            <h2>7. Contacto</h2>
            <p>Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos en <a href="mailto:contacto@afortu.com.mx">contacto@afortu.com.mx</a>.</p>
          </article>
        </div>
      </main>
       <footer className="py-6 w-full border-t bg-background">
        <div className="container text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} AFORTU. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}


import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
              <h1 className="text-4xl font-bold tracking-tight">Términos de Servicio</h1>
              <p className="text-muted-foreground">Última actualización: {new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <p>Bienvenido a AFORTU. Estos términos y condiciones describen las reglas y regulaciones para el uso de la plataforma de AFORTU, accesible desde nuestra aplicación web.</p>
            
            <p>Al acceder a esta plataforma, asumimos que aceptas estos términos y condiciones. No continúes usando AFORTU si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.</p>

            <h2>1. Definiciones</h2>
            <ul>
              <li><strong>&quot;Plataforma&quot;</strong> se refiere a la aplicación web y a todos los servicios proporcionados por AFORTU.</li>
              <li><strong>&quot;Usuario&quot;</strong>, <strong>&quot;Tú&quot;</strong> y <strong>&quot;Tu&quot;</strong> se refiere a ti, la persona que accede a esta plataforma y acepta los términos y condiciones de la Compañía.</li>
              <li><strong>&quot;Servicio&quot;</strong> incluye la gestión de portafolios, análisis financiero, asesoría con IA (Asesor AFT) y otras funcionalidades ofrecidas a través de la Plataforma.</li>
            </ul>

            <h2>2. Cuentas y Registro</h2>
            <p>Para acceder a la mayoría de las funcionalidades de la plataforma, debes registrarte para obtener una cuenta. El acceso se proporciona a través de la autenticación de Google. Eres responsable de mantener la confidencialidad de tu cuenta y eres totalmente responsable de todas las actividades que ocurran bajo tu cuenta.</p>

            <h2>3. Uso Aceptable</h2>
            <p>Te comprometes a utilizar nuestra plataforma solo para fines lícitos. No debes usar la plataforma:</p>
            <ul>
              <li>De ninguna manera que viole alguna ley o regulación local, nacional o internacional aplicable.</li>
              <li>Para transmitir, o procurar el envío de, cualquier material publicitario o promocional no solicitado o no autorizado o cualquier otra forma de solicitud similar (spam).</li>
              <li>Para introducir conscientemente virus, troyanos, gusanos, bombas lógicas u otro material que sea malicioso o tecnológicamente dañino.</li>
            </ul>
            
            <h2>4. Asesor AFT y Asesoría Financiera</h2>
            <p>El &quot;Asesor AFT&quot; es una herramienta de inteligencia artificial diseñada para proporcionar información, análisis y recomendaciones financieras. La información proporcionada por el Asesor AFT y cualquier otra herramienta en la plataforma es solo para fines informativos y no debe considerarse como un consejo de inversión, financiero o de otro tipo. Siempre debes consultar con un asesor financiero humano calificado antes de tomar cualquier decisión de inversión.</p>
            
            <h2>5. Propiedad Intelectual</h2>
            <p>La plataforma y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de AFORTU y sus licenciantes. La marca, el diseño y todo el marco de trabajo de la plataforma están protegidos por derechos de autor y otras leyes de propiedad industrial. Nuestras marcas comerciales no pueden ser utilizadas en conexión con ningún producto o servicio sin el consentimiento previo por escrito de AFORTU.</p>

            <h2>6. Limitación de Responsabilidad</h2>
            <p>En ningún caso AFORTU, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo, sin limitación, la pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de (i) tu acceso o uso o incapacidad para acceder o usar el servicio; (ii) cualquier conducta o contenido de cualquier tercero en el servicio; y (iii) el acceso no autorizado, uso o alteración de tus transmisiones o contenido. El uso de la plataforma es bajo tu propio riesgo.</p>
            
            <h2>7. Cambios en los Términos</h2>
            <p>Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso de al menos 30 días antes de que los nuevos términos entren en vigencia. Lo que constituye un cambio material se determinará a nuestra sola discreción.</p>

            <h2>8. Contacto</h2>
            <p>Si tienes alguna pregunta sobre estos Términos, por favor contáctanos en <a href="mailto:contacto@afortu.com.mx">contacto@afortu.com.mx</a>.</p>
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

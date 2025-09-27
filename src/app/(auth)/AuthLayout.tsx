import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/afortu.firebasestorage.app/o/LOGO%20DE%20AFORTU.PNG?alt=media&token=2e8530a1-30d3-4c0d-974e-46451594f7fb"
                alt="AFORTU Logo"
                width={60}
                height={60}
                className="mx-auto"
              />
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>
          {children}
        </div>
      </div>
      <div className="hidden bg-muted lg:flex flex-col items-center justify-center p-12 text-center border-l">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/afortu.firebasestorage.app/o/Sitio%20Web%20Link%20en%20Bio%20Tecnologi%CC%81a%20y%20Gaming%20Sencillo%20Azul%20Oscuro(2).png?alt=media&token=03d3c1e2-bdfe-40e0-8266-8ec29d4339ba"
          alt="AFORTU Platform"
          width={400}
          height={400}
          className="rounded-lg mb-8 shadow-2xl"
          priority
        />
        <h2 className="text-3xl font-bold">
          Tu Futuro Financiero, Simplificado
        </h2>
        <p className="text-lg max-w-md text-muted-foreground mt-2">
          Accede a herramientas de inversión, asesoría inteligente y un control
          total de tu patrimonio en un solo lugar.
        </p>
      </div>
    </div>
  );
}

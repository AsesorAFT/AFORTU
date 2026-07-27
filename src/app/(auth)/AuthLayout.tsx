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
                src="/logo-afortu-icon.svg"
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
          src="/logo-afortu-pro.svg"
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

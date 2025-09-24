import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import AfortuProSerious from '@/components/ui/afortu-pro-serious';

export const metadata: Metadata = {
  title: 'AFORTU PRO - Gestión Patrimonial Inteligente',
  description: 'Plataforma profesional para la gestión de activos, inversiones y planificación financiera. Potenciada por IA y asesoría especializada para maximizar tu patrimonio.',
  keywords: ['gestión patrimonial', 'inversiones', 'planificación financiera', 'activos', 'asesoría financiera', 'inteligencia artificial', 'AFORTU PRO'],
  authors: [{ name: 'AFORTU PRO' }],
  creator: 'AFORTU PRO',
  publisher: 'AFORTU PRO',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/logo-afortu-pro.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://afortu-pro.com',
    title: 'AFORTU PRO - Gestión Patrimonial Inteligente',
    description: 'Plataforma profesional para la gestión de activos e inversiones potenciada por IA.',
    siteName: 'AFORTU PRO',
    images: [
      {
        url: '/logo-afortu-pro.svg',
        width: 400,
        height: 500,
        alt: 'AFORTU PRO Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AFORTU PRO - Gestión Patrimonial Inteligente',
    description: 'Plataforma profesional para la gestión de activos e inversiones potenciada por IA.',
    images: ['/logo-afortu-pro.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 448 512" {...props}>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.2-26.7l-7-4.1-69.8 18.3L72 359.2l-4.4-7.3c-18.5-30.6-28.2-66.3-28.2-103.3 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/525548144552"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
    >
      <WhatsAppIcon className="h-8 w-8" />
      <span className="sr-only">Contactar por WhatsApp</span>
    </Link>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">
        {/* Header fijo con logo */}
        <header className="flex h-16 items-center px-4 lg:px-6 bg-white/95 backdrop-blur-sm shadow-lg fixed top-0 w-full z-50 border-b border-[#DAA520]/20">
          <Link href="/" className="flex items-center gap-2 font-semibold hover:opacity-90 transition-opacity">
            <AfortuProSerious size="sm" animated={true} className="hover:scale-105 transition-transform duration-200" />
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/services" className="text-sm font-medium text-[#0a1931] hover:text-[#185adb] transition-colors">
                Servicios
              </Link>
              <Link href="/about" className="text-sm font-medium text-[#0a1931] hover:text-[#185adb] transition-colors">
                Nosotros
              </Link>
              <Link href="/dashboard" className="text-sm font-medium text-[#185adb] hover:text-[#0a1931] transition-colors">
                Dashboard
              </Link>
            </nav>
            <Link 
              href="/login" 
              className="bg-[#f7c873] hover:bg-[#ffd700] text-[#0a1931] px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-md"
            >
              Acceder
            </Link>
          </div>
        </header>
        <main className="pt-16">{children}</main>
        <Toaster />
        <WhatsAppButton />
      </body>
    </html>
  );
}

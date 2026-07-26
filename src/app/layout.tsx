import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

export const metadata: Metadata = {
  metadataBase: new URL("https://afortu.com.mx"),
  title: {
    default: "AFORTU | Arquitectura patrimonial",
    template: "%s | AFORTU",
  },
  description:
    "Coordinación patrimonial para decisiones de patrimonio, retiro y legado mediante un modelo de Asesor Principal.",
  keywords: [
    "arquitectura patrimonial",
    "retiro",
    "legado",
    "planeación patrimonial",
    "AFORTU",
  ],
  authors: [{ name: "AFORTU" }],
  creator: "AFORTU",
  publisher: "AFORTU",
  icons: {
    icon: [
      {
        url: "/media/brand/afortu-emblem.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/media/brand/afortu-emblem.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://afortu.com.mx",
    title: "AFORTU | Arquitectura patrimonial",
    description:
      "Coordinación patrimonial para decisiones de patrimonio, retiro y legado.",
    siteName: "AFORTU",
    images: [
      {
        url: "/afortu-architecture-hero-v2.webp",
        width: 1586,
        height: 992,
        alt: "AFORTU, arquitectura patrimonial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AFORTU | Arquitectura patrimonial",
    description:
      "Coordinación patrimonial para decisiones de patrimonio, retiro y legado.",
    images: ["/afortu-architecture-hero-v2.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <WhatsAppButton />
      </body>
    </html>
  );
}

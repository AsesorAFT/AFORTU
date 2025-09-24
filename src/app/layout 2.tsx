import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AFORTU PRO - Gestión Patrimonial de Élite",
  description: "Plataforma premium para inversionistas institucionales y clientes de alto patrimonio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceso privado",
  description: "Información sobre el acceso privado para clientes de AFORTU.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

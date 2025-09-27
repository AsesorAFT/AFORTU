
import type { ReactNode } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Briefcase, Home, LogOut, Search } from 'lucide-react';
import '@/app/globals.css';
import { ClientOnly } from '@/components/layout/ClientOnly';
import Sidebar from '@/components/layout/Sidebar';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { UserNav } from '@/components/layout/user-nav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChatAsesor } from '@/components/dashboard/chat-asesor';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Dashboard | AFORTU',
  description: 'Panel principal de Asesor AFT',
};

function GlobalHeader() {
    return (
        <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm sticky top-0 z-30">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/afortu.firebasestorage.app/o/LOGO%20DE%20AFORTU.PNG?alt=media&token=2e8530a1-30d3-4c0d-974e-46451594f7fb"
                alt="AFORTU Logo"
                width={128}
                height={128}
                className="h-8 w-auto"
              />
              <span className="sr-only">AFORTU</span>
            </Link>
          </div>
          
          <div className="flex-1 flex justify-center px-4 lg:px-8">
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Búsqueda Global..." className="pl-10 h-9 bg-muted/50 focus:bg-background" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ChatAsesor />
            <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                <Link href="/dashboard" aria-label="Inicio"><Home className="h-5 w-5" /></Link>
            </Button>
            <UserNav />
          </div>
        </div>
      </header>
    )
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex h-screen w-full bg-muted/40">
        <aside className="w-[280px] h-full fixed z-40 hidden lg:block">
          <ClientOnly>
            <Sidebar />
          </ClientOnly>
        </aside>
        <div className="flex flex-col flex-1 lg:ml-[280px]">
          <GlobalHeader />
          <main className="flex-1 overflow-y-auto">
             {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

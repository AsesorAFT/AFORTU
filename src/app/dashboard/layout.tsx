
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PanelLeft,
  Search,
  Briefcase,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { UserNav } from '@/components/layout/user-nav';
import { NavMenu } from '@/components/layout/nav-menu';
import { cn } from '@/lib/utils';
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from '@/components/ui/resizable';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
       <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
              <Briefcase className="h-12 w-12 animate-pulse text-primary" />
              <p className="text-muted-foreground">Cargando AFORTU...</p>
          </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen w-full">
        <ResizablePanel
          defaultSize={15}
          minSize={15}
          maxSize={20}
          collapsible={true}
          collapsedSize={4}
          onCollapse={() => setIsCollapsed(true)}
          onExpand={() => setIsCollapsed(false)}
          className={cn(
            'hidden md:block bg-background transition-all duration-300 ease-in-out',
            isCollapsed ? 'min-w-[50px]' : 'min-w-[200px]'
          )}
        >
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Briefcase className="h-6 w-6" />
              <span className={cn(isCollapsed && 'hidden')}>AFORTU</span>
            </Link>
          </div>
          <NavMenu isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden md:flex" />
        <ResizablePanel defaultSize={85}>
          <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 lg:h-[60px]">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs p-0">
                  <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                      <Briefcase className="h-6 w-6" />
                      <span>AFORTU</span>
                    </Link>
                  </div>
                  <NavMenu isCollapsed={false} />
                </SheetContent>
              </Sheet>
              <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
              </div>
              <div className="ml-auto flex items-center gap-4">
                <UserNav />
              </div>
            </header>
            <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

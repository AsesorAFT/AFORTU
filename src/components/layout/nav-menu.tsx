
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calendar,
  Settings,
  Bot,
  Package,
  CreditCard,
  Briefcase,
  Target,
  FileText,
  Wrench,
  HandCoins,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  { href: '/dashboard', icon: Briefcase, label: 'Activos' },
  { href: '/objectives', icon: Target, label: 'Objetivos' },
  { href: '/calendar', icon: Calendar, label: 'Bitácora' },
  { href: '/analysis', icon: Bot, label: 'Asesor AFT' },
  { href: '/billing', icon: CreditCard, label: 'Facturas' },
  { href: '/contracts', icon: FileText, label: 'Contratos' },
  { href: '/services', icon: HandCoins, label: 'Servicios' },
];

export function NavMenu({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <div
        data-collapsed={isCollapsed}
        className="flex flex-col justify-between h-full"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 pt-2">
          {navItems.map((item) => (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
                  className={cn(
                    'justify-start',
                    isCollapsed && 'justify-center h-9 w-9'
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span
                      className={cn(
                        'ml-4',
                        isCollapsed && 'hidden'
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">{item.label}</TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>
        <div className="px-2 pb-2 mt-auto">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  'justify-start mt-4',
                  isCollapsed && 'justify-center h-9 w-9'
                )}
              >
                <Link href="/settings">
                  <Settings className="h-4 w-4" />
                  <span
                    className={cn(
                      'ml-4',
                      isCollapsed && 'hidden'
                    )}
                  >
                    Configuración
                  </span>
                </Link>
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">Configuración</TooltipContent>
            )}
          </Tooltip>
           <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  'justify-start mt-4',
                  isCollapsed && 'justify-center h-9 w-9'
                )}
              >
                <Link href="/tools">
                  <Wrench className="h-4 w-4" />
                  <span
                    className={cn(
                      'ml-4',
                      isCollapsed && 'hidden'
                    )}
                  >
                    Tools
                  </span>
                </Link>
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">Tools</TooltipContent>
            )}
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}

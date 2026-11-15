import { BriefcaseBusiness, Compass, House, MessagesSquare, Wallet, type LucideIcon } from 'lucide-react';

export interface OsNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const OS_NAV: OsNavItem[] = [
  { href: '/os', label: 'Inicio', icon: House },
  { href: '/os/cuentas', label: 'Cuentas', icon: Wallet },
  { href: '/os/servicios', label: 'Servicios', icon: BriefcaseBusiness },
  { href: '/os/plus', label: 'OS+', icon: Compass },
  { href: '/os/asesor', label: 'Asesor', icon: MessagesSquare },
];

export function isNavActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === '/os') return pathname === '/os';
  return pathname === href || pathname.startsWith(`${href}/`);
}

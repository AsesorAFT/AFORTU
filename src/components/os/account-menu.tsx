'use client';

import Link from 'next/link';
import { ChevronDown, MessagesSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { OsClient } from './os-header';

export function AccountMenu({ client }: { client: OsClient }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="os-account-trigger" aria-label={`Menú de ${client.name}`}>
          <span className="os-avatar" aria-hidden="true">
            {client.initials}
          </span>
          <span className="os-account-trigger__name" aria-hidden="true">
            {client.firstName}
          </span>
          <ChevronDown className="os-account-trigger__chev" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="afortu-os os-menu">
        <DropdownMenuLabel className="os-menu__label">
          <span className="os-menu__name">{client.name}</span>
          <span className="os-menu__meta">Cliente de demostración</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="os-menu__sep" />
        <DropdownMenuItem asChild className="os-menu__item">
          <Link href="/os/asesor">
            <MessagesSquare aria-hidden="true" />
            Contactar a mi asesor
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="os-menu__sep" />
        <p className="os-menu__note">Prototipo sin inicio de sesión.</p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

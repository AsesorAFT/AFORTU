'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { OS_NAV, isNavActive } from './nav-items';

export function OsBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="os-tabbar" aria-label="Principal">
      <ul>
        {OS_NAV.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="os-tab"
              aria-current={isNavActive(pathname, href) ? 'page' : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

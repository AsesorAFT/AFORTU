'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ServicePillarCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export function ServicePillarCard({ icon: Icon, title, description, href }: ServicePillarCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#f7c873]/50 hover:bg-white/10 hover:shadow-xl hover:shadow-[#f7c873]/10 md:p-8"
    >
      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#f7c873] to-[#ffd700] shadow-lg transition-transform group-hover:scale-110">
        <Icon className="h-7 w-7 text-[#0a1931]" strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="mb-2 text-xl font-semibold text-white md:text-2xl">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-300 md:text-base">{description}</p>
      </div>

      {/* Arrow indicator */}
      <div className="flex items-center gap-2 text-sm font-medium text-[#f7c873] transition-all group-hover:gap-3">
        <span>Conocer más</span>
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

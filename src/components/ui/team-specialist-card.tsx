'use client';

import { LucideIcon } from 'lucide-react';

interface TeamSpecialistCardProps {
  icon: LucideIcon;
  role: string;
  description: string;
  color?: 'gold' | 'blue' | 'teal' | 'purple';
}

const colorClasses = {
  gold: 'from-[#f7c873] to-[#ffd700]',
  blue: 'from-[#185adb] to-[#3b82f6]',
  teal: 'from-[#14b8a6] to-[#06b6d4]',
  purple: 'from-[#a855f7] to-[#c084fc]',
};

export function TeamSpecialistCard({ icon: Icon, role, description, color = 'gold' }: TeamSpecialistCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
      {/* Icon */}
      <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${colorClasses[color]} shadow-md`}>
        <Icon className="h-6 w-6 text-white" strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="mb-1 font-semibold text-white">{role}</h4>
        <p className="text-sm leading-relaxed text-slate-300">{description}</p>
      </div>
    </div>
  );
}

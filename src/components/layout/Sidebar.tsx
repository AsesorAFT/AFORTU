'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Briefcase,
  User,
  FileSignature,
  Calendar,
  LogOut,
  Settings,
  Home,
  FileBarChart,
  CreditCard,
  Shield,
  LifeBuoy,
  UserCheck,
  History,
  BookOpen,
  TrendingUp,
  Clock,
} from 'lucide-react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '@/lib/firebase';
// import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function getInitials(name?: string | null) {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
}

export default function Sidebar() {
  // const [user, loading] = useAuthState(auth);
  const pathname = usePathname();
  const router = useRouter();
  
  // Usuario simulado para desarrollo
  const user = {
    displayName: 'Usuario Demo',
    email: 'demo@afortu.com',
    photoURL: null
  };
  
  const handleLogout = async () => {
    // await signOut(auth);
    router.push('/login');
  };

  const mainMenu = [
    {
      label: "General",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: "Asset Management",
      href: "/asset-management",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      label: "CAV - Contratos",
      href: "/cav",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      label: "Contratos",
      href: "/contracts",
      icon: <FileSignature className="h-5 w-5" />,
    },
    {
      label: "Facturación",
      href: "/billing",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      label: "Bitácora",
      href: "/coordination",
      icon: <History className="h-5 w-5" />,
    },
     {
      label: "Calendario",
      href: "/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      label: "Servicios",
      href: "/consultoria",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      label: "Análisis IA",
      href: "/analysis",
      icon: <FileBarChart className="h-5 w-5" />,
    },
  ];

  const userMenu = [
    {
      label: "Perfil",
      href: "/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      label: "Configuración",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];
  
  const supportMenu = [
     {
      label: "Soporte y Ayuda",
      href: "mailto:contacto@afortu.com.mx",
      icon: <LifeBuoy className="h-5 w-5" />,
    },
  ]

  const navLink = (item: {href: string, label: string, icon: React.ReactNode}) => {
    const isActive = pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard');
    return (
        <Link
        key={item.href}
        href={item.href}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-semibold text-base transition
            ${isActive
            ? 'bg-[#C9A961] text-white shadow-lg'
            : 'text-[#E8E9EB] hover:bg-white/10'
            }`}
        >
        {item.icon} {item.label}
        </Link>
    )
  };

  return (
    <aside className="h-screen w-[280px] bg-gradient-to-br from-[#2C3E50] via-[#34495E] to-[#2C3E50] border-r border-[#C9A961]/20 flex flex-col fixed z-40 shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-5 border-b border-[#C9A961]/20">
        <Link href="/dashboard" className="flex items-center gap-2.5">
           <Image 
             src="https://firebasestorage.googleapis.com/v0/b/afortu.firebasestorage.app/o/LOGO%20DE%20AFORTU.PNG?alt=media&token=2e8530a1-30d3-4c0d-974e-46451594f7fb" 
             alt="AFORTU Logo" 
             width={140} 
             height={40}
             className="h-10 w-auto"
           />
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-4 flex flex-col gap-4 overflow-y-auto">
         <div className="flex flex-col gap-1">
            {mainMenu.map(navLink)}
         </div>
        
        <div className="mt-auto flex flex-col gap-1">
             <div className="text-[#C9A961] uppercase px-4 pt-2 pb-1 text-xs font-semibold tracking-wider">
                Cuenta
            </div>
            {userMenu.map(navLink)}
            {supportMenu.map(navLink)}
             <Button
                onClick={handleLogout}
                variant="ghost"
                className="flex items-center justify-start gap-3 px-4 py-2.5 rounded-lg font-semibold text-base text-[#E8E9EB] hover:bg-white/10 hover:text-white"
             >
                <LogOut className="h-5 w-5" /> Cerrar Sesión
            </Button>
        </div>
      </nav>

      <div className="px-4 py-4 border-t border-[#C9A961]/20 bg-black/10">
        <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-[#C9A961]">
              <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? 'Usuario'} />
              <AvatarFallback className="bg-[#C9A961]/20 text-[#C9A961] font-bold">
                {getInitials(user?.displayName)}
              </AvatarFallback>
            </Avatar>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm text-white font-semibold truncate">{user?.displayName || 'Usuario'}</div>
            <div className="text-xs text-[#E8E9EB]/70 truncate">{user?.email}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

  
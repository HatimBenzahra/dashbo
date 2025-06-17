// src/components/custom/Sidebar.tsx

import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BarChart,
  Map,
  FileText,
  Settings,
  ChevronDown,
  FolderKanban,
  MapPin, // --- LA CORRECTION EST ICI : On ajoute MapPin à la liste des imports ---
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
};

const NavItem = ({ to, icon: Icon, label, active = false }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "relative flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-black",
        active && "font-bold text-black after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-[calc(100%-1.5rem)] after:-translate-x-1/2 after:rounded-full after:bg-black"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Tableau de Bord" },
    { to: "/managers", icon: Users, label: "Managers" },
    { to: "/salespeople", icon: Briefcase, label: "Commerciaux" },
    { to: "/teams", icon: Briefcase, label: "Équipes" },
    // Maintenant, MapPin est défini et peut être utilisé ici sans erreur
    { to: "/suivi", icon: MapPin, label: "Suivi" }, 
    { to: "/stats", icon: BarChart, label: "Statistiques" },
    { to: "/zones", icon: Map, label: "Zones" },
    { to: "/reports", icon: FileText, label: "Rapports & exports" },
    { to: "/settings", icon: Settings, label: "Paramètres" },
  ];

  return (
    <aside className="hidden w-64 flex-col bg-gray-100 sm:flex">
      <div className="flex-1">
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white">
            <FolderKanban className="h-5 w-5" />
          </div>
          <h1 className="ml-3 text-lg font-bold">Finanssor</h1>
          <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
        </div>
        
        <nav className="grid items-start gap-1 p-4 text-sm font-medium">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.to}
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-black"></div>
          <div className="flex flex-col">
            <span className="font-semibold">Commercial</span>
            <span className="text-xs text-gray-500">
              Commercial@finanssor.com
            </span>
          </div>
          <ChevronDown className="ml-auto h-4 w-4" />
        </div>
      </div>
    </aside>
  );
}
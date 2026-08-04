'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { LayoutDashboard, ShoppingCart, Package, Users, BarChart3, Settings, ChevronLeft, ChevronRight, Bell, LogOut, Warehouse, FileText, Truck, ClipboardList, CreditCard, Globe, User, ShoppingBag, ClipboardCheck } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  group: string;
}

const navItems: NavItem[] = [
  { id: 'nav-dashboard', label: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard, group: 'Principal' },
  { id: 'nav-pos', label: 'Point de vente', href: '/caisse', icon: ShoppingCart, badge: 0, group: 'Ventes' },
  { id: 'nav-ventes', label: 'Historique ventes', href: '/ventes', icon: ShoppingBag, group: 'Ventes' },
  { id: 'nav-catalogue', label: 'Produits & Catalogue', href: '/produits', icon: Package, group: 'Catalogue' },
  { id: 'nav-stock', label: 'Stock', href: '/stock', icon: Warehouse, group: 'Catalogue' },
  { id: 'nav-inventaire', label: 'Inventaire', href: '/inventaire', icon: ClipboardCheck, group: 'Catalogue' },
  { id: 'nav-achats', label: 'Achats', href: '/achats', icon: Truck, group: 'Catalogue' },
  { id: 'nav-fournisseurs', label: 'Fournisseurs', href: '/fournisseurs', icon: ClipboardList, group: 'Catalogue' },
  { id: 'nav-finances', label: 'Finances', href: '/finances', icon: BarChart3, group: 'Gestion' },
  { id: 'nav-utilisateurs', label: 'Utilisateurs', href: '/utilisateurs', icon: Users, group: 'Gestion' },
  { id: 'nav-rapports', label: 'Rapports', href: '/rapports', icon: FileText, group: 'Gestion' },
  { id: 'nav-caisses', label: 'Caisses', href: '/caisses', icon: CreditCard, group: 'Gestion' },
  { id: 'nav-catalogue-public', label: 'Catalogue public', href: '/catalogue', icon: Globe, group: 'Système' },
  { id: 'nav-notifications', label: 'Notifications', href: '/notifications', icon: Bell, badge: 3, group: 'Système' },
  { id: 'nav-parametres', label: 'Paramètres', href: '/parametres', icon: Settings, group: 'Système' },
  { id: 'nav-profil', label: 'Mon profil', href: '/profil', icon: User, group: 'Système' },
];

const groups = ['Principal', 'Ventes', 'Catalogue', 'Gestion', 'Système'];

interface SidebarProps {
  currentPath: string;
}

export default function Sidebar({ currentPath }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/dashboard') return currentPath === '/dashboard' || currentPath === '/';
    return currentPath.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-border ${collapsed ? 'justify-center' : ''}`}>
        <AppLogo size={32} />
        {!collapsed && <span className="font-bold text-base text-foreground tracking-tight">LibrairieNumerique</span>}
      </div>
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {groups.map((group) => {
          const items = navItems.filter((n) => n.group === group);
          if (!items.length) return null;
          return (
            <div key={`group-${group}`} className="mb-4">
              {!collapsed && <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-3 mb-1">{group}</p>}
              {items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link key={item.id} href={item.href} title={collapsed ? item.label : undefined} className={`flex items-center gap-3 px-3 py-2 mb-0.5 text-sm font-medium transition-all duration-150 ${active ? 'nav-item-active' : 'nav-item-inactive'} ${collapsed ? 'justify-center' : ''}`}>
                    <Icon size={18} className="shrink-0" />
                    {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                    {!collapsed && item.badge !== undefined && item.badge > 0 && <span className="bg-primary text-primary-foreground text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">{item.badge}</span>}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>
      <div className="border-t border-border px-2 py-3">
        <button className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium nav-item-inactive mb-1 ${collapsed ? 'justify-center' : ''}`} title={collapsed ? 'Notifications' : undefined}>
          <Bell size={18} className="shrink-0" />
          {!collapsed && <span className="flex-1 text-left">Notifications</span>}
          {!collapsed && <span className="bg-accent text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">3</span>}
        </button>
        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><span className="text-xs font-bold text-primary">AM</span></div>
          {!collapsed && (<div className="flex-1 min-w-0"><p className="text-xs font-semibold text-foreground truncate">Ahmed Mansouri</p><p className="text-[10px] text-muted-foreground">Super Admin</p></div>)}
          {!collapsed && (<Link href="/login" className="text-muted-foreground hover:text-negative transition-colors"><LogOut size={15} /></Link>)}
        </div>
      </div>
      <button onClick={() => setCollapsed(!collapsed)} className="absolute -right-3 top-20 bg-card border border-border rounded-full w-6 h-6 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow z-10" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </div>
  );

  return (
    <>
      <aside className={`relative hidden lg:flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out shrink-0 ${collapsed ? 'w-16' : 'w-60'}`}>
        <SidebarContent />
      </aside>
      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col lg:hidden transform transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>
      <button onClick={() => setMobileOpen(true)} className="fixed top-4 left-4 z-30 lg:hidden bg-card border border-border rounded-lg p-2 shadow-sm" aria-label="Ouvrir le menu">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
    </>
  );
}
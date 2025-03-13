
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  User, 
  Building2, 
  Menu, 
  ChevronLeft 
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', href: '#', active: false },
    { icon: Briefcase, label: 'Projets', href: '#', active: true },
    { icon: FileText, label: 'Mes appels d\'offres', href: '#', active: false },
    { icon: MessageSquare, label: 'Messagerie', href: '#', active: false },
    { icon: User, label: 'Mon profil', href: '#', active: false },
    { icon: Building2, label: 'Mon entreprise', href: '#', active: false },
  ];

  return (
    <aside 
      className={cn(
        'bg-sidebar transition-all duration-300 h-screen flex flex-col',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className={cn('flex items-center overflow-hidden', 
          collapsed ? 'justify-center w-full' : 'justify-start')}>
          <div className="bg-white rounded-md w-8 h-8 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">BTP</span>
          </div>
          {!collapsed && (
            <span className="ml-2 text-white font-semibold whitespace-nowrap">
              BTP CONNECT
            </span>
          )}
        </div>
        <button 
          onClick={toggleSidebar} 
          className={cn(
            "text-white/80 hover:text-white transition-all flex items-center justify-center",
            collapsed ? 'hidden' : 'flex'
          )}
        >
          <ChevronLeft size={18} />
        </button>
      </div>
      
      {/* Mobile toggle button - only visible on smaller screens */}
      <button 
        onClick={toggleSidebar}
        className={cn(
          "absolute top-4 right-0 transform translate-x-full bg-primary p-2 rounded-r text-white md:hidden",
          collapsed ? 'block' : 'hidden'
        )}
      >
        <Menu size={18} />
      </button>

      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <a 
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 rounded-md transition-all duration-200',
                  item.active 
                    ? 'bg-sidebar-accent text-white'
                    : 'text-white/80 hover:bg-sidebar-primary hover:text-white',
                  collapsed ? 'justify-center' : 'justify-start'
                )}
              >
                <item.icon size={collapsed ? 20 : 18} className={collapsed ? '' : 'mr-3'} />
                {!collapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn(
          'flex items-center',
          collapsed ? 'justify-center' : 'justify-start'
        )}>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
            <User size={16} />
          </div>
          {!collapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="text-white text-sm font-medium truncate">Martin Dupont</p>
              <p className="text-white/70 text-xs truncate">martin@entreprise.fr</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

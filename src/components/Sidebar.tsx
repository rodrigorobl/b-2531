
import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  User, 
  Building,
  Search
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border shadow-sm">
      
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        <Link to="/" className="text-xl font-bold text-white">
          BTP CONNECT
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>Mon Profil</DropdownMenuLabel>
            <DropdownMenuItem>Paramètres</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Se déconnecter</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/dashboard' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
            >
              <LayoutDashboard size={18} />
              <span>Tableau de bord</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/projects" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/projects' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
            >
              <Briefcase size={18} />
              <span>Projets</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/tenders" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/tenders' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
            >
              <FileText size={18} />
              <span>Mes appels d'offres</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/tender-search" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/tender-search' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
            >
              <Search size={18} />
              <span>Recherche AO</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/messaging" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/messaging' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
            >
              <MessageSquare size={18} />
              <span>Messagerie</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/profile" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/profile' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
            >
              <User size={18} />
              <span>Mon profil</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/company" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/company' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
            >
              <Building size={18} />
              <span>Mon entreprise</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/70">
          © 2023 BTP CONNECT
        </p>
      </div>
    </aside>
  );
}

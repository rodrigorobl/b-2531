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

export default function Sidebar() {
  return (
    <aside className="sidebar">
      
      <div className="sidebar-header">
        <a href="/" className="logo">
          BTP CONNECT
        </a>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="user-button">
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
      
      <div className="sidebar-nav">
        <nav className="menu">
          <a href="/dashboard" className="menu-item">
            <LayoutDashboard size={18} />
            <span>Tableau de bord</span>
          </a>
          <a href="/projects" className="menu-item">
            <Briefcase size={18} />
            <span>Projets</span>
          </a>
          <a href="/tenders" className="menu-item">
            <FileText size={18} />
            <span>Mes appels d'offres</span>
          </a>
          <a href="/tender-search" className="menu-item">
            <Search size={18} />
            <span>Recherche AO</span>
          </a>
          <a href="/messaging" className="menu-item">
            <MessageSquare size={18} />
            <span>Messagerie</span>
          </a>
          <a href="/profile" className="menu-item">
            <User size={18} />
            <span>Mon profil</span>
          </a>
          <a href="/company" className="menu-item">
            <Building size={18} />
            <span>Mon entreprise</span>
          </a>
        </nav>
      </div>
      
      <div className="sidebar-footer">
        <p className="text-xs text-muted-foreground">
          © 2023 BTP CONNECT
        </p>
      </div>
    </aside>
  );
}

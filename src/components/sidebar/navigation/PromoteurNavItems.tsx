
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, List, Plus } from 'lucide-react';

export const PromoteurNavItems: React.FC = () => {
  const location = useLocation();
  
  return (
    <>
      <li>
        <Link to="/projects" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/projects' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <Briefcase size={18} />
          <span>Mes Projets</span>
        </Link>
      </li>
      <li>
        <Link to="/tender-list" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/tender-list' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <List size={18} />
          <span>Liste des AO</span>
        </Link>
      </li>
      <li>
        <Link to="/create-tender" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname.startsWith('/create-tender') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <Plus size={18} />
          <span>Créer un AO</span>
        </Link>
      </li>
    </>
  );
};

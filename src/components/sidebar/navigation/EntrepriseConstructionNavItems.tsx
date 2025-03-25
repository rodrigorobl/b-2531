
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Search } from 'lucide-react';

export const EntrepriseConstructionNavItems: React.FC = () => {
  const location = useLocation();
  
  return (
    <>
      <li>
        <Link to="/tenders" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/tenders' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <Briefcase size={18} />
          <span>Mes appels d'offres</span>
        </Link>
      </li>
      <li>
        <Link to="/tender-search" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/tender-search' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <Search size={18} />
          <span>Rechercher des projets</span>
        </Link>
      </li>
    </>
  );
};

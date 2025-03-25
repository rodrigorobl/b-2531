
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ClipboardCheck, Search, Ruler } from 'lucide-react';

export const MaitreOeuvreNavItems: React.FC = () => {
  const location = useLocation();
  
  return (
    <>
      <li>
        <Link to="/moe-list" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/moe-list' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <List size={18} />
          <span>Mes Appels d'Offres</span>
        </Link>
      </li>
      <li>
        <Link to="/quotes-to-analyze" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/quotes-to-analyze' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <ClipboardCheck size={18} />
          <span>Offres à analyser</span>
        </Link>
      </li>
      <li>
        <Link to="/opportunities-search" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/opportunities-search' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <Search size={18} />
          <span>Recherche d'opportunités</span>
        </Link>
      </li>
    </>
  );
};

export const MaitreOeuvreSpecialModules: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <div className="mt-8 mb-2 text-xs font-semibold uppercase text-sidebar-foreground/70 px-3">
        Modules spécialisés
      </div>
      <ul className="space-y-2">
        <li>
          <Link 
            to="/quantity-surveyor-page" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${
              location.pathname === '/quantity-surveyor-page' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
            }`}
          >
            <Ruler size={18} />
            <span>Module métreurs</span>
          </Link>
        </li>
      </ul>
    </>
  );
};

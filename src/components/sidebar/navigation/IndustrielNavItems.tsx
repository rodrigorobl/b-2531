
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clipboard, BookMarked, FolderSearch } from 'lucide-react';

export const IndustrielNavItems: React.FC = () => {
  const location = useLocation();
  
  return (
    <>
      <li>
        <Link to="/product-prescription" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/product-prescription' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <Clipboard size={18} />
          <span>Suivi de la prescription</span>
        </Link>
      </li>
      <li>
        <Link to="/product-reference" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/product-reference' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <BookMarked size={18} />
          <span>Suivi du référencement</span>
        </Link>
      </li>
      <li>
        <Link to="/projects-search" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/projects-search' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <FolderSearch size={18} />
          <span>Recherche de projets</span>
        </Link>
      </li>
    </>
  );
};

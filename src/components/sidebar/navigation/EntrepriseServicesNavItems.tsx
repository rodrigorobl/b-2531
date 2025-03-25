
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, FileSpreadsheet, Search } from 'lucide-react';

export const EntrepriseServicesNavItems: React.FC = () => {
  const location = useLocation();
  
  return (
    <>
      <li>
        <Link to="/construction-sites-map" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/construction-sites-map' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <MapPin size={18} />
          <span>Carte des chantiers</span>
        </Link>
      </li>
      <li>
        <Link to="/services-quote-management" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname.includes('/services-quote') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <FileSpreadsheet size={18} />
          <span>Gestion des devis</span>
        </Link>
      </li>
      <li>
        <Link to="/services-tender-search" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/services-tender-search' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <Search size={18} />
          <span>Recherche d'appels d'offres</span>
        </Link>
      </li>
    </>
  );
};


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, User, Building } from 'lucide-react';
import { ProfileType } from '../ProfileSelector';

interface CommonNavItemsProps {
  activeProfile: ProfileType;
}

export const CommonNavItems: React.FC<CommonNavItemsProps> = ({ activeProfile }) => {
  const location = useLocation();
  
  const getCompanyRoute = () => {
    if (activeProfile === 'entreprise-services') {
      return '/company-services';
    }
    return '/company';
  };
  
  return (
    <>
      <li>
        <Link to="/messaging" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/messaging' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <MessageSquare size={18} />
          <span>Messagerie</span>
        </Link>
      </li>
      <li>
        <Link to="/profile" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/profile' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <User size={18} />
          <span>Mon profil</span>
        </Link>
      </li>
      <li>
        <Link to={getCompanyRoute()} className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/company' || location.pathname === '/company-services' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
          <Building size={18} />
          <span>Mon entreprise</span>
        </Link>
      </li>
    </>
  );
};

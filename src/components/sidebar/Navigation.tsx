
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileText, MessageSquare, User, Building, Search, MailOpen } from 'lucide-react';
import { ProfileType, getProfileName } from './ProfileSelector';

interface NavigationProps {
  activeProfile: ProfileType;
}
export const Navigation: React.FC<NavigationProps> = ({
  activeProfile
}) => {
  const location = useLocation();
  return <nav className="flex-1 overflow-y-auto p-4">
      <div className="mb-2 text-xs font-semibold uppercase text-sidebar-foreground/70 px-3">
        {getProfileName(activeProfile)}
      </div>
      <ul className="space-y-2">
        <li>
          <Link to="/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/dashboard' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
            <LayoutDashboard size={18} />
            <span>Tableau de bord</span>
          </Link>
        </li>
        <li>
          <Link to="/projects" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/projects' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
            <Briefcase size={18} />
            <span>Projets</span>
          </Link>
        </li>
        {(activeProfile === 'entreprise-construction' || activeProfile === 'entreprise-services' || activeProfile === 'industriel') && <>
            <li>
              <Link to="/tenders" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/tenders' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
                <FileText size={18} />
                <span>Mes appels d'offres</span>
              </Link>
            </li>
            <li>
              <Link to="/tender-search" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/tender-search' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
                <Search size={18} />
                <span>Recherche AO</span>
              </Link>
            </li>
          </>}
        {(activeProfile === 'promoteur' || activeProfile === 'maitre-oeuvre') && <li>
            <Link to="/tender-management" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/tender-management' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
              <FileText size={18} />
              <span>Gestion des AO</span>
            </Link>
          </li>}
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
          <Link to="/company" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/company' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
            <Building size={18} />
            <span>Mon entreprise</span>
          </Link>
        </li>
      </ul>
    </nav>;
};

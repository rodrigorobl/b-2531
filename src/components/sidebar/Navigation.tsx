
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileText, MessageSquare, User, Building, Search, Package, BookOpen, List, ClipboardCheck, MapPin, HardHat, Wrench, FileSpreadsheet } from 'lucide-react';
import { ProfileType, getProfileName } from './ProfileSelector';
interface NavigationProps {
  activeProfile: ProfileType;
}
export const Navigation: React.FC<NavigationProps> = ({
  activeProfile
}) => {
  const location = useLocation();
  const getDashboardRoute = () => {
    switch (activeProfile) {
      case 'promoteur':
        return '/dashboard-promoteur';
      case 'maitre-oeuvre':
        return '/dashboard-bet';
      case 'entreprise-construction':
        return '/dashboard-construction';
      case 'entreprise-services':
        return '/dashboard-services';
      case 'industriel':
        return '/dashboard-industry';
      default:
        return '/dashboard';
    }
  };
  const isActiveDashboard = () => {
    const dashboardRoutes = ['/dashboard', '/dashboard-promoteur', '/dashboard-bet', '/dashboard-construction', '/dashboard-services', '/dashboard-industry'];
    return dashboardRoutes.includes(location.pathname);
  };
  return <nav className="flex-1 overflow-y-auto p-4">
      <div className="mb-2 text-xs font-semibold uppercase text-sidebar-foreground/70 px-3">
        {getProfileName(activeProfile)}
      </div>
      <ul className="space-y-2">
        <li>
          <Link to={getDashboardRoute()} className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${isActiveDashboard() ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
            <LayoutDashboard size={18} />
            <span>Tableau de bord</span>
          </Link>
        </li>
        {activeProfile === 'promoteur' && <>
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
          </>}
        {activeProfile !== 'promoteur' && <li>
            
          </li>}
        {activeProfile === 'maitre-oeuvre' && <>
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
          </>}
        {(activeProfile === 'entreprise-construction' || activeProfile === 'entreprise-services' || activeProfile === 'industriel') && <>
            <li>
              
            </li>
            <li>
              
            </li>
          </>}
        {activeProfile === 'entreprise-services' && <>
            <li>
              <Link to="/construction-sites-map" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/construction-sites-map' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
                <MapPin size={18} />
                <span>Carte des chantiers</span>
              </Link>
            </li>
            <li>
              <Link to="/quotes-to-analyze" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/quotes-to-analyze' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
                <HardHat size={18} />
                <span>Devis en attente</span>
              </Link>
            </li>
            <li>
              <Link to="/company-services" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/company-services' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
                <Wrench size={18} />
                <span>Mes services</span>
              </Link>
            </li>
            <li>
              <Link to="/services-quote-management" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname.includes('/services-quote') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
                <FileSpreadsheet size={18} />
                <span>Gestion des devis</span>
              </Link>
            </li>
          </>}
        {activeProfile === 'industriel' && <>
            <li>
              <Link to="/product-reference" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/product-reference' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
                <Package size={18} />
                <span>Suivi des références</span>
              </Link>
            </li>
            <li>
              <Link to="/projects-search" className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/projects-search' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
                <Search size={18} />
                <span>Recherche de projets</span>
              </Link>
            </li>
          </>}
        <li>
          <Link to={activeProfile === 'promoteur' || activeProfile === 'maitre-oeuvre' ? '/quoted-directory' : '/directory'} className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/quoted-directory' || location.pathname === '/directory' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
            <BookOpen size={18} />
            <span>Annuaire</span>
          </Link>
        </li>
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

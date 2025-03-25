
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import { ProfileType, getProfileName } from './ProfileSelector';
import { PromoteurNavItems } from './navigation/PromoteurNavItems';
import { MaitreOeuvreNavItems, MaitreOeuvreSpecialModules } from './navigation/MaitreOeuvreNavItems';
import { EntrepriseConstructionNavItems } from './navigation/EntrepriseConstructionNavItems';
import { EntrepriseServicesNavItems } from './navigation/EntrepriseServicesNavItems';
import { IndustrielNavItems } from './navigation/IndustrielNavItems';
import { CommonNavItems } from './navigation/CommonNavItems';

interface NavigationProps {
  activeProfile: ProfileType;
}

export const Navigation: React.FC<NavigationProps> = ({ activeProfile }) => {
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

  return (
    <nav className="flex-1 overflow-y-auto p-4">
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
        
        {/* Profile-specific navigation items */}
        {activeProfile === 'promoteur' && <PromoteurNavItems />}
        {activeProfile === 'maitre-oeuvre' && <MaitreOeuvreNavItems />}
        {activeProfile === 'entreprise-construction' && <EntrepriseConstructionNavItems />}
        {activeProfile === 'entreprise-services' && <EntrepriseServicesNavItems />}
        {activeProfile === 'industriel' && <IndustrielNavItems />}

        {/* Common navigation items for all profiles */}
        <CommonNavItems activeProfile={activeProfile} />
      </ul>

      {/* Specialized modules section (currently only for MaitreOeuvre) */}
      {activeProfile === 'maitre-oeuvre' && <MaitreOeuvreSpecialModules />}
    </nav>
  );
};

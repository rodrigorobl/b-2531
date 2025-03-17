
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ProfileSelector, ProfileType } from './sidebar/ProfileSelector';
import { UserProfile } from './sidebar/UserProfile';
import { Navigation } from './sidebar/Navigation';

// Clé pour stocker le profil actif dans localStorage
const ACTIVE_PROFILE_KEY = 'btp-connect-active-profile';

export default function Sidebar() {
  const [activeProfile, setActiveProfile] = useState<ProfileType>('entreprise-construction');
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer le profil sauvegardé au chargement du composant
  useEffect(() => {
    const savedProfile = localStorage.getItem(ACTIVE_PROFILE_KEY) as ProfileType | null;
    if (savedProfile) {
      setActiveProfile(savedProfile);
    }
  }, []);

  // Mock user data - this would normally come from your auth system
  const user = {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    avatarUrl: "https://github.com/shadcn.png"
  };

  const handleProfileChange = (value: ProfileType) => {
    // Ne pas changer de profil si on est sur la page project-detail
    if (location.pathname.includes('/project-detail/') && value !== 'promoteur') {
      // Si on essaie de changer pour un profil non-promoteur depuis la page project-detail,
      // on empêche le changement et on reste sur 'promoteur'
      return;
    }
    
    // Stocker le profil sélectionné dans localStorage
    localStorage.setItem(ACTIVE_PROFILE_KEY, value);
    setActiveProfile(value);
    
    // Rediriger vers le dashboard correspondant sauf si on est sur project-detail
    if (!location.pathname.includes('/project-detail/')) {
      navigateToProfileDashboard(value);
    }
  };

  // Fonction utilitaire pour obtenir l'URL du dashboard selon le profil
  const getDashboardUrl = (profile: ProfileType): string => {
    switch (profile) {
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

  // Navigation vers le dashboard correspondant au profil
  const navigateToProfileDashboard = (profile: ProfileType) => {
    const dashboardUrl = getDashboardUrl(profile);
    
    // Ne rediriger que si l'utilisateur n'est pas déjà sur la page de destination
    if (location.pathname !== dashboardUrl) {
      navigate(dashboardUrl);
    }
  };

  return (
    <aside className="w-64 h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border shadow-sm">
      
      <div className="p-4 flex flex-col gap-3 border-b border-sidebar-border">
        <Link to="/" className="text-xl font-bold text-white">
          BTP CONNECT
        </Link>
        
        <ProfileSelector 
          activeProfile={activeProfile} 
          onProfileChange={handleProfileChange} 
        />
        
        <UserProfile user={user} />
      </div>
      
      <Navigation activeProfile={activeProfile} />
      
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/70">
          © 2023 BTP CONNECT
        </p>
      </div>
    </aside>
  );
}

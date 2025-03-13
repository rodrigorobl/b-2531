
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  User, 
  Building,
  Search,
  TrendingUp,
  DraftingCompass,
  Factory,
  Hammer,
  ChevronDown
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Link, useLocation } from 'react-router-dom';

type ProfileType = 'promoteur' | 'maitre-oeuvre' | 'entreprise-construction' | 'entreprise-services' | 'industriel';

export default function Sidebar() {
  const location = useLocation();
  const [activeProfile, setActiveProfile] = useState<ProfileType>('entreprise-construction');

  // Mock user data - this would normally come from your auth system
  const user = {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    avatarUrl: "https://github.com/shadcn.png"
  };

  const getProfileIcon = (profile: ProfileType) => {
    switch (profile) {
      case 'promoteur':
        return <TrendingUp size={18} />;
      case 'maitre-oeuvre':
        return <DraftingCompass size={18} />;
      case 'entreprise-construction':
        return <Hammer size={18} />;
      case 'entreprise-services':
        return <Briefcase size={18} />;
      case 'industriel':
        return <Factory size={18} />;
      default:
        return <Building size={18} />;
    }
  };

  const getProfileName = (profile: ProfileType) => {
    switch (profile) {
      case 'promoteur':
        return 'Promoteur';
      case 'maitre-oeuvre':
        return 'Maître d\'Œuvre/BET';
      case 'entreprise-construction':
        return 'Entreprise de construction';
      case 'entreprise-services':
        return 'Entreprise de services';
      case 'industriel':
        return 'Industriel';
      default:
        return 'Profil';
    }
  };

  const handleProfileChange = (value: string) => {
    setActiveProfile(value as ProfileType);
  };

  return (
    <aside className="w-64 h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border shadow-sm">
      
      <div className="p-4 flex flex-col gap-3 border-b border-sidebar-border">
        <Link to="/" className="text-xl font-bold text-white">
          BTP CONNECT
        </Link>
        
        <Select value={activeProfile} onValueChange={handleProfileChange}>
          <SelectTrigger className="w-full bg-sidebar-accent text-sidebar-foreground">
            <div className="flex items-center gap-2">
              {getProfileIcon(activeProfile)}
              <SelectValue placeholder="Sélectionner un profil" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="promoteur">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} />
                <span>Promoteur</span>
              </div>
            </SelectItem>
            <SelectItem value="maitre-oeuvre">
              <div className="flex items-center gap-2">
                <DraftingCompass size={16} />
                <span>Maître d'Œuvre/BET</span>
              </div>
            </SelectItem>
            <SelectItem value="entreprise-construction">
              <div className="flex items-center gap-2">
                <Hammer size={16} />
                <span>Entreprise de construction</span>
              </div>
            </SelectItem>
            <SelectItem value="entreprise-services">
              <div className="flex items-center gap-2">
                <Briefcase size={16} />
                <span>Entreprise de services</span>
              </div>
            </SelectItem>
            <SelectItem value="industriel">
              <div className="flex items-center gap-2">
                <Factory size={16} />
                <span>Industriel</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none">
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>Mon Profil</DropdownMenuLabel>
              <DropdownMenuItem>Paramètres</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Se déconnecter</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex flex-col text-sm">
            <span className="font-medium">{user.firstName} {user.lastName}</span>
            <span className="text-xs text-sidebar-foreground/70">{user.email}</span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="mb-2 text-xs font-semibold uppercase text-sidebar-foreground/70 px-3">
          {getProfileName(activeProfile)}
        </div>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/dashboard' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
            >
              <LayoutDashboard size={18} />
              <span>Tableau de bord</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/projects" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/projects' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
            >
              <Briefcase size={18} />
              <span>Projets</span>
            </Link>
          </li>
          {(activeProfile === 'entreprise-construction' || activeProfile === 'entreprise-services' || activeProfile === 'industriel') && (
            <>
              <li>
                <Link 
                  to="/tenders" 
                  className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/tenders' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
                >
                  <FileText size={18} />
                  <span>Mes appels d'offres</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/tender-search" 
                  className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/tender-search' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
                >
                  <Search size={18} />
                  <span>Recherche AO</span>
                </Link>
              </li>
            </>
          )}
          {(activeProfile === 'promoteur' || activeProfile === 'maitre-oeuvre') && (
            <li>
              <Link 
                to="/tender-management" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/tender-management' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
              >
                <FileText size={18} />
                <span>Gestion des AO</span>
              </Link>
            </li>
          )}
          <li>
            <Link 
              to="/messaging" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/messaging' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
            >
              <MessageSquare size={18} />
              <span>Messagerie</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/profile" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/profile' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
            >
              <User size={18} />
              <span>Mon profil</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/company" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${location.pathname === '/company' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
            >
              <Building size={18} />
              <span>Mon entreprise</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/70">
          © 2023 BTP CONNECT
        </p>
      </div>
    </aside>
  );
}


import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { ProfileType } from './ProfileSelector';
import {
  Home,
  Building2,
  ClipboardList,
  FileCheck,
  FileText,
  MessageSquare,
  UserCircle2,
  BookOpen,
  Users2
} from 'lucide-react';

interface NavigationProps {
  activeProfile: ProfileType;
}

export function Navigation({ activeProfile }: NavigationProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const linkClass = "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:text-sidebar-foreground-highlight hover:bg-sidebar-highlight";
  const activeLinkClass = "bg-sidebar-highlight text-sidebar-foreground-highlight";
  
  // Navigation pour les promoteurs
  const promoterNavigation = (
    <>
      <Link to="/dashboard-promoteur" className={cn(linkClass, isActive('/dashboard-promoteur') && activeLinkClass)}>
        <Home size={18} /> Dashboard
      </Link>
      <Link to="/project-management" className={cn(linkClass, isActive('/project-management') && activeLinkClass)}>
        <Building2 size={18} /> Projets
      </Link>
      <Link to="/tender-management" className={cn(linkClass, isActive('/tender-management') && activeLinkClass)}>
        <ClipboardList size={18} /> Appels d'offres
      </Link>
      <Link to="/messaging" className={cn(linkClass, isActive('/messaging') && activeLinkClass)}>
        <MessageSquare size={18} /> Messagerie
      </Link>
      <Link to="/directory" className={cn(linkClass, isActive('/directory') && activeLinkClass)}>
        <Users2 size={18} /> Annuaire
      </Link>
      <Link to="/company" className={cn(linkClass, isActive('/company') && activeLinkClass)}>
        <UserCircle2 size={18} /> Entreprise
      </Link>
    </>
  );
  
  // Navigation pour les entreprises de construction
  const constructionNavigation = (
    <>
      <Link to="/dashboard-construction" className={cn(linkClass, isActive('/dashboard-construction') && activeLinkClass)}>
        <Home size={18} /> Dashboard
      </Link>
      <Link to="/tender-search" className={cn(linkClass, isActive('/tender-search') && activeLinkClass)}>
        <FileText size={18} /> Recherche d'AO
      </Link>
      <Link to="/my-tenders" className={cn(linkClass, isActive('/my-tenders') && activeLinkClass)}>
        <FileCheck size={18} /> Mes AO
      </Link>
      <Link to="/messaging" className={cn(linkClass, isActive('/messaging') && activeLinkClass)}>
        <MessageSquare size={18} /> Messagerie
      </Link>
      <Link to="/directory" className={cn(linkClass, isActive('/directory') && activeLinkClass)}>
        <Users2 size={18} /> Annuaire
      </Link>
      <Link to="/company" className={cn(linkClass, isActive('/company') && activeLinkClass)}>
        <UserCircle2 size={18} /> Entreprise
      </Link>
    </>
  );
  
  // Navigation pour les entreprises de services
  const servicesNavigation = (
    <>
      <Link to="/dashboard-services" className={cn(linkClass, isActive('/dashboard-services') && activeLinkClass)}>
        <Home size={18} /> Dashboard
      </Link>
      <Link to="/tender-search" className={cn(linkClass, isActive('/tender-search') && activeLinkClass)}>
        <FileText size={18} /> Recherche d'AO
      </Link>
      <Link to="/my-tenders" className={cn(linkClass, isActive('/my-tenders') && activeLinkClass)}>
        <FileCheck size={18} /> Mes AO
      </Link>
      <Link to="/messaging" className={cn(linkClass, isActive('/messaging') && activeLinkClass)}>
        <MessageSquare size={18} /> Messagerie
      </Link>
      <Link to="/directory" className={cn(linkClass, isActive('/directory') && activeLinkClass)}>
        <Users2 size={18} /> Annuaire
      </Link>
      <Link to="/company" className={cn(linkClass, isActive('/company') && activeLinkClass)}>
        <UserCircle2 size={18} /> Entreprise
      </Link>
    </>
  );
  
  // Navigation pour les BET
  const betNavigation = (
    <>
      <Link to="/dashboard-bet" className={cn(linkClass, isActive('/dashboard-bet') && activeLinkClass)}>
        <Home size={18} /> Dashboard
      </Link>
      <Link to="/tender-search" className={cn(linkClass, isActive('/tender-search') && activeLinkClass)}>
        <FileText size={18} /> Recherche d'AO
      </Link>
      <Link to="/messaging" className={cn(linkClass, isActive('/messaging') && activeLinkClass)}>
        <MessageSquare size={18} /> Messagerie
      </Link>
      <Link to="/directory" className={cn(linkClass, isActive('/directory') && activeLinkClass)}>
        <Users2 size={18} /> Annuaire
      </Link>
      <Link to="/company" className={cn(linkClass, isActive('/company') && activeLinkClass)}>
        <UserCircle2 size={18} /> Entreprise
      </Link>
    </>
  );
  
  // Navigation pour les industriels
  const industryNavigation = (
    <>
      <Link to="/dashboard-industry" className={cn(linkClass, isActive('/dashboard-industry') && activeLinkClass)}>
        <Home size={18} /> Dashboard
      </Link>
      <Link to="/tender-search" className={cn(linkClass, isActive('/tender-search') && activeLinkClass)}>
        <FileText size={18} /> Recherche d'AO
      </Link>
      <Link to="/messaging" className={cn(linkClass, isActive('/messaging') && activeLinkClass)}>
        <MessageSquare size={18} /> Messagerie
      </Link>
      <Link to="/directory" className={cn(linkClass, isActive('/directory') && activeLinkClass)}>
        <Users2 size={18} /> Annuaire
      </Link>
      <Link to="/company" className={cn(linkClass, isActive('/company') && activeLinkClass)}>
        <UserCircle2 size={18} /> Entreprise
      </Link>
    </>
  );
  
  // Afficher la navigation en fonction du profil actif
  const renderNavigation = () => {
    switch (activeProfile) {
      case 'promoteur':
        return promoterNavigation;
      case 'maitre-oeuvre':
        return betNavigation;
      case 'entreprise-construction':
        return constructionNavigation;
      case 'entreprise-services':
        return servicesNavigation;
      case 'industriel':
        return industryNavigation;
      default:
        return promoterNavigation;
    }
  };
  
  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid items-start px-2 gap-1">
        {renderNavigation()}
      </nav>
    </div>
  );
}

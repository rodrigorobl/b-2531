
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { 
  ArrowLeft, 
  Eye, 
  FileText,
  Calendar,
  MapPin,
  Building,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectData } from '@/types/projectDetail';
import { formatDate } from '@/utils/tenderFormatUtils';

interface ProjectHeaderProps {
  project: ProjectData;
  setActiveTab: (tab: string) => void;
  navigate: NavigateFunction;
}

export function ProjectHeader({ project, setActiveTab, navigate }: ProjectHeaderProps) {
  // Helper to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'En cours':
      case 'Ouvert':
        return <Badge className="bg-blue-500">En cours</Badge>;
      case 'Clôturé':
        return <Badge className="bg-amber-500">Clôturé</Badge>;
      case 'Attribué':
        return <Badge className="bg-green-600">Attribué</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center mb-1">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={() => navigate('/project-management')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour
        </Button>
        {renderStatusBadge(project.statut)}
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">{project.nom}</h1>
        
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveTab('tenders')}
          >
            <FileText className="h-4 w-4 mr-1" />
            Voir les appels d'offres
          </Button>
          
          <Button>
            <Eye className="h-4 w-4 mr-1" />
            Lancer un nouvel AO
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Building className="h-4 w-4 mr-1" />
          <span>{project.type_projet}</span>
        </div>
        
        {project.localisation && (
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{project.localisation}</span>
          </div>
        )}
        
        {project.date_debut && (
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Début: {formatDate(project.date_debut)}</span>
          </div>
        )}
        
        {project.date_fin && (
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Fin: {formatDate(project.date_fin)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

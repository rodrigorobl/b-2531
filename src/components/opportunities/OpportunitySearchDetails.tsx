
import React from 'react';
import { OpportunitySearchResult } from '@/pages/OpportunitiesSearch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Building, 
  MapPin, 
  Euro, 
  Bookmark, 
  Clock, 
  Users,
  Phone,
  Mail,
  Eye,
  Calendar,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface OpportunitySearchDetailsProps {
  opportunity: OpportunitySearchResult | undefined;
  onToggleFavorite: (opportunityId: string) => void;
  isFavorite: boolean;
}

export default function OpportunitySearchDetails({ 
  opportunity,
  onToggleFavorite,
  isFavorite
}: OpportunitySearchDetailsProps) {
  if (!opportunity) {
    return (
      <div className="w-96 bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center">
        <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="font-medium text-lg mb-2">Détails de l'opportunité</h3>
        <p className="text-center text-muted-foreground">
          Sélectionnez une opportunité pour voir ses détails
        </p>
      </div>
    );
  }

  const getStatusColor = (status: 'active' | 'closing-soon' | 'closed') => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closing-soon': return 'bg-amber-100 text-amber-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return '';
    }
  };
  
  const getPhaseColor = (phase: 'conception' | 'consultation' | 'travaux') => {
    switch(phase) {
      case 'conception': return 'bg-blue-100 text-blue-800';
      case 'consultation': return 'bg-purple-100 text-purple-800';
      case 'travaux': return 'bg-orange-100 text-orange-800';
      default: return '';
    }
  };
  
  const getStatusLabel = (status: 'active' | 'closing-soon' | 'closed') => {
    switch(status) {
      case 'active': return 'Actif';
      case 'closing-soon': return 'Bientôt clôturé';
      case 'closed': return 'Clôturé';
      default: return '';
    }
  };
  
  const getPhaseLabel = (phase: 'conception' | 'consultation' | 'travaux') => {
    switch(phase) {
      case 'conception': return 'Conception';
      case 'consultation': return 'Consultation';
      case 'travaux': return 'Travaux';
      default: return '';
    }
  };

  return (
    <div className="w-96 bg-white rounded-lg shadow-sm p-4 overflow-auto">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-lg">{opportunity.projectName}</h3>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-8 w-8 hover:bg-transparent"
          onClick={() => onToggleFavorite(opportunity.id)}
        >
          <Star 
            size={20} 
            className={`${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
          />
        </Button>
      </div>
      
      <div className="flex gap-2 mb-3">
        <Badge className={getStatusColor(opportunity.status)}>
          {getStatusLabel(opportunity.status)}
        </Badge>
        <Badge className={getPhaseColor(opportunity.phase)}>
          {getPhaseLabel(opportunity.phase)}
        </Badge>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm">
          <Building size={16} className="mr-2 text-muted-foreground" />
          <span>{opportunity.client.name}</span>
        </div>
        <div className="flex items-center text-sm">
          <MapPin size={16} className="mr-2 text-muted-foreground" />
          <span>{opportunity.location.address}<br />
          {opportunity.location.city}, {opportunity.location.departement}</span>
        </div>
        <div className="flex items-center text-sm">
          <Euro size={16} className="mr-2 text-muted-foreground" />
          <div>
            <div>Budget total: <strong>{opportunity.budget.total}</strong></div>
            <div>Budget mission: <strong>{opportunity.budget.mission}</strong></div>
          </div>
        </div>
        <div className="flex items-center text-sm">
          <Clock size={16} className="mr-2 text-muted-foreground" />
          <span>Échéance: <strong>{opportunity.deadline}</strong></span>
        </div>
        <div className="flex items-center text-sm">
          <Calendar size={16} className="mr-2 text-muted-foreground" />
          <span>Publiée le: <strong>{opportunity.createdAt}</strong></span>
        </div>
      </div>
      
      <Card className="p-3 mb-4">
        <h4 className="font-medium mb-2">Description</h4>
        <p className="text-sm text-muted-foreground">
          {opportunity.description}
        </p>
      </Card>

      <Card className="p-3 mb-4">
        <h4 className="font-medium mb-2">Missions recherchées</h4>
        <div className="flex flex-wrap gap-1">
          {opportunity.missions.map((mission, index) => (
            <Badge key={index} variant="outline">
              {mission}
            </Badge>
          ))}
        </div>
      </Card>
      
      <Separator className="my-4" />
      
      <div className="space-y-3">
        <h4 className="font-medium">Contacts</h4>
        <div className="flex items-center text-sm">
          <Users size={16} className="mr-2 text-muted-foreground" />
          <span>Jean Dupont (Chef de projet)</span>
        </div>
        <div className="flex items-center text-sm">
          <Phone size={16} className="mr-2 text-muted-foreground" />
          <span>01 23 45 67 89</span>
        </div>
        <div className="flex items-center text-sm">
          <Mail size={16} className="mr-2 text-muted-foreground" />
          <span>contact@example.com</span>
        </div>
      </div>
      
      <div className="mt-6">
        <Button asChild className="w-full">
          <Link to={`/project-specifications?project=${opportunity.id}`}>
            <Eye size={16} className="mr-2" />
            Voir détails du projet
          </Link>
        </Button>
      </div>
    </div>
  );
}

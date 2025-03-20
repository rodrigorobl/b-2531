
import React from 'react';
import { OpportunitySearchResult } from '@/pages/OpportunitiesSearch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { 
  Building, 
  MapPin, 
  Euro, 
  Clock, 
  Eye, 
  Star, 
  Users,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface OpportunityGridViewProps {
  opportunities: OpportunitySearchResult[];
  selectedOpportunityId: string | null;
  onSelectOpportunity: (opportunityId: string) => void;
  onToggleFavorite: (opportunityId: string) => void;
  savedFavorites: string[];
}

export default function OpportunityGridView({ 
  opportunities, 
  selectedOpportunityId, 
  onSelectOpportunity,
  onToggleFavorite,
  savedFavorites
}: OpportunityGridViewProps) {
  const getStatusColor = (status: 'active' | 'closing-soon' | 'closed') => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'closing-soon': return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'closed': return 'bg-red-100 text-red-800 hover:bg-red-200';
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {opportunities.map((opportunity) => (
        <Card 
          key={opportunity.id} 
          className={`cursor-pointer transition-all ${selectedOpportunityId === opportunity.id ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
          onClick={() => onSelectOpportunity(opportunity.id)}
        >
          <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start">
            <div>
              <h3 className="font-medium text-base">{opportunity.projectName}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Building size={14} className="mr-1" />
                <span>{opportunity.client.name}</span>
              </div>
            </div>
            <div className="flex gap-1">
              <Badge className={getStatusColor(opportunity.status)}>
                {getStatusLabel(opportunity.status)}
              </Badge>
              <Badge className={getPhaseColor(opportunity.phase)}>
                {getPhaseLabel(opportunity.phase)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2 pb-2">
            <div className="space-y-2 mb-3">
              <div className="flex items-center text-sm">
                <MapPin size={14} className="mr-2 text-muted-foreground" />
                <span>{opportunity.location.city}, {opportunity.location.departement}</span>
              </div>
              <div className="flex items-center text-sm">
                <Euro size={14} className="mr-2 text-muted-foreground" />
                <span>Projet: {opportunity.budget.total} | Mission: {opportunity.budget.mission}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock size={14} className="mr-2 text-muted-foreground" />
                <span>Échéance: {opportunity.deadline}</span>
              </div>
              <div className="flex items-center text-sm">
                <Briefcase size={14} className="mr-2 text-muted-foreground" />
                <span>Missions: {opportunity.missions.slice(0, 2).join(', ')}
                {opportunity.missions.length > 2 ? ` +${opportunity.missions.length - 2}` : ''}
                </span>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-4">
              <div className="flex items-center">
                <Users size={14} className="mr-1" />
                <span>{opportunity.applicantsCount.total} candidats</span>
              </div>
              {opportunity.applicantsCount.similar > 0 && (
                <div className={`flex items-center ${opportunity.applicantsCount.similar > 3 ? 'text-red-600' : 'text-amber-600'}`}>
                  <span>{opportunity.applicantsCount.similar} concurrents similaires</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-2 flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 hover:bg-transparent"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(opportunity.id);
              }}
            >
              <Star 
                size={18} 
                className={`${savedFavorites.includes(opportunity.id) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
              />
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/project-specifications/${opportunity.id}`}>
                <Eye size={14} className="mr-1" />
                Voir détails
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
      {opportunities.length === 0 && (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          Aucune opportunité ne correspond à vos critères de recherche.
        </div>
      )}
    </div>
  );
}

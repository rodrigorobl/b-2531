import React from 'react';
import { OpportunitySearchResult } from '@/pages/OpportunitiesSearch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { 
  ExternalLink, 
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface OpportunityListViewProps {
  opportunities: OpportunitySearchResult[];
  selectedOpportunityId: string | null;
  onSelectOpportunity: (opportunityId: string) => void;
  onToggleFavorite: (opportunityId: string) => void;
  savedFavorites: string[];
}

export default function OpportunityListView({ 
  opportunities, 
  selectedOpportunityId, 
  onSelectOpportunity,
  onToggleFavorite,
  savedFavorites
}: OpportunityListViewProps) {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Projet</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Missions</TableHead>
            <TableHead>Phase</TableHead>
            <TableHead>Échéance</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.map((opportunity) => (
            <TableRow 
              key={opportunity.id} 
              className={`cursor-pointer ${selectedOpportunityId === opportunity.id ? 'bg-muted/50' : ''}`}
              onClick={() => onSelectOpportunity(opportunity.id)}
            >
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-8 w-8 hover:bg-transparent"
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
              </TableCell>
              <TableCell>
                <div className="font-medium">{opportunity.projectName}</div>
                <div className="text-sm text-muted-foreground">{opportunity.client.name}</div>
                <Badge className={`mt-1 ${getStatusColor(opportunity.status)}`}>
                  {getStatusLabel(opportunity.status)}
                </Badge>
              </TableCell>
              <TableCell>
                {opportunity.location.city}, {opportunity.location.departement}
              </TableCell>
              <TableCell>
                <div>Projet: {opportunity.budget.total}</div>
                <div>Mission: {opportunity.budget.mission}</div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {opportunity.missions.slice(0, 2).map((mission, index) => (
                    <Badge key={index} variant="outline" className="mr-1">
                      {mission}
                    </Badge>
                  ))}
                  {opportunity.missions.length > 2 && (
                    <Badge variant="outline">+{opportunity.missions.length - 2}</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getPhaseColor(opportunity.phase)}>
                  {getPhaseLabel(opportunity.phase)}
                </Badge>
              </TableCell>
              <TableCell>{opportunity.deadline}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" asChild>
                  <Link 
                    to={`/tender-specifications?project=${opportunity.id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Accéder à l'Appel d'Offres
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {opportunities.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24">
                Aucune opportunité ne correspond à vos critères de recherche.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

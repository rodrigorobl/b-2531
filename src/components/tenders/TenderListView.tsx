
import React from 'react';
import { cn } from '@/lib/utils';
import { TenderSearchResult } from '@/pages/TenderSearch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Calendar, Star, ExternalLink, Lock } from 'lucide-react';
import { getStatusBadge } from './TenderUtils';
import { Link } from 'react-router-dom';
import { useProfile } from '@/contexts/ProfileContext';
import { MatchingProgress } from './MatchingProgress';

interface TenderListViewProps {
  tenders: TenderSearchResult[];
  selectedTenderId: string | null;
  onSelectTender: (tenderId: string) => void;
}

export default function TenderListView({
  tenders,
  selectedTenderId,
  onSelectTender
}: TenderListViewProps) {
  const { activeProfile } = useProfile();
  
  if (tenders.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Aucun appel d'offres correspondant à vos critères
      </div>
    );
  }

  const getTenderUrl = (tenderId: string) => {
    if (activeProfile === 'entreprise-construction') {
      return `/construction-tender-specifications?project=${tenderId}`;
    }
    return `/tender-specifications?project=${tenderId}`;
  };

  // Generate a random matching score for demo purposes
  const getMatchingScore = (tenderId: string) => {
    // Use the tender ID to generate a consistent but seemingly random score
    const hash = tenderId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return Math.min(100, Math.max(25, (hash % 75) + 25)); // Score between 25-100
  };

  const getTenderTypeWithAccessBadge = (tender: TenderSearchResult) => {
    if (tender.tenderType === 'open') {
      return <Badge variant="outline" className="bg-green-50 font-normal">
        Ouvert
      </Badge>;
    } else {
      // For restricted tenders
      let badgeClass = "bg-orange-50";
      let statusText = "";
      
      switch (tender.accessRequestStatus) {
        case 'pending':
          statusText = "Demande en cours";
          badgeClass = "bg-amber-50 text-amber-700";
          break;
        case 'approved':
          statusText = "Accès accordé";
          badgeClass = "bg-green-50 text-green-700";
          break;
        case 'rejected':
          statusText = "Accès refusé";
          badgeClass = "bg-red-50 text-red-700";
          break;
      }
      
      return (
        <div className="flex flex-col gap-1">
          <Badge variant="outline" className="bg-orange-50 font-normal flex items-center gap-1">
            <Lock size={10} />
            <span>Restreint</span>
          </Badge>
          {statusText && (
            <Badge variant="outline" className={`${badgeClass} text-xs font-normal`}>
              {statusText}
            </Badge>
          )}
        </div>
      );
    }
  };

  return (
    <div className="space-y-2">
      {tenders.map((tender) => (
        <div
          key={tender.id}
          className={cn(
            "border rounded-lg p-3 transition-all cursor-pointer flex items-center",
            selectedTenderId === tender.id ? "border-primary bg-primary/5" : "hover:border-primary/30"
          )}
          onClick={() => onSelectTender(tender.id)}
        >
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-medium">{tender.projectName}</h3>
              <div className="flex items-center gap-2">
                {getStatusBadge(tender.status)}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={tender.isFavorite ? "text-amber-500" : "text-muted-foreground"}
                >
                  <Star size={14} />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building size={14} />
                <span>{tender.projectType}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{tender.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{tender.deadline}</span>
              </div>
            </div>
            
            {activeProfile === 'entreprise-construction' && (
              <div className="mt-2 max-w-60">
                <MatchingProgress score={getMatchingScore(tender.id)} size="sm" />
              </div>
            )}
          </div>
          
          <div className="ml-4 flex items-center gap-3">
            <div>
              {getTenderTypeWithAccessBadge(tender)}
            </div>
            <Button variant="ghost" size="sm" className="text-primary" asChild>
              <Link to={getTenderUrl(tender.id)}>
                <ExternalLink size={14} className="mr-1" />
                <span>Accéder à l'Appel d'Offres</span>
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

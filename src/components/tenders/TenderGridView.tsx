
import React from 'react';
import { cn } from '@/lib/utils';
import { TenderSearchResult } from '@/pages/TenderSearch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, MapPin, Calendar, Star, Eye, ArrowRight, ExternalLink, Lock } from 'lucide-react';
import { getStatusBadge } from './TenderUtils';
import { Link } from 'react-router-dom';
import { useProfile } from '@/contexts/ProfileContext';
import { MatchingProgress } from './MatchingProgress';

interface TenderGridViewProps {
  tenders: TenderSearchResult[];
  selectedTenderId: string | null;
  onSelectTender: (tenderId: string) => void;
}

export default function TenderGridView({
  tenders,
  selectedTenderId,
  onSelectTender
}: TenderGridViewProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tenders.map((tender) => (
        <div
          key={tender.id}
          className={cn(
            "border rounded-lg p-4 transition-all cursor-pointer",
            selectedTenderId === tender.id ? "border-primary bg-primary/5" : "hover:border-primary/30"
          )}
          onClick={() => onSelectTender(tender.id)}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="font-medium line-clamp-1">{tender.projectName}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Building size={14} />
                <span>{tender.projectType}</span>
                <span>•</span>
                <MapPin size={14} />
                <span>{tender.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(tender.status)}
              <Button 
                variant="ghost" 
                size="sm"
                className={tender.isFavorite ? "text-amber-500" : "text-muted-foreground"}
              >
                <Star size={16} />
              </Button>
            </div>
          </div>
          
          {activeProfile === 'entreprise-construction' && (
            <div className="mt-2 mb-3">
              <MatchingProgress score={getMatchingScore(tender.id)} />
            </div>
          )}
          
          <div className="flex items-center justify-between gap-2 mt-3">
            <div className="flex items-center gap-1 text-sm">
              <Calendar size={14} className="text-muted-foreground" />
              <span>Échéance: {tender.deadline}</span>
            </div>
            <div>
              {getTenderTypeWithAccessBadge(tender)}
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {tender.lots.slice(0, 3).map((lot, index) => (
              <Badge key={index} variant="outline" className="font-normal">
                {lot}
              </Badge>
            ))}
            {tender.lots.length > 3 && (
              <Badge variant="outline" className="font-normal">
                +{tender.lots.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="mt-3 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {tender.client.name}
            </div>
            <div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = getTenderUrl(tender.id);
                }}
              >
                <ExternalLink size={14} />
                <span>Accéder à l'Appel d'Offres</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

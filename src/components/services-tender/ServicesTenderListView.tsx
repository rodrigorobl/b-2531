
import React from 'react';
import { cn } from '@/lib/utils';
import { ServiceTenderSearchResult } from '@/pages/ServicesTenderSearch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Calendar, Star, Eye, Users } from 'lucide-react';
import { getServicesTenderStatusBadge } from './ServicesTenderUtils';

interface ServicesTenderListViewProps {
  tenders: ServiceTenderSearchResult[];
  selectedTenderId: string | null;
  onSelectTender: (tenderId: string) => void;
}

export default function ServicesTenderListView({
  tenders,
  selectedTenderId,
  onSelectTender
}: ServicesTenderListViewProps) {
  if (tenders.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Aucun appel d'offres correspondant à vos critères
      </div>
    );
  }

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
                {getServicesTenderStatusBadge(tender.status)}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={tender.isFavorite ? "text-amber-500" : "text-muted-foreground"}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle favorite logic would go here
                  }}
                >
                  <Star size={14} />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building size={14} />
                <span>{tender.serviceType}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{tender.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{tender.deadline}</span>
              </div>
              {tender.competitors > 0 && (
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{tender.competitors} concurrent{tender.competitors > 1 ? 's' : ''}</span>
                </div>
              )}
              {tender.viewed && (
                <Badge variant="outline" className="font-normal bg-gray-100">
                  Consulté
                </Badge>
              )}
              {tender.responded && (
                <Badge variant="outline" className="font-normal bg-green-100">
                  Répondu
                </Badge>
              )}
            </div>
          </div>
          
          <div className="ml-4 flex items-center gap-3">
            <div className="text-sm font-medium">
              {tender.budget}
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              <Eye size={14} className="mr-1" />
              <span>Détails</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

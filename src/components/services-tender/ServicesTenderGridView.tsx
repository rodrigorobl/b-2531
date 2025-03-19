
import React from 'react';
import { cn } from '@/lib/utils';
import { ServiceTenderSearchResult } from '@/pages/ServicesTenderSearch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, MapPin, Calendar, Star, Eye, ArrowRight, FileText } from 'lucide-react';
import { getServicesTenderStatusBadge } from './ServicesTenderUtils';

interface ServicesTenderGridViewProps {
  tenders: ServiceTenderSearchResult[];
  selectedTenderId: string | null;
  onSelectTender: (tenderId: string) => void;
  onConsultAO: (tenderId: string) => void;
}

export default function ServicesTenderGridView({
  tenders,
  selectedTenderId,
  onSelectTender,
  onConsultAO
}: ServicesTenderGridViewProps) {
  if (tenders.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Aucun appel d'offres correspondant à vos critères
      </div>
    );
  }

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
                <span>{tender.serviceType}</span>
                <span>•</span>
                <MapPin size={14} />
                <span>{tender.location}</span>
              </div>
            </div>
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
                <Star size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-sm">
              <Calendar size={14} className="text-muted-foreground" />
              <span>Échéance: {tender.deadline}</span>
            </div>
            <div className="text-sm font-medium">
              {tender.budget}
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1">
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
          
          <div className="mt-3 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {tender.clientName}
            </div>
            <div>
              <Button variant="outline" size="sm" className="text-primary flex items-center gap-1"
                     onClick={(e) => {
                       e.stopPropagation();
                       onConsultAO(tender.id);
                     }}>
                <FileText size={14} />
                <span>Consulter l'Appel d'Offres</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

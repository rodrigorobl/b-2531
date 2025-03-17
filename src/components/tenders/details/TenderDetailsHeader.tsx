
import React from 'react';
import { TenderSearchResult } from '@/types/tenders';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock } from 'lucide-react';

interface TenderDetailsHeaderProps {
  tender: TenderSearchResult;
}

export default function TenderDetailsHeader({ tender }: TenderDetailsHeaderProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'En cours';
      case 'closed': return 'Clôturé';
      case 'assigned': return 'Attribué';
      default: return 'Inconnu';
    }
  };
  
  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between">
        <h3 className="font-medium truncate">{tender.projectName}</h3>
        <Button variant="ghost" size="sm" className={tender.isFavorite ? "text-amber-500" : "text-muted-foreground"}>
          <Star size={16} />
        </Button>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
        <Badge variant="outline" className="rounded-sm font-normal">
          {getStatusLabel(tender.status)}
        </Badge>
        <span>•</span>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>Publié le {tender.createdAt}</span>
        </div>
      </div>
    </div>
  );
}

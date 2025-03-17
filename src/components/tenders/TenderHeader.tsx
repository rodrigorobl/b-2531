
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TenderHeaderProps {
  tender: {
    name: string;
    status: string;
    deadline: string;
    projectType: string;
  };
}

export function TenderHeader({ tender }: TenderHeaderProps) {
  return (
    <>
      {/* Back navigation */}
      <div className="mb-6">
        <Link to="/tenders" className="flex items-center text-sm text-muted-foreground hover:text-primary">
          <ChevronLeft size={16} className="mr-1" />
          Retour aux appels d'offres
        </Link>
      </div>

      {/* Header with tender name and status */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{tender.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <Badge className={
              tender.status === 'open' ? 'bg-amber-500' : 
              tender.status === 'assigned' ? 'bg-green-600' : 'bg-gray-500'
            }>
              {tender.status === 'open' ? 'En cours' : 
               tender.status === 'assigned' ? 'Attribué' : 'Clôturé'}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Calendar size={14} className="mr-1.5" />
              Échéance: {tender.deadline}
            </span>
            <span className="flex items-center text-sm text-muted-foreground">
              <Building size={14} className="mr-1.5" />
              {tender.projectType}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {/* Any action buttons can go here */}
        </div>
      </div>
    </>
  );
}

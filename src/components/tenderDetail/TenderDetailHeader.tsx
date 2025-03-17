
import React from 'react';
import { TenderDetailData } from '@/types/tenderDetail';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, FileText, Clock } from 'lucide-react';

interface TenderDetailHeaderProps {
  tender: TenderDetailData;
}

export default function TenderDetailHeader({ tender }: TenderDetailHeaderProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'En cours';
      case 'closed': return 'Clôturé';
      case 'assigned': return 'Attribué';
      default: return 'Inconnu';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500';
      case 'closed': return 'bg-orange-500';
      case 'assigned': return 'bg-green-600';
      default: return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'design': return 'Conception';
      case 'construction': return 'Réalisation';
      case 'service': return 'Services';
      default: return 'Autre';
    }
  };

  // Add null check for documents array
  const documentCount = tender.documents ? tender.documents.length : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold">{tender.name}</h1>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline">{getTypeLabel(tender.type)}</Badge>
            <Badge className={`${getStatusColor(tender.status)} text-white`}>
              {getStatusLabel(tender.status)}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground mb-1">Réf: {tender.id}</div>
          <Badge variant="outline" className="ml-auto">
            <Clock className="w-3.5 h-3.5 mr-1" />
            Date limite: {new Date(tender.deadline).toLocaleDateString('fr-FR')}
          </Badge>
        </div>
      </div>

      <p className="text-muted-foreground mb-4">
        {tender.description}
      </p>

      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
          <span>{tender.location || 'Non spécifié'}</span>
        </div>
        <div className="flex items-center">
          <FileText className="w-4 h-4 mr-1 text-muted-foreground" />
          <span>{documentCount} document{documentCount !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center">
          <CalendarDays className="w-4 h-4 mr-1 text-muted-foreground" />
          <span>Créé le: {new Date().toLocaleDateString('fr-FR')}</span>
        </div>
      </div>
    </div>
  );
}

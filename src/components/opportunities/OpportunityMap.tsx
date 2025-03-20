
import React, { useState } from 'react';
import { OpportunitySearchResult } from '@/pages/OpportunitiesSearch';
import { Card } from '@/components/ui/card';
import OpportunityViewModeSelector from './OpportunityViewModeSelector';
import { MapPin, Map as MapIcon } from 'lucide-react';

interface OpportunityMapProps {
  opportunities: OpportunitySearchResult[];
  onSelectOpportunity: (opportunityId: string) => void;
  selectedOpportunityId: string | null;
  onViewModeChange: (mode: 'grid' | 'list' | 'map') => void;
}

export default function OpportunityMap({ 
  opportunities, 
  onSelectOpportunity, 
  selectedOpportunityId,
  onViewModeChange
}: OpportunityMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Fonction pour déterminer la couleur du marqueur selon la phase du projet
  const getMarkerColor = (phase: 'conception' | 'consultation' | 'travaux') => {
    switch(phase) {
      case 'conception': return '#3b82f6'; // blue
      case 'consultation': return '#a855f7'; // purple
      case 'travaux': return '#f97316'; // orange
      default: return '#3b82f6';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm mr-4 overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b">
        <div className="text-sm text-muted-foreground flex items-center">
          <MapIcon size={16} className="mr-2" />
          <span>{opportunities.length} opportunités sur la carte</span>
        </div>
        
        <OpportunityViewModeSelector 
          viewMode="map" 
          onViewModeChange={onViewModeChange} 
        />
      </div>
      
      <div className="flex-1 relative bg-slate-100">
        {/* Ici, intégrer la carte MapBox ou GoogleMaps */}
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-6">
            <MapPin size={48} className="mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium mb-2">Carte interactive</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              La carte afficherait tous les projets avec des marqueurs colorés selon leur phase :
              <span className="flex items-center justify-center gap-2 mt-2">
                <span className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-blue-500 inline-block mr-1"></span>
                  Conception
                </span>
                <span className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-purple-500 inline-block mr-1"></span>
                  Consultation
                </span>
                <span className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-orange-500 inline-block mr-1"></span>
                  Travaux
                </span>
              </span>
            </p>
          </div>
        </div>
        
        {/* Légende de la carte */}
        <Card className="absolute bottom-4 left-4 p-3 shadow-md text-sm">
          <div className="font-medium mb-2">Légende</div>
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-blue-500 inline-block mr-2"></span>
              Projet en conception
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-purple-500 inline-block mr-2"></span>
              Consultation des entreprises
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-orange-500 inline-block mr-2"></span>
              Travaux en cours
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

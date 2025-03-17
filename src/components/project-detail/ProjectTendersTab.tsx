
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TenderData, QuoteData } from '@/types/projectDetail';
import { TendersList } from './TendersList';
import { TenderDetails } from './TenderDetails';

interface ProjectTendersTabProps {
  tenders: TenderData[];
  quotes: { [key: string]: QuoteData[] };
  selectedTenderId: string | null;
  setSelectedTenderId: (id: string) => void;
}

export function ProjectTendersTab({ 
  tenders, 
  quotes, 
  selectedTenderId, 
  setSelectedTenderId 
}: ProjectTendersTabProps) {
  return (
    <>
      {/* All Tenders */}
      <Card>
        <CardHeader>
          <CardTitle>Tous les appels d'offres</CardTitle>
        </CardHeader>
        <CardContent>
          <TendersList 
            tenders={tenders} 
            selectedTenderId={selectedTenderId} 
            setSelectedTenderId={setSelectedTenderId} 
          />
        </CardContent>
      </Card>
      
      {/* Selected Tender Details */}
      {selectedTenderId && (
        <Card>
          <CardHeader>
            <CardTitle>
              Détails de l'appel d'offres - {tenders.find(t => t.id === selectedTenderId)?.lot}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TenderDetails 
              tender={tenders.find(t => t.id === selectedTenderId)} 
              quotes={quotes[selectedTenderId] || []} 
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}

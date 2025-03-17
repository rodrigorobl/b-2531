
import React from 'react';
import { TenderSearchResult } from '@/pages/TenderSearch';
import { Card, CardContent } from '@/components/ui/card';
import { MapIcon } from 'lucide-react';

interface TenderMapProps {
  tenders: TenderSearchResult[];
  selectedTenderId: string | null;
  onSelectTender: (tenderId: string) => void;
}

export default function TenderMap({ tenders, selectedTenderId, onSelectTender }: TenderMapProps) {
  return (
    <div className="w-full h-full">
      <Card className="h-full border-dashed flex items-center justify-center">
        <CardContent className="p-6 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <MapIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">Carte des appels d'offres</h3>
          <p className="text-sm text-muted-foreground mt-2">
            La visualisation cartographique sera intégrée prochainement.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

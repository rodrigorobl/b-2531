
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { TenderData } from '@/types/projectDetail';

interface TenderStatisticsProps {
  tenders: TenderData[];
  quotes: { [key: string]: any[] };
}

export function TenderStatistics({ tenders, quotes }: TenderStatisticsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques des appels d'offres</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-3xl font-bold">{tenders.length}</div>
            <div className="text-sm text-muted-foreground">Total AO</div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-3xl font-bold">
              {tenders.filter(t => t.statut === 'Ouvert').length}
            </div>
            <div className="text-sm text-muted-foreground">AO en cours</div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-3xl font-bold">
              {tenders.filter(t => t.statut === 'Attribué').length}
            </div>
            <div className="text-sm text-muted-foreground">AO attribués</div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-3xl font-bold">
              {Object.values(quotes).reduce((sum, quoteArr) => sum + quoteArr.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Devis reçus</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

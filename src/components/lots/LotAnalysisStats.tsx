
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface LotAnalysisStatsProps {
  estimatedBudget: number;
  bidsCount: number;
  compliantBidsCount: number;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed';
  selectedCompanyName?: string;
  formatPrice: (amount: number) => string;
}

export function LotAnalysisStats({ 
  estimatedBudget, 
  bidsCount,
  compliantBidsCount,
  status,
  selectedCompanyName,
  formatPrice
}: LotAnalysisStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Budget estimé</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatPrice(estimatedBudget)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Devis reçus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {bidsCount}
          </div>
          <div className="text-sm text-muted-foreground">
            {compliantBidsCount} conformes
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Statut du lot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {status === 'pending' ? 'En attente' :
             status === 'assigned' ? 'Attribué' :
             status === 'in-progress' ? 'En cours' : 'Terminé'}
          </div>
          {status === 'assigned' && selectedCompanyName && (
            <div className="text-sm text-muted-foreground">
              Attribué à {selectedCompanyName}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Flag } from 'lucide-react';

interface BudgetRatios {
  perSHAB: number;
  perSDP: number;
  perUnit: number;
}

interface LotAnalysisStatsProps {
  estimatedBudget: number;
  bidsCount: number;
  compliantBidsCount: number;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed';
  selectedCompanyName?: string;
  favoriteBid?: {
    companyName: string;
    amount: number;
    ratios?: BudgetRatios;
  };
  budgetRatios?: BudgetRatios;
  formatPrice: (amount: number) => string;
}

export function LotAnalysisStats({ 
  estimatedBudget, 
  bidsCount,
  compliantBidsCount,
  status,
  selectedCompanyName,
  favoriteBid,
  budgetRatios,
  formatPrice
}: LotAnalysisStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Budget estimé</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">
            {formatPrice(estimatedBudget)}
          </div>
          
          {budgetRatios && (
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>{formatPrice(budgetRatios.perSHAB)} / m² SHAB</div>
              <div>{formatPrice(budgetRatios.perSDP)} / m² SDP</div>
              <div>{formatPrice(budgetRatios.perUnit)} / Logement</div>
            </div>
          )}
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
          <CardTitle className="text-lg">
            {favoriteBid ? (
              <div className="flex items-center">
                Entreprise présentie
                <Flag className="ml-2 h-4 w-4 text-blue-600" />
              </div>
            ) : status === 'assigned' ? (
              "Statut du lot"
            ) : (
              "Statut du lot"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {favoriteBid ? (
            <>
              <div className="text-xl font-bold text-blue-600 mb-2">
                {favoriteBid.companyName}
              </div>
              <div className="font-semibold mb-2">
                {formatPrice(favoriteBid.amount)}
              </div>
              {favoriteBid.ratios && (
                <div className="space-y-1 text-sm text-blue-600">
                  <div>{formatPrice(favoriteBid.ratios.perSHAB)} / m² SHAB</div>
                  <div>{formatPrice(favoriteBid.ratios.perSDP)} / m² SDP</div>
                  <div>{formatPrice(favoriteBid.ratios.perUnit)} / Logement</div>
                </div>
              )}
            </>
          ) : (
            <>
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

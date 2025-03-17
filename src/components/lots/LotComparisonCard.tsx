
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Bid {
  id: string;
  companyId: string;
  companyName: string;
  amount: number;
  submissionDate: string;
  compliant: boolean;
  complianceNotes: string;
  solvencyScore: 'excellent' | 'average' | 'at-risk';
  administrativeScore: number;
  selected: boolean;
}

interface LotComparisonCardProps {
  selectedBids: Bid[];
  estimatedBudget: number;
  formatPrice: (amount: number) => string;
  getSolvencyBadge: (score: 'excellent' | 'average' | 'at-risk') => React.ReactNode;
  getAdministrativeScoreBadge: (score: number) => React.ReactNode;
}

export function LotComparisonCard({
  selectedBids,
  estimatedBudget,
  formatPrice,
  getSolvencyBadge,
  getAdministrativeScoreBadge
}: LotComparisonCardProps) {
  if (selectedBids.length <= 1) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparaison des devis sélectionnés</CardTitle>
        <CardDescription>
          Comparaison de {selectedBids.length} devis sur des critères clés
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Prix</h3>
            <div className="space-y-2">
              {selectedBids.map(bid => {
                const diff = ((bid.amount - estimatedBudget) / estimatedBudget * 100).toFixed(1);
                const diffClass = bid.amount < estimatedBudget ? "text-green-600" : "text-red-500";
                
                return (
                  <div key={bid.id} className="flex items-center justify-between">
                    <span>{bid.companyName}:</span>
                    <div className="flex items-center">
                      <span className="font-medium">{formatPrice(bid.amount)}</span>
                      <span className={`ml-2 text-sm ${diffClass}`}>
                        ({diff}% {bid.amount < estimatedBudget ? 'en dessous' : 'au dessus'} du budget estimé)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Solvabilité</h3>
              <div className="space-y-2">
                {selectedBids.map(bid => (
                  <div key={bid.id} className="flex items-center justify-between">
                    <span>{bid.companyName}:</span>
                    <div>{getSolvencyBadge(bid.solvencyScore)}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Score administratif</h3>
              <div className="space-y-2">
                {selectedBids.map(bid => (
                  <div key={bid.id} className="flex items-center justify-between">
                    <span>{bid.companyName}:</span>
                    <div>{getAdministrativeScoreBadge(bid.administrativeScore)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


import React from 'react';
import { TenderDetailData } from '@/types/tenderDetail';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  CheckCircle,
  Clock,
  DollarSign,
  PieChart,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

interface TenderProgressIndicatorsProps {
  tender: TenderDetailData;
}

export default function TenderProgressIndicators({
  tender,
}: TenderProgressIndicatorsProps) {
  const isBudgetRespected = tender.currentTotalQuotes <= tender.initialBudget;
  const budgetDifference = Math.abs(tender.initialBudget - tender.currentTotalQuotes);
  const budgetDifferencePercentage = Math.round(
    (budgetDifference / tender.initialBudget) * 100
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <PieChart className="w-4 h-4 mr-2 text-primary" />
            Progression du projet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold">{tender.progressPercentage}%</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(tender.lots.filter(lot => lot.isAssigned).length / tender.lots.length * 100)}% des lots attribués
            </span>
          </div>
          <Progress value={tender.progressPercentage} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0%</span>
            <span>100%</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <BarChart className="w-4 h-4 mr-2 text-primary" />
            Qualité des réponses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tender.lots.map((lot) => (
              <div key={lot.id} className="flex items-center justify-between">
                <span className="text-sm">{lot.name}</span>
                <div className="flex items-center">
                  {lot.quotesCount === 0 ? (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      0 devis
                    </span>
                  ) : lot.quotesCount < 3 ? (
                    <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {lot.quotesCount} devis
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {lot.quotesCount} devis
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-primary" />
            Respect du budget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold">
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                maximumFractionDigits: 0,
              }).format(tender.currentTotalQuotes)}
            </span>
            {isBudgetRespected ? (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                <TrendingDown className="w-3 h-3 mr-1" />
                -{budgetDifferencePercentage}%
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{budgetDifferencePercentage}%
              </span>
            )}
          </div>
          <div className="flex justify-between text-sm">
            <span>Budget initial:</span>
            <span className="font-medium">
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                maximumFractionDigits: 0,
              }).format(tender.initialBudget)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total devis:</span>
            <span className="font-medium">
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                maximumFractionDigits: 0,
              }).format(tender.currentTotalQuotes)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Différence:</span>
            <span className={`font-medium ${isBudgetRespected ? 'text-green-600' : 'text-red-600'}`}>
              {isBudgetRespected ? '-' : '+'}
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                maximumFractionDigits: 0,
              }).format(budgetDifference)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

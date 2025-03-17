
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { LotAnalysisChart } from './LotAnalysisChart';

interface Lot {
  id: string;
  name: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed';
  projectId: string;
  projectName: string;
  estimatedBudget: number;
  bids: any[];
}

interface LotAnalysisChartViewProps {
  lot: Lot;
}

export function LotAnalysisChartView({ lot }: LotAnalysisChartViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyse comparative des prix</CardTitle>
        <CardDescription>
          Visualisation des montants proposés par les entreprises
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LotAnalysisChart lot={lot} estimatedBudget={lot.estimatedBudget} />
      </CardContent>
    </Card>
  );
}

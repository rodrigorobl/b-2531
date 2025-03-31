
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExportActions } from '@/components/services-quotes/ExportActions';
import TenderLotsBarChart from '@/components/tenders/analysis/TenderLotsBarChart';
import TenderBudgetComparison from '@/components/tenders/analysis/TenderBudgetComparison';
import TenderInterestStatistics from '@/components/tenders/analysis/TenderInterestStatistics';

interface TenderAnalysisTabProps {
  tenderId: string;
}

export function TenderAnalysisTab({ tenderId }: TenderAnalysisTabProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleExportPDF = () => {
    console.log('Exporting PDF...');
  };

  const handleExportXLS = () => {
    console.log('Exporting XLS...');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Analyse des réponses à l'appel d'offres</h2>
        <ExportActions onExportPDF={handleExportPDF} onExportXLS={handleExportXLS} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="lots">Analyse par lot</TabsTrigger>
          <TabsTrigger value="companies">Intérêt des entreprises</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des réponses par lot</CardTitle>
              </CardHeader>
              <CardContent>
                <TenderLotsBarChart tenderId={tenderId} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Comparaison budgétaire</CardTitle>
              </CardHeader>
              <CardContent>
                <TenderBudgetComparison tenderId={tenderId} />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Statistiques d'intérêt des entreprises</CardTitle>
            </CardHeader>
            <CardContent>
              <TenderInterestStatistics tenderId={tenderId} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lots" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse détaillée par lot</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Contenu détaillé de l'analyse par lot...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="companies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intérêt détaillé des entreprises</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Analyse détaillée de l'intérêt des entreprises...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

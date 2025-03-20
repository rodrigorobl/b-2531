
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import TenderLotsBarChart from '@/components/tenders/analysis/TenderLotsBarChart';
import TenderBudgetComparison from '@/components/tenders/analysis/TenderBudgetComparison';
import TenderInterestStatistics from '@/components/tenders/analysis/TenderInterestStatistics';
import { Separator } from '@/components/ui/separator';

// Mock data for demonstration purposes
const mockTenderAnalysisData = {
  tenderId: 'tender-017',
  projectName: 'Résidence Les Cerisiers - Construction',
  clientName: 'Groupe Immobilier Durand',
  status: 'En cours',
  lotsData: [
    {
      id: 'lot-01',
      name: 'Gros Œuvre',
      nonCompliantQuotes: 1,
      compliantQuotes: 3,
      interestedCompanies: 2,
      declinedCompanies: 1,
      noResponseCompanies: 4,
      plannedBudget: 850000,
      simulatedBudget: 820000,
      viewedCompanies: 15,
      downloadedDCE: 9,
      addedToQuote: 6
    },
    {
      id: 'lot-02',
      name: 'Charpente',
      nonCompliantQuotes: 0,
      compliantQuotes: 2,
      interestedCompanies: 1,
      declinedCompanies: 0,
      noResponseCompanies: 2,
      plannedBudget: 320000,
      simulatedBudget: 350000,
      viewedCompanies: 8,
      downloadedDCE: 5,
      addedToQuote: 3
    },
    {
      id: 'lot-03',
      name: 'Électricité',
      nonCompliantQuotes: 0,
      compliantQuotes: 0,
      interestedCompanies: 3,
      declinedCompanies: 1,
      noResponseCompanies: 5,
      plannedBudget: 250000,
      simulatedBudget: 0,
      viewedCompanies: 12,
      downloadedDCE: 7,
      addedToQuote: 3
    },
    {
      id: 'lot-04',
      name: 'Plomberie',
      nonCompliantQuotes: 0,
      compliantQuotes: 1,
      interestedCompanies: 1,
      declinedCompanies: 0,
      noResponseCompanies: 3,
      plannedBudget: 280000,
      simulatedBudget: 290000,
      viewedCompanies: 9,
      downloadedDCE: 6,
      addedToQuote: 2
    },
    {
      id: 'lot-05',
      name: 'Menuiseries',
      nonCompliantQuotes: 2,
      compliantQuotes: 2,
      interestedCompanies: 1,
      declinedCompanies: 2,
      noResponseCompanies: 1,
      plannedBudget: 420000,
      simulatedBudget: 405000,
      viewedCompanies: 11,
      downloadedDCE: 8,
      addedToQuote: 5
    }
  ]
};

export default function ProjectTenderAnalysis() {
  const { tenderId } = useParams<{ tenderId: string }>();
  const [selectedLot, setSelectedLot] = useState<string | null>(null);
  
  // In a real app, we would fetch the data based on tenderId
  // For now, use mock data
  const data = mockTenderAnalysisData;
  
  // Calculate total budgets
  const totalPlannedBudget = data.lotsData.reduce((total, lot) => total + lot.plannedBudget, 0);
  const totalSimulatedBudget = data.lotsData.reduce((total, lot) => total + lot.simulatedBudget, 0);
  const budgetDifference = totalPlannedBudget - totalSimulatedBudget;
  const budgetDifferencePercentage = (budgetDifference / totalPlannedBudget) * 100;
  
  // Filter data by selected lot
  const filteredData = selectedLot 
    ? data.lotsData.filter(lot => lot.id === selectedLot) 
    : data.lotsData;
  
  // Calculate interest statistics
  const totalViewedCompanies = filteredData.reduce((total, lot) => total + lot.viewedCompanies, 0);
  const totalDownloadedDCE = filteredData.reduce((total, lot) => total + lot.downloadedDCE, 0);
  const totalAddedToQuote = filteredData.reduce((total, lot) => total + lot.addedToQuote, 0);
  
  // Handle export functions
  const handleExportPDF = () => {
    console.log("Exporting PDF...");
    // Implementation would go here
  };
  
  const handleExportExcel = () => {
    console.log("Exporting Excel...");
    // Implementation would go here
  };
  
  const handleLotFilterChange = (lotId: string | null) => {
    setSelectedLot(lotId);
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{data.projectName}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Client: {data.clientName}</span>
            <span>•</span>
            <span>Statut: {data.status}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Analyse des réponses à l'appel d'offres</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <FileDown className="mr-2 h-4 w-4" />
              Exporter en PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportExcel}>
              <FileDown className="mr-2 h-4 w-4" />
              Exporter en Excel
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="budget">Analyse budgétaire</TabsTrigger>
            <TabsTrigger value="interest">Intérêt des entreprises</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Répartition des réponses par lot</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[400px]">
                    <TenderLotsBarChart data={data.lotsData} />
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Comparaison budgétaire</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TenderBudgetComparison 
                      plannedBudget={totalPlannedBudget}
                      simulatedBudget={totalSimulatedBudget}
                      difference={budgetDifference}
                      differencePercentage={budgetDifferencePercentage}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Intérêt des entreprises</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TenderInterestStatistics 
                      viewedCompanies={totalViewedCompanies}
                      downloadedDCE={totalDownloadedDCE}
                      addedToQuote={totalAddedToQuote}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <CardTitle>Analyse détaillée du budget par lot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {data.lotsData.map(lot => (
                    <div key={lot.id}>
                      <h3 className="font-medium text-lg mb-2">Lot {lot.name}</h3>
                      <TenderBudgetComparison 
                        plannedBudget={lot.plannedBudget}
                        simulatedBudget={lot.simulatedBudget}
                        difference={lot.plannedBudget - lot.simulatedBudget}
                        differencePercentage={(lot.plannedBudget - lot.simulatedBudget) / lot.plannedBudget * 100}
                      />
                      {lot.id !== data.lotsData[data.lotsData.length - 1].id && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="interest">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques d'intérêt détaillées</CardTitle>
              </CardHeader>
              <CardContent>
                <TenderInterestStatistics 
                  viewedCompanies={totalViewedCompanies}
                  downloadedDCE={totalDownloadedDCE}
                  addedToQuote={totalAddedToQuote}
                  lotsData={data.lotsData}
                  onLotFilterChange={handleLotFilterChange}
                  selectedLot={selectedLot}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

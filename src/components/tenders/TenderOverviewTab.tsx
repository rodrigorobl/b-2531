
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, MapPin, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import ProjectMap from '@/components/ProjectMap';
import { RelaunchCompaniesDialog } from './RelaunchCompaniesDialog';

interface Category {
  id: string;
  name: string;
  quotes: {
    id: string;
    companyName: string;
    submissionDate: string;
    isCompliant: boolean;
    price: number;
    comments: string;
    status: 'pending' | 'approved' | 'rejected';
  }[];
}

interface TenderOverviewTabProps {
  tender: {
    id: string;
    name: string;
    description: string;
    status: string;
    createdAt: string;
    deadline: string;
    location: {
      address: string;
      lat: number;
      lng: number;
    };
    projectType: string;
    tenderType: string;
    budget: number;
    categories: Category[];
  };
  tenderId: string;
  progressPercentage: number;
  assignedCategories: number;
  totalCategories: number;
  budgetStatus: 'exceeded' | 'respected';
  budgetDifference: number;
  budgetDifferencePercentage: number;
  totalQuotesAmount: number;
}

export function TenderOverviewTab({
  tender,
  tenderId,
  progressPercentage,
  assignedCategories,
  totalCategories,
  budgetStatus,
  budgetDifference,
  budgetDifferencePercentage,
  totalQuotesAmount
}: TenderOverviewTabProps) {
  const [relaunchDialogOpen, setRelaunchDialogOpen] = useState(false);

  // Get evaluation based on number of quotes
  const getCategoryEvaluation = (quotesCount: number) => {
    if (quotesCount >= 4) return {
      label: 'Bon',
      color: 'bg-green-500'
    };
    if (quotesCount >= 2) return {
      label: 'Moyen',
      color: 'bg-amber-500'
    };
    return {
      label: 'Mauvais',
      color: 'bg-red-500'
    };
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informations du projet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{tender.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">Type d'appel d'offres</p>
                <p className="text-sm">
                  {tender.tenderType === 'conception' ? 'Conception' : tender.tenderType === 'realisation' ? 'Réalisation' : 'Services'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Date de création</p>
                <p className="text-sm">{tender.createdAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MapPin size={16} className="mr-2" />
              Localisation
            </CardTitle>
          </CardHeader>
          <CardContent className="h-48">
            <p className="text-sm mb-2">{tender.location.address}</p>
            <ProjectMap location={tender.location} />
          </CardContent>
        </Card>

        {/* Budget status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statut du budget</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Budget initial:</span>
              <span className="font-semibold">{tender.budget.toLocaleString()} €</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Devis les moins chers:</span>
              <span className="font-semibold">{totalQuotesAmount.toLocaleString()} €</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Différence:</span>
              <span className={`font-semibold ${budgetStatus === 'exceeded' ? 'text-red-500' : 'text-green-600'}`}>
                {budgetStatus === 'exceeded' ? '+' : '-'}{budgetDifference.toLocaleString()} € 
                ({budgetDifferencePercentage}%)
              </span>
            </div>
            <div className="pt-2">
              <div className={`w-full rounded-full h-2 ${budgetStatus === 'exceeded' ? 'bg-red-100' : 'bg-green-100'}`}>
                <div className={`h-2 rounded-full ${budgetStatus === 'exceeded' ? 'bg-red-500' : 'bg-green-600'}`} style={{
                width: `${Math.min(100, budgetStatus === 'exceeded' ? 100 : 100 - budgetDifferencePercentage)}%`
              }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">0 €</span>
                <span className="text-xs text-muted-foreground">{tender.budget.toLocaleString()} €</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Avancement du projet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">{assignedCategories} lots attribués sur {totalCategories}</span>
                <span className="font-medium">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="space-y-3 pt-2">
              {tender.categories.map(category => {
                const evaluation = getCategoryEvaluation(category.quotes.length);
                return (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${evaluation.color} mr-2`}></div>
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm mr-2">{category.quotes.length} devis</span>
                      <Link 
                        to={`/tender/${tenderId}/lot/${category.id}`} 
                        className="text-xs text-primary hover:underline hover:text-primary/80 flex items-center"
                      >
                        <PieChart size={12} className="mr-1" />
                        Analyse
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Vue d'ensemble des lots</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setRelaunchDialogOpen(true)}
            className="flex items-center gap-1"
          >
            <Send size={14} />
            Relancer les entreprises
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lot</TableHead>
                <TableHead>Devis reçus</TableHead>
                <TableHead>Meilleur prix</TableHead>
                <TableHead>Budgets</TableHead>
                <TableHead>Attribution</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tender.categories.map(category => {
                const quotesCount = category.quotes.length;
                const evaluation = getCategoryEvaluation(quotesCount);
                const lowestQuote = category.quotes.length > 0 ? Math.min(...category.quotes.filter(q => q.isCompliant).map(q => q.price)) : null;
                const approvedQuote = category.quotes.find(q => q.status === 'approved');
                
                // For the budget column, we'll show a default value for now
                // In a real app, this would come from the category data
                const budget = category.budget || "-";
                
                return (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{quotesCount}</TableCell>
                    <TableCell>
                      {lowestQuote ? `${lowestQuote.toLocaleString()} €` : '-'}
                    </TableCell>
                    <TableCell>
                      {typeof budget === 'number' ? `${budget.toLocaleString()} €` : budget}
                    </TableCell>
                    <TableCell>
                      {approvedQuote ? 
                        <Badge className="bg-green-600">Attribué</Badge> : 
                        quotesCount > 0 ? 
                          <Badge className="bg-amber-500">En attente</Badge> : 
                          <Badge className="bg-red-500">Non démarré</Badge>
                      }
                    </TableCell>
                    
                    <TableCell className="text-right">
                      {quotesCount > 0 && (
                        <Link 
                          to={`/tender/${tenderId}/lot/${category.id}`}
                          className="text-primary hover:underline inline-flex items-center"
                        >
                          <PieChart size={14} className="mr-1" />
                          Analyser
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <RelaunchCompaniesDialog 
        open={relaunchDialogOpen} 
        onOpenChange={setRelaunchDialogOpen}
        categories={tender.categories}
      />
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, MapPin, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import ProjectMap from '@/components/ProjectMap';
import { RelaunchCompaniesDialog } from './RelaunchCompaniesDialog';

interface Category {
  id: string;
  name: string;
  budget?: number;
  quotes: {
    id: string;
    companyName: string;
    submissionDate: string;
    isCompliant: boolean;
    price: number;
    comments: string;
    status: 'pending' | 'approved' | 'rejected';
  }[];
  status?: 'en-cours' | 'cloture' | 'attribue';
  statusDate?: string;
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

  // Calculate total budget of all categories
  const totalBudget = tender.categories.reduce((total, category) => {
    return total + (category.budget || 0);
  }, 0);

  // Calculate total of lowest quotes
  const totalLowestQuotes = tender.categories.reduce((total, category) => {
    const lowestQuote = category.quotes.length > 0 ? 
      Math.min(...category.quotes.filter(q => q.isCompliant).map(q => q.price)) : 0;
    return total + lowestQuote;
  }, 0);

  // Render status badge for category
  const renderStatusBadge = (category: Category) => {
    if (category.status === 'attribue') {
      return <Badge className="bg-green-600">Attribué</Badge>;
    } else if (category.status === 'en-cours') {
      return (
        <div className="flex flex-col">
          <Badge className="bg-amber-500">En cours</Badge>
          <span className="text-xs text-muted-foreground mt-1">
            fin: {category.statusDate}
          </span>
        </div>
      );
    } else if (category.status === 'cloture') {
      return (
        <div className="flex flex-col">
          <Badge variant="outline" className="text-gray-600">
            Cloturé le:
          </Badge>
          <span className="text-xs text-muted-foreground mt-1">
            {category.statusDate}
          </span>
        </div>
      );
    } else {
      // Default status based on quotes
      const approvedQuote = category.quotes.find(q => q.status === 'approved');
      if (approvedQuote) {
        return <Badge className="bg-green-600">Attribué</Badge>;
      } else if (category.quotes.length > 0) {
        return <Badge className="bg-amber-500">En cours</Badge>;
      } else {
        return <Badge className="bg-red-500">Aucune offre</Badge>;
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <TableHead>Budgets</TableHead>
                <TableHead>Offre pressentie</TableHead>
                <TableHead>Nom de l'entreprise</TableHead>
                <TableHead>Delta (%)</TableHead>
                <TableHead>Attribution</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tender.categories.map(category => {
                const quotesCount = category.quotes.length;
                const evaluation = getCategoryEvaluation(quotesCount);
                
                const budget = category.budget || 0;
                
                // Find the lowest compliant quote and its company
                const compliantQuotes = category.quotes.filter(q => q.isCompliant);
                const lowestQuote = compliantQuotes.length > 0 
                  ? compliantQuotes.reduce((prev, curr) => prev.price < curr.price ? prev : curr, compliantQuotes[0])
                  : null;
                
                const lowestPrice = lowestQuote?.price || 0;
                const companyName = lowestQuote?.companyName || '-';
                
                // Calculate difference percentage
                const priceDelta = budget > 0 && lowestPrice > 0 
                  ? Math.round((lowestPrice - budget) / budget * 100) 
                  : null;
                
                return (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{quotesCount}</TableCell>
                    <TableCell>
                      {budget > 0 ? `${budget.toLocaleString()} €` : '-'}
                    </TableCell>
                    <TableCell>
                      {lowestPrice > 0 ? `${lowestPrice.toLocaleString()} €` : '-'}
                    </TableCell>
                    <TableCell>
                      {companyName}
                    </TableCell>
                    <TableCell>
                      {priceDelta !== null ? (
                        <span className={priceDelta > 0 ? 'text-red-500' : 'text-green-600'}>
                          {priceDelta > 0 ? '+' : ''}{priceDelta}%
                        </span>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      {renderStatusBadge(category)}
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
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} className="font-medium">Total</TableCell>
                <TableCell className="font-medium">{totalBudget.toLocaleString()} €</TableCell>
                <TableCell className="font-medium">{totalLowestQuotes.toLocaleString()} €</TableCell>
                <TableCell colSpan={4}></TableCell>
              </TableRow>
            </TableFooter>
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

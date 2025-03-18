
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { CircleProgress } from './CircleProgress';
import { Building, Calendar, User, AlertTriangle, CheckCircle, Flag } from 'lucide-react';

interface Quote {
  id: string;
  projectId: string;
  projectName: string;
  lotId: string;
  lotName: string;
  companyId: string;
  companyName: string;
  submissionDate: string;
  totalAmountHT: number;
  totalAmountTTC: number;
  status: 'conforme' | 'non-conforme' | 'presenti';
  statusReason?: string;
  currentVersion: number;
  versions: any[];
  budgetImpact: {
    lotBudget: number;
    deviation: number;
    deviationPercentage: number;
  };
}

interface QuoteGeneralInfoProps {
  quote: Quote;
}

export default function QuoteGeneralInfo({ quote }: QuoteGeneralInfoProps) {
  // Formater les montants en euros
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  // Déterminer l'icône et la couleur pour le statut
  const getStatusIcon = () => {
    switch (quote.status) {
      case 'conforme':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'non-conforme':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'presenti':
        return <Flag className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Projet</h3>
                <p className="font-medium">
                  <Link to={`/project/${quote.projectId}`} className="text-primary hover:underline flex items-center">
                    {quote.projectName}
                  </Link>
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Lot</h3>
                <p className="font-medium">{quote.lotName}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Entreprise</h3>
                <p className="font-medium">
                  <Link to={`/company/${quote.companyId}`} className="text-primary hover:underline flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    {quote.companyName}
                  </Link>
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Date de soumission</h3>
                <p className="font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(quote.submissionDate)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Montant HT</h3>
                <p className="text-xl font-bold">{formatCurrency(quote.totalAmountHT)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Montant TTC</h3>
                <p className="text-xl font-bold">{formatCurrency(quote.totalAmountTTC)}</p>
              </div>
            </div>

            {quote.status === 'non-conforme' && quote.statusReason && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-md">
                <h3 className="text-sm font-medium flex items-center text-red-700 mb-1">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Motif de non-conformité
                </h3>
                <p className="text-sm text-red-700">{quote.statusReason}</p>
              </div>
            )}
            
            {quote.versions.length > 1 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Versions précédentes</h3>
                <div className="space-y-1">
                  {quote.versions.filter(v => v.versionNumber !== quote.currentVersion).map(version => (
                    <div key={version.id} className="text-sm flex items-center">
                      <span className="text-muted-foreground mr-2">V{version.versionNumber}:</span>
                      <span>{formatCurrency(version.totalAmount)}</span>
                      <span className="mx-2">-</span>
                      <span>{formatDate(version.submissionDate)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="mb-2">
              <CircleProgress 
                percentage={Math.abs(quote.budgetImpact.deviationPercentage)}
                isPositive={quote.budgetImpact.deviation <= 0}
              />
            </div>
            <h3 className="font-medium text-center">Impact budgétaire</h3>
            <p className={`text-center ${
              quote.budgetImpact.deviation <= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {quote.budgetImpact.deviation <= 0 ? 'Économie de ' : 'Dépassement de '}
              {formatCurrency(Math.abs(quote.budgetImpact.deviation))}
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Budget du lot: {formatCurrency(quote.budgetImpact.lotBudget)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building, Calendar, FileText, Download, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

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
  selected?: boolean;
}

interface LotBidDetailsProps {
  bid: Bid;
}

export function LotBidDetails({ bid }: LotBidDetailsProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };
  
  const getSolvencyIcon = (score: 'excellent' | 'average' | 'at-risk') => {
    switch (score) {
      case 'excellent':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'average':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'at-risk':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getSolvencyLabel = (score: 'excellent' | 'average' | 'at-risk') => {
    switch (score) {
      case 'excellent': return 'Excellent';
      case 'average': return 'Moyen';
      case 'at-risk': return 'À risque';
      default: return 'Inconnu';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold mb-1">{bid.companyName}</h2>
          <p className="text-muted-foreground">Devis soumis le {formatDate(bid.submissionDate)}</p>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <span className="text-muted-foreground mr-2">Statut:</span>
            {bid.compliant ? (
              <Badge className="bg-green-500 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Conforme
              </Badge>
            ) : (
              <Badge className="bg-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" /> Non conforme
              </Badge>
            )}
          </div>
          {bid.selected && (
            <Badge className="bg-green-600">Devis sélectionné</Badge>
          )}
        </div>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Montant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(bid.amount)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span>Solvabilité</span>
              {getSolvencyIcon(bid.solvencyScore)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getSolvencyLabel(bid.solvencyScore)}
            </div>
            <div className="text-sm text-muted-foreground">
              InfoLégale
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Score administratif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bid.administrativeScore}%
            </div>
            <div className="text-sm text-muted-foreground">
              E-attestation
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="font-medium mb-2">Notes de conformité</h3>
        <p>{bid.complianceNotes}</p>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Documents associés</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            <span>Devis détaillé</span>
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            <span>Documents techniques</span>
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Building className="mr-2 h-4 w-4" />
            <span>Profil entreprise</span>
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Planning proposé</span>
          </Button>
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDown, CheckCircle, Download, AlertCircle, Upload, DollarSign, Calendar, Hash, Info } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
interface Offer {
  id: string;
  lot: string;
  description: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  deadline: string;
  isCompliant?: boolean;
  amount?: number;
  submissionDate?: string;
  quoteIndex?: string;
}
interface TenderOffersProps {
  offers: Offer[];
}
export default function TenderOffers({
  offers
}: TenderOffersProps) {
  const pendingOffers = offers.filter(offer => offer.status === 'pending');
  const submittedOffers = offers.filter(offer => offer.status === 'submitted');
  const completedOffers = offers.filter(offer => ['approved', 'rejected'].includes(offer.status));

  // Préparer les données pour l'affichage
  const prepareOfferData = (offer: Offer) => {
    return {
      ...offer,
      amount: offer.amount || Math.floor(Math.random() * 50000) + 10000,
      // Valeur aléatoire si non définie
      submissionDate: offer.submissionDate || (offer.status === 'submitted' ? '10/05/2024' : ''),
      quoteIndex: offer.quoteIndex || `QT-${offer.id.substring(offer.id.length - 3)}`
    };
  };

  // Enrichir les données avec des informations supplémentaires
  const enrichedPendingOffers = pendingOffers.map(prepareOfferData);
  const enrichedSubmittedOffers = submittedOffers.map(prepareOfferData);
  const enrichedCompletedOffers = completedOffers.map(prepareOfferData);
  return <div className="h-full animate-fade-in" style={{
    animationDelay: '0.1s'
  }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Mes offres</h2>
      </div>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="submitted">Soumis</TabsTrigger>
          <TabsTrigger value="completed">Terminés</TabsTrigger>
        </TabsList>
        
        <div className="column-content">
          <TabsContent value="pending" className="m-0 h-full">
            <OffersTable offers={enrichedPendingOffers} type="pending" />
          </TabsContent>
          
          <TabsContent value="submitted" className="m-0 h-full">
            <OffersTable offers={enrichedSubmittedOffers} type="submitted" />
          </TabsContent>
          
          <TabsContent value="completed" className="m-0 h-full">
            <OffersTable offers={enrichedCompletedOffers} type="completed" />
          </TabsContent>
        </div>
      </Tabs>
    </div>;
}
interface OffersTableProps {
  offers: (Offer & {
    amount?: number;
    submissionDate?: string;
    quoteIndex?: string;
  })[];
  type: 'pending' | 'submitted' | 'completed';
}
function OffersTable({
  offers,
  type
}: OffersTableProps) {
  if (offers.length === 0) {
    return <EmptyState message={`Aucun ${type === 'pending' ? 'appel d\'offres en attente' : type === 'submitted' ? 'devis soumis' : 'appel d\'offres terminé'}`} />;
  }
  return <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lot</TableHead>
          <TableHead>Montant du devis</TableHead>
          {type === 'pending' ? <TableHead>Date du devis</TableHead> : <TableHead>Date du devis</TableHead>}
          {type !== 'pending' && <TableHead>Indice du devis</TableHead>}
          {type === 'submitted' && <TableHead>Conformité</TableHead>}
          {type === 'completed' && <TableHead>Statut</TableHead>}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offers.map(offer => <TableRow key={offer.id}>
            <TableCell>
              <div>
                <div className="font-medium">Lot {offer.lot}</div>
                <div className="text-xs text-muted-foreground">{offer.description}</div>
              </div>
            </TableCell>
            
            <TableCell className="font-medium">
              {offer.amount?.toLocaleString() || '-'} €
            </TableCell>
            
            <TableCell>
              {type === 'pending' ? offer.deadline : offer.submissionDate || '-'}
            </TableCell>
            
            {type !== 'pending' && <TableCell>{offer.quoteIndex || '-'}</TableCell>}
            
            {type === 'submitted' && offer.isCompliant !== undefined && <TableCell>
                <Badge className={`${offer.isCompliant ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-red-100 text-red-500 hover:bg-red-200'} border-0`}>
                  {offer.isCompliant ? <><CheckCircle size={12} className="mr-1" /> Conforme</> : <><AlertCircle size={12} className="mr-1" /> Non conforme</>}
                </Badge>
              </TableCell>}
            
            {type === 'completed' && <TableCell>
                <Badge className={`${offer.status === 'approved' ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-red-100 text-red-500 hover:bg-red-200'} border-0`}>
                  {offer.status === 'approved' ? 'Accepté' : 'Refusé'}
                </Badge>
              </TableCell>}
            
            <TableCell>
              <div className="flex items-center gap-2">
                {type === 'pending' && (
                  <Button size="sm" className="h-8" variant="outline">
                    <Upload size={14} className="mr-1" />
                    Soumettre
                  </Button>
                )}
                
                {type !== 'pending' && (
                  <Button size="sm" className="h-8" variant="outline">
                    <FileDown size={14} className="mr-1" />
                    Voir devis
                  </Button>
                )}
                
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8"
                  asChild
                >
                  <Link to={`/company-details-tender/quote-${offer.id}`}>
                    Détails
                  </Link>
                </Button>
              </div>
            </TableCell>
          </TableRow>)}
      </TableBody>
    </Table>;
}
function EmptyState({
  message
}: {
  message: string;
}) {
  return <div className="h-40 flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <p>{message}</p>
      </div>
    </div>;
}

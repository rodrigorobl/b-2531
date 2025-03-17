
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDown, CheckCircle, Download, AlertCircle, Upload, DollarSign, Calendar, Hash, Info } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const pendingOffers = offers.filter(offer => offer.status === 'pending');
  const submittedOffers = offers.filter(offer => offer.status === 'submitted');
  const completedOffers = offers.filter(offer => ['approved', 'rejected'].includes(offer.status));

  // Préparer les données pour l'affichage
  const prepareOfferData = (offer: Offer) => {
    return {
      ...offer,
      amount: offer.amount || Math.floor(Math.random() * 50000) + 10000, // Valeur aléatoire si non définie
      submissionDate: offer.submissionDate || (offer.status === 'submitted' ? '10/05/2024' : ''), 
      quoteIndex: offer.quoteIndex || `QT-${offer.id.substring(offer.id.length - 3)}`
    };
  };

  // Enrichir les données avec des informations supplémentaires
  const enrichedPendingOffers = pendingOffers.map(prepareOfferData);
  const enrichedSubmittedOffers = submittedOffers.map(prepareOfferData);
  const enrichedCompletedOffers = completedOffers.map(prepareOfferData);

  return (
    <div className="h-full animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Mes offres</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'cards' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setViewMode('cards')}
            className="px-2"
          >
            <div className="grid grid-cols-2 gap-0.5 h-4 w-4">
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
            </div>
            <span className="ml-1">Cartes</span>
          </Button>
          <Button 
            variant={viewMode === 'table' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setViewMode('table')}
            className="px-2"
          >
            <div className="flex flex-col justify-between h-4 w-4">
              <div className="h-0.5 bg-current rounded-full"></div>
              <div className="h-0.5 bg-current rounded-full"></div>
              <div className="h-0.5 bg-current rounded-full"></div>
            </div>
            <span className="ml-1">Tableau</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="w-full mb-4 grid grid-cols-3">
          <TabsTrigger value="pending" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none">
            En attente ({enrichedPendingOffers.length})
          </TabsTrigger>
          <TabsTrigger value="submitted" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none">
            Soumis ({enrichedSubmittedOffers.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none">
            Terminés ({enrichedCompletedOffers.length})
          </TabsTrigger>
        </TabsList>
        
        <div className="column-content">
          <TabsContent value="pending" className="m-0 h-full">
            {viewMode === 'cards' ? (
              <div className="space-y-4">
                {enrichedPendingOffers.map(offer => (
                  <OfferCard key={offer.id} offer={offer} type="pending" />
                ))}
                {enrichedPendingOffers.length === 0 && (
                  <EmptyState message="Aucun appel d'offres en attente" />
                )}
              </div>
            ) : (
              <OffersTable offers={enrichedPendingOffers} type="pending" />
            )}
          </TabsContent>
          
          <TabsContent value="submitted" className="m-0 h-full">
            {viewMode === 'cards' ? (
              <div className="space-y-4">
                {enrichedSubmittedOffers.map(offer => (
                  <OfferCard key={offer.id} offer={offer} type="submitted" />
                ))}
                {enrichedSubmittedOffers.length === 0 && (
                  <EmptyState message="Aucun devis soumis" />
                )}
              </div>
            ) : (
              <OffersTable offers={enrichedSubmittedOffers} type="submitted" />
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="m-0 h-full">
            {viewMode === 'cards' ? (
              <div className="space-y-4">
                {enrichedCompletedOffers.map(offer => (
                  <OfferCard key={offer.id} offer={offer} type="completed" />
                ))}
                {enrichedCompletedOffers.length === 0 && (
                  <EmptyState message="Aucun appel d'offres terminé" />
                )}
              </div>
            ) : (
              <OffersTable offers={enrichedCompletedOffers} type="completed" />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

interface OfferCardProps {
  offer: Offer & { amount?: number; submissionDate?: string; quoteIndex?: string };
  type: 'pending' | 'submitted' | 'completed';
}

function OfferCard({ offer, type }: OfferCardProps) {
  return (
    <div className="bg-secondary/30 rounded-lg p-4 transition-all hover:bg-secondary/50">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-sm font-semibold">Lot {offer.lot}</div>
          <div className="text-xs text-muted-foreground">{offer.description}</div>
        </div>
        {type === 'submitted' && offer.amount && (
          <div className="text-lg font-bold text-primary flex items-center">
            <DollarSign size={16} className="mr-1" />
            {offer.amount.toLocaleString()} €
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-2 my-3">
        {offer.submissionDate && (
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground flex items-center">
              <Calendar size={12} className="mr-1" />
              Date de soumission
            </span>
            <span className="text-sm font-medium">{offer.submissionDate}</span>
          </div>
        )}
        
        {offer.quoteIndex && (
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground flex items-center">
              <Hash size={12} className="mr-1" />
              Indice du devis
            </span>
            <span className="text-sm font-medium">{offer.quoteIndex}</span>
          </div>
        )}
        
        {type === 'pending' && (
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground flex items-center">
              <Calendar size={12} className="mr-1" />
              Date limite
            </span>
            <span className="text-sm font-medium">{offer.deadline}</span>
          </div>
        )}
        
        {type === 'submitted' && offer.isCompliant !== undefined && (
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground flex items-center">
              <Info size={12} className="mr-1" />
              Statut
            </span>
            <span className={`text-sm font-medium flex items-center ${
              offer.isCompliant ? 'text-green-600' : 'text-red-500'
            }`}>
              {offer.isCompliant ? (
                <>
                  <CheckCircle size={12} className="mr-1" />
                  Conforme
                </>
              ) : (
                <>
                  <AlertCircle size={12} className="mr-1" />
                  Non conforme
                </>
              )}
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center">
          {type === 'pending' && (
            <>
              <button className="text-xs bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded flex items-center transition-colors">
                <Upload size={12} className="mr-1" />
                Déposer un devis
              </button>
              <button className="text-xs text-primary hover:bg-primary/10 px-2 py-1.5 rounded flex items-center ml-2 transition-colors">
                <Download size={12} className="mr-1" />
                DCE
              </button>
              <button className="text-xs text-primary hover:bg-primary/10 px-2 py-1.5 rounded flex items-center ml-1 transition-colors">
                <FileDown size={12} className="mr-1" />
                DPGF
              </button>
            </>
          )}
          
          {type === 'submitted' && (
            <>
              <button className="text-xs text-primary hover:bg-primary/10 px-2 py-1.5 rounded flex items-center transition-colors">
                <FileDown size={12} className="mr-1" />
                Voir mon devis
              </button>
            </>
          )}
          
          {type === 'completed' && (
            <>
              <div className={`px-2.5 py-1 rounded-full text-xs font-medium 
                ${offer.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                {offer.status === 'approved' ? 'Accepté' : 'Refusé'}
              </div>
              <button className="text-xs text-primary hover:bg-primary/10 px-2 py-1.5 rounded flex items-center ml-2 transition-colors">
                <FileDown size={12} className="mr-1" />
                Résultat
              </button>
            </>
          )}
        </div>
        
        <button className="text-xs text-primary hover:bg-primary/10 px-2 py-1.5 rounded flex items-center transition-colors">
          Afficher les détails
        </button>
      </div>
    </div>
  );
}

interface OffersTableProps {
  offers: (Offer & { amount?: number; submissionDate?: string; quoteIndex?: string })[];
  type: 'pending' | 'submitted' | 'completed';
}

function OffersTable({ offers, type }: OffersTableProps) {
  if (offers.length === 0) {
    return <EmptyState message={`Aucun ${type === 'pending' ? 'appel d\'offres en attente' : type === 'submitted' ? 'devis soumis' : 'appel d\'offres terminé'}`} />;
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lot</TableHead>
          {type !== 'pending' && <TableHead>Montant</TableHead>}
          {type !== 'pending' && <TableHead>Date de soumission</TableHead>}
          {type !== 'pending' && <TableHead>Indice du devis</TableHead>}
          {type === 'pending' && <TableHead>Date limite</TableHead>}
          {type === 'submitted' && <TableHead>Conformité</TableHead>}
          {type === 'completed' && <TableHead>Statut</TableHead>}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offers.map(offer => (
          <TableRow key={offer.id}>
            <TableCell>
              <div>
                <div className="font-medium">Lot {offer.lot}</div>
                <div className="text-xs text-muted-foreground">{offer.description}</div>
              </div>
            </TableCell>
            
            {type !== 'pending' && offer.amount && (
              <TableCell className="font-medium">
                {offer.amount.toLocaleString()} €
              </TableCell>
            )}
            
            {type !== 'pending' && (
              <TableCell>{offer.submissionDate}</TableCell>
            )}
            
            {type !== 'pending' && (
              <TableCell>{offer.quoteIndex}</TableCell>
            )}
            
            {type === 'pending' && (
              <TableCell>{offer.deadline}</TableCell>
            )}
            
            {type === 'submitted' && offer.isCompliant !== undefined && (
              <TableCell>
                <Badge className={`${
                  offer.isCompliant 
                    ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                    : 'bg-red-100 text-red-500 hover:bg-red-200'
                } border-0`}>
                  {offer.isCompliant ? (
                    <><CheckCircle size={12} className="mr-1" /> Conforme</>
                  ) : (
                    <><AlertCircle size={12} className="mr-1" /> Non conforme</>
                  )}
                </Badge>
              </TableCell>
            )}
            
            {type === 'completed' && (
              <TableCell>
                <Badge className={`${
                  offer.status === 'approved' 
                    ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                    : 'bg-red-100 text-red-500 hover:bg-red-200'
                } border-0`}>
                  {offer.status === 'approved' ? 'Accepté' : 'Refusé'}
                </Badge>
              </TableCell>
            )}
            
            <TableCell>
              <div className="flex items-center gap-2">
                {type === 'pending' && (
                  <Button size="sm" className="h-8 bg-primary text-white">
                    <Upload size={14} className="mr-1" />
                    Déposer
                  </Button>
                )}
                
                {type !== 'pending' && (
                  <Button size="sm" className="h-8" variant="outline">
                    <FileDown size={14} className="mr-1" />
                    Voir devis
                  </Button>
                )}
                
                <Button size="sm" variant="ghost" className="h-8">
                  Détails
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
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

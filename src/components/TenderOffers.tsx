
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDown, CheckCircle, Download, AlertCircle, Upload } from 'lucide-react';

interface Offer {
  id: string;
  lot: string;
  description: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  deadline: string;
  isCompliant?: boolean;
}

interface TenderOffersProps {
  offers: Offer[];
}

export default function TenderOffers({ offers }: TenderOffersProps) {
  const pendingOffers = offers.filter(offer => offer.status === 'pending');
  const submittedOffers = offers.filter(offer => offer.status === 'submitted');
  const completedOffers = offers.filter(offer => ['approved', 'rejected'].includes(offer.status));

  return (
    <div className="column h-full animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h2 className="column-header">Mes appels d'offres</h2>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="w-full mb-4 grid grid-cols-3">
          <TabsTrigger 
            value="pending" 
            className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
          >
            En attente ({pendingOffers.length})
          </TabsTrigger>
          <TabsTrigger 
            value="submitted" 
            className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
          >
            Soumis ({submittedOffers.length})
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
          >
            Terminés ({completedOffers.length})
          </TabsTrigger>
        </TabsList>
        
        <div className="column-content">
          <TabsContent value="pending" className="m-0 h-full">
            <div className="space-y-4">
              {pendingOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} type="pending" />
              ))}
              {pendingOffers.length === 0 && (
                <EmptyState message="Aucun appel d'offres en attente" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="submitted" className="m-0 h-full">
            <div className="space-y-4">
              {submittedOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} type="submitted" />
              ))}
              {submittedOffers.length === 0 && (
                <EmptyState message="Aucun devis soumis" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="m-0 h-full">
            <div className="space-y-4">
              {completedOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} type="completed" />
              ))}
              {completedOffers.length === 0 && (
                <EmptyState message="Aucun appel d'offres terminé" />
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

interface OfferCardProps {
  offer: Offer;
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
        <div className="text-xs font-medium text-muted-foreground flex items-center">
          Date limite: {offer.deadline}
        </div>
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
              <div className="flex items-center">
                {offer.isCompliant !== undefined && (
                  <div className={`flex items-center text-xs mr-3 ${offer.isCompliant ? 'text-status-completed' : 'text-status-pending'}`}>
                    {offer.isCompliant ? (
                      <>
                        <CheckCircle size={12} className="mr-1" />
                        <span>Conforme</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={12} className="mr-1" />
                        <span>Non conforme</span>
                      </>
                    )}
                  </div>
                )}
                <button className="text-xs text-primary hover:bg-primary/10 px-2 py-1.5 rounded flex items-center transition-colors">
                  <FileDown size={12} className="mr-1" />
                  Voir mon devis
                </button>
              </div>
            </>
          )}
          
          {type === 'completed' && (
            <>
              <div className={`px-2.5 py-1 rounded-full text-xs font-medium 
                ${offer.status === 'approved' ? 'bg-status-completed/10 text-status-completed' : 'bg-status-closed/10 text-status-closed'}`}
              >
                {offer.status === 'approved' ? 'Accepté' : 'Refusé'}
              </div>
              <button className="text-xs text-primary hover:bg-primary/10 px-2 py-1.5 rounded flex items-center ml-2 transition-colors">
                <FileDown size={12} className="mr-1" />
                Résultat
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="h-40 flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <p>{message}</p>
      </div>
    </div>
  );
}

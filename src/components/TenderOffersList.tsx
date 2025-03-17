
import React from 'react';
import { Calendar, ArrowRight, FileText, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface TenderOffer {
  id: string;
  title: string;
  project: string;
  status: 'open' | 'closed' | 'assigned';
  deadline: string;
  estimatedValue: string;
}

interface TenderOffersListProps {
  tenderOffers: TenderOffer[];
}

export default function TenderOffersList({ tenderOffers }: TenderOffersListProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-status-pending text-white">Ouvert</Badge>;
      case 'closed':
        return <Badge className="bg-status-closed text-white">Clôturé</Badge>;
      case 'assigned':
        return <Badge className="bg-status-assigned text-white">Attribué</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {tenderOffers.map((offer) => (
        <div key={offer.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium line-clamp-1">{offer.title}</h3>
              <p className="text-sm text-muted-foreground">{offer.project}</p>
            </div>
            {getStatusBadge(offer.status)}
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1.5 text-muted-foreground" />
              <span>Échéance: {offer.deadline}</span>
            </div>
            <div className="text-right font-medium">
              {offer.estimatedValue}
            </div>
          </div>
          
          {offer.status === 'open' && (
            <div className="mt-3 flex gap-2">
              <Link 
                to={`/tender-detail/${offer.id}`}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              >
                <Eye size={14} className="mr-1.5" />
                Voir la fiche du projet
              </Link>
              <Button variant="outline" size="sm">
                <FileText size={14} className="mr-1.5" />
                DCE
              </Button>
            </div>
          )}
          
          {offer.status !== 'open' && (
            <div className="flex justify-end mt-3">
              <Link to={`/tender-detail/${offer.id}`} className="text-primary text-sm flex items-center hover:underline">
                <span>Détails</span>
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          )}
        </div>
      ))}
      
      {tenderOffers.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          Aucun appel d'offres en cours.
        </div>
      )}
      
      <div className="pt-3 text-center">
        <Link to="/tenders" className="text-primary text-sm hover:underline">
          Voir tous les appels d'offres
        </Link>
      </div>
    </div>
  );
}

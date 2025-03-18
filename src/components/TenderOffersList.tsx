
import React from 'react';
import { Calendar, ArrowRight, FileText, ExternalLink } from 'lucide-react';
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
            <div className="mt-3 flex justify-center">
              <Link to={`/tender-specifications?project=${offer.id}`} className="flex-1">
                <Button variant="default" size="sm" className="w-full">
                  <ExternalLink size={14} className="mr-1.5" />
                  Accéder à l'Appel d'offres
                </Button>
              </Link>
            </div>
          )}
          
          {offer.status !== 'open' && (
            <div className="flex justify-end mt-3">
              <Link to={`/tender/${offer.id}`} className="text-primary text-sm flex items-center hover:underline">
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

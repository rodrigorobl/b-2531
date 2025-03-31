
import React from 'react';
import { Calendar, ArrowRight, FileText, ExternalLink, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useProfile } from '@/contexts/ProfileContext';

interface TenderOffer {
  id: string;
  title: string;
  project: string;
  status: 'open' | 'closed' | 'assigned';
  deadline: string;
  tenderType: 'open' | 'restricted';
  accessStatus?: 'pending' | 'approved' | 'rejected';
}

interface TenderOffersListProps {
  tenderOffers: TenderOffer[];
}

export default function TenderOffersList({ tenderOffers }: TenderOffersListProps) {
  const { activeProfile } = useProfile();

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
  
  const getTenderTypeBadge = (type: string, accessStatus?: string) => {
    if (type === 'open') {
      return <Badge variant="outline" className="bg-green-50 font-normal">Ouvert</Badge>;
    } else {
      // For restricted tenders
      return (
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="bg-orange-50 font-normal flex items-center gap-1">
            <Lock size={10} />
            <span>Restreint</span>
          </Badge>
          {accessStatus && getAccessStatusBadge(accessStatus)}
        </div>
      );
    }
  };
  
  const getAccessStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 text-xs font-normal">Demande en cours</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 text-xs font-normal">Accès accordé</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 text-xs font-normal">Accès refusé</Badge>;
      default:
        return null;
    }
  };
  
  const getDestinationUrl = (offerId: string) => {
    if (activeProfile === 'entreprise-construction') {
      return `/construction-tender-specifications?project=${offerId}`;
    }
    return `/tender-specifications?project=${offerId}`;
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
            <div className="flex gap-2">
              {getStatusBadge(offer.status)}
              {getTenderTypeBadge(offer.tenderType, offer.accessStatus)}
            </div>
          </div>
          
          <div className="mt-3 text-sm">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1.5 text-muted-foreground" />
              <span>Échéance: {offer.deadline}</span>
            </div>
          </div>
          
          {offer.status === 'open' && (
            <div className="mt-3 flex justify-center">
              <Link to={getDestinationUrl(offer.id)} className="flex-1">
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

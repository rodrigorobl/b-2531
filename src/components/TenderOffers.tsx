
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, Clock, Info } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useProfile } from '@/contexts/ProfileContext';

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
  const { activeProfile } = useProfile();
  
  const exampleOffers: Offer[] = [
    {
      id: "offer-001",
      lot: "03",
      description: "Gros Œuvre",
      status: "pending",
      deadline: "15/05/2024",
    },
    {
      id: "offer-002",
      lot: "07",
      description: "Peinture",
      status: "submitted",
      deadline: "20/05/2024",
      isCompliant: true,
      submissionDate: "10/05/2024",
      quoteIndex: "QT-002"
    }
  ];

  const prepareOfferData = (offer: Offer) => {
    return {
      ...offer,
      amount: offer.amount || Math.floor(Math.random() * 50000) + 10000,
      submissionDate: offer.submissionDate || (offer.status === 'submitted' ? '10/05/2024' : ''),
      quoteIndex: offer.quoteIndex || `QT-${offer.id.substring(offer.id.length - 3)}`
    };
  };

  const enrichedOffers = exampleOffers.map(prepareOfferData);

  // Get the correct quote details page based on profile
  const getQuoteDetailsLink = (offerId: string) => {
    if (activeProfile === 'entreprise-construction') {
      return `/company-details-tender/quote-${offerId}`;
    } else if (activeProfile === 'entreprise-services') {
      return `/services-detail-tender/quote-${offerId}`;
    } else {
      // Default fallback
      return `/company-details-tender/quote-${offerId}`;
    }
  };

  return (
    <div className="h-full animate-fade-in" style={{
      animationDelay: '0.1s'
    }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Mes offres</h2>
      </div>
      
      <div className="column-content">
        {enrichedOffers.length === 0 ? (
          <EmptyState message="Aucune offre disponible" />
        ) : (
          <OffersTable offers={enrichedOffers} getQuoteDetailsLink={getQuoteDetailsLink} />
        )}
      </div>
    </div>
  );
}

interface OffersTableProps {
  offers: (Offer & {
    amount?: number;
    submissionDate?: string;
    quoteIndex?: string;
  })[];
  getQuoteDetailsLink: (offerId: string) => string;
}

function OffersTable({
  offers,
  getQuoteDetailsLink
}: OffersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lot</TableHead>
          <TableHead>Montant du devis</TableHead>
          <TableHead>Date du devis</TableHead>
          <TableHead>Indice du devis</TableHead>
          <TableHead>Statut</TableHead>
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
            
            <TableCell className="font-medium">
              {offer.amount?.toLocaleString() || '-'} €
            </TableCell>
            
            <TableCell>
              {offer.status === 'pending' ? offer.deadline : offer.submissionDate || '-'}
            </TableCell>
            
            <TableCell>{offer.quoteIndex || '-'}</TableCell>
            
            <TableCell>
              {offer.status === 'pending' ? (
                <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-0">
                  <Clock size={12} className="mr-1" /> En attente
                </Badge>
              ) : offer.isCompliant !== undefined ? (
                offer.isCompliant ? (
                  <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200 border-0">
                    <CheckCircle size={12} className="mr-1" /> Conforme
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-500 hover:bg-red-200 border-0">
                    <AlertCircle size={12} className="mr-1" /> Non conforme
                  </Badge>
                )
              ) : (
                <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-0">
                  <Info size={12} className="mr-1" /> Inconnu
                </Badge>
              )}
            </TableCell>
            
            <TableCell>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 border-primary text-primary hover:bg-primary/10"
                  asChild
                >
                  <Link to={getQuoteDetailsLink(offer.id)}>
                    Détails
                  </Link>
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
  return (
    <div className="h-40 flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <p>{message}</p>
      </div>
    </div>
  );
}

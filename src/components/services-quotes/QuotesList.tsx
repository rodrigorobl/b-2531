
import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Calendar, Check, X, Clock, ArrowRight, ExternalLink, Send } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Quote } from '@/types/services-quotes';

interface QuotesListProps {
  quotes: Quote[];
}

export function QuotesList({ quotes }: QuotesListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString() + ' €';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500">En attente</Badge>;
      case 'sent':
        return <Badge className="bg-blue-500">Envoyé</Badge>;
      case 'accepted':
        return (
          <Badge className="bg-green-500 flex items-center gap-1">
            <Check size={12} /> Accepté
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-500 flex items-center gap-1">
            <X size={12} /> Refusé
          </Badge>
        );
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const getRecipientTypeLabel = (type: string) => {
    switch (type) {
      case 'constructor':
        return 'Entreprise de construction';
      case 'project-manager':
        return 'Maître d\'œuvre';
      case 'developer':
        return 'Promoteur';
      case 'industrial':
        return 'Industriel';
      case 'service-company':
        return 'Entreprise de services';
      default:
        return 'Inconnu';
    }
  };

  const getSourceBadge = (isVoluntary: boolean) => {
    return isVoluntary ? (
      <Badge variant="outline" className="flex items-center gap-1 bg-emerald-50 hover:bg-emerald-50">
        <Send size={12} />
        Démarchage actif
      </Badge>
    ) : (
      <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 hover:bg-blue-50">
        <ExternalLink size={12} />
        Sur demande
      </Badge>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Projet</TableHead>
          <TableHead>
            <div className="flex items-center">
              <Building size={14} className="mr-1" />
              Destinataire
            </div>
          </TableHead>
          <TableHead>Service proposé</TableHead>
          <TableHead>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              Date d'envoi
            </div>
          </TableHead>
          <TableHead>Montant</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quotes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
              Aucun devis trouvé
            </TableCell>
          </TableRow>
        ) : (
          quotes.map((quote) => (
            <TableRow key={quote.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <Link to={`/project/${quote.projectId}`} className="hover:underline">
                  {quote.projectName}
                </Link>
              </TableCell>
              <TableCell>
                <div>
                  <Link to={`/company-detail/${quote.recipientId}`} className="hover:underline">
                    {quote.recipientName}
                  </Link>
                </div>
                <div className="text-xs text-muted-foreground">{getRecipientTypeLabel(quote.recipientType)}</div>
              </TableCell>
              <TableCell>{quote.serviceName}</TableCell>
              <TableCell>{formatDate(quote.createdAt)}</TableCell>
              <TableCell className="font-medium">{formatAmount(quote.currentAmount)}</TableCell>
              <TableCell>{getSourceBadge(quote.isVoluntary)}</TableCell>
              <TableCell>{getStatusBadge(quote.status)}</TableCell>
              <TableCell className="text-right">
                <Link to={`/services-quote-tracking/${quote.id}`}>
                  <Button variant="outline" size="sm">
                    <ArrowRight size={14} className="mr-1" />
                    Suivi
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

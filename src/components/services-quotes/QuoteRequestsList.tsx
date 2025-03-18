
import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuoteRequest } from '@/types/services-quotes';

interface QuoteRequestsListProps {
  requests: QuoteRequest[];
}

export function QuoteRequestsList({ requests }: QuoteRequestsListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500">En attente</Badge>;
      case 'sent':
        return <Badge className="bg-blue-500">Devis envoyé</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500">Accepté</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Refusé</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const getRequesterTypeLabel = (type: string) => {
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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Projet</TableHead>
          <TableHead>
            <div className="flex items-center">
              <Building size={14} className="mr-1" />
              Demandeur
            </div>
          </TableHead>
          <TableHead>Service demandé</TableHead>
          <TableHead>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              Date demande
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              Échéance
            </div>
          </TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
              Aucune demande de devis trouvée
            </TableCell>
          </TableRow>
        ) : (
          requests.map((request) => (
            <TableRow key={request.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <Link to={`/project/${request.projectId}`} className="hover:underline">
                  {request.projectName}
                </Link>
              </TableCell>
              <TableCell>
                <div>
                  <Link to={`/company-detail/${request.requesterId}`} className="hover:underline">
                    {request.requesterName}
                  </Link>
                </div>
                <div className="text-xs text-muted-foreground">{getRequesterTypeLabel(request.requesterType)}</div>
              </TableCell>
              <TableCell>{request.serviceName}</TableCell>
              <TableCell>{formatDate(request.requestDate)}</TableCell>
              <TableCell>{formatDate(request.desiredCompletionDate)}</TableCell>
              <TableCell>{getStatusBadge(request.status)}</TableCell>
              <TableCell className="text-right">
                <Link to={`/services-quote-tracking/${request.id}`}>
                  <Button variant="outline" size="sm">
                    <ArrowRight size={14} className="mr-1" />
                    Voir le suivi
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

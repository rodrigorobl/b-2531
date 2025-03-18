
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Eye, Share2, ArrowDownUp } from 'lucide-react';

export type QuoteStatus = 'to-analyze' | 'in-progress' | 'compliant' | 'non-compliant';
export type UrgencyLevel = 'low' | 'medium' | 'high';

export interface Quote {
  id: string;
  projectId: string;
  projectName: string;
  lotId: string;
  lotName: string;
  companyId: string;
  companyName: string;
  submissionDate: string;
  amount: number;
  status: QuoteStatus;
  dueDate: string;
  urgency: UrgencyLevel;
}

interface QuotesTableProps {
  quotes: Quote[];
  handleSort: (field: string) => void;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  formatDate: (dateString: string) => string;
  formatAmount: (amount: number) => string;
  updateQuoteStatus: (quoteId: string, newStatus: QuoteStatus) => void;
  shareQuoteAnalysis: (quoteId: string) => void;
}

export function QuotesTable({ 
  quotes, 
  handleSort, 
  sortField, 
  sortDirection, 
  formatDate,
  formatAmount,
  updateQuoteStatus,
  shareQuoteAnalysis
}: QuotesTableProps) {
  const getUrgencyBadge = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case 'high':
        return <Badge className="bg-red-500">Urgent</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">Modéré</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Faible</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'to-analyze':
        return <Badge className="bg-blue-500">À analyser</Badge>;
      case 'in-progress':
        return <Badge className="bg-amber-500">En cours</Badge>;
      case 'compliant':
        return <Badge className="bg-green-500">Conforme</Badge>;
      case 'non-compliant':
        return <Badge className="bg-red-500">Non conforme</Badge>;
      default:
        return null;
    }
  };

  const renderSortIcon = (field: string) => {
    if (sortField === field) {
      return (
        <ArrowDownUp 
          size={14} 
          className={`ml-1 transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} 
        />
      );
    }
    return null;
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('projectName')}
            >
              <div className="flex items-center">
                Projet {renderSortIcon('projectName')}
              </div>
            </TableHead>
            <TableHead>Lot</TableHead>
            <TableHead>Entreprise</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('submissionDate')}
            >
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                Date de soumission {renderSortIcon('submissionDate')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('amount')}
            >
              <div className="flex items-center">
                Montant {renderSortIcon('amount')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('dueDate')}
            >
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                Échéance {renderSortIcon('dueDate')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('urgency')}
            >
              <div className="flex items-center">
                Urgence {renderSortIcon('urgency')}
              </div>
            </TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center h-24 text-muted-foreground">
                Aucun devis trouvé
              </TableCell>
            </TableRow>
          ) : (
            quotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">{quote.projectName}</TableCell>
                <TableCell>{quote.lotName}</TableCell>
                <TableCell>{quote.companyName}</TableCell>
                <TableCell>{formatDate(quote.submissionDate)}</TableCell>
                <TableCell>{formatAmount(quote.amount)}</TableCell>
                <TableCell>{formatDate(quote.dueDate)}</TableCell>
                <TableCell>{getUrgencyBadge(quote.urgency)}</TableCell>
                <TableCell>{getStatusBadge(quote.status)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link to={`/quote-analysis/${quote.id}`}>
                        <Eye size={14} className="mr-1" />
                        Voir
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareQuoteAnalysis(quote.id)}
                    >
                      <Share2 size={14} className="mr-1" />
                      Partager
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

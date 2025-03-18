
import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Building, Calendar, Clock, DollarSign, FileText, Share } from 'lucide-react';
import { QuoteStatusBadge, QuoteUrgencyBadge } from './QuoteStatusBadge';
import { QuoteClassificationDialog } from './QuoteClassificationDialog';

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

export const QuotesTable = ({
  quotes,
  handleSort,
  sortField,
  sortDirection,
  formatDate,
  formatAmount,
  updateQuoteStatus,
  shareQuoteAnalysis
}: QuotesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="cursor-pointer" onClick={() => handleSort('projectName')}>
            <div className="flex items-center gap-1">
              Projet
              {sortField === 'projectName' && (
                <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              )}
            </div>
          </TableHead>
          <TableHead>Lot</TableHead>
          <TableHead>
            <div className="flex items-center gap-1">
              <Building size={14} className="mr-1" />
              Entreprise
            </div>
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('submissionDate')}>
            <div className="flex items-center gap-1">
              <Calendar size={14} className="mr-1" />
              Date du devis
              {sortField === 'submissionDate' && (
                <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              )}
            </div>
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('dueDate')}>
            <div className="flex items-center gap-1">
              <Clock size={14} className="mr-1" />
              Échéance
              {sortField === 'dueDate' && (
                <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              )}
            </div>
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('amount')}>
            <div className="flex items-center gap-1">
              <DollarSign size={14} className="mr-1" />
              Montant
              {sortField === 'amount' && (
                <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              )}
            </div>
          </TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('urgency')}>
            <div className="flex items-center gap-1">
              Urgence
              {sortField === 'urgency' && (
                <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              )}
            </div>
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quotes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
              Aucun devis ne correspond à vos critères
            </TableCell>
          </TableRow>
        ) : (
          quotes.map((quote) => (
            <TableRow key={quote.id} className="hover:bg-muted/50">
              <TableCell>
                <div className="font-medium">{quote.projectName}</div>
              </TableCell>
              <TableCell>{quote.lotName}</TableCell>
              <TableCell>{quote.companyName}</TableCell>
              <TableCell>{formatDate(quote.submissionDate)}</TableCell>
              <TableCell>{formatDate(quote.dueDate)}</TableCell>
              <TableCell className="font-medium">{formatAmount(quote.amount)}</TableCell>
              <TableCell><QuoteStatusBadge status={quote.status} /></TableCell>
              <TableCell><QuoteUrgencyBadge urgency={quote.urgency} /></TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/quote/${quote.id}`}>
                      <FileText size={14} className="mr-1" />
                      Voir
                    </Link>
                  </Button>
                  
                  {(quote.status === 'to-analyze' || quote.status === 'in-progress') && (
                    <QuoteClassificationDialog 
                      quoteId={quote.id}
                      updateQuoteStatus={updateQuoteStatus}
                    />
                  )}
                  
                  <Button variant="ghost" size="sm" onClick={() => shareQuoteAnalysis(quote.id)}>
                    <Share size={14} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

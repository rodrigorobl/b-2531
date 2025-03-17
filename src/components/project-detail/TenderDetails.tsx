
import React from 'react';
import { FileText, Eye } from 'lucide-react';
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
import { TenderData, QuoteData } from '@/types/projectDetail';
import { formatBudget, formatDate } from '@/utils/tenderFormatUtils';

interface TenderDetailsProps {
  tender: TenderData | undefined;
  quotes: QuoteData[];
}

export function TenderDetails({ tender, quotes }: TenderDetailsProps) {
  if (!tender) return null;
  
  return (
    <div>
      {/* Tender Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <h3 className="font-semibold mb-1">Description</h3>
          <p className="text-sm text-muted-foreground">
            {tender.description || 'Aucune description'}
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-1">Budget alloué</h3>
          <p className="text-sm">
            {tender.budget 
              ? formatBudget(tender.budget) 
              : 'Non défini'}
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-1">Date limite</h3>
          <p className="text-sm">
            {formatDate(tender.date_limite)}
          </p>
        </div>
      </div>
      
      {/* Quotes for this tender */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Devis reçus</h3>
        
        {!quotes || quotes.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground border rounded-md">
            Aucun devis reçu pour cet appel d'offres
          </div>
        ) : (
          <QuotesList quotes={quotes} />
        )}
      </div>
    </div>
  );
}

function QuotesList({ quotes }: { quotes: QuoteData[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Entreprise</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead>Date soumission</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quotes.map(quote => (
          <TableRow key={quote.id}>
            <TableCell className="font-medium">
              {quote.entreprise_nom || 'Entreprise inconnue'}
            </TableCell>
            <TableCell>
              {formatBudget(quote.montant)}
            </TableCell>
            <TableCell>
              {quote.date_soumission 
                ? formatDate(quote.date_soumission)
                : 'Date inconnue'}
            </TableCell>
            <TableCell>
              {quote.statut === 'Accepté' && (
                <Badge className="bg-green-600">Accepté</Badge>
              )}
              {quote.statut === 'Refusé' && (
                <Badge className="bg-red-500">Refusé</Badge>
              )}
              {quote.statut === 'Soumis' && (
                <Badge className="bg-blue-500">Soumis</Badge>
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {quote.document_url && (
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-1" />
                    Document
                  </Button>
                )}
                
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-1" />
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

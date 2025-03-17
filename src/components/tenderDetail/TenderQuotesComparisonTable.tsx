
import React from 'react';
import { TenderDetailData, TenderQuote } from '@/types/tenderDetail';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  Clock, 
  Download, 
  FileText, 
  ThumbsDown, 
  ThumbsUp, 
  X 
} from 'lucide-react';

interface TenderQuotesComparisonTableProps {
  tender: TenderDetailData;
  selectedLotId: string | null;
  onClose: () => void;
}

export default function TenderQuotesComparisonTable({ 
  tender, 
  selectedLotId,
  onClose 
}: TenderQuotesComparisonTableProps) {
  if (!selectedLotId) return null;
  
  const selectedLot = tender.lots.find(lot => lot.id === selectedLotId);
  if (!selectedLot) return null;
  
  const quotesForLot = tender.quotes.filter(quote => quote.lotId === selectedLotId);
  
  if (quotesForLot.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Devis pour le lot: {selectedLot.name}</h2>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="w-4 h-4 mr-1" />
            Fermer
          </Button>
        </div>
        <div className="p-12 text-center text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>Aucun devis n'a été reçu pour ce lot.</p>
        </div>
      </div>
    );
  }
  
  // Sort quotes by price (cheapest first)
  const sortedQuotes = [...quotesForLot].sort((a, b) => a.price - b.price);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Devis pour le lot: {selectedLot.name}</h2>
        <Button variant="outline" size="sm" onClick={onClose}>
          <X className="w-4 h-4 mr-1" />
          Fermer
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Entreprise</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Date soumission</TableHead>
              <TableHead>Conformité</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Commentaires</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedQuotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">{quote.companyName}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 0,
                  }).format(quote.price)}
                  {quote.price === Math.min(...sortedQuotes.map(q => q.price)) && (
                    <Badge className="ml-2 bg-green-600">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      Meilleur prix
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{new Date(quote.submissionDate).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>
                  {quote.isCompliant ? (
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                      <Check className="w-3 h-3 mr-1" />
                      Conforme
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                      <X className="w-3 h-3 mr-1" />
                      Non conforme
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {quote.status === 'accepted' ? (
                    <Badge className="bg-green-600">
                      <Check className="w-3 h-3 mr-1" />
                      Accepté
                    </Badge>
                  ) : quote.status === 'rejected' ? (
                    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                      <ThumbsDown className="w-3 h-3 mr-1" />
                      Refusé
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                      <Clock className="w-3 h-3 mr-1" />
                      En attente
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="max-w-[250px]">
                  <p className="text-xs text-muted-foreground truncate">
                    {quote.comments || "Aucun commentaire"}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Devis
                    </Button>
                    {quote.status === 'pending' && selectedLot.isAssigned === false && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Accepter
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

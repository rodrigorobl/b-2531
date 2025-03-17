
import React from 'react';
import { TenderDetailData } from '@/types/tenderDetail';
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
import { CheckCircle, Clock, Eye, XCircle } from 'lucide-react';

interface TenderLotsTableProps {
  tender: TenderDetailData;
  onViewLotQuotes: (lotId: string) => void;
}

export default function TenderLotsTable({ tender, onViewLotQuotes }: TenderLotsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">Lots du projet</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lot</TableHead>
            <TableHead>Budget estimé</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Devis reçus</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tender.lots.map((lot) => {
            const quotesForLot = tender.quotes.filter(quote => quote.lotId === lot.id);
            
            return (
              <TableRow key={lot.id}>
                <TableCell className="font-medium">
                  <div>
                    {lot.name}
                    <p className="text-xs text-muted-foreground">{lot.description}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 0,
                  }).format(lot.budget)}
                </TableCell>
                <TableCell>
                  {lot.isAssigned ? (
                    <Badge className="bg-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Attribué à {lot.assignedToCompanyName}
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      En attente
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {quotesForLot.length === 0 ? (
                    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                      <XCircle className="w-3 h-3 mr-1" />
                      Aucun devis
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {quotesForLot.length} devis
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                    onClick={() => onViewLotQuotes(lot.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Voir les devis
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

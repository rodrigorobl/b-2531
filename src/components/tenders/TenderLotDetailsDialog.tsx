
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { TenderSearchResult } from '@/types/tenders';
import { getLotStatusBadge } from './TenderHelpers';

interface TenderLotDetailsDialogProps {
  selectedTender: TenderSearchResult | null;
  showLotDetails: boolean;
  setShowLotDetails: (show: boolean) => void;
}

export default function TenderLotDetailsDialog({ 
  selectedTender, 
  showLotDetails, 
  setShowLotDetails 
}: TenderLotDetailsDialogProps) {
  if (!selectedTender) return null;

  return (
    <Dialog open={showLotDetails} onOpenChange={setShowLotDetails}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Lots pour {selectedTender.projectName}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {selectedTender.lotDetails && selectedTender.lotDetails.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du lot</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Devis reçus</TableHead>
                  <TableHead>Entreprise attributaire</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedTender.lotDetails.map((lot) => (
                  <TableRow key={lot.id}>
                    <TableCell className="font-medium">{lot.name}</TableCell>
                    <TableCell>{getLotStatusBadge(lot.status)}</TableCell>
                    <TableCell>{lot.quotesReceived}/{lot.quotesRequired}</TableCell>
                    <TableCell>
                      {lot.assignedTo || (
                        <span className="text-muted-foreground text-sm">Non attribué</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>Aucun lot défini pour cet appel d'offres.</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => setShowLotDetails(false)}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LotBidDetails } from './LotBidDetails';
import { FileText, MessageSquare, Check, CheckCircle, XCircle, Flag } from 'lucide-react';

interface Bid {
  id: string;
  companyId: string;
  companyName: string;
  amount: number;
  submissionDate: string;
  compliant: boolean;
  complianceNotes: string;
  solvencyScore: 'excellent' | 'average' | 'at-risk';
  administrativeScore: number;
  selected: boolean;
  isFavorite?: boolean;
}

interface LotAnalysisTableProps {
  bids: Bid[];
  selectedBids: string[];
  isAssigned: boolean;
  onToggleBidSelection: (bidId: string) => void;
  onOpenCommentDialog: (bidId: string) => void;
  onSelectWinningBid: (bidId: string) => void;
  onSelectFavoriteBid: (bidId: string) => void;
  formatPrice: (amount: number) => string;
  formatDate: (dateString: string) => string;
  getSolvencyBadge: (score: 'excellent' | 'average' | 'at-risk') => React.ReactNode;
  getAdministrativeScoreBadge: (score: number) => React.ReactNode;
}

export function LotAnalysisTable({
  bids,
  selectedBids,
  isAssigned,
  onToggleBidSelection,
  onOpenCommentDialog,
  onSelectWinningBid,
  onSelectFavoriteBid,
  formatPrice,
  formatDate,
  getSolvencyBadge,
  getAdministrativeScoreBadge
}: LotAnalysisTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]"></TableHead>
          <TableHead>Entreprise</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Conformité</TableHead>
          <TableHead>Solvabilité</TableHead>
          <TableHead>Score Admin.</TableHead>
          <TableHead>Entreprise présentie</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bids.map((bid) => (
          <TableRow key={bid.id} className={bid.selected ? "bg-primary/5" : bid.isFavorite ? "bg-blue-50" : ""}>
            <TableCell>
              <Checkbox 
                checked={selectedBids.includes(bid.id)} 
                onCheckedChange={() => onToggleBidSelection(bid.id)}
                disabled={isAssigned}
              />
            </TableCell>
            <TableCell className={`font-medium ${bid.isFavorite ? "text-blue-600 font-bold" : ""}`}>
              {bid.companyName}
            </TableCell>
            <TableCell>{formatPrice(bid.amount)}</TableCell>
            <TableCell>{formatDate(bid.submissionDate)}</TableCell>
            <TableCell>
              {bid.compliant ? (
                <Badge className="bg-green-500 flex items-center gap-1 w-fit">
                  <CheckCircle className="h-3 w-3" /> Conforme
                </Badge>
              ) : (
                <Badge className="bg-red-500 flex items-center gap-1 w-fit">
                  <XCircle className="h-3 w-3" /> Non conforme
                </Badge>
              )}
            </TableCell>
            <TableCell>{getSolvencyBadge(bid.solvencyScore)}</TableCell>
            <TableCell>{getAdministrativeScoreBadge(bid.administrativeScore)}</TableCell>
            <TableCell>
              {bid.isFavorite ? (
                <Badge className="bg-blue-500 flex items-center gap-1 w-fit">
                  <Flag className="h-3 w-3" /> Présentie
                </Badge>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onSelectFavoriteBid(bid.id)}
                  disabled={!bid.compliant || isAssigned}
                >
                  Définir
                </Button>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Détails du devis - {bid.companyName}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <LotBidDetails bid={bid} />
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onOpenCommentDialog(bid.id)}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                
                {!isAssigned && bid.compliant && (
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => onSelectWinningBid(bid.id)}
                  >
                    <Check className="h-4 w-4" /> Attribuer le lot
                  </Button>
                )}
                
                {bid.selected && (
                  <Badge className="bg-green-600">Sélectionné</Badge>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
        
        {bids.length === 0 && (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
              Aucun devis trouvé avec les critères actuels.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}


import React from 'react';
import { Eye } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TenderData } from '@/types/projectDetail';
import { Badge } from '@/components/ui/badge';
import { formatBudget, formatDate } from '@/utils/tenderFormatUtils';

interface TendersListProps {
  tenders: TenderData[];
  selectedTenderId: string | null;
  setSelectedTenderId: (id: string) => void;
}

export function TendersList({ 
  tenders, 
  selectedTenderId, 
  setSelectedTenderId 
}: TendersListProps) {
  // Helper to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'En cours':
      case 'Ouvert':
        return <Badge className="bg-blue-500">En cours</Badge>;
      case 'Clôturé':
        return <Badge className="bg-amber-500">Clôturé</Badge>;
      case 'Attribué':
        return <Badge className="bg-green-600">Attribué</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lot</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Date limite</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>Devis reçus</TableHead>
          <TableHead>Progression</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tenders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
              Aucun appel d'offres pour ce projet
            </TableCell>
          </TableRow>
        ) : (
          tenders.map(tender => (
            <TableRow 
              key={tender.id}
              className={selectedTenderId === tender.id ? "bg-muted" : ""}
            >
              <TableCell className="font-medium">{tender.lot}</TableCell>
              <TableCell>{tender.type_appel_offre}</TableCell>
              <TableCell>{renderStatusBadge(tender.statut)}</TableCell>
              <TableCell>{formatDate(tender.date_limite)}</TableCell>
              <TableCell>
                {tender.budget ? formatBudget(tender.budget) : '-'}
              </TableCell>
              <TableCell>
                {tender.quotes_received || 0} devis
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Progress value={tender.progress || 0} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {tender.progress || 0}%
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedTenderId(tender.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Détails
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

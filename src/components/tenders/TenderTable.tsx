
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
import { ArrowUpDown, FileText, Eye } from 'lucide-react';
import { Tender, ParticipationStatus } from '@/pages/TenderOffers';
import { Link } from 'react-router-dom';

interface TenderTableProps {
  tenders: Tender[];
  onSelectTender: (tenderId: string) => void;
  selectedTenderId: string | null;
}

export default function TenderTable({ tenders, onSelectTender, selectedTenderId }: TenderTableProps) {
  const getParticipationStatusBadge = (status: ParticipationStatus) => {
    switch (status) {
      case 'to-submit':
        return <Badge className="bg-amber-500">À soumettre</Badge>;
      case 'pending':
        return <Badge className="bg-blue-500">En attente</Badge>;
      case 'approved':
        return <Badge className="bg-green-600">Accepté</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Refusé</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  return (
    <div className="h-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">
              <div className="flex items-center gap-1 cursor-pointer">
                Projet <ArrowUpDown size={14} />
              </div>
            </TableHead>
            <TableHead>Lots</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>
              <div className="flex items-center gap-1 cursor-pointer">
                Date limite <ArrowUpDown size={14} />
              </div>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                Aucun appel d'offres correspondant à vos critères
              </TableCell>
            </TableRow>
          ) : (
            tenders.map((tender) => (
              <TableRow 
                key={tender.id} 
                className={selectedTenderId === tender.id ? "bg-muted" : ""}
                onClick={() => onSelectTender(tender.id)}
              >
                <TableCell>
                  <div className="font-medium">{tender.projectName}</div>
                  <div className="text-xs text-muted-foreground">{tender.projectType} - {tender.location}</div>
                </TableCell>
                <TableCell>{tender.lots.join(", ")}</TableCell>
                <TableCell>{getParticipationStatusBadge(tender.participationStatus)}</TableCell>
                <TableCell>{tender.deadline}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link 
                      to={`/tender-detail/${tender.id}`}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Eye size={14} />
                      <span>Voir la fiche du projet</span>
                    </Link>
                    
                    <Button size="sm" variant="outline" className="gap-1">
                      <FileText size={14} />
                      <span>DCE</span>
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


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
import { Link } from 'react-router-dom';
import { ArrowUpDown, Clock, CheckCircle, Calendar, Users } from 'lucide-react';

export type TenderStatus = 'open' | 'closed' | 'assigned';

export interface Tender {
  id: string;
  projectName: string;
  lotName: string;
  status: TenderStatus;
  closingDate: string;
  receivedOffers: number;
  budget: string;
  clientName: string;
}

interface TenderTableProps {
  tenders: Tender[];
  renderStatusBadge: (status: TenderStatus) => React.ReactNode;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  handleSort: (field: string) => void;
}

export function TenderManagementTable({ 
  tenders, 
  renderStatusBadge,
  sortField,
  sortDirection,
  handleSort
}: TenderTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead 
            className="cursor-pointer" 
            onClick={() => handleSort('projectName')}
          >
            <div className="flex items-center gap-1">
              Projet 
              {sortField === 'projectName' && (
                <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              )}
            </div>
          </TableHead>
          <TableHead>Lot</TableHead>
          <TableHead 
            className="cursor-pointer" 
            onClick={() => handleSort('receivedOffers')}
          >
            <div className="flex items-center gap-1">
              <Users size={14} className="mr-1" />
              Offres 
              {sortField === 'receivedOffers' && (
                <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              )}
            </div>
          </TableHead>
          <TableHead>Statut</TableHead>
          <TableHead 
            className="cursor-pointer" 
            onClick={() => handleSort('closingDate')}
          >
            <div className="flex items-center gap-1">
              <Calendar size={14} className="mr-1" />
              Date limite 
              {sortField === 'closingDate' && (
                <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              )}
            </div>
          </TableHead>
          <TableHead 
            className="cursor-pointer text-right" 
            onClick={() => handleSort('budget')}
          >
            <div className="flex items-center gap-1 justify-end">
              Budget 
              {sortField === 'budget' && (
                <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              )}
            </div>
          </TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tenders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
              Aucun appel d'offres ne correspond à vos critères
            </TableCell>
          </TableRow>
        ) : (
          tenders.map((tender) => (
            <TableRow key={tender.id} className="hover:bg-muted/50">
              <TableCell>
                <div className="font-medium">{tender.projectName}</div>
                <div className="text-xs text-muted-foreground">{tender.clientName}</div>
              </TableCell>
              <TableCell>{tender.lotName}</TableCell>
              <TableCell>{tender.receivedOffers}</TableCell>
              <TableCell>{renderStatusBadge(tender.status)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {tender.status === 'open' ? (
                    <Clock size={14} className="text-amber-500" />
                  ) : (
                    <CheckCircle size={14} className="text-green-600" />
                  )}
                  <span>{tender.closingDate}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">{tender.budget}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/tender/${tender.id}/lot/${tender.id}`}>
                    Détails
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}


import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { 
  ArrowUpDown, 
  FileDown, 
  Eye, 
  Loader2, 
  AlertCircle,
  Layers
} from 'lucide-react';
import { TenderSearchResult } from '@/types/tenders';
import {
  getStatusBadge,
  getQuoteQualityIndicator,
  getBudgetRespectIndicator
} from './TenderHelpers';

interface TenderManagementTableProps {
  tenders: TenderSearchResult[];
  isLoading: boolean;
  error: string | null;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  handleSort: (field: string) => void;
  openLotDetails: (tender: TenderSearchResult) => void;
}

export default function TenderManagementTable({
  tenders,
  isLoading,
  error,
  sortField,
  sortDirection,
  handleSort,
  openLotDetails
}: TenderManagementTableProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <AlertCircle className="mx-auto h-8 w-8 text-destructive mb-2" />
        <p>Une erreur est survenue lors du chargement des appels d'offres.</p>
        <p className="text-xs text-destructive mt-1">{error}</p>
      </div>
    );
  }

  if (tenders.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={10} className="text-center py-10 text-muted-foreground">
          Aucun appel d'offres correspondant à vos critères
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">
            <div 
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handleSort('projectName')}
            >
              Projet 
              <ArrowUpDown size={14} />
            </div>
          </TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>
            <div 
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handleSort('deadline')}
            >
              Date limite 
              <ArrowUpDown size={14} />
            </div>
          </TableHead>
          <TableHead>
            <div 
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handleSort('quotesReceived')}
            >
              Devis reçus 
              <ArrowUpDown size={14} />
            </div>
          </TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>
            <div 
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handleSort('progress')}
            >
              Avancement 
              <ArrowUpDown size={14} />
            </div>
          </TableHead>
          <TableHead>Qualité</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tenders.map((tender) => (
          <TableRow key={tender.id}>
            <TableCell>
              <div className="font-medium">{tender.projectName}</div>
              <div className="text-xs text-muted-foreground">{tender.location}</div>
            </TableCell>
            <TableCell>{tender.projectType}</TableCell>
            <TableCell>{getStatusBadge(tender.status)}</TableCell>
            <TableCell>{tender.deadline}</TableCell>
            <TableCell>
              <div className="font-medium">{tender.actualQuotesReceived || 0}</div>
              <div className="text-xs text-muted-foreground">devis</div>
            </TableCell>
            <TableCell>{tender.budget}</TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                <Progress value={tender.progress || 0} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {tender.lotsAssigned || 0}/{tender.lotsTotal || 0} lots ({tender.progress || 0}%)
                </div>
              </div>
            </TableCell>
            <TableCell>{tender.quoteQuality && getQuoteQualityIndicator(tender.quoteQuality)}</TableCell>
            <TableCell>{tender.budgetRespect && getBudgetRespectIndicator(tender.budgetRespect)}</TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={() => openLotDetails(tender)}
                >
                  <Layers size={14} />
                  <span>Lots</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="default" 
                  className="gap-1"
                  onClick={() => navigate(`/tender-detail/${tender.id}`)}
                >
                  <Eye size={14} />
                  <span>Détails</span>
                </Button>
                <Button size="sm" variant="outline" className="gap-1">
                  <FileDown size={14} />
                  <span>DCE</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

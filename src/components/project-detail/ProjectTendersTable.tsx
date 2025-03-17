
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ProjectTender } from '@/types/projects';
import { getStatusBadge } from '@/components/tenders/TenderHelpers';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProjectTendersTableProps {
  tenders: ProjectTender[];
}

export function ProjectTendersTable({ tenders }: ProjectTendersTableProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <div className="rounded-md border overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[120px]">Lot</TableHead>
            <TableHead className="min-w-[100px]">Type</TableHead>
            <TableHead className="min-w-[100px]">Statut</TableHead>
            {!isMobile && <TableHead className="min-w-[100px]">Date limite</TableHead>}
            {!isMobile && <TableHead className="min-w-[100px]">Devis reçus</TableHead>}
            <TableHead className="min-w-[140px]">Progression</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={isMobile ? 5 : 7} className="text-center py-8 md:py-10 text-muted-foreground">
                Aucun appel d'offres pour ce projet
              </TableCell>
            </TableRow>
          ) : (
            tenders.map((tender) => (
              <TableRow key={tender.id}>
                <TableCell>
                  <div className="font-medium text-sm md:text-base">{tender.name}</div>
                </TableCell>
                <TableCell className="text-sm">{tender.type}</TableCell>
                <TableCell>{getStatusBadge(tender.status)}</TableCell>
                {!isMobile && <TableCell className="text-sm">{tender.deadline}</TableCell>}
                {!isMobile && <TableCell className="text-sm">{tender.quotesReceived}</TableCell>}
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Progress value={tender.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {tender.lotsAssigned}/{tender.lotsTotal} lots ({tender.progress}%)
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="gap-1"
                    onClick={() => navigate(`/tender-detail/${tender.id}`)}
                  >
                    <Eye size={14} />
                    {!isMobile && <span>Détails</span>}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

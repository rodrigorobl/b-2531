
import React from 'react';
import { Eye } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { formatDate } from '@/utils/tenderFormatUtils';
import { TenderData } from '@/types/projectDetail';

interface RecentTendersTableProps {
  tenders: TenderData[];
  setActiveTab: (tab: string) => void;
  setSelectedTenderId: (id: string) => void;
}

export function RecentTendersTable({ 
  tenders, 
  setActiveTab, 
  setSelectedTenderId 
}: RecentTendersTableProps) {
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Appels d'offres récents</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setActiveTab('tenders')}
        >
          Voir tous
        </Button>
      </CardHeader>
      <CardContent>
        {tenders.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            Aucun appel d'offres pour ce projet
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lot</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date limite</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenders.slice(0, 3).map(tender => (
                <TableRow key={tender.id}>
                  <TableCell className="font-medium">{tender.lot}</TableCell>
                  <TableCell>{tender.type_appel_offre}</TableCell>
                  <TableCell>{renderStatusBadge(tender.statut)}</TableCell>
                  <TableCell>{formatDate(tender.date_limite)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setSelectedTenderId(tender.id);
                        setActiveTab('tenders');
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

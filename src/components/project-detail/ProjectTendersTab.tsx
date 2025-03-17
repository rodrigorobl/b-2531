
import React from 'react';
import { Eye, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { formatBudget, formatDate } from '@/utils/tenderFormatUtils';
import { TenderData, QuoteData } from '@/types/projectDetail';

interface ProjectTendersTabProps {
  tenders: TenderData[];
  quotes: { [key: string]: QuoteData[] };
  selectedTenderId: string | null;
  setSelectedTenderId: (id: string) => void;
}

export function ProjectTendersTab({ 
  tenders, 
  quotes, 
  selectedTenderId, 
  setSelectedTenderId 
}: ProjectTendersTabProps) {
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
    <>
      {/* All Tenders */}
      <Card>
        <CardHeader>
          <CardTitle>Tous les appels d'offres</CardTitle>
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
                  <TableHead>Budget</TableHead>
                  <TableHead>Devis reçus</TableHead>
                  <TableHead>Progression</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenders.map(tender => (
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
                      {(quotes[tender.id]?.length || 0)} devis
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
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Selected Tender Details */}
      {selectedTenderId && (
        <Card>
          <CardHeader>
            <CardTitle>
              Détails de l'appel d'offres - {tenders.find(t => t.id === selectedTenderId)?.lot}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Tender Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <h3 className="font-semibold mb-1">Description</h3>
                <p className="text-sm text-muted-foreground">
                  {tenders.find(t => t.id === selectedTenderId)?.description || 'Aucune description'}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">Budget alloué</h3>
                <p className="text-sm">
                  {tenders.find(t => t.id === selectedTenderId)?.budget 
                    ? formatBudget(tenders.find(t => t.id === selectedTenderId)?.budget || 0) 
                    : 'Non défini'}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">Date limite</h3>
                <p className="text-sm">
                  {formatDate(tenders.find(t => t.id === selectedTenderId)?.date_limite || '')}
                </p>
              </div>
            </div>
            
            {/* Quotes for this tender */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Devis reçus</h3>
              
              {!quotes[selectedTenderId] || quotes[selectedTenderId].length === 0 ? (
                <div className="text-center py-6 text-muted-foreground border rounded-md">
                  Aucun devis reçu pour cet appel d'offres
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entreprise</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Date soumission</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotes[selectedTenderId].map(quote => (
                      <TableRow key={quote.id}>
                        <TableCell className="font-medium">
                          {quote.entreprise_nom || 'Entreprise inconnue'}
                        </TableCell>
                        <TableCell>
                          {formatBudget(quote.montant)}
                        </TableCell>
                        <TableCell>
                          {quote.date_soumission 
                            ? formatDate(quote.date_soumission)
                            : 'Date inconnue'}
                        </TableCell>
                        <TableCell>
                          {quote.statut === 'Accepté' && (
                            <Badge className="bg-green-600">Accepté</Badge>
                          )}
                          {quote.statut === 'Refusé' && (
                            <Badge className="bg-red-500">Refusé</Badge>
                          )}
                          {quote.statut === 'Soumis' && (
                            <Badge className="bg-blue-500">Soumis</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {quote.document_url && (
                              <Button size="sm" variant="outline">
                                <FileText className="h-4 w-4 mr-1" />
                                Document
                              </Button>
                            )}
                            
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Détails
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

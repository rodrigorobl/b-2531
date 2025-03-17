
import React from 'react';
import { Tender } from '@/pages/TenderOffers';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, MessageSquare, Calendar, Upload, Map, Building, FileDown, Clock, Users, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TenderDetailsProps {
  tender?: Tender;
}
export default function TenderDetails({
  tender
}: TenderDetailsProps) {
  if (!tender) {
    return (
      <div className="w-80 min-w-80 bg-white rounded-lg shadow-sm flex items-center justify-center">
        <div className="text-center p-6 text-muted-foreground">
          <FileText className="mx-auto mb-2 opacity-20" size={40} />
          <p>Sélectionnez un appel d'offres pour voir les détails</p>
        </div>
      </div>
    );
  }
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'En cours';
      case 'closed':
        return 'Clôturé';
      case 'assigned':
        return 'Attribué';
      default:
        return 'Inconnu';
    }
  };
  
  const getParticipationStatusLabel = (status: string) => {
    switch (status) {
      case 'to-submit':
        return 'À soumettre';
      case 'pending':
        return 'En attente';
      case 'approved':
        return 'Accepté';
      case 'rejected':
        return 'Refusé';
      default:
        return 'Inconnu';
    }
  };
  
  return (
    <div className="w-80 min-w-80 bg-white rounded-lg shadow-sm flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium truncate">{tender.projectName}</h3>
          <Badge variant="outline" className="rounded-sm font-normal">
            {getStatusLabel(tender.status)}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>Échéance: {tender.deadline}</span>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start px-4 pt-2 bg-transparent">
          <TabsTrigger value="details" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
            Détails
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
            Documents
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-auto">
          <TabsContent value="details" className="h-full m-0 p-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">{tender.description}</p>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Map size={14} className="text-muted-foreground" />
                    <h4 className="text-xs font-medium">Localisation</h4>
                  </div>
                  <p className="text-sm">{tender.location}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <Building size={14} className="text-muted-foreground" />
                    <h4 className="text-xs font-medium">Type de projet</h4>
                  </div>
                  <p className="text-sm">{tender.projectType}</p>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-muted-foreground" />
                  <h4 className="text-xs font-medium">Lots concernés</h4>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tender.lots.map((lot, index) => (
                    <Badge key={index} variant="outline" className="font-normal">
                      {lot}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-muted-foreground" />
                  <h4 className="text-xs font-medium">Statut de participation</h4>
                </div>
                <div className="mt-1">
                  <Badge className="font-normal">
                    {getParticipationStatusLabel(tender.participationStatus)}
                  </Badge>
                </div>
              </div>
              
              <Card>
                <CardHeader className="p-3">
                  <CardTitle className="text-sm">Montant estimé</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 font-medium">
                  {tender.estimatedValue}
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 gap-2">
                {tender.status === 'open' && (
                  <Button className="w-full gap-1" asChild>
                    <Link to={`/tender-specifications?project=${tender.id}`}>
                      <ExternalLink size={14} />
                      <span>Accéder à l'Appel d'Offres</span>
                    </Link>
                  </Button>
                )}
                <Button variant="outline" size="sm" className="w-full gap-1">
                  <FileDown size={14} />
                  <span>Télécharger DCE</span>
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="h-full m-0 p-4">
            <div className="space-y-2">
              <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-3">
                <FileText size={20} className="text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">Dossier de Consultation des Entreprises.pdf</p>
                  <p className="text-xs text-muted-foreground">3.2 MB</p>
                </div>
                <Button variant="ghost" size="sm">
                  <FileDown size={14} />
                </Button>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-3">
                <FileText size={20} className="text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">Plans techniques.pdf</p>
                  <p className="text-xs text-muted-foreground">8.7 MB</p>
                </div>
                <Button variant="ghost" size="sm">
                  <FileDown size={14} />
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

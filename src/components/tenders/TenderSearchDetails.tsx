
import React from 'react';
import { TenderSearchResult } from '@/pages/TenderSearch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  MessageSquare, 
  Calendar, 
  Upload, 
  Map, 
  Building, 
  FileDown, 
  Clock, 
  Users,
  Bookmark,
  Star
} from 'lucide-react';

interface TenderSearchDetailsProps {
  tender?: TenderSearchResult;
}

export default function TenderSearchDetails({ tender }: TenderSearchDetailsProps) {
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
      case 'open': return 'En cours';
      case 'closed': return 'Clôturé';
      case 'assigned': return 'Attribué';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="w-80 min-w-80 bg-white rounded-lg shadow-sm flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium truncate">{tender.projectName}</h3>
          <Button variant="ghost" size="sm" className={tender.isFavorite ? "text-amber-500" : "text-muted-foreground"}>
            <Star size={16} />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <Badge variant="outline" className="rounded-sm font-normal">
            {getStatusLabel(tender.status)}
          </Badge>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>Publié le {tender.createdAt}</span>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start px-4 pt-2 bg-transparent">
          <TabsTrigger value="details" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
            Détails
          </TabsTrigger>
          <TabsTrigger value="messages" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
            Messages
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
            Documents
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-auto">
          <TabsContent value="details" className="h-full m-0 p-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{tender.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Échéance: {tender.deadline}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">MOA: {tender.client.name}</span>
                </div>
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
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">Budget estimé</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 font-medium">
                    {tender.budget}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">Surface</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 font-medium">
                    {tender.surface}
                  </CardContent>
                </Card>
              </div>
              
              {tender.status === 'open' && (
                <Button className="w-full gap-2">
                  <Upload size={14} />
                  <span>Déposer un devis</span>
                </Button>
              )}
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="w-full gap-1">
                  <Bookmark size={14} />
                  <span>Sauvegarder</span>
                </Button>
                <Button variant="outline" size="sm" className="w-full gap-1">
                  <FileDown size={14} />
                  <span>Télécharger DCE</span>
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="messages" className="h-full m-0 flex flex-col">
            <div className="flex-1 overflow-auto p-4 space-y-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm font-medium">Jean Dupont (MOA)</p>
                <p className="text-xs text-muted-foreground">12/05/2023 - 10:45</p>
                <p className="text-sm mt-2">Bonjour, pouvez-vous préciser vos délais d'intervention pour ce projet ?</p>
              </div>
            </div>
            
            <div className="p-4 pt-2 border-t mt-auto">
              <div className="flex gap-2">
                <Button className="w-full" variant="outline" size="sm">
                  <MessageSquare size={14} className="mr-1" />
                  <span>Envoyer un message</span>
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
                  <p className="font-medium text-sm truncate">DPGF.xlsx</p>
                  <p className="text-xs text-muted-foreground">1.5 MB</p>
                </div>
                <Button variant="ghost" size="sm">
                  <FileDown size={14} />
                </Button>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-3">
                <FileText size={20} className="text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">Plans_Architecte.pdf</p>
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

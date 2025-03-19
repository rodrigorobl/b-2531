
import React, { useState } from 'react';
import { ServiceTenderSearchResult } from '@/pages/ServicesTenderSearch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  FileText, 
  Users, 
  MapPin, 
  Calendar, 
  Building, 
  Clock, 
  Star, 
  MessageSquare, 
  Download,
  PenLine,
  Share,
  Briefcase,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getServicesTenderStatusText } from './ServicesTenderUtils';

interface ServicesTenderDetailsProps {
  tender: ServiceTenderSearchResult | undefined;
}

export default function ServicesTenderDetails({ tender }: ServicesTenderDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState('');
  
  if (!tender) {
    return (
      <div className="w-80 min-w-80 bg-white rounded-lg shadow-sm p-8 flex items-center justify-center">
        <p className="text-muted-foreground text-sm text-center">
          Sélectionnez un appel d'offres pour voir les détails
        </p>
      </div>
    );
  }

  return (
    <div className="w-96 min-w-96 bg-white rounded-lg shadow-sm overflow-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="overview" className="flex-1">Aperçu</TabsTrigger>
          <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
          <TabsTrigger value="team" className="flex-1">Équipe</TabsTrigger>
        </TabsList>
        
        <div className="p-4">
          <TabsContent value="overview" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{tender.projectName}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Building size={14} />
                  {tender.serviceType}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin size={14} />
                    <span>{tender.location}</span>
                  </div>
                  <Badge variant={
                    tender.status === 'open' ? 'default' : 
                    tender.status === 'upcoming' ? 'secondary' : 'outline'
                  }>
                    {getServicesTenderStatusText(tender.status)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Budget estimé</p>
                    <p className="font-medium">{tender.budget}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Date limite</p>
                    <p className="font-medium">{tender.deadline}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Client</p>
                    <p className="font-medium">{tender.clientName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Type de client</p>
                    <p className="font-medium">
                      {tender.clientType === 'promoteur' ? 'Promoteur' : 
                       tender.clientType === 'moe' ? 'Maître d\'œuvre' : 'Entreprise générale'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="text-sm">{tender.description}</p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-col items-stretch gap-2">
                <div className="flex items-center gap-2">
                  <Button className="flex-1">Consulter le DCE</Button>
                  <Button variant="outline" className="w-10 p-0" title="Ajouter aux favoris">
                    <Star size={16} className={tender.isFavorite ? "fill-amber-500 text-amber-500" : ""} />
                  </Button>
                </div>
                
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-2">Notes personnelles</p>
                  <Textarea 
                    placeholder="Ajouter des notes concernant cet appel d'offres..." 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="h-24 resize-none"
                  />
                  
                  <div className="mt-2 flex justify-between">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Assigner à..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="self">Moi-même</SelectItem>
                        <SelectItem value="colleague1">Sophie Martin</SelectItem>
                        <SelectItem value="colleague2">Thomas Durand</SelectItem>
                        <SelectItem value="colleague3">Emma Petit</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" size="sm" onClick={() => setNotes(notes)}>
                      <PenLine size={14} className="mr-1" />
                      Enregistrer
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Documents</CardTitle>
                <CardDescription>Documents disponibles pour cet appel d'offres</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="border rounded-md p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-primary" />
                    <div>
                      <p className="font-medium text-sm">Cahier des Charges (CDC)</p>
                      <p className="text-xs text-muted-foreground">PDF - 2.4 MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download size={14} />
                  </Button>
                </div>
                
                <div className="border rounded-md p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-primary" />
                    <div>
                      <p className="font-medium text-sm">Règlement de Consultation</p>
                      <p className="text-xs text-muted-foreground">PDF - 1.1 MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download size={14} />
                  </Button>
                </div>
                
                <div className="border rounded-md p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-primary" />
                    <div>
                      <p className="font-medium text-sm">Plans du Projet</p>
                      <p className="text-xs text-muted-foreground">ZIP - 8.5 MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download size={14} />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full">
                  <Download size={14} className="mr-2" />
                  Télécharger tous les documents
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Équipe projet</CardTitle>
                <CardDescription>Personnes impliquées dans cet appel d'offres</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border rounded-md p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Briefcase size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Responsable</p>
                        <p className="text-xs text-muted-foreground">{tender.assignedTo || 'Non assigné'}</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <Share size={14} className="mr-1" />
                      Assigner
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Contact client</p>
                        <p className="text-xs text-muted-foreground">Jean Dupont</p>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="icon">
                      <MessageSquare size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline" size="sm">
                  <Clock size={14} className="mr-1" />
                  Historique des actions
                </Button>
                
                <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                  <X size={14} className="mr-1" />
                  Ne pas répondre
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

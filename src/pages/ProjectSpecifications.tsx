
import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, FileText, Users, Building, MapPin, Clock, Download, Briefcase, Plus, MessageSquare } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';

export default function ProjectSpecifications() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const [activeTab, setActiveTab] = useState('overview');

  // This would typically come from API based on the ID
  const projectData = {
    id: projectId || 'unknown',
    name: 'Centre Commercial Riviera',
    location: 'Paris, France',
    status: 'open',
    createdDate: '01/07/2023',
    deadline: '30/08/2023',
    budget: '2,500,000 €',
    clientName: 'Unibail-Rodamco',
    projectType: 'Commercial',
    surface: '15,000 m²',
    description: 'Construction d\'un nouveau centre commercial sur 3 niveaux avec parking souterrain et espaces verts en toiture terrasse.',
    lots: [
      { id: 'lot-1', name: 'Gros œuvre', budget: '850,000 €', deadline: '30/08/2023', minSurveyPrice: 1900 },
      { id: 'lot-2', name: 'Menuiseries', budget: '450,000 €', deadline: '15/09/2023', minSurveyPrice: 1500 },
      { id: 'lot-3', name: 'Électricité', budget: '350,000 €', deadline: '10/09/2023', minSurveyPrice: 1200 },
      { id: 'lot-4', name: 'CVC', budget: '420,000 €', deadline: '20/09/2023', minSurveyPrice: 1800 },
    ]
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="container py-6 space-y-6 max-w-7xl">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{projectData.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge status={projectData.status === 'open' ? 'in-progress' : projectData.status === 'closed' ? 'closed' : 'draft'} />
                <span className="text-sm text-muted-foreground">•</span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={14} />
                  <span>{projectData.location}</span>
                </div>
                <span className="text-sm text-muted-foreground">•</span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  <span>Publié le {projectData.createdDate}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`/submit-quote/${projectData.id}`}>
                <Button>Déposer une offre</Button>
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Download size={16} className="mr-2" />
                    Télécharger
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Télécharger les documents</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center justify-between hover:bg-accent p-2 rounded-md cursor-pointer">
                      <div className="flex items-center gap-2">
                        <FileText size={16} />
                        <span>DCE_Complet.zip</span>
                      </div>
                      <Download size={16} />
                    </div>
                    <div className="flex items-center justify-between hover:bg-accent p-2 rounded-md cursor-pointer">
                      <div className="flex items-center gap-2">
                        <FileText size={16} />
                        <span>Plans_Architecte.pdf</span>
                      </div>
                      <Download size={16} />
                    </div>
                    <div className="flex items-center justify-between hover:bg-accent p-2 rounded-md cursor-pointer">
                      <div className="flex items-center gap-2">
                        <FileText size={16} />
                        <span>DPGF.xlsx</span>
                      </div>
                      <Download size={16} />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="lots">Lots</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Description du projet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{projectData.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Type de projet</h3>
                        <p className="mt-1 font-medium">{projectData.projectType}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Surface</h3>
                        <p className="mt-1 font-medium">{projectData.surface}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Budget estimé</h3>
                        <p className="mt-1 font-medium">{projectData.budget}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Date limite</h3>
                        <p className="mt-1 font-medium">{projectData.deadline}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Maître d'ouvrage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="bg-muted h-16 w-16 rounded-lg flex items-center justify-center">
                        <Building size={24} className="text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">{projectData.clientName}</h3>
                        <p className="text-sm text-muted-foreground">Promoteur immobilier</p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Contact principal</h3>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          JD
                        </div>
                        <div>
                          <p className="text-sm font-medium">Jean Dupont</p>
                          <p className="text-xs text-muted-foreground">Directeur de projets</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        <MessageSquare size={14} className="mr-2" />
                        Contacter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Calendrier du projet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center text-primary-foreground">
                        1
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Publication de l'Appel d'Offres</h3>
                        <p className="text-sm text-muted-foreground">01/07/2023</p>
                      </div>
                      <Badge>Terminé</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center text-primary-foreground">
                        2
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Date limite de remise des offres</h3>
                        <p className="text-sm text-muted-foreground">30/08/2023</p>
                      </div>
                      <Badge variant="outline">À venir</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground">
                        3
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Analyse des offres</h3>
                        <p className="text-sm text-muted-foreground">01/09/2023 - 15/09/2023</p>
                      </div>
                      <Badge variant="outline">À venir</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground">
                        4
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Attribution des lots</h3>
                        <p className="text-sm text-muted-foreground">30/09/2023</p>
                      </div>
                      <Badge variant="outline">À venir</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Documents du projet</span>
                    <Button variant="outline" size="sm">
                      <Download size={14} className="mr-2" />
                      Tout télécharger
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between hover:bg-accent p-3 rounded-md cursor-pointer">
                      <div className="flex items-center gap-2">
                        <FileText size={20} className="text-muted-foreground" />
                        <div>
                          <p className="font-medium">DCE_Complet.zip</p>
                          <p className="text-xs text-muted-foreground">Dossier de Consultation des Entreprises</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">15.2 MB</Badge>
                        <Download size={16} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between hover:bg-accent p-3 rounded-md cursor-pointer">
                      <div className="flex items-center gap-2">
                        <FileText size={20} className="text-muted-foreground" />
                        <div>
                          <p className="font-medium">Plans_Architecte.pdf</p>
                          <p className="text-xs text-muted-foreground">Plans d'exécution</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">8.7 MB</Badge>
                        <Download size={16} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between hover:bg-accent p-3 rounded-md cursor-pointer">
                      <div className="flex items-center gap-2">
                        <FileText size={20} className="text-muted-foreground" />
                        <div>
                          <p className="font-medium">DPGF.xlsx</p>
                          <p className="text-xs text-muted-foreground">Décomposition du Prix Global et Forfaitaire</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">1.5 MB</Badge>
                        <Download size={16} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between hover:bg-accent p-3 rounded-md cursor-pointer">
                      <div className="flex items-center gap-2">
                        <FileText size={20} className="text-muted-foreground" />
                        <div>
                          <p className="font-medium">CCTP.pdf</p>
                          <p className="text-xs text-muted-foreground">Cahier des Clauses Techniques Particulières</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">5.3 MB</Badge>
                        <Download size={16} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lots" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Lots du projet</span>
                    <Button variant="outline" size="sm">
                      <Plus size={14} className="mr-2" />
                      Ajouter un lot
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectData.lots.map((lot) => (
                      <div key={lot.id} className="border rounded-lg p-4 hover:bg-accent/20 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{lot.name}</h3>
                            <div className="flex items-center gap-4 mt-1">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Briefcase size={14} />
                                <span>Budget: {lot.budget}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock size={14} />
                                <span>Échéance: {lot.deadline}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link to={`/quantity-survey-request?project=${projectData.id}&lot=${lot.id}`}>
                              <Button variant="outline" size="sm">
                                <FileText size={14} className="mr-2" />
                                Faire réaliser les métrés (à partir de {lot.minSurveyPrice}€ HT)
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              <Users size={14} className="mr-2" />
                              Voir les offres
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          JD
                        </div>
                        <div>
                          <p className="text-sm font-medium">Jean Dupont (MOA)</p>
                          <p className="text-xs text-muted-foreground">12/07/2023 - 10:45</p>
                        </div>
                      </div>
                      <p className="text-sm">Bonjour à tous, merci de noter que la visite du site est obligatoire pour répondre à cet appel d'offres. Merci de prendre contact avec notre secrétariat pour organiser votre visite.</p>
                    </div>
                    <div className="bg-accent/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          ML
                        </div>
                        <div>
                          <p className="text-sm font-medium">Marie Lambert (Entreprise)</p>
                          <p className="text-xs text-muted-foreground">13/07/2023 - 15:22</p>
                        </div>
                      </div>
                      <p className="text-sm">Merci pour cette information. Pourriez-vous préciser si les plans d'exécution sont définitifs ou s'ils sont susceptibles d'évoluer ?</p>
                    </div>
                    <div className="flex">
                      <Button className="ml-auto">
                        <MessageSquare size={14} className="mr-2" />
                        Envoyer un message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useProfile } from '@/contexts/ProfileContext';
import { Button } from '@/components/ui/button';
import { FileText, Wrench, Pencil, CalendarClock, Download, Send, Ruler, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import the same components as ProjectSpecifications
import ProjectGallery from '@/components/project-specifications/ProjectGallery';
import ProjectHeader from '@/components/project-specifications/ProjectHeader';
import ProjectOverview from '@/components/project-specifications/ProjectOverview';
import ProjectTimeline from '@/components/project-specifications/ProjectTimeline';
import ProjectDocuments from '@/components/project-specifications/ProjectDocuments';
import ProjectLots from '@/components/project-specifications/ProjectLots';
import ProjectMessages from '@/components/project-specifications/ProjectMessages';
import ProjectMap from '@/components/ProjectMap';
import TenderOffers from '@/components/TenderOffers';

export default function ConstructionTenderSpecifications() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const [activeTab, setActiveTab] = useState('overview');

  // This would typically come from API based on the ID
  const projectData = {
    id: projectId || 'unknown',
    name: 'Centre Commercial Riviera',
    location: 'Paris, France',
    address: '123 Avenue des Champs-Élysées, 75008 Paris',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    status: 'open',
    createdDate: '01/07/2023',
    deadline: '30/08/2023',
    budget: '2,500,000 €',
    clientName: 'Unibail-Rodamco',
    projectType: 'Commercial',
    surface: '15,000 m²',
    description: 'Construction d\'un nouveau centre commercial sur 3 niveaux avec parking souterrain et espaces verts en toiture terrasse.',
    perspectiveImages: [
      '/photo-1461749280684-dccba630e2f6',
      '/photo-1486312338219-ce68d2c6f44d',
      '/photo-1498050108023-c5249f4df085',
      '/photo-1483058712412-4245e9b90334',
      '/photo-1449157291145-7efd050a4d0e'
    ],
    lots: [
      { id: 'lot-1', name: 'Gros œuvre', budget: '850,000 €', deadline: '30/08/2023', minSurveyPrice: 1900, minSurveyDelivery: '5 jours', offerId: 'AO-2023-042-01' },
      { id: 'lot-2', name: 'Menuiseries', budget: '450,000 €', deadline: '15/09/2023', minSurveyPrice: 1500, minSurveyDelivery: '3 jours', offerId: 'AO-2023-042-02' },
      { id: 'lot-3', name: 'Électricité', budget: '350,000 €', deadline: '10/09/2023', minSurveyPrice: 1200, minSurveyDelivery: '4 jours', offerId: 'AO-2023-042-03' },
      { id: 'lot-4', name: 'CVC', budget: '420,000 €', deadline: '20/09/2023', minSurveyPrice: 1800, minSurveyDelivery: '6 jours', offerId: 'AO-2023-042-04' },
    ],
    // Fixed offers data with appropriate status types
    offers: [
      {
        id: "offer-001",
        lot: "01",
        description: "Gros Œuvre",
        status: "pending" as const,
        deadline: "15/05/2024",
      },
      {
        id: "offer-002",
        lot: "02",
        description: "Menuiseries",
        status: "submitted" as const,
        deadline: "20/05/2024",
        isCompliant: true,
        submissionDate: "10/05/2024",
        quoteIndex: "QT-002",
        amount: 325000
      }
    ],
    // Étapes clés du chantier
    keyStages: [
      { id: 'stage-1', name: 'Installation de chantier', date: '01/09/2023', status: 'completed' },
      { id: 'stage-2', name: 'Terrassement', date: '15/09/2023 - 15/10/2023', status: 'completed' },
      { id: 'stage-3', name: 'Fondations', date: '20/10/2023 - 20/12/2023', status: 'in-progress' },
      { id: 'stage-4', name: 'Gros œuvre', date: '05/01/2024 - 30/05/2024', status: 'upcoming' },
      { id: 'stage-5', name: 'Clos-couvert', date: '01/06/2024 - 31/08/2024', status: 'upcoming' },
      { id: 'stage-6', name: 'Second œuvre', date: '01/09/2024 - 31/12/2024', status: 'upcoming' },
      { id: 'stage-7', name: 'Finitions', date: '01/01/2025 - 28/02/2025', status: 'upcoming' },
      { id: 'stage-8', name: 'Livraison', date: '15/03/2025', status: 'upcoming' }
    ]
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="container py-6 space-y-6 max-w-7xl">
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Project Perspective Image */}
            <div className="md:w-1/3">
              <ProjectGallery images={projectData.perspectiveImages} />
            </div>
            
            {/* Project Title & Info */}
            <ProjectHeader projectData={projectData} />
          </div>

          {/* Actions principales - Boutons en évidence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-auto py-3 bg-primary text-primary-foreground hover:bg-primary/90 flex flex-col items-center">
              <Download className="h-8 w-8 mb-2" />
              <span>Télécharger le DCE</span>
            </Button>
            <Button className="h-auto py-3 bg-green-500 hover:bg-green-600 text-white flex flex-col items-center">
              <Send className="h-8 w-8 mb-2" />
              <span>Déposer une offre</span>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex flex-col items-center">
              <FileText className="h-8 w-8 mb-2" />
              <span>Télécharger le DPGF</span>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex flex-col items-center">
              <Ruler className="h-8 w-8 mb-2" />
              <span>Faire réaliser les métrés</span>
              <span className="text-xs mt-1">à partir de 1500€ HT - 3 jours</span>
            </Button>
          </div>

          {/* Localisation du projet */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Localisation du projet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <p className="font-medium">{projectData.address}</p>
                  <p className="text-muted-foreground mt-2">{projectData.location}</p>
                </div>
                <div className="col-span-1 md:col-span-2 h-64">
                  <ProjectMap 
                    location={{
                      address: projectData.address,
                      lat: projectData.coordinates.lat,
                      lng: projectData.coordinates.lng
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="technical">Détails Techniques</TabsTrigger>
              <TabsTrigger value="lots">Lots et Chiffrage</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <ProjectOverview projectData={projectData} />
              
              {/* Étapes clés du chantier */}
              <Card>
                <CardHeader>
                  <CardTitle>Étapes clés du chantier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectData.keyStages.map((stage) => (
                      <div key={stage.id} className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-primary-foreground
                          ${stage.status === 'completed' ? 'bg-green-500' : 
                           stage.status === 'in-progress' ? 'bg-primary' : 'bg-muted'}`}>
                          {stage.status === 'completed' ? '✓' : 
                           stage.status === 'in-progress' ? '→' : '○'}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{stage.name}</h3>
                          <p className="text-sm text-muted-foreground">{stage.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <ProjectTimeline />
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <ProjectDocuments />
            </TabsContent>

            <TabsContent value="technical" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Spécifications Techniques</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm">Normes et Réglementations</h4>
                      <p className="text-sm text-muted-foreground">RT2020, NF C15-100, DTU 13.3</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Contraintes du Site</h4>
                      <p className="text-sm text-muted-foreground">Zone sismique 1, Sol argileux, Nappe phréatique à -5m</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Exigences Particulières</h4>
                      <p className="text-sm text-muted-foreground">Béton architectonique pour façades, Triple vitrage, Isolation thermique renforcée</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Wrench className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Méthodes de Construction</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm">Fondations</h4>
                      <p className="text-sm text-muted-foreground">Semelles filantes et ponctuelles sur pieux, Radier général pour parking</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Structure</h4>
                      <p className="text-sm text-muted-foreground">Poteaux/poutres béton, Planchers précontraints, Voiles béton pour circulation verticale</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Équipements</h4>
                      <p className="text-sm text-muted-foreground">4 ascenseurs, 2 monte-charges, Groupes électrogènes de secours</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Pencil className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Matériaux Spécifiés</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm">Béton</h4>
                      <p className="text-sm text-muted-foreground">C25/30 XC1 pour structure courante, C30/37 XF1 pour éléments extérieurs</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Menuiseries</h4>
                      <p className="text-sm text-muted-foreground">Aluminium à rupture de pont thermique, Vitrages 4/16/4/16/4</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Revêtements</h4>
                      <p className="text-sm text-muted-foreground">Pierre naturelle pour halls, Carrelage grès cérame pour surfaces commerciales</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarClock className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Planning et Phasage</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm">Phase 1 - Terrassement</h4>
                      <p className="text-sm text-muted-foreground">3 mois - Sept 2023 à Nov 2023</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Phase 2 - Gros Œuvre</h4>
                      <p className="text-sm text-muted-foreground">8 mois - Dec 2023 à Juillet 2024</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Phase 3 - Second Œuvre</h4>
                      <p className="text-sm text-muted-foreground">6 mois - Août 2024 à Jan 2025</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Livraison</h4>
                      <p className="text-sm text-muted-foreground">Février 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="lots" className="space-y-6">
              <ProjectLots projectId={projectData.id} lots={projectData.lots} />
              
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 shadow-sm mt-6">
                <h3 className="text-lg font-semibold mb-4">Outils de Chiffrage</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="w-full h-auto py-3 px-4 flex flex-col items-center justify-center">
                    <FileText className="h-8 w-8 mb-2" />
                    <span>Télécharger DPGF</span>
                  </Button>
                  <Button variant="outline" className="w-full h-auto py-3 px-4 flex flex-col items-center justify-center">
                    <FileText className="h-8 w-8 mb-2" />
                    <span>Télécharger Plans</span>
                  </Button>
                  <Button variant="outline" className="w-full h-auto py-3 px-4 flex flex-col items-center justify-center">
                    <FileText className="h-8 w-8 mb-2" />
                    <span>Bordereau de Prix</span>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <ProjectMessages />
            </TabsContent>
          </Tabs>
          
          {/* Section Mes Offres */}
          <Card>
            <CardHeader>
              <CardTitle>Mes offres</CardTitle>
            </CardHeader>
            <CardContent>
              <TenderOffers offers={projectData.offers} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useProfile } from '@/contexts/ProfileContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Tool, Pencil, CalendarClock } from 'lucide-react';

// Import the same components as ProjectSpecifications
import ProjectGallery from '@/components/project-specifications/ProjectGallery';
import ProjectHeader from '@/components/project-specifications/ProjectHeader';
import ProjectOverview from '@/components/project-specifications/ProjectOverview';
import ProjectTimeline from '@/components/project-specifications/ProjectTimeline';
import ProjectDocuments from '@/components/project-specifications/ProjectDocuments';
import ProjectLots from '@/components/project-specifications/ProjectLots';
import ProjectMessages from '@/components/project-specifications/ProjectMessages';

export default function ConstructionTenderSpecifications() {
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
    ]
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="container py-6 space-y-6 max-w-7xl">
          <Link to={`/tender-specifications?project=${projectId}`} className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux spécifications standard
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Project Perspective Image */}
            <div className="md:w-1/3">
              <ProjectGallery images={projectData.perspectiveImages} />
            </div>
            
            {/* Project Title & Info */}
            <ProjectHeader projectData={projectData} />
          </div>

          <div className="bg-accent/30 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-2">Vue Construction et Chiffrage</h3>
            <p className="text-muted-foreground">Cette vue est spécialement conçue pour les entreprises de construction, avec des informations techniques et économiques supplémentaires pour faciliter votre réponse à l'appel d'offres.</p>
          </div>

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
                    <Tool className="h-5 w-5 text-primary" />
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
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Ruler, MapPin, Download, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

// Import components
import ProjectGallery from '@/components/project-specifications/ProjectGallery';
import ProjectHeader from '@/components/project-specifications/ProjectHeader';
import ProjectOverview from '@/components/project-specifications/ProjectOverview';
import ProjectTimeline from '@/components/project-specifications/ProjectTimeline';
import ProjectMessages from '@/components/project-specifications/ProjectMessages';
import ProjectMap from '@/components/ProjectMap';
import SurveyorProjectLots from '@/components/project-specifications/SurveyorProjectLots';
import SurveyorMessages from '@/components/project-specifications/SurveyorMessages';

export default function QuantitySurveyorPage() {
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
    betFirms: [
      { id: 'bet-1', name: 'Structure Plus', role: 'BET Structure', contact: 'Marc Dubois' },
      { id: 'bet-2', name: 'Thermitech', role: 'BET Thermique', contact: 'Louise Martin' },
      { id: 'bet-3', name: 'Acousti Conseil', role: 'BET Acoustique', contact: 'Pierre Lefort' }
    ],
    lots: [
      { id: 'lot-1', name: 'Gros œuvre', budget: '850,000 €', deadline: '30/08/2023', minSurveyPrice: 1900, minSurveyDelivery: '5 jours' },
      { id: 'lot-2', name: 'Menuiseries', budget: '450,000 €', deadline: '15/09/2023', minSurveyPrice: 1500, minSurveyDelivery: '3 jours' },
      { id: 'lot-3', name: 'Électricité', budget: '350,000 €', deadline: '10/09/2023', minSurveyPrice: 1200, minSurveyDelivery: '4 jours' },
      { id: 'lot-4', name: 'CVC', budget: '420,000 €', deadline: '20/09/2023', minSurveyPrice: 1800, minSurveyDelivery: '6 jours' },
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

  const handleDownloadDCE = () => {
    toast.success("Téléchargement du DCE en cours...");
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
            
            {/* Project Title & Info - Remove deposit offer and download buttons */}
            <div className="md:w-2/3">
              <ProjectHeaderSurveyor projectData={projectData} />
            </div>
          </div>

          {/* Télécharger le DCE button - Made larger and green */}
          <div className="flex justify-end">
            <Button onClick={handleDownloadDCE} className="py-6 px-8 text-lg bg-green-500 hover:bg-green-600">
              <Download size={20} className="mr-2" />
              Télécharger le DCE
            </Button>
          </div>

          {/* Description du projet and Localisation du projet side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Overview Section */}
            <Card className="mb-0">
              <CardHeader>
                <CardTitle>Description du projet</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{projectData.description}</p>
                
                <div className="grid grid-cols-2 gap-6 mt-6">
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
            
            {/* Localisation du projet */}
            <Card className="mb-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Localisation du projet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="font-medium">{projectData.address}</p>
                    <p className="text-sm text-muted-foreground mt-2">{projectData.location}</p>
                  </div>
                  <div className="h-48">
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
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Maître d'ouvrage Card - Without BET firms section */}
              <Card>
                <CardHeader>
                  <CardTitle>Maître d'ouvrage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="bg-muted h-16 w-16 rounded-lg flex items-center justify-center">
                      <FileText size={24} className="text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{projectData.clientName}</h3>
                      <p className="text-sm text-muted-foreground">Promoteur immobilier</p>
                    </div>
                  </div>
                  <div className="border-t my-4"></div>
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
              
              {/* Bureaux d'Études Impliqués - Now with Contact button */}
              <Card>
                <CardHeader>
                  <CardTitle>Bureaux d'Études Impliqués</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projectData.betFirms.map((firm) => (
                      <div key={firm.id} className="border rounded-lg p-4 hover:bg-accent/20 transition-colors">
                        <h3 className="font-medium">{firm.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{firm.role}</p>
                        <p className="text-sm mt-2">Contact: {firm.contact}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-3"
                          onClick={() => setActiveTab('messages')}
                        >
                          <MessageSquare size={14} className="mr-2" />
                          Contacter
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Timeline Section */}
              <ProjectTimeline />
              
              {/* Lots Section */}
              <SurveyorProjectLots lots={projectData.lots} />
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <SurveyorMessages />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// New simplified header component without the buttons
function ProjectHeaderSurveyor({ projectData }: { projectData: any }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{projectData.name}</h1>
      <div className="flex items-center gap-2 mt-1">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={14} />
          <span>{projectData.location}</span>
        </div>
      </div>
    </div>
  );
}

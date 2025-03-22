import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Ruler, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import components
import ProjectGallery from '@/components/project-specifications/ProjectGallery';
import ProjectHeader from '@/components/project-specifications/ProjectHeader';
import ProjectOverview from '@/components/project-specifications/ProjectOverview';
import ProjectTimeline from '@/components/project-specifications/ProjectTimeline';
import ProjectMessages from '@/components/project-specifications/ProjectMessages';
import ProjectMap from '@/components/ProjectMap';
import SurveyorProjectLots from '@/components/project-specifications/SurveyorProjectLots';

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
                  <p className="text-sm text-muted-foreground mt-2">{projectData.location}</p>
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
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Project Overview Section */}
              <ProjectOverview projectData={projectData} />
              
              {/* Timeline Section - Moved below project description */}
              <ProjectTimeline />
              
              {/* Lots Section - Moved below timeline */}
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

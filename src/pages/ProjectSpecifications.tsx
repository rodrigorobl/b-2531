
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Import refactored components
import ProjectGallery from '@/components/project-specifications/ProjectGallery';
import ProjectHeader from '@/components/project-specifications/ProjectHeader';
import ProjectOverview from '@/components/project-specifications/ProjectOverview';
import ProjectTimeline from '@/components/project-specifications/ProjectTimeline';
import ProjectDocuments from '@/components/project-specifications/ProjectDocuments';
import ProjectLots from '@/components/project-specifications/ProjectLots';
import ProjectMessages from '@/components/project-specifications/ProjectMessages';

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
    perspectiveImages: [
      '/photo-1461749280684-dccba630e2f6',
      '/photo-1486312338219-ce68d2c6f44d',
      '/photo-1498050108023-c5249f4df085',
      '/photo-1483058712412-4245e9b90334',
      '/photo-1449157291145-7efd050a4d0e'
    ],
    lots: [
      { id: 'lot-1', name: 'Gros œuvre', budget: '850,000 €', deadline: '30/08/2023', minSurveyPrice: 1900, minSurveyDelivery: '5 jours' },
      { id: 'lot-2', name: 'Menuiseries', budget: '450,000 €', deadline: '15/09/2023', minSurveyPrice: 1500, minSurveyDelivery: '3 jours' },
      { id: 'lot-3', name: 'Électricité', budget: '350,000 €', deadline: '10/09/2023', minSurveyPrice: 1200, minSurveyDelivery: '4 jours' },
      { id: 'lot-4', name: 'CVC', budget: '420,000 €', deadline: '20/09/2023', minSurveyPrice: 1800, minSurveyDelivery: '6 jours' },
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="lots">Lots</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <ProjectOverview projectData={projectData} />
              <ProjectTimeline />
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <ProjectDocuments />
            </TabsContent>

            <TabsContent value="lots" className="space-y-6">
              <ProjectLots projectId={projectData.id} lots={projectData.lots} />
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

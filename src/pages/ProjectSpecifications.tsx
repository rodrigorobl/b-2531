
import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useProfile } from '@/contexts/ProfileContext';

// Import refactored components
import ProjectGallery from '@/components/project-specifications/ProjectGallery';
import ProjectHeader from '@/components/project-specifications/ProjectHeader';
import ProjectOverview from '@/components/project-specifications/ProjectOverview';
import ProjectTimeline from '@/components/project-specifications/ProjectTimeline';
import ProjectDocuments from '@/components/project-specifications/ProjectDocuments';
import ProjectLots from '@/components/project-specifications/ProjectLots';
import ProjectMessages from '@/components/project-specifications/ProjectMessages';
import { Button } from '@/components/ui/button';
import { ArrowRight, HardHat } from 'lucide-react';

export default function ProjectSpecifications() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const [activeTab, setActiveTab] = useState('overview');
  const { activeProfile } = useProfile();

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

  // Get the correct quote details page based on profile
  const getQuoteDetailsLink = (offerId: string) => {
    if (activeProfile === 'entreprise-construction') {
      return `/company-details-tender/quote-${offerId}`;
    } else if (activeProfile === 'entreprise-services') {
      return `/services-detail-tender/quote-${offerId}`;
    } else {
      // Default fallback
      return `/company-details-tender/quote-${offerId}`;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="container py-6 space-y-6 max-w-7xl">
          {activeProfile === 'entreprise-construction' && (
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-base font-medium">Vous êtes une entreprise de construction</h3>
                <p className="text-sm text-muted-foreground">Accédez à la vue spécifique pour les entreprises de construction avec des détails techniques et les outils de chiffrage.</p>
              </div>
              <Link to={`/construction-tender-specifications?project=${projectId}`}>
                <Button className="gap-2">
                  <HardHat size={16} />
                  <span>Vue Construction</span>
                </Button>
              </Link>
            </div>
          )}
          
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectData.lots.map((lot) => (
                  <div key={lot.id} className="border rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">{lot.name}</h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm"><span className="font-medium">Budget:</span> {lot.budget}</p>
                      <p className="text-sm"><span className="font-medium">Date limite:</span> {lot.deadline}</p>
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log(`Requesting survey for ${lot.name}`)}
                      >
                        Demander un métré
                      </Button>
                      <Link to={getQuoteDetailsLink(lot.offerId)}>
                        <Button variant="default" size="sm" className="flex items-center">
                          Déposer une offre
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
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

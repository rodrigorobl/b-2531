
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectLoading } from './ProjectLoading';
import { ProjectError } from './ProjectError';
import { ProjectHeader } from './ProjectHeader';
import { ProjectOverviewTab } from './ProjectOverviewTab';
import { ProjectTendersTab } from './ProjectTendersTab';
import { useProjectDetail } from '@/hooks/projectDetail/useProjectDetail';
import Sidebar from '@/components/Sidebar';

export function ProjectDetailContainer() {
  const {
    project,
    tenders,
    quotes,
    isLoading,
    selectedTenderId,
    setSelectedTenderId,
    activeTab,
    setActiveTab,
    error,
    navigate
  } = useProjectDetail();
  
  if (isLoading) {
    return <ProjectLoading />;
  }
  
  if (error || !project) {
    return <ProjectError error={error || "Projet non trouvé"} />;
  }
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <ProjectHeader 
            project={project} 
            setActiveTab={setActiveTab} 
            navigate={navigate}
          />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-2 md:w-[400px]">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="tenders">Appels d'offres</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <ProjectOverviewTab 
                project={project} 
                tenders={tenders} 
                quotes={quotes} 
                setActiveTab={setActiveTab}
                setSelectedTenderId={setSelectedTenderId}
              />
            </TabsContent>
            
            <TabsContent value="tenders" className="space-y-6">
              <ProjectTendersTab 
                tenders={tenders}
                quotes={quotes}
                selectedTenderId={selectedTenderId}
                setSelectedTenderId={setSelectedTenderId}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

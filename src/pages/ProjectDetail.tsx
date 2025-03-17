
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Briefcase } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { useProjectManagement } from '@/hooks/useProjectManagement';
import { ProjectDetail } from '@/types/projects';

import { ProjectLoading } from '@/components/project-detail/ProjectLoading';
import { ProjectError } from '@/components/project-detail/ProjectError';
import { ProjectHeader } from '@/components/project-detail/ProjectHeader';
import { ProjectInfoCards } from '@/components/project-detail/ProjectInfoCards';
import { ProjectProgressCard } from '@/components/project-detail/ProjectProgressCard';
import { ProjectTendersTable } from '@/components/project-detail/ProjectTendersTable';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { fetchProjectDetails } = useProjectManagement();
  const [projectDetails, setProjectDetails] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadProjectDetails = async () => {
      if (!id) {
        setError('ID du projet non fourni');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const details = await fetchProjectDetails(id);
        if (details) {
          setProjectDetails(details);
          setError(null);
        } else {
          setError('Impossible de charger les détails du projet');
        }
      } catch (err: any) {
        console.error('Error loading project details:', err);
        setError(err.message || 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjectDetails();
  }, [id, fetchProjectDetails]);

  if (isLoading) {
    return <ProjectLoading />;
  }

  if (error || !projectDetails) {
    return <ProjectError error={error} />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <ProjectHeader projectDetails={projectDetails} />
          
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 mb-6">
            <div className="md:col-span-2">
              <ProjectInfoCards projectDetails={projectDetails} />
            </div>
            
            <div>
              <ProjectProgressCard projectDetails={projectDetails} />
            </div>
          </div>
          
          <Tabs defaultValue="tenders" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="tenders" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                Appels d'offres
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tenders" className="mt-2 md:mt-4">
              <ProjectTendersTable tenders={projectDetails.tenders} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}


import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectDetail, TenderStatus } from '@/types/projects';
import { useProjectBase } from '../useProjectBase';
import { mockDataService } from '@/data/mockData';

export function useFetchProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoading, setIsLoading, error, setError, toast } = useProjectBase();

  const fetchProjectDetails = async (projectId: string): Promise<ProjectDetail | null> => {
    setIsLoading(true);
    try {
      // For demo projects, redirect to projects page with a toast message
      if (projectId.startsWith('demo-')) {
        toast({
          title: "Information",
          description: "Les projets de démonstration ne sont pas accessibles.",
          variant: "default",
        });
        navigate('/project-management');
        setIsLoading(false);
        return null;
      }
      
      console.log("Fetching detailed project data from mock data for ID:", projectId);
      
      const projectDetail = await mockDataService.fetchProjectDetails(projectId);
      
      if (!projectDetail) {
        console.error("Project not found with ID:", projectId);
        setError("Projet non trouvé");
        setIsLoading(false);
        return null;
      }
      
      console.log("Project details prepared successfully");
      setError(null);
      setIsLoading(false);
      return projectDetail;
    } catch (err: any) {
      console.error('Error fetching project details:', err);
      setError(err.message);
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails du projet.",
        variant: "destructive",
      });
      setIsLoading(false);
      return null;
    }
  };

  return {
    projectId: id,
    isLoading,
    error,
    navigate,
    fetchProjectDetails
  };
}

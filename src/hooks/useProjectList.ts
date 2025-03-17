
import { useState, useEffect } from 'react';
import { ProjectSummary } from '@/types/projects';
import { useProjectBase } from './useProjectBase';
import { mockDataService } from '@/data/mockData';

export function useProjectList() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const { isLoading, setIsLoading, error, setError, toast } = useProjectBase();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching projects from mock data...");
      
      const projectsData = await mockDataService.fetchProjects();
      
      console.log(`Retrieved ${projectsData?.length || 0} projects from mock data:`, projectsData);
      
      setProjects(projectsData);
      console.log("Successfully loaded projects from mock data:", projectsData);
      
      setError(null);
    } catch (err: any) {
      console.error('Error in fetchProjects():', err);
      setError(err.message);
      setProjects([]); 
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement des projets.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    projects,
    isLoading,
    error,
    fetchProjects
  };
}

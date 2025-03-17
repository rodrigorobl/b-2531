
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProjectSummary } from '@/types/projects';

export function useProjectBase() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to get local demo projects (no DB insertion needed)
  const getLocalDemoProjects = (): ProjectSummary[] => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setMonth(today.getMonth() + 18);
    
    return [
      {
        id: 'demo-1',
        projectName: 'Résidence Les Jardins',
        projectType: 'Résidentiel',
        description: 'Complexe résidentiel de 50 appartements avec espaces verts',
        location: 'Lyon',
        budget: 5000000,
        status: 'En cours',
        startDate: today.toISOString().split('T')[0],
        endDate: futureDate.toISOString().split('T')[0],
        tendersCount: 5,
        tendersAssigned: 2,
        progressPercentage: 40,
        clientName: 'Immobilier Moderne'
      },
      {
        id: 'demo-2',
        projectName: 'Tour Horizon',
        projectType: 'Commercial',
        description: 'Immeuble de bureaux de 15 étages en centre-ville',
        location: 'Paris',
        budget: 12000000,
        status: 'En cours',
        startDate: today.toISOString().split('T')[0],
        endDate: new Date(today.getTime() + 24 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tendersCount: 8,
        tendersAssigned: 3,
        progressPercentage: 25,
        clientName: 'Immobilier Moderne'
      },
      {
        id: 'demo-3',
        projectName: 'Campus Technologique',
        projectType: 'Industriel',
        description: 'Campus de recherche et développement pour entreprises tech',
        location: 'Toulouse',
        budget: 8500000,
        status: 'En cours',
        startDate: today.toISOString().split('T')[0],
        endDate: new Date(today.getTime() + 30 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tendersCount: 6,
        tendersAssigned: 1,
        progressPercentage: 15,
        clientName: 'TechCampus SAS'
      }
    ];
  };

  // Helper to show demo projects with a toast message
  const showDemoProjects = (message: string): ProjectSummary[] => {
    const demoProjects = getLocalDemoProjects();
    
    toast({
      title: "Information",
      description: message,
      variant: "default",
    });
    
    return demoProjects;
  };

  return {
    isLoading,
    setIsLoading,
    error,
    setError,
    toast,
    getLocalDemoProjects,
    showDemoProjects
  };
}

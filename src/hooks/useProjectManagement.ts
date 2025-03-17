
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ProjectSummary, ProjectDetail, ProjectStatus } from '@/types/projects';
import { useToast } from '@/hooks/use-toast';
import { formatBudget, formatDate } from '@/utils/tenderFormatUtils';
import { mapStatus } from '@/utils/tenderStatusUtils';

export function useProjectManagement() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      // Get all projects from the project_management_summary view
      const { data: projectsData, error: projectsError } = await supabase
        .from('project_management_summary')
        .select('*');

      if (projectsError) throw projectsError;

      const formattedProjects: ProjectSummary[] = projectsData.map(project => ({
        id: project.id,
        projectName: project.project_name,
        projectType: project.project_type,
        description: project.description,
        location: project.location || 'Non spécifié',
        budget: project.budget,
        status: project.status as ProjectStatus,
        startDate: project.start_date,
        endDate: project.end_date,
        tendersCount: project.tenders_count,
        tendersAssigned: project.tenders_assigned,
        progressPercentage: project.progress_percentage,
        clientName: project.client_name || 'Non spécifié'
      }));

      setProjects(formattedProjects);
      setError(null);
      setIsLoading(false);
      return formattedProjects;
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setError(err.message);
      toast({
        title: "Erreur",
        description: "Impossible de charger les projets.",
        variant: "destructive",
      });
      setIsLoading(false);
      return [];
    }
  };

  const fetchProjectDetails = async (projectId: string): Promise<ProjectDetail | null> => {
    try {
      // Get project from the project_management_summary view
      const { data: projectData, error: projectError } = await supabase
        .from('project_management_summary')
        .select('*')
        .eq('id', projectId)
        .single();

      if (projectError) throw projectError;

      // Then fetch all tenders related to this project
      const { data: tendersData, error: tendersError } = await supabase
        .from('appels_offres')
        .select('*')
        .eq('projet_id', projectId);

      if (tendersError) throw tendersError;

      const projectDetail: ProjectDetail = {
        id: projectData.id,
        projectName: projectData.project_name,
        projectType: projectData.project_type,
        description: projectData.description,
        location: projectData.location || 'Non spécifié',
        budget: projectData.budget,
        status: projectData.status as ProjectStatus,
        startDate: projectData.start_date,
        endDate: projectData.end_date,
        tendersCount: projectData.tenders_count,
        tendersAssigned: projectData.tenders_assigned,
        progressPercentage: projectData.progress_percentage,
        clientName: projectData.client_name || 'Non spécifié',
        tenders: tendersData.map(tender => ({
          id: tender.id,
          name: tender.lot,
          type: tender.type_appel_offre,
          status: mapStatus(tender.statut),
          quotesReceived: tender.quotes_received || 0,
          deadline: formatDate(tender.date_limite),
          lotsTotal: tender.lots_total || 1,
          lotsAssigned: tender.lots_assigned || 0,
          progress: tender.progress || 0
        }))
      };

      return projectDetail;
    } catch (err: any) {
      console.error('Error fetching project details:', err);
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails du projet.",
        variant: "destructive",
      });
      return null;
    }
  };

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('project-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projets'
        },
        () => {
          fetchProjects();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    fetchProjectDetails
  };
}

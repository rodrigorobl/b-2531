
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
        .from('projets')
        .select(`
          *,
          entreprises:maitre_ouvrage_id(nom)
        `)
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
        projectName: projectData.nom,
        projectType: projectData.type_projet,
        description: projectData.description,
        location: projectData.localisation || 'Non spécifié',
        budget: projectData.budget_estime || 0,
        status: projectData.statut as ProjectStatus,
        startDate: projectData.date_debut,
        endDate: projectData.date_fin,
        tendersCount: tendersData.length,
        tendersAssigned: tendersData.filter(t => t.statut === 'Attribué').length,
        progressPercentage: calculateProjectProgress(tendersData),
        clientName: projectData.entreprises?.nom || 'Non spécifié',
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

  // Helper function to calculate project progress based on tenders
  const calculateProjectProgress = (tenders: any[]): number => {
    if (tenders.length === 0) return 0;
    
    const totalProgress = tenders.reduce((sum, tender) => {
      return sum + (tender.progress || 0);
    }, 0);
    
    return Math.round(totalProgress / tenders.length);
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


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
      // First get basic project information
      const { data: projectsData, error: projectsError } = await supabase
        .from('projets')
        .select(`
          id,
          nom,
          type_projet,
          description,
          localisation,
          budget_estime,
          statut,
          date_debut,
          date_fin,
          entreprises (nom)
        `);

      if (projectsError) throw projectsError;

      // For each project, get the tenders count and assigned count
      const projectsWithTendersCount = await Promise.all(
        projectsData.map(async (project) => {
          // Get all tenders for this project
          const { data: tenders, error: tendersError } = await supabase
            .from('appels_offres')
            .select('id, statut')
            .eq('projet_id', project.id);

          if (tendersError) throw tendersError;

          const tendersCount = tenders?.length || 0;
          const tendersAssigned = tenders?.filter(t => t.statut === 'Attribué').length || 0;
          const progressPercentage = tendersCount > 0 
            ? Math.round((tendersAssigned / tendersCount) * 100)
            : 0;

          return {
            id: project.id,
            projectName: project.nom,
            projectType: project.type_projet,
            description: project.description,
            location: project.localisation || 'Non spécifié',
            budget: project.budget_estime,
            status: project.statut as ProjectStatus,
            startDate: project.date_debut,
            endDate: project.date_fin,
            tendersCount,
            tendersAssigned,
            progressPercentage,
            clientName: project.entreprises?.nom || 'Non spécifié'
          };
        })
      );

      setProjects(projectsWithTendersCount);
      setError(null);
      setIsLoading(false);
      return projectsWithTendersCount;
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
      // First fetch the project
      const { data: projectData, error: projectError } = await supabase
        .from('projets')
        .select(`
          id,
          nom,
          type_projet,
          description,
          localisation,
          budget_estime,
          statut,
          date_debut,
          date_fin,
          entreprises (nom)
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

      // Calculate stats
      const tendersCount = tendersData.length;
      const tendersAssigned = tendersData.filter(t => t.statut === 'Attribué').length;
      const progressPercentage = tendersCount > 0 
        ? Math.round((tendersAssigned / tendersCount) * 100) 
        : 0;

      const projectDetail: ProjectDetail = {
        id: projectData.id,
        projectName: projectData.nom,
        projectType: projectData.type_projet,
        description: projectData.description,
        location: projectData.localisation || 'Non spécifié',
        budget: projectData.budget_estime,
        status: projectData.statut as ProjectStatus,
        startDate: projectData.date_debut,
        endDate: projectData.date_fin,
        tendersCount,
        tendersAssigned,
        progressPercentage,
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

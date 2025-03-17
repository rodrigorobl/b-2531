
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ProjectSummary, ProjectDetail } from '@/types/projects';
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
      const { data, error } = await supabase
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
          entreprises(nom),
          (
            SELECT count(*) FROM appels_offres WHERE projet_id = projets.id
          ) as tenders_count,
          (
            SELECT count(*) FROM appels_offres WHERE projet_id = projets.id AND statut = 'Attribué'
          ) as tenders_assigned
        `);

      if (error) throw error;

      const formattedProjects: ProjectSummary[] = data.map(item => {
        // Calculate progress percentage
        const tendersCount = item.tenders_count || 0;
        const tendersAssigned = item.tenders_assigned || 0;
        const progressPercentage = tendersCount > 0 
          ? Math.round((tendersAssigned / tendersCount) * 100)
          : 0;

        return {
          id: item.id,
          projectName: item.nom,
          projectType: item.type_projet,
          description: item.description,
          location: item.localisation || 'Non spécifié',
          budget: item.budget_estime,
          status: item.statut as ProjectStatus,
          startDate: item.date_debut,
          endDate: item.date_fin,
          tendersCount,
          tendersAssigned,
          progressPercentage,
          clientName: item.entreprises?.nom || 'Non spécifié'
        };
      });

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
          entreprises(nom)
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

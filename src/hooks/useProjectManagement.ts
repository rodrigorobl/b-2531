import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProjectSummary, ProjectDetail, TenderStatus } from '@/types/projects';
import { mapStatus } from '@/utils/tenderStatusUtils';

export function useProjectManagement() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('projets')
        .select(`
          *,
          entreprises:maitre_ouvrage_id(nom)
        `);

      if (error) throw error;

      console.log("Données projets récupérées:", data);

      const projectsList: ProjectSummary[] = [];

      for (const project of data) {
        const { data: tendersData, error: tendersError } = await supabase
          .from('appels_offres')
          .select('*')
          .eq('projet_id', project.id);

        if (tendersError) throw tendersError;

        const assignedTenders = tendersData ? tendersData.filter(tender => 
          tender.statut === 'Attribué').length : 0;

        const progressPercentage = tendersData && tendersData.length > 0
          ? Math.round(tendersData.reduce((acc, tender) => acc + (tender.progress || 0), 0) / tendersData.length)
          : 0;

        projectsList.push({
          id: project.id,
          projectName: project.nom,
          projectType: project.type_projet,
          description: project.description,
          location: project.localisation || '',
          budget: project.budget_estime || 0,
          status: project.statut || 'En cours',
          startDate: project.date_debut,
          endDate: project.date_fin,
          tendersCount: tendersData ? tendersData.length : 0,
          tendersAssigned: assignedTenders,
          progressPercentage: progressPercentage,
          clientName: project.entreprises?.nom || 'Client inconnu'
        });
      }

      setProjects(projectsList);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setError(err.message);
      toast({
        title: "Erreur",
        description: "Impossible de charger les projets.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjectDetails = async (projectId: string): Promise<ProjectDetail | null> => {
    setIsLoading(true);
    try {
      const { data: projectData, error: projectError } = await supabase
        .from('projets')
        .select(`
          *,
          entreprises:maitre_ouvrage_id(nom)
        `)
        .eq('id', projectId)
        .single();

      if (projectError) throw projectError;

      const { data: tendersData, error: tendersError } = await supabase
        .from('appels_offres')
        .select('*')
        .eq('projet_id', projectId);

      if (tendersError) throw tendersError;

      const progressPercentage = tendersData && tendersData.length > 0
        ? Math.round(tendersData.reduce((acc, tender) => acc + (tender.progress || 0), 0) / tendersData.length)
        : 0;

      const tenders = tendersData.map(tender => ({
        id: tender.id,
        name: tender.lot,
        description: tender.description,
        type: tender.type_appel_offre,
        status: mapStatus(tender.statut) as TenderStatus,
        quotesReceived: tender.quotes_received || 0,
        deadline: tender.date_limite,
        lotsTotal: tender.lots_total || 1,
        lotsAssigned: tender.lots_assigned || 0,
        progress: tender.progress || 0
      }));

      const projectDetail: ProjectDetail = {
        id: projectData.id,
        projectName: projectData.nom,
        projectType: projectData.type_projet,
        description: projectData.description,
        location: projectData.localisation || '',
        budget: projectData.budget_estime || 0,
        status: projectData.statut || 'En cours',
        startDate: projectData.date_debut,
        endDate: projectData.date_fin,
        tendersCount: tendersData.length,
        tendersAssigned: tendersData.filter(tender => tender.statut === 'Attribué').length,
        progressPercentage: progressPercentage,
        clientName: projectData.entreprises?.nom || 'Client inconnu',
        tenders: tenders
      };

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
    projects,
    isLoading,
    error,
    fetchProjects,
    fetchProjectDetails
  };
}


import { useParams, useNavigate } from 'react-router-dom';
import { ProjectDetail, TenderStatus } from '@/types/projects';
import { useProjectBase } from './useProjectBase';
import { mapStatus } from '@/utils/tenderStatusUtils';
import { supabase } from '@/integrations/supabase/client';

export function useProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoading, setIsLoading, error, setError, toast, getLocalDemoProjects } = useProjectBase();
  
  const fetchProjectDetails = async (projectId: string): Promise<ProjectDetail | null> => {
    setIsLoading(true);
    try {
      // For demo projects, return local data
      if (projectId.startsWith('demo-')) {
        const demoProjects = getLocalDemoProjects();
        const demoProject = demoProjects.find(p => p.id === projectId);
        
        if (demoProject) {
          const projectDetail: ProjectDetail = {
            ...demoProject,
            tenders: Array.from({ length: demoProject.tendersCount }).map((_, i) => ({
              id: `tender-${projectId}-${i}`,
              name: `Lot ${i + 1}`,
              description: `Description du lot ${i + 1}`,
              type: i % 2 === 0 ? 'Réalisation' : 'Conception',
              status: i < demoProject.tendersAssigned ? 'assigned' : 'open',
              quotesReceived: Math.floor(Math.random() * 5),
              deadline: new Date(new Date().getTime() + (30 + i * 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              lotsTotal: Math.floor(Math.random() * 5) + 1,
              lotsAssigned: i < demoProject.tendersAssigned ? 1 : 0,
              progress: i < demoProject.tendersAssigned ? 50 : 0
            }))
          };
          
          setIsLoading(false);
          return projectDetail;
        }
      }
      
      console.log("Fetching detailed project data from Supabase for ID:", projectId);
      
      // Fetch project details from Supabase
      const { data: projectData, error: projectError } = await supabase
        .from('projets')
        .select(`
          *,
          entreprises:maitre_ouvrage_id(nom)
        `)
        .eq('id', projectId)
        .single();

      if (projectError) {
        console.error("Error fetching project details:", projectError);
        throw projectError;
      }

      if (!projectData) {
        console.error("Project not found with ID:", projectId);
        setError("Projet non trouvé");
        setIsLoading(false);
        return null;
      }

      console.log("Project data fetched successfully:", projectData);

      // Fetch tenders for this project
      const { data: tendersData, error: tendersError } = await supabase
        .from('appels_offres')
        .select('*')
        .eq('projet_id', projectId);

      if (tendersError) {
        console.error("Error fetching tenders:", tendersError);
        throw tendersError;
      }

      console.log(`Retrieved ${tendersData?.length || 0} tenders for project ${projectId}`);

      // Calculate project progress from tenders
      const progressPercentage = tendersData && tendersData.length > 0
        ? Math.round(tendersData.reduce((acc, tender) => acc + (tender.progress || 0), 0) / tendersData.length)
        : 0;

      // Transform tenders data to ProjectTender format
      const tenders = (tendersData || []).map(tender => ({
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

      // Create the project detail object
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

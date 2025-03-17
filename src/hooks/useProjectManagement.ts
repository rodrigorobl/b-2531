
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
      // Insert sample project data for testing if no data exists
      const { data: existingProjects, error: checkError } = await supabase
        .from('projets')
        .select('id')
        .limit(1);
        
      if (checkError) throw checkError;
      
      // If no projects exist, insert sample data
      if (existingProjects.length === 0) {
        console.log("No projects found, inserting sample data");
        await insertSampleProjects();
      }

      // Fetch all projects
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

  // Helper function to insert sample projects for demo purposes
  const insertSampleProjects = async () => {
    try {
      // First insert a sample client - using a valid category from the enum
      const { data: clientData, error: clientError } = await supabase
        .from('entreprises')
        .insert({
          nom: 'Immobilier Moderne', 
          categorie_principale: 'Construction', // Changed from 'Promoteur' to a valid enum value
          specialite: 'Résidentiel' 
        })
        .select();

      if (clientError) throw clientError;
      
      const clientId = clientData[0].id;
      
      // Then insert sample projects
      const { error: projectsError } = await supabase
        .from('projets')
        .insert([
          {
            nom: 'Résidence Les Jardins',
            description: 'Complexe résidentiel de 50 appartements avec espaces verts',
            type_projet: 'Résidentiel',
            localisation: 'Lyon',
            budget_estime: 5000000,
            statut: 'En cours',
            date_debut: new Date().toISOString().split('T')[0],
            date_fin: new Date(new Date().setMonth(new Date().getMonth() + 18)).toISOString().split('T')[0],
            maitre_ouvrage_id: clientId
          },
          {
            nom: 'Tour Horizon',
            description: 'Immeuble de bureaux de 15 étages en centre-ville',
            type_projet: 'Commercial',
            localisation: 'Paris',
            budget_estime: 12000000,
            statut: 'En cours',
            date_debut: new Date().toISOString().split('T')[0],
            date_fin: new Date(new Date().setMonth(new Date().getMonth() + 24)).toISOString().split('T')[0],
            maitre_ouvrage_id: clientId
          },
          {
            nom: 'Campus Technologique',
            description: 'Campus de recherche et développement pour entreprises tech',
            type_projet: 'Industriel',
            localisation: 'Toulouse',
            budget_estime: 8500000,
            statut: 'En cours',
            date_debut: new Date().toISOString().split('T')[0],
            date_fin: new Date(new Date().setMonth(new Date().getMonth() + 30)).toISOString().split('T')[0],
            maitre_ouvrage_id: clientId
          }
        ]);

      if (projectsError) throw projectsError;

      console.log("Sample project data inserted successfully");
    } catch (err) {
      console.error("Error inserting sample project data:", err);
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

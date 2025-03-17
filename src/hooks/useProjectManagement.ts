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
      console.log("Fetching projects from Supabase 'projets' table...");
      
      // Fetch all projects from the projets table with the company name
      const { data: projectsData, error: projectsError } = await supabase
        .from('projets')
        .select(`
          *,
          entreprises:maitre_ouvrage_id(nom)
        `);

      if (projectsError) {
        console.error('Error fetching projects:', projectsError);
        throw projectsError;
      }

      console.log(`Retrieved ${projectsData?.length || 0} projects from database:`, projectsData);

      // Transform the data into ProjectSummary objects
      const projectsList: ProjectSummary[] = [];

      if (projectsData && projectsData.length > 0) {
        for (const project of projectsData) {
          try {
            // Fetch tenders for each project
            const { data: tendersData, error: tendersError } = await supabase
              .from('appels_offres')
              .select('*')
              .eq('projet_id', project.id);

            if (tendersError) {
              console.error('Error fetching tenders for project:', project.id, tendersError);
              // Continue with the next project instead of throwing
              continue;
            }

            console.log(`Retrieved ${tendersData?.length || 0} tenders for project ${project.id}`);

            const assignedTenders = tendersData 
              ? tendersData.filter(tender => tender.statut === 'Attribué').length 
              : 0;

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
          } catch (err) {
            console.error('Error processing project:', project.id, err);
            // Continue with the next project instead of failing entirely
          }
        }

        setProjects(projectsList);
        console.log("Successfully loaded projects from database:", projectsList);
      } else {
        // If no projects were found, use demo projects as fallback
        console.log("No projects found in database, using demo projects instead");
        const demoProjects = getLocalDemoProjects();
        setProjects(demoProjects);
        
        toast({
          title: "Information",
          description: "Aucun projet trouvé dans la base de données. Affichage des projets de démonstration.",
          variant: "default",
        });
      }
      
      setError(null);
    } catch (err: any) {
      console.error('Error in fetchProjects():', err);
      const demoProjects = getLocalDemoProjects();
      setProjects(demoProjects);
      
      toast({
        title: "Information",
        description: "Erreur lors du chargement des projets. Affichage des projets de démonstration.",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    projects,
    isLoading,
    error,
    fetchProjects,
    fetchProjectDetails
  };
}

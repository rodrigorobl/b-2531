
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ProjectSummary } from '@/types/projects';
import { useProjectBase } from './useProjectBase';

export function useProjectList() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const { isLoading, setIsLoading, error, setError, toast } = useProjectBase();

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
        // If no projects were found, return an empty array instead of demo projects
        console.log("No projects found in database, returning empty array");
        setProjects([]);
        toast({
          title: "Information",
          description: "Aucun projet trouvé dans la base de données.",
          variant: "default",
        });
      }
      
      setError(null);
    } catch (err: any) {
      console.error('Error in fetchProjects():', err);
      setError(err.message);
      setProjects([]); // Return empty array instead of demo projects
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

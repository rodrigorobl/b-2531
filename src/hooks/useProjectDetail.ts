
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectDetail, TenderStatus, ProjectTender } from '@/types/projects';
import { ProjectData, TenderData, QuoteData } from '@/types/projectDetail';
import { useProjectBase } from './useProjectBase';
import { mapStatus } from '@/utils/tenderStatusUtils';
import { supabase } from '@/integrations/supabase/client';

export function useProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoading, setIsLoading, error, setError, toast } = useProjectBase();
  
  // Use the correct ProjectData type that matches what the component expects
  const [project, setProject] = useState<ProjectData | null>(null);
  const [tenders, setTenders] = useState<TenderData[]>([]);
  const [quotes, setQuotes] = useState<Record<string, QuoteData[]>>({});
  const [selectedTenderId, setSelectedTenderId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fetch project details when the component mounts
  useEffect(() => {
    if (id) {
      fetchProjectDetails(id).then(projectData => {
        if (projectData) {
          // Convert ProjectDetail to ProjectData
          const projectDataFormatted: ProjectData = {
            id: projectData.id,
            nom: projectData.projectName,
            description: projectData.description,
            type_projet: projectData.projectType,
            localisation: projectData.location,
            budget_estime: projectData.budget,
            statut: projectData.status as any,
            date_debut: projectData.startDate || null,
            date_fin: projectData.endDate || null,
            maitre_ouvrage_id: '', // Required field, but we don't have this data from ProjectDetail
            maitre_ouvrage_nom: projectData.clientName,
            progress_percentage: projectData.progressPercentage
          };
          
          setProject(projectDataFormatted);
          
          // Convert ProjectTender[] to TenderData[]
          const tendersDataFormatted: TenderData[] = projectData.tenders.map(tender => ({
            id: tender.id,
            lot: tender.name,
            description: tender.description || '',
            type_appel_offre: tender.type,
            statut: tender.status === 'open' ? 'Ouvert' : tender.status === 'closed' ? 'Clôturé' : 'Attribué',
            date_limite: tender.deadline,
            budget: 0, // Default value since it's not in ProjectTender
            quotes_received: tender.quotesReceived,
            progress: tender.progress,
            lots_total: tender.lotsTotal,
            lots_assigned: tender.lotsAssigned,
            projet_id: id
          }));
          
          setTenders(tendersDataFormatted);
          
          // Initialize quotes object with empty arrays for each tender
          const quotesObj: Record<string, QuoteData[]> = {};
          tendersDataFormatted.forEach(tender => {
            quotesObj[tender.id] = [];
          });
          setQuotes(quotesObj);
          
          // Set the first tender as selected if there are tenders
          if (tendersDataFormatted.length > 0 && !selectedTenderId) {
            setSelectedTenderId(tendersDataFormatted[0].id);
          }
        }
      });
    }
  }, [id, selectedTenderId]);
  
  const fetchProjectDetails = async (projectId: string): Promise<ProjectDetail | null> => {
    setIsLoading(true);
    try {
      // Remove the demo projects handling code
      // For demo projects, redirect to projects page with a toast message
      if (projectId.startsWith('demo-')) {
        toast({
          title: "Information",
          description: "Les projets de démonstration ne sont pas accessibles.",
          variant: "default",
        });
        navigate('/project-management');
        setIsLoading(false);
        return null;
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
    project,
    tenders,
    quotes,
    selectedTenderId,
    setSelectedTenderId,
    activeTab,
    setActiveTab,
    isLoading,
    error,
    navigate,
    fetchProjectDetails
  };
}

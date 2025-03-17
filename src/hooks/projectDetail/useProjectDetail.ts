
import { useEffect } from 'react';
import { ProjectDetail } from '@/types/projects';
import { ProjectData, TenderData, QuoteData } from '@/types/projectDetail';
import { useFetchProjectDetail } from './useFetchProjectDetail';
import { useProjectDataState } from './useProjectDataState';

export function useProjectDetail() {
  const { 
    projectId, 
    isLoading, 
    error, 
    navigate, 
    fetchProjectDetails 
  } = useFetchProjectDetail();
  
  const {
    project,
    setProject,
    tenders,
    setTenders,
    quotes,
    setQuotes,
    selectedTenderId,
    setSelectedTenderId,
    activeTab,
    setActiveTab
  } = useProjectDataState();
  
  // Fetch project details when the component mounts
  useEffect(() => {
    if (projectId) {
      fetchProjectDetails(projectId).then(projectData => {
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
            projet_id: projectId
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
  }, [projectId, selectedTenderId]);

  return {
    projectId,
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

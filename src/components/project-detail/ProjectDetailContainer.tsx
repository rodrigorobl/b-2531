
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProjectLoading } from './ProjectLoading';
import { ProjectError } from './ProjectError';
import { ProjectHeader } from './ProjectHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectOverviewTab } from './ProjectOverviewTab';
import { ProjectTendersTab } from './ProjectTendersTab';
import { ProjectData, TenderData, QuoteData } from '@/types/projectDetail';
import { useProjectManagement } from '@/hooks/useProjectManagement';
import Sidebar from '@/components/Sidebar';

export function ProjectDetailContainer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { fetchProjectDetails } = useProjectManagement();
  
  const [project, setProject] = useState<ProjectData | null>(null);
  const [tenders, setTenders] = useState<TenderData[]>([]);
  const [quotes, setQuotes] = useState<{ [key: string]: QuoteData[] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTenderId, setSelectedTenderId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState<string | null>(null);
  
  // Check if user is promoter
  useEffect(() => {
    const activeProfile = localStorage.getItem('btp-connect-active-profile');
    if (activeProfile !== 'promoteur') {
      navigate('/dashboard-promoteur');
      toast({
        title: "Accès limité",
        description: "Cette page est accessible uniquement pour le profil promoteur",
        variant: "destructive",
      });
    }
  }, [navigate, toast]);
  
  // Fetch project data from supabase
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("Identifiant de projet non fourni");
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        console.log("Fetching project with ID:", id);
        
        // Use ProjectManagement hook to fetch project details
        const projectDetail = await fetchProjectDetails(id);
        
        if (!projectDetail) {
          console.error("Project not found with ID:", id);
          setError("Projet non trouvé");
          setIsLoading(false);
          return;
        }
        
        console.log("Project data fetched:", projectDetail);
        
        // Transform project data
        const projectData: ProjectData = {
          id: projectDetail.id,
          nom: projectDetail.projectName,
          description: projectDetail.description,
          type_projet: projectDetail.projectType,
          localisation: projectDetail.location,
          budget_estime: projectDetail.budget,
          statut: projectDetail.status,
          date_debut: projectDetail.startDate,
          date_fin: projectDetail.endDate,
          maitre_ouvrage_id: '', // This info may be missing
          maitre_ouvrage_nom: projectDetail.clientName,
          progress_percentage: projectDetail.progressPercentage
        };
        
        // Transform tenders data
        const tendersData: TenderData[] = projectDetail.tenders.map(tender => ({
          id: tender.id,
          lot: tender.name,
          description: tender.description || '',
          type_appel_offre: tender.type,
          statut: mapStatusToTenderStatus(tender.status),
          date_limite: tender.deadline,
          budget: null, // This info may be missing in the transformation
          quotes_received: tender.quotesReceived,
          progress: tender.progress,
          lots_total: tender.lotsTotal,
          lots_assigned: tender.lotsAssigned
        }));
        
        setProject(projectData);
        setTenders(tendersData);
        
        // Fetch quotes for each tender
        const tenderQuotes: { [key: string]: QuoteData[] } = {};
        
        for (const tender of tendersData) {
          const { data: quotesData, error: quotesError } = await supabase
            .from('devis')
            .select(`
              *,
              entreprises:entreprise_id(nom)
            `)
            .eq('appel_offre_id', tender.id);
          
          if (!quotesError && quotesData) {
            tenderQuotes[tender.id] = quotesData.map(quote => ({
              ...quote,
              entreprise_nom: quote.entreprises?.nom
            }));
          }
        }
        
        setQuotes(tenderQuotes);
        
        // Select the first tender by default
        if (tendersData.length > 0 && !selectedTenderId) {
          setSelectedTenderId(tendersData[0].id);
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
        setError("Erreur lors du chargement des données du projet");
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du projet",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, toast, fetchProjectDetails]);
  
  // Helper function to map statuses
  const mapStatusToTenderStatus = (status: string): 'Ouvert' | 'Clôturé' | 'Attribué' => {
    switch (status) {
      case 'open':
        return 'Ouvert';
      case 'closed':
        return 'Clôturé';
      case 'assigned':
        return 'Attribué';
      default:
        return 'Ouvert';
    }
  };
  
  if (isLoading) {
    return <ProjectLoading />;
  }
  
  if (error || !project) {
    return <ProjectError error={error || "Projet non trouvé"} />;
  }
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <ProjectHeader 
            project={project} 
            setActiveTab={setActiveTab} 
            navigate={navigate}
          />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-2 md:w-[400px]">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="tenders">Appels d'offres</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <ProjectOverviewTab 
                project={project} 
                tenders={tenders} 
                quotes={quotes} 
                setActiveTab={setActiveTab}
                setSelectedTenderId={setSelectedTenderId}
              />
            </TabsContent>
            
            <TabsContent value="tenders" className="space-y-6">
              <ProjectTendersTab 
                tenders={tenders}
                quotes={quotes}
                selectedTenderId={selectedTenderId}
                setSelectedTenderId={setSelectedTenderId}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

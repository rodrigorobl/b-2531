
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ProjectLoading } from '@/components/project-detail/ProjectLoading';
import { ProjectError } from '@/components/project-detail/ProjectError';
import { ProjectHeader } from '@/components/project-detail/ProjectHeader';
import { ProjectOverviewTab } from '@/components/project-detail/ProjectOverviewTab';
import { ProjectTendersTab } from '@/components/project-detail/ProjectTendersTab';
import { ProjectData, TenderData, QuoteData } from '@/types/projectDetail';
import { useProjectManagement } from '@/hooks/useProjectManagement';

export default function ProjectDetail() {
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
  
  // Fetch project data
  useEffect(() => {
    async function fetchProjectData() {
      if (!id) {
        setError("Identifiant de projet non fourni");
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        console.log("Fetching project with ID:", id);
        
        // Utiliser le hook useProjectManagement pour récupérer les détails du projet
        const projectDetail = await fetchProjectDetails(id);
        
        if (!projectDetail) {
          console.error("Project not found with ID:", id);
          setError("Projet non trouvé");
          setIsLoading(false);
          return;
        }
        
        console.log("Project data fetched:", projectDetail);
        
        // Transformer les données du projet dans le format attendu par les composants
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
          maitre_ouvrage_id: '', // Cette info peut être manquante
          maitre_ouvrage_nom: projectDetail.clientName,
          progress_percentage: projectDetail.progressPercentage
        };
        
        // Transformer les données des appels d'offres dans le format attendu
        const tendersData: TenderData[] = projectDetail.tenders.map(tender => ({
          id: tender.id,
          lot: tender.name,
          description: tender.description || '',
          type_appel_offre: tender.type,
          statut: mapStatusToTenderStatus(tender.status),
          date_limite: tender.deadline,
          budget: null, // Cette info peut être manquante dans la transformation
          quotes_received: tender.quotesReceived,
          progress: tender.progress,
          lots_total: tender.lotsTotal,
          lots_assigned: tender.lotsAssigned
        }));
        
        setProject(projectData);
        setTenders(tendersData);
        
        // Maintenant récupérer les devis pour chaque appel d'offre
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
    }
    
    fetchProjectData();
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
  
  // Calculate project progress based on tenders
  const calculateProjectProgress = (tenders: TenderData[]): number => {
    if (tenders.length === 0) return 0;
    
    const totalProgress = tenders.reduce((sum, tender) => {
      return sum + (tender.progress || 0);
    }, 0);
    
    return Math.round(totalProgress / tenders.length);
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
          {/* Project Header */}
          <ProjectHeader 
            project={project} 
            setActiveTab={setActiveTab} 
            navigate={navigate}
          />
          
          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-2 md:w-[400px]">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="tenders">Appels d'offres</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <ProjectOverviewTab 
                project={project} 
                tenders={tenders} 
                quotes={quotes} 
                setActiveTab={setActiveTab}
                setSelectedTenderId={setSelectedTenderId}
              />
            </TabsContent>
            
            {/* Tenders Tab */}
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

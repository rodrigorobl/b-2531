
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProjectData, TenderData, QuoteData } from '@/types/projectDetail';
import { useProjectManagement } from '@/hooks/useProjectManagement';

export function useProjectDetail() {
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
        
        // Fetch project details directly from Supabase
        const { data: projectData, error: projectError } = await supabase
          .from('projets')
          .select(`
            *,
            entreprises:maitre_ouvrage_id(nom)
          `)
          .eq('id', id)
          .single();
        
        if (projectError) {
          console.error("Error fetching project:", projectError);
          throw projectError;
        }
        
        if (!projectData) {
          console.error("Project not found with ID:", id);
          setError("Projet non trouvé");
          setIsLoading(false);
          return;
        }
        
        console.log("Project data fetched:", projectData);
        
        // Fetch tenders related to this project
        const { data: tendersData, error: tendersError } = await supabase
          .from('appels_offres')
          .select('*')
          .eq('projet_id', id);
        
        if (tendersError) {
          console.error("Error fetching tenders:", tendersError);
          throw tendersError;
        }
        
        console.log("Tenders fetched:", tendersData);
        
        // Transform project data
        const formattedProject: ProjectData = {
          id: projectData.id,
          nom: projectData.nom,
          description: projectData.description,
          type_projet: projectData.type_projet,
          localisation: projectData.localisation,
          budget_estime: projectData.budget_estime,
          statut: projectData.statut,
          date_debut: projectData.date_debut,
          date_fin: projectData.date_fin,
          maitre_ouvrage_id: projectData.maitre_ouvrage_id,
          maitre_ouvrage_nom: projectData.entreprises?.nom,
          progress_percentage: calculateProjectProgress(tendersData || [])
        };
        
        // Transform tenders data
        const formattedTenders: TenderData[] = (tendersData || []).map(tender => ({
          id: tender.id,
          lot: tender.lot,
          description: tender.description,
          type_appel_offre: tender.type_appel_offre,
          statut: tender.statut,
          date_limite: tender.date_limite,
          budget: tender.budget,
          quotes_received: tender.quotes_received,
          progress: tender.progress,
          lots_total: tender.lots_total,
          lots_assigned: tender.lots_assigned,
          projet_id: tender.projet_id
        }));
        
        setProject(formattedProject);
        setTenders(formattedTenders);
        
        // Fetch quotes for each tender
        const tenderQuotes: { [key: string]: QuoteData[] } = {};
        
        for (const tender of formattedTenders) {
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
          } else if (quotesError) {
            console.error("Error fetching quotes for tender", tender.id, quotesError);
          }
        }
        
        setQuotes(tenderQuotes);
        
        // Select the first tender by default
        if (formattedTenders.length > 0 && !selectedTenderId) {
          setSelectedTenderId(formattedTenders[0].id);
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
  }, [id, toast, selectedTenderId]);

  // Helper function to calculate project progress based on tenders
  const calculateProjectProgress = (tenders: any[]): number => {
    if (tenders.length === 0) return 0;
    
    const totalProgress = tenders.reduce((sum, tender) => {
      return sum + (tender.progress || 0);
    }, 0);
    
    return Math.round(totalProgress / tenders.length);
  };

  return {
    project,
    tenders,
    quotes,
    isLoading,
    selectedTenderId,
    setSelectedTenderId,
    activeTab,
    setActiveTab,
    error,
    navigate
  };
}

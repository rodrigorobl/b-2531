
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Sidebar from '@/components/Sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ProjectLoading } from '@/components/project-detail/ProjectLoading';
import { ProjectError } from '@/components/project-detail/ProjectError';
import { ProjectHeader } from '@/components/project-detail/ProjectHeader';
import { ProjectOverviewTab } from '@/components/project-detail/ProjectOverviewTab';
import { ProjectTendersTab } from '@/components/project-detail/ProjectTendersTab';
import { ProjectData, TenderData, QuoteData } from '@/types/projectDetail';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
        // Fetch project details
        const { data: projectData, error: projectError } = await supabase
          .from('projets')
          .select(`
            *,
            entreprises:maitre_ouvrage_id(nom)
          `)
          .eq('id', id)
          .maybeSingle();
        
        if (projectError) throw projectError;
        
        if (!projectData) {
          setError("Projet non trouvé");
          setIsLoading(false);
          return;
        }
        
        // Fetch tenders for this project
        const { data: tendersData, error: tendersError } = await supabase
          .from('appels_offres')
          .select('*')
          .eq('projet_id', id);
        
        if (tendersError) throw tendersError;
          
        // Calculate overall project progress
        const projectProgress = calculateProjectProgress(tendersData);
        
        // Update state with fetched data
        setProject({
          ...projectData,
          maitre_ouvrage_nom: projectData.entreprises?.nom,
          progress_percentage: projectProgress
        });
        setTenders(tendersData);
        
        // Fetch quotes for all tenders
        if (tendersData.length > 0) {
          const tendersWithQuotes: { [key: string]: QuoteData[] } = {};
          
          for (const tender of tendersData) {
            const { data: quotesData, error: quotesError } = await supabase
              .from('devis')
              .select(`
                *,
                entreprises:entreprise_id(nom)
              `)
              .eq('appel_offre_id', tender.id);
            
            if (!quotesError && quotesData) {
              tendersWithQuotes[tender.id] = quotesData.map(quote => ({
                ...quote,
                entreprise_nom: quote.entreprises?.nom
              }));
            }
          }
          
          setQuotes(tendersWithQuotes);
          
          // Select the first tender by default
          if (tendersData.length > 0 && !selectedTenderId) {
            setSelectedTenderId(tendersData[0].id);
          }
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
  }, [id, toast]);
  
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

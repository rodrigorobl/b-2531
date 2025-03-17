
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type MyTenderProject = {
  id: string;
  projectId: string;
  projectName: string;
  projectType: string;
  location: string;
  projectStatus: string;
  tenderDeadline: string | null;
  quoteStatus: string | null;
  quoteAmount: number;
  submissionDate: string | null;
  appel_offre_id: string;
};

export function useMyTenders() {
  const [projects, setProjects] = useState<MyTenderProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchMyTenders();
  }, []);

  const fetchMyTenders = async () => {
    setIsLoading(true);
    try {
      // Dans un environnement réel, on pourrait récupérer l'entreprise_id de l'utilisateur connecté
      // Pour l'instant, nous utilisons un ID en dur pour démonstration
      const mockEntrepriseId = 'c8f4518c-8b8a-4c74-bcd8-3a64dcb37f75'; // ID à remplacer en production

      // Récupérer tous les devis soumis par cette entreprise
      const { data: quotesData, error: quotesError } = await supabase
        .from('devis')
        .select(`
          id,
          montant,
          date_soumission,
          statut,
          appel_offre_id,
          projet_id,
          projets(
            id,
            nom,
            type_projet,
            localisation,
            statut
          ),
          appels_offres(
            date_limite
          )
        `)
        .eq('entreprise_id', mockEntrepriseId);

      if (quotesError) {
        throw quotesError;
      }

      console.log("Données des devis récupérées:", quotesData);

      // Transformer les données pour notre interface
      const myTenders = quotesData.map(quote => ({
        id: quote.id,
        projectId: quote.projet_id,
        projectName: quote.projets?.nom || 'Projet inconnu',
        projectType: quote.projets?.type_projet || 'Type inconnu',
        location: quote.projets?.localisation || 'Non spécifié',
        projectStatus: quote.projets?.statut || 'En cours',
        tenderDeadline: quote.appels_offres?.date_limite || null,
        quoteStatus: quote.statut,
        quoteAmount: quote.montant,
        submissionDate: quote.date_soumission,
        appel_offre_id: quote.appel_offre_id
      }));

      setProjects(myTenders);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching my tenders:', err);
      setError(err.message);
      toast({
        title: "Erreur",
        description: "Impossible de charger vos appels d'offres.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrer les projets en fonction de la recherche et du filtre de statut
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.projectType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || project.projectStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return {
    projects: filteredProjects,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    fetchMyTenders
  };
}

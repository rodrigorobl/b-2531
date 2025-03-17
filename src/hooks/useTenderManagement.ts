
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { TenderSearchResult } from '@/types/tenders';
import { formatBudget, formatDate } from '@/utils/tenderFormatUtils';
import { mapStatus } from '@/utils/tenderStatusUtils';

export function useTenderManagement() {
  const [tenders, setTenders] = useState<TenderSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    setIsLoading(true);
    try {
      // Récupérer les appels d'offres depuis la table appels_offres
      const { data, error } = await supabase
        .from('appels_offres')
        .select(`
          *,
          projets:projet_id(nom, type_projet, localisation)
        `);

      if (error) throw error;

      console.log("Appels d'offres récupérés:", data);

      // Transformer les données pour correspondre au type TenderSearchResult
      const formattedTenders: TenderSearchResult[] = await Promise.all(data.map(async (item) => {
        // Récupérer le nombre de devis pour cet appel d'offres
        const { count: quotesCount, error: quotesError } = await supabase
          .from('devis')
          .select('*', { count: 'exact', head: true })
          .eq('appel_offre_id', item.id);

        // Récupérer l'entreprise attribuée si elle existe
        let assignedCompanyName = '';
        if (item.entreprise_attribuee_id) {
          const { data: companyData, error: companyError } = await supabase
            .from('entreprises')
            .select('nom')
            .eq('id', item.entreprise_attribuee_id)
            .single();
          
          if (!companyError && companyData) {
            assignedCompanyName = companyData.nom;
          }
        }

        return {
          id: item.id,
          projectName: item.projets?.nom || 'Projet inconnu',
          projectType: item.projets?.type_projet || 'Type inconnu',
          location: item.projets?.localisation || 'Non spécifié',
          budget: formatBudget(item.budget),
          surface: 'N/A',
          deadline: formatDate(item.date_limite),
          status: mapStatus(item.statut),
          client: {
            name: 'Client', // À compléter avec les données réelles
          },
          lots: [item.lot],
          isFavorite: false,
          createdAt: new Date().toLocaleDateString('fr-FR'),
          description: item.description,
          progress: item.progress || 0,
          lotsTotal: item.lots_total || 1,
          lotsAssigned: item.lots_assigned || 0,
          quotesReceived: item.quotes_received || 0,
          actualQuotesReceived: quotesError ? 0 : (quotesCount || 0),
          quoteQuality: 'medium', // À calculer en fonction des données réelles
          budgetRespect: 'on-target', // À calculer en fonction des données réelles
        };
      }));

      setTenders(formattedTenders);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching tenders:', err);
      setError(err.message);
      toast({
        title: "Erreur",
        description: "Impossible de charger les appels d'offres.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tenders,
    isLoading,
    error,
    fetchTenders
  };
}

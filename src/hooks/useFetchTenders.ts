
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TenderSearchResult } from '@/types/tenders';
import { useToast } from '@/hooks/use-toast';
import { formatBudget, formatDate } from '@/utils/tenderFormatUtils';
import { mapStatus, mapLotStatus, getRandomQuoteQuality, getRandomBudgetRespect } from '@/utils/tenderStatusUtils';

export function useFetchTenders() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  async function fetchTenders() {
    setIsLoading(true);
    try {
      // Récupérer directement de la table appels_offres
      const { data, error } = await supabase
        .from('appels_offres')
        .select(`
          *,
          projets:projet_id(nom, type_projet, localisation)
        `);

      if (error) throw error;

      console.log("Données appels d'offres récupérées:", data);

      const formattedTenders: TenderSearchResult[] = data.map(item => ({
        id: item.id,
        projectName: item.projets?.nom || 'Projet inconnu',
        projectType: item.projets?.type_projet || 'Type inconnu',
        location: item.projets?.localisation || 'Non spécifié',
        budget: formatBudget(item.budget),
        surface: 'N/A', // Not in our current data model
        deadline: formatDate(item.date_limite),
        status: mapStatus(item.statut),
        client: {
          name: 'Client', // We'll need to add this to the database or view
        },
        lots: [item.lot], // Single lot per tender in the current model
        isFavorite: false,
        createdAt: new Date().toLocaleDateString('fr-FR'),
        description: item.description,
        progress: item.progress,
        lotsTotal: item.lots_total,
        lotsAssigned: item.lots_assigned,
        quotesReceived: item.quotes_received,
        actualQuotesReceived: 0, // To be calculated
        // Random values for the demo, should be calculated in a real situation
        quoteQuality: getRandomQuoteQuality(),
        budgetRespect: getRandomBudgetRespect()
      }));

      // Fetch quotes count for each tender
      for (const tender of formattedTenders) {
        const { count: quotesCount, error: quotesError } = await supabase
          .from('devis')
          .select('*', { count: 'exact', head: true })
          .eq('appel_offre_id', tender.id);
          
        if (!quotesError) {
          tender.actualQuotesReceived = quotesCount || 0;
        }
      }

      setError(null);
      setIsLoading(false);
      return formattedTenders;
      
    } catch (err: any) {
      console.error('Error fetching tenders:', err);
      setError(err.message);
      toast({
        title: "Erreur",
        description: "Impossible de charger les appels d'offres.",
        variant: "destructive",
      });
      setIsLoading(false);
      return [];
    }
  }

  return {
    fetchTenders,
    isLoading,
    error
  };
}

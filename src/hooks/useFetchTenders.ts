
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
      const { data, error } = await supabase
        .from('tender_management_summary')
        .select('*');

      if (error) throw error;

      const formattedTenders: TenderSearchResult[] = data.map(item => ({
        id: item.id,
        projectName: item.project_name,
        projectType: item.project_type,
        location: item.location || 'Non spécifié',
        budget: formatBudget(item.budget),
        surface: 'N/A', // Not in our current data model
        deadline: formatDate(item.deadline),
        status: mapStatus(item.status),
        client: {
          name: 'Client', // We'll need to add this to the database or view
        },
        lots: [], // We'll need another query to get the actual lots
        isFavorite: false,
        createdAt: new Date().toLocaleDateString('fr-FR'),
        description: '',
        progress: item.progress_percentage,
        lotsTotal: item.lots_total,
        lotsAssigned: item.lots_assigned,
        quotesReceived: item.quotes_received,
        actualQuotesReceived: item.actual_quotes_received,
        // Random values for the demo, should be calculated in a real situation
        quoteQuality: getRandomQuoteQuality(),
        budgetRespect: getRandomBudgetRespect()
      }));

      // Fetch lot details for each tender
      for (const tender of formattedTenders) {
        const { data: lotData, error: lotError } = await supabase
          .from('lots')
          .select('*')
          .eq('tender_id', tender.id);
          
        if (!lotError && lotData) {
          tender.lotDetails = lotData.map(lot => ({
            id: lot.id,
            name: lot.name,
            status: mapLotStatus(lot.status),
            quotesReceived: lot.quotes_received || 0,
            quotesRequired: lot.quotes_required || 3,
            assignedTo: lot.assigned_to
          }));
          
          // Update lots array for backward compatibility
          tender.lots = lotData.map(lot => lot.name);
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


import { useState } from 'react';
import { TenderSearchResult } from '@/types/tenders';
import { useToast } from '@/hooks/use-toast';
import { formatBudget, formatDate } from '@/utils/tenderFormatUtils';
import { mapStatus, mapLotStatus, getRandomQuoteQuality, getRandomBudgetRespect } from '@/utils/tenderStatusUtils';
import { mockDataService } from '@/data/mockData';

export function useFetchTenders() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  async function fetchTenders() {
    setIsLoading(true);
    try {
      const data = await mockDataService.fetchTenders();
      
      console.log("Données appels d'offres récupérées:", data);
      
      // Use the data directly without transformation since our mock data is already in the right format
      setError(null);
      setIsLoading(false);
      return data;
      
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

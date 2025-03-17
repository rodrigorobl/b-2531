
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { TenderSearchResult } from '@/types/tenders';
import { useFetchTenders } from './useFetchTenders';

export function useTenderManagement() {
  const [tenders, setTenders] = useState<TenderSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { fetchTenders: fetchTendersData, isLoading: isFetchingTenders } = useFetchTenders();

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    setIsLoading(true);
    try {
      const tenderData = await fetchTendersData();
      setTenders(tenderData);
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
    isLoading: isLoading || isFetchingTenders,
    error,
    fetchTenders
  };
}

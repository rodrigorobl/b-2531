
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TenderSearchResult } from '@/types/tenders';
import { useFetchTenders } from './useFetchTenders';
import { calculateTenderStats } from '@/utils/tenderStatsUtils';

export function useTenderManagement() {
  const [tenders, setTenders] = useState<TenderSearchResult[]>([]);
  const { fetchTenders, isLoading, error } = useFetchTenders();

  // Stats derived from tenders
  const stats = calculateTenderStats(tenders);

  // Refresh tenders function
  const refreshTenders = async () => {
    const tendersData = await fetchTenders();
    setTenders(tendersData);
  };

  // Fetch tenders on mount
  useEffect(() => {
    refreshTenders();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appels_offres'
        },
        () => {
          refreshTenders();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    tenders,
    isLoading,
    error,
    stats,
    refreshTenders
  };
}

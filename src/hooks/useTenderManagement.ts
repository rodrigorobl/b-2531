
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TenderSearchResult, TenderStatus } from '@/types/tenders';
import { useToast } from '@/hooks/use-toast';

export function useTenderManagement() {
  const [tenders, setTenders] = useState<TenderSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Stats derived from tenders
  const stats = {
    activeTenders: tenders.filter(t => t.status === 'open').length,
    assignedLots: tenders.reduce((acc, t) => acc + (t.lotsAssigned || 0), 0),
    receivedQuotes: tenders.reduce((acc, t) => acc + (t.actualQuotesReceived || 0), 0),
    averageQuotes: calculateAverageQuotes(tenders),
  };

  function calculateAverageQuotes(tenders: TenderSearchResult[]): number {
    const totalLots = tenders.reduce((acc, t) => acc + (t.lotsTotal || 0), 0);
    const totalQuotes = tenders.reduce((acc, t) => acc + (t.actualQuotesReceived || 0), 0);
    return totalLots ? parseFloat((totalQuotes / totalLots).toFixed(1)) : 0;
  }

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
  }

  // Helper functions
  function formatBudget(budget: number | null): string {
    if (!budget) return 'Non spécifié';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(budget);
  }

  function formatDate(dateString: string | null): string {
    if (!dateString) return 'Non spécifié';
    
    // Handle different date formats
    let date;
    if (dateString.includes('T')) {
      // ISO format
      date = new Date(dateString);
    } else {
      // Simple date string
      const parts = dateString.split('-');
      date = new Date(
        parseInt(parts[0]), 
        parseInt(parts[1]) - 1, 
        parseInt(parts[2])
      );
    }
    
    return date.toLocaleDateString('fr-FR');
  }

  function mapStatus(status: string | null): TenderStatus {
    if (!status) return 'open';
    
    switch (status.toLowerCase()) {
      case 'ouvert':
        return 'open';
      case 'clôturé':
        return 'closed';
      case 'attribué':
        return 'assigned';
      default:
        return 'open';
    }
  }

  // Random helpers for demo purposes
  function getRandomQuoteQuality(): 'poor' | 'medium' | 'good' {
    const qualities = ['poor', 'medium', 'good'];
    return qualities[Math.floor(Math.random() * qualities.length)] as 'poor' | 'medium' | 'good';
  }

  function getRandomBudgetRespect(): 'under' | 'on-target' | 'over' {
    const budgetRespects = ['under', 'on-target', 'over'];
    return budgetRespects[Math.floor(Math.random() * budgetRespects.length)] as 'under' | 'on-target' | 'over';
  }

  // Fetch tenders on mount
  useEffect(() => {
    fetchTenders();
    
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
          fetchTenders();
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
    refreshTenders: fetchTenders
  };
}

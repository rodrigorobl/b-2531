
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
      // Récupérer d'abord les projets depuis la table 'projets'
      const { data: projetsData, error: projetsError } = await supabase
        .from('projets')
        .select('*');

      if (projetsError) throw projetsError;

      console.log("Projets récupérés:", projetsData);

      // Initialiser un tableau pour stocker tous les appels d'offres
      const formattedTenders: TenderSearchResult[] = [];

      // Pour chaque projet, récupérer ses appels d'offres
      for (const projet of projetsData) {
        const { data: appelsOffresData, error: appelsOffresError } = await supabase
          .from('appels_offres')
          .select('*')
          .eq('projet_id', projet.id);

        if (appelsOffresError) throw appelsOffresError;

        // Transformer chaque appel d'offres en TenderSearchResult
        for (const appel of (appelsOffresData || [])) {
          // Récupérer le nombre de devis pour cet appel d'offres
          const { count: quotesCount, error: quotesError } = await supabase
            .from('devis')
            .select('*', { count: 'exact', head: true })
            .eq('appel_offre_id', appel.id);

          // Récupérer l'entreprise attribuée si elle existe
          let assignedCompanyName = '';
          if (appel.entreprise_attribuee_id) {
            const { data: companyData, error: companyError } = await supabase
              .from('entreprises')
              .select('nom')
              .eq('id', appel.entreprise_attribuee_id)
              .single();
            
            if (!companyError && companyData) {
              assignedCompanyName = companyData.nom;
            }
          }

          formattedTenders.push({
            id: appel.id,
            projectName: projet.nom || 'Projet inconnu',
            projectType: projet.type_projet || 'Type inconnu',
            location: projet.localisation || 'Non spécifié',
            budget: formatBudget(appel.budget),
            surface: 'N/A',
            deadline: formatDate(appel.date_limite),
            status: mapStatus(appel.statut),
            client: {
              name: 'Client', // À compléter avec les données réelles
            },
            lots: [appel.lot],
            isFavorite: false,
            createdAt: new Date().toLocaleDateString('fr-FR'),
            description: appel.description,
            progress: appel.progress || 0,
            lotsTotal: appel.lots_total || 1,
            lotsAssigned: appel.lots_assigned || 0,
            quotesReceived: appel.quotes_received || 0,
            actualQuotesReceived: quotesError ? 0 : (quotesCount || 0),
            quoteQuality: 'medium', // À calculer en fonction des données réelles
            budgetRespect: 'on-target', // À calculer en fonction des données réelles
          });
        }
      }

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

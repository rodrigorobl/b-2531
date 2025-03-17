
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { mockDataService } from '@/data/mockData';

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
      const myTenders = await mockDataService.fetchMyTenders();
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

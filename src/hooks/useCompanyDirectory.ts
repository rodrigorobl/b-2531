
import { useState, useEffect, useCallback } from 'react';
import { Company, CompanyCategory, mapSupabaseCategory } from '@/types/directory';
import { toast } from 'sonner';

// Mock company data
const mockCompanies: Company[] = [
  {
    id: "comp-001",
    name: "BTP Construct",
    logo: "https://github.com/shadcn.png",
    category: "construction",
    specialty: "Gros œuvre",
    location: "Paris",
    address: "12 Avenue des Bâtisseurs, 75001 Paris",
    rating: 4.5,
    reviewCount: 27,
    description: "Entreprise spécialisée en gros œuvre et construction durable",
    coordinates: { lat: 48.8566, lng: 2.3522 },
    contact: {
      phone: "01 23 45 67 89",
      email: "contact@btpconstruct.com",
      website: "www.btpconstruct.com"
    },
    certifications: ["RGE", "Qualibat"]
  },
  {
    id: "comp-002",
    name: "Archi Design",
    logo: "https://github.com/shadcn.png",
    category: "architecte",
    specialty: "Architecture moderne",
    location: "Lyon",
    address: "5 Rue de la Création, 69001 Lyon",
    rating: 4.8,
    reviewCount: 42,
    description: "Cabinet d'architectes spécialisé dans les projets résidentiels et commerciaux",
    coordinates: { lat: 45.7640, lng: 4.8357 },
    contact: {
      phone: "04 78 90 12 34",
      email: "info@archidesign.com",
      website: "www.archidesign.com"
    },
    certifications: ["HMONP"]
  },
  {
    id: "comp-003",
    name: "Ingé Solutions",
    logo: "https://github.com/shadcn.png",
    category: "moe_bet",
    specialty: "Études techniques",
    location: "Marseille",
    address: "18 Boulevard des Ingénieurs, 13008 Marseille",
    rating: 4.3,
    reviewCount: 19,
    description: "Bureau d'études tous corps d'état pour projets complexes",
    coordinates: { lat: 43.2965, lng: 5.3698 },
    contact: {
      phone: "04 91 23 45 67",
      email: "contact@ingesolutions.com",
      website: "www.ingesolutions.com"
    },
    certifications: ["ISO 9001"]
  }
];

interface UseCompanyDirectoryProps {
  searchQuery?: string;
  selectedCategory?: CompanyCategory | null;
}

export default function useCompanyDirectory({ 
  searchQuery = '', 
  selectedCategory = null 
}: UseCompanyDirectoryProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  
  // Use useCallback to avoid recreating this function on every render
  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching companies from mock data...");
      console.log("Selected category:", selectedCategory);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredCompanies = [...mockCompanies];
      
      // Apply category filter if selected
      if (selectedCategory) {
        filteredCompanies = filteredCompanies.filter(company => 
          company.category === selectedCategory
        );
      }
      
      setCompanies(filteredCompanies);
      console.log("Companies data retrieved:", filteredCompanies.length);
      
    } catch (err) {
      console.error('Erreur lors de la récupération des entreprises:', err);
      toast.error('Impossible de charger les données des entreprises');
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Filter companies based on search query
  const filteredCompanies = companies.filter(company => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      company.name.toLowerCase().includes(query) ||
      company.specialty.toLowerCase().includes(query) ||
      company.location.toLowerCase().includes(query)
    );
  });

  return {
    companies: filteredCompanies,
    loading,
    error,
    refetch: fetchCompanies
  };
}

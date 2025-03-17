
import { useState, useEffect, useCallback } from 'react';
import { Company, CompanyCategory, mapSupabaseCategory } from '@/types/directory';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
      console.log("Fetching companies from Supabase...");
      console.log("Selected category:", selectedCategory);
      
      let query = supabase
        .from('entreprises')
        .select('*');

      if (selectedCategory) {
        // Map our internal category to Supabase's format
        let supabaseCategory;
        switch (selectedCategory) {
          case 'architecte': supabaseCategory = 'Architecte'; break;
          case 'moe_bet': supabaseCategory = 'MOE_BET'; break;
          case 'construction': supabaseCategory = 'Construction'; break;
          case 'service': supabaseCategory = 'Service'; break;
          case 'industriel': supabaseCategory = 'Industriel'; break;
          case 'fournisseur': supabaseCategory = 'Fournisseur'; break;
          default: supabaseCategory = null;
        }
        
        if (supabaseCategory) {
          console.log("Filtering by category:", supabaseCategory);
          query = query.eq('categorie_principale', supabaseCategory);
        }
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) {
        console.error("Supabase fetch error:", fetchError);
        throw fetchError;
      }
      
      if (data) {
        console.log("Companies data retrieved:", data.length);
        console.log("Sample company:", data[0]);
        
        const transformedCompanies = data.map(company => {
          // Parse coordinates or use default Paris coordinates
          let coordinates = { lat: 48.8566, lng: 2.3522 }; // Default to Paris
          if (company.coordinates && typeof company.coordinates === 'object') {
            const coords = company.coordinates as any;
            if (coords.lat !== undefined && coords.lng !== undefined) {
              coordinates = {
                lat: Number(coords.lat),
                lng: Number(coords.lng)
              };
            }
          }
          
          // Generate a description if none exists
          const description = company.specialite 
            ? `Entreprise spécialisée en ${company.specialite}`
            : 'Entreprise de construction et services';
          
          return {
            id: company.id,
            name: company.nom || 'Entreprise',
            logo: company.logo || 'https://github.com/shadcn.png',
            category: mapSupabaseCategory(company.categorie_principale),
            specialty: company.specialite || 'Non spécifié',
            location: company.ville || 'Non spécifié',
            address: company.adresse || '',
            rating: company.note_moyenne || 0,
            reviewCount: company.nombre_avis || 0,
            description, // Using the generated description
            coordinates,
            contact: {
              phone: company.telephone || '01 23 45 67 89',
              email: company.email || 'contact@example.com',
              website: company.site_web || 'www.example.com'
            },
            certifications: [] // Default empty array for certifications
          };
        });
        
        setCompanies(transformedCompanies);
      } else {
        console.log("No companies data found");
        setCompanies([]);
      }
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

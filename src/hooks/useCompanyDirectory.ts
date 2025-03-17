
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        console.log("Fetching companies from Supabase...");
        let query = supabase
          .from('entreprises')
          .select('*')
          .order('nom');

        if (selectedCategory) {
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
            query = query.eq('categorie_principale', supabaseCategory);
          }
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        if (data) {
          console.log("Companies data retrieved:", data);
          
          const transformedCompanies = data.map(company => {
            let coordinates = { lat: 48.8566, lng: 2.3522 };
            if (company.coordinates && typeof company.coordinates === 'object') {
              const coords = company.coordinates as any;
              if (coords.lat !== undefined && coords.lng !== undefined) {
                coordinates = {
                  lat: Number(coords.lat),
                  lng: Number(coords.lng)
                };
              }
            }
            
            return {
              id: company.id,
              name: company.nom,
              logo: company.logo || 'https://github.com/shadcn.png',
              category: mapSupabaseCategory(company.categorie_principale),
              specialty: company.specialite,
              location: company.ville || 'Non spécifié',
              address: company.adresse || '',
              rating: company.note_moyenne || 0,
              reviewCount: company.nombre_avis || 0,
              description: `Entreprise spécialisée en ${company.specialite}`,
              coordinates,
              contact: {
                phone: company.telephone || '01 23 45 67 89',
                email: company.email || 'contact@example.com',
                website: company.site_web || 'www.example.com'
              },
              certifications: []
            };
          });
          
          setCompanies(transformedCompanies);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des entreprises:', err);
        toast.error('Impossible de charger les données des entreprises');
        setError('Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanies();
  }, [selectedCategory]);

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
    error
  };
}

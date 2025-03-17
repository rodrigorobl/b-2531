
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import CompanyDirectoryHeader from '@/components/directory/CompanyDirectoryHeader';
import CompanyFilters from '@/components/directory/CompanyFilters';
import CompanyList from '@/components/directory/CompanyList';
import CompanyMap from '@/components/directory/CompanyMap';
import { ViewMode, CompanyCategory, Company } from '@/types/directory';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function CompanyDirectory() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CompanyCategory | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Récupérer les entreprises depuis Supabase
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('entreprises')
          .select('*')
          .order('nom');
        
        if (error) throw error;
        
        if (data) {
          // Transformer les données au format Company
          const transformedCompanies: Company[] = data.map(company => ({
            id: company.id,
            name: company.nom,
            logo: company.logo || 'https://github.com/shadcn.png', // Logo par défaut
            category: company.categorie_principale.toLowerCase() as CompanyCategory,
            specialty: company.specialite,
            location: company.ville || 'Non spécifié',
            address: company.adresse || '',
            rating: company.note_moyenne,
            reviewCount: company.nombre_avis,
            description: `Entreprise spécialisée en ${company.specialite}`,
            coordinates: company.coordinates,
            contact: {
              phone: company.telephone || '01 23 45 67 89',
              email: company.email || 'contact@example.com',
              website: company.site_web || 'www.example.com'
            },
            certifications: []
          }));
          
          setCompanies(transformedCompanies);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des entreprises:', err);
        toast.error('Impossible de charger les données des entreprises');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanies();
  }, []);

  // Filter companies based on search query and selected category
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = searchQuery === '' || 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || company.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CompanyDirectoryHeader 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Filtres (colonne gauche) */}
          <div className="w-64 border-r border-border overflow-y-auto">
            <CompanyFilters 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          
          {/* Contenu principal (colonne centrale + droite) */}
          <div className="flex-1 flex overflow-hidden">
            {/* Liste des entreprises (colonne centrale) */}
            <div className={`${viewMode === 'map' ? 'w-1/2' : 'w-full'} overflow-y-auto`}>
              <CompanyList 
                companies={filteredCompanies} 
                selectedCompany={selectedCompany}
                setSelectedCompany={setSelectedCompany}
              />
            </div>
            
            {/* Carte (colonne droite) - visible uniquement en mode carte */}
            {viewMode === 'map' && (
              <div className="w-1/2 border-l border-border overflow-hidden">
                <CompanyMap 
                  companies={filteredCompanies}
                  selectedCompany={selectedCompany}
                  setSelectedCompany={setSelectedCompany}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

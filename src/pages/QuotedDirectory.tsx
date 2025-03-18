
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import CompanyDirectoryHeader from '@/components/directory/CompanyDirectoryHeader';
import CompanyFilters from '@/components/directory/CompanyFilters';
import QuotedCompanyList from '@/components/quoted-directory/QuotedCompanyList';
import CompanyMap from '@/components/directory/CompanyMap';
import { ViewMode, CompanyCategory, Company } from '@/types/directory';

export default function QuotedDirectory() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CompanyCategory | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  
  // Mock data for companies
  const companies: Company[] = [
    {
      id: '1',
      name: 'Architecture Moderne',
      logo: 'https://github.com/shadcn.png',
      category: 'architecte',
      specialty: 'Logement',
      location: 'Paris',
      address: '15 Rue de la Paix, 75001 Paris',
      rating: 4.8,
      reviewCount: 24,
      description: 'Cabinet d\'architecture spécialisé dans les bâtiments résidentiels modernes et écologiques.',
      coordinates: { lat: 48.8566, lng: 2.3522 },
      contact: {
        phone: '01 23 45 67 89',
        email: 'contact@architecture-moderne.fr',
        website: 'www.architecture-moderne.fr'
      },
      certifications: ['HQE', 'BREEAM']
    },
    {
      id: '2',
      name: 'BET Structure Plus',
      logo: 'https://github.com/shadcn.png',
      category: 'bureau-etudes',
      specialty: 'Bureau de structure',
      location: 'Lyon',
      address: '22 Rue de la République, 69002 Lyon',
      rating: 4.6,
      reviewCount: 18,
      description: 'Bureau d\'études techniques spécialisé dans la conception structurelle de bâtiments complexes.',
      coordinates: { lat: 45.7578, lng: 4.8320 },
      contact: {
        phone: '04 56 78 90 12',
        email: 'contact@structure-plus.fr',
        website: 'www.structure-plus.fr'
      },
      certifications: ['ISO 9001']
    },
    {
      id: '3',
      name: 'Construction Générale',
      logo: 'https://github.com/shadcn.png',
      category: 'construction',
      specialty: 'Gros Œuvre',
      location: 'Marseille',
      address: '5 Boulevard du Littoral, 13008 Marseille',
      rating: 4.3,
      reviewCount: 32,
      description: 'Entreprise de construction spécialisée dans les travaux de gros œuvre pour bâtiments résidentiels et commerciaux.',
      coordinates: { lat: 43.2965, lng: 5.3698 },
      contact: {
        phone: '04 91 23 45 67',
        email: 'contact@construction-generale.fr',
        website: 'www.construction-generale.fr'
      },
      certifications: ['Qualibat']
    },
    {
      id: '4',
      name: 'Services BTP Pro',
      logo: 'https://github.com/shadcn.png',
      category: 'services',
      specialty: 'Location de matériel',
      location: 'Bordeaux',
      address: '10 Cours du Médoc, 33000 Bordeaux',
      rating: 4.5,
      reviewCount: 15,
      description: 'Entreprise spécialisée dans la location de matériel de construction et services sur chantier.',
      coordinates: { lat: 44.8378, lng: -0.5792 },
      contact: {
        phone: '05 56 78 90 12',
        email: 'contact@btp-pro.fr',
        website: 'www.btp-pro.fr'
      },
      certifications: []
    },
    {
      id: '5',
      name: 'Préfabrication Industrielle',
      logo: 'https://github.com/shadcn.png',
      category: 'industriel',
      specialty: 'Escaliers préfabriqués',
      location: 'Nantes',
      address: '8 Rue de l\'Industrie, 44000 Nantes',
      rating: 4.7,
      reviewCount: 22,
      description: 'Fabricant d\'éléments préfabriqués en béton, spécialisé dans les escaliers et garde-corps.',
      coordinates: { lat: 47.2184, lng: -1.5536 },
      contact: {
        phone: '02 40 12 34 56',
        email: 'contact@prefab-ind.fr',
        website: 'www.prefab-ind.fr'
      },
      certifications: ['ISO 14001']
    },
    {
      id: '6',
      name: 'Matériaux Pro',
      logo: 'https://github.com/shadcn.png',
      category: 'fournisseur',
      specialty: 'Produits de construction',
      location: 'Toulouse',
      address: '25 Avenue des Minimes, 31200 Toulouse',
      rating: 4.4,
      reviewCount: 29,
      description: 'Fournisseur de matériaux de construction pour professionnels et particuliers.',
      coordinates: { lat: 43.6047, lng: 1.4442 },
      contact: {
        phone: '05 61 23 45 67',
        email: 'contact@materiaux-pro.fr',
        website: 'www.materiaux-pro.fr'
      },
      certifications: []
    }
  ];

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
              <QuotedCompanyList 
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

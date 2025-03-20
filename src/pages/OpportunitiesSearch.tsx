
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import OpportunitySearchFilters from '@/components/opportunities/OpportunitySearchFilters';
import OpportunitySearchResults from '@/components/opportunities/OpportunitySearchResults';
import OpportunitySearchDetails from '@/components/opportunities/OpportunitySearchDetails';
import OpportunityMap from '@/components/opportunities/OpportunityMap';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BellPlus, BookmarkPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export type OpportunityStatus = 'active' | 'closing-soon' | 'closed';
export type ProjectPhase = 'conception' | 'consultation' | 'travaux';

export interface OpportunitySearchResult {
  id: string;
  projectName: string;
  projectType: string;
  location: {
    region: string;
    departement: string;
    city: string;
    address: string;
    lat: number;
    lng: number;
  };
  budget: {
    total: string;
    mission: string;
  };
  surface: string;
  deadline: string;
  status: OpportunityStatus;
  phase: ProjectPhase;
  client: {
    name: string;
    logo?: string;
  };
  missions: string[];
  applicantsCount: {
    total: number;
    similar: number;
  };
  isFavorite: boolean;
  createdAt: string;
  description: string;
}

export default function OpportunitiesSearch() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [savedFavorites, setSavedFavorites] = useState<string[]>([]);
  
  // Données mockées améliorées pour les opportunités
  const opportunities: OpportunitySearchResult[] = [{
    id: "opp-001",
    projectName: "Centre Commercial Riviera",
    projectType: "Commercial",
    location: {
      region: "Île-de-France",
      departement: "Paris (75)",
      city: "Paris",
      address: "12 Avenue des Champs-Élysées, 75008 Paris",
      lat: 48.8698,
      lng: 2.3075
    },
    budget: {
      total: "25 000 000 €",
      mission: "800 000 €"
    },
    surface: "15 000 m²",
    deadline: "30/08/2023",
    status: "active",
    phase: "conception",
    client: {
      name: "Unibail-Rodamco",
      logo: ""
    },
    missions: ["BET Structure", "BET Fluides", "Acoustique", "Sécurité incendie"],
    applicantsCount: {
      total: 12,
      similar: 3
    },
    isFavorite: false,
    createdAt: "01/07/2023",
    description: "Construction d'un nouveau centre commercial sur 3 niveaux avec parking souterrain et espaces verts en toiture terrasse."
  }, {
    id: "opp-002",
    projectName: "Résidence Les Ormes",
    projectType: "Logements",
    location: {
      region: "Auvergne-Rhône-Alpes",
      departement: "Rhône (69)",
      city: "Lyon",
      address: "25 Rue de la République, 69002 Lyon",
      lat: 45.7640,
      lng: 4.8357
    },
    budget: {
      total: "12 000 000 €",
      mission: "500 000 €"
    },
    surface: "3 500 m²",
    deadline: "15/09/2023",
    status: "active",
    phase: "conception",
    client: {
      name: "Nexity",
      logo: ""
    },
    missions: ["Maîtrise d'Œuvre", "BET Fluides", "OPC", "Économiste"],
    applicantsCount: {
      total: 7,
      similar: 2
    },
    isFavorite: true,
    createdAt: "15/07/2023",
    description: "Ensemble résidentiel de 45 logements avec jardin partagé et local à vélos."
  }, {
    id: "opp-003",
    projectName: "Tour Horizon",
    projectType: "Bureaux",
    location: {
      region: "Pays de la Loire",
      departement: "Loire-Atlantique (44)",
      city: "Nantes",
      address: "3 Boulevard des Horizons, 44000 Nantes",
      lat: 47.2172,
      lng: -1.5533
    },
    budget: {
      total: "80 000 000 €",
      mission: "2 500 000 €"
    },
    surface: "25 000 m²",
    deadline: "10/08/2023",
    status: "closing-soon",
    phase: "consultation",
    client: {
      name: "BNP Paribas Real Estate",
      logo: ""
    },
    missions: ["Conception architecturale", "BET Structure", "BET Fluides"],
    applicantsCount: {
      total: 18,
      similar: 6
    },
    isFavorite: false,
    createdAt: "01/06/2023",
    description: "Immeuble de bureaux de grande hauteur avec certification environnementale HQE."
  }, {
    id: "opp-004",
    projectName: "École Jean Jaurès",
    projectType: "Équipements publics",
    location: {
      region: "Provence-Alpes-Côte d'Azur",
      departement: "Bouches-du-Rhône (13)",
      city: "Marseille",
      address: "15 Rue de la République, 13001 Marseille",
      lat: 43.2965,
      lng: 5.3698
    },
    budget: {
      total: "9 500 000 €",
      mission: "350 000 €"
    },
    surface: "2 800 m²",
    deadline: "25/07/2023",
    status: "closed",
    phase: "travaux",
    client: {
      name: "Ville de Marseille",
      logo: ""
    },
    missions: ["Contrôle technique", "OPC"],
    applicantsCount: {
      total: 5,
      similar: 1
    },
    isFavorite: false,
    createdAt: "15/05/2023",
    description: "Rénovation énergétique d'un groupe scolaire avec mise aux normes d'accessibilité."
  }, {
    id: "opp-005",
    projectName: "Hôtel Bellevue",
    projectType: "Hôtellerie",
    location: {
      region: "Provence-Alpes-Côte d'Azur",
      departement: "Alpes-Maritimes (06)",
      city: "Nice",
      address: "25 Promenade des Anglais, 06000 Nice",
      lat: 43.6947,
      lng: 7.2653
    },
    budget: {
      total: "35 000 000 €",
      mission: "1 200 000 €"
    },
    surface: "8 200 m²",
    deadline: "05/09/2023",
    status: "active",
    phase: "conception",
    client: {
      name: "Groupe Accor",
      logo: ""
    },
    missions: ["Maîtrise d'Œuvre", "Conception architecturale", "BET Structure", "BET Fluides", "Acoustique"],
    applicantsCount: {
      total: 9,
      similar: 4
    },
    isFavorite: true,
    createdAt: "10/07/2023",
    description: "Rénovation complète d'un hôtel de luxe en front de mer."
  }, {
    id: "opp-006",
    projectName: "Campus Universitaire Digital",
    projectType: "Équipements publics",
    location: {
      region: "Nouvelle-Aquitaine",
      departement: "Gironde (33)",
      city: "Bordeaux",
      address: "45 Cours de la Libération, 33400 Bordeaux",
      lat: 44.8378,
      lng: -0.5792
    },
    budget: {
      total: "60 000 000 €",
      mission: "2 200 000 €"
    },
    surface: "18 500 m²",
    deadline: "20/08/2023",
    status: "active",
    phase: "conception",
    client: {
      name: "Ministère de l'Enseignement Supérieur",
      logo: ""
    },
    missions: ["Maîtrise d'Œuvre", "BET Structure", "BET Fluides", "Acoustique", "OPC"],
    applicantsCount: {
      total: 11,
      similar: 3
    },
    isFavorite: false,
    createdAt: "05/07/2023",
    description: "Construction d'un campus universitaire innovant avec espaces d'apprentissage collaboratifs et laboratoires de recherche."
  }];

  const toggleFavorite = (opportunityId: string) => {
    if (savedFavorites.includes(opportunityId)) {
      setSavedFavorites(savedFavorites.filter(id => id !== opportunityId));
    } else {
      setSavedFavorites([...savedFavorites, opportunityId]);
    }
  };

  const filteredOpportunities = opportunities.filter(opportunity => {
    if (selectedTab !== 'all' && opportunity.status !== selectedTab) return false;
    if (searchQuery && !opportunity.projectName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !opportunity.projectType.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !opportunity.location.city.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !opportunity.missions.some(mission => mission.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    return true;
  });

  const handleOpportunitySelect = (opportunityId: string) => {
    setSelectedOpportunity(opportunityId);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Rechercher des Opportunités</h1>
          
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Rechercher par nom, type de projet, lieu, mission..." 
                className="pl-10 pr-4 py-6 text-base" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
              />
              <Button className="absolute right-1 top-1.5 h-9">
                Rechercher
              </Button>
            </div>
            <Link to="/project-alerte">
              <Button variant="outline" className="flex items-center gap-2">
                <BellPlus size={18} />
                <span>Créer une alerte</span>
              </Button>
            </Link>
            <Button variant="outline" className="flex items-center gap-2">
              <BookmarkPlus size={18} />
              <span>Favoris ({savedFavorites.length})</span>
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="active">Actifs</TabsTrigger>
              <TabsTrigger value="closing-soon">Bientôt clôturés</TabsTrigger>
              <TabsTrigger value="closed">Clôturés</TabsTrigger>
            </TabsList>
            
            <div className="flex h-[calc(100vh-230px)]">
              <OpportunitySearchFilters />
              
              {viewMode === 'map' ? (
                <OpportunityMap 
                  opportunities={filteredOpportunities} 
                  onSelectOpportunity={handleOpportunitySelect} 
                  selectedOpportunityId={selectedOpportunity} 
                  onViewModeChange={setViewMode} 
                />
              ) : (
                <OpportunitySearchResults 
                  opportunities={filteredOpportunities} 
                  onSelectOpportunity={handleOpportunitySelect} 
                  selectedOpportunityId={selectedOpportunity} 
                  viewMode={viewMode} 
                  onViewModeChange={setViewMode}
                  onToggleFavorite={toggleFavorite}
                  savedFavorites={savedFavorites}
                />
              )}
              
              <OpportunitySearchDetails 
                opportunity={opportunities.find(o => o.id === selectedOpportunity)} 
                onToggleFavorite={toggleFavorite}
                isFavorite={selectedOpportunity ? savedFavorites.includes(selectedOpportunity) : false}
              />
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

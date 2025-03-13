
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TenderSearchFilters from '@/components/tenders/TenderSearchFilters';
import TenderSearchResults from '@/components/tenders/TenderSearchResults';
import TenderSearchDetails from '@/components/tenders/TenderSearchDetails';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export type TenderStatus = 'open' | 'closed' | 'assigned';

export interface TenderSearchResult {
  id: string;
  projectName: string;
  projectType: string;
  location: string;
  budget: string;
  surface: string;
  deadline: string;
  status: TenderStatus;
  client: {
    name: string;
    logo?: string;
  };
  lots: string[];
  isFavorite: boolean;
  createdAt: string;
  description: string;
}

export default function TenderSearch() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [selectedTender, setSelectedTender] = useState<string | null>(null);
  
  // Sample data
  const tenders: TenderSearchResult[] = [
    {
      id: "search-001",
      projectName: "Centre Commercial Riviera",
      projectType: "Commercial",
      location: "Paris",
      budget: "2 500 000 €",
      surface: "15 000 m²",
      deadline: "30/08/2023",
      status: "open",
      client: {
        name: "Unibail-Rodamco",
        logo: ""
      },
      lots: ["Gros œuvre", "Menuiseries", "Électricité", "CVC"],
      isFavorite: false,
      createdAt: "01/07/2023",
      description: "Construction d'un nouveau centre commercial sur 3 niveaux avec parking souterrain et espaces verts en toiture terrasse."
    },
    {
      id: "search-002",
      projectName: "Résidence Les Ormes",
      projectType: "Logement",
      location: "Lyon",
      budget: "1 200 000 €",
      surface: "3 500 m²",
      deadline: "15/09/2023",
      status: "open",
      client: {
        name: "Nexity",
        logo: ""
      },
      lots: ["Second œuvre", "Plomberie", "Peinture"],
      isFavorite: true,
      createdAt: "15/07/2023",
      description: "Ensemble résidentiel de 45 logements avec jardin partagé et local à vélos."
    },
    {
      id: "search-003",
      projectName: "Tour Horizon",
      projectType: "Tertiaire",
      location: "Nantes",
      budget: "8 000 000 €",
      surface: "25 000 m²",
      deadline: "10/08/2023",
      status: "closed",
      client: {
        name: "BNP Paribas Real Estate",
        logo: ""
      },
      lots: ["Façades", "Ascenseurs", "Sécurité incendie"],
      isFavorite: false,
      createdAt: "01/06/2023",
      description: "Immeuble de bureaux de grande hauteur avec certification environnementale HQE."
    },
    {
      id: "search-004",
      projectName: "École Jean Jaurès",
      projectType: "Public",
      location: "Marseille",
      budget: "950 000 €",
      surface: "2 800 m²",
      deadline: "25/07/2023",
      status: "assigned",
      client: {
        name: "Ville de Marseille",
        logo: ""
      },
      lots: ["Rénovation thermique", "Espaces extérieurs"],
      isFavorite: false,
      createdAt: "15/05/2023",
      description: "Rénovation énergétique d'un groupe scolaire avec mise aux normes d'accessibilité."
    },
    {
      id: "search-005",
      projectName: "Hôtel Bellevue",
      projectType: "Hôtellerie",
      location: "Nice",
      budget: "3 500 000 €",
      surface: "8 200 m²",
      deadline: "05/09/2023",
      status: "open",
      client: {
        name: "Groupe Accor",
        logo: ""
      },
      lots: ["Gros œuvre", "Décoration", "Piscine", "Façades"],
      isFavorite: true,
      createdAt: "10/07/2023",
      description: "Rénovation complète d'un hôtel de luxe en front de mer."
    }
  ];

  const filteredTenders = tenders.filter(tender => {
    // Filter by selected tab (status)
    if (selectedTab !== 'all' && tender.status !== selectedTab) return false;
    
    // Filter by search query
    if (searchQuery && 
        !tender.projectName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tender.projectType.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tender.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tender.lots.some(lot => lot.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    return true;
  });

  const handleTenderSelect = (tenderId: string) => {
    setSelectedTender(tenderId);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Rechercher un Appel d'Offres</h1>
          
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par mot-clé, référence, localisation..."
                className="pl-10 pr-4 py-6 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-1 top-1.5 h-9">
                Rechercher
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="mb-6 w-full grid grid-cols-4">
              <TabsTrigger value="all">Tous les appels d'offres</TabsTrigger>
              <TabsTrigger value="open">En cours</TabsTrigger>
              <TabsTrigger value="closed">Clôturés</TabsTrigger>
              <TabsTrigger value="assigned">Attribués</TabsTrigger>
            </TabsList>
            
            <div className="flex h-[calc(100vh-230px)]">
              {/* Left column: Filters */}
              <TenderSearchFilters />
              
              {/* Middle column: Results */}
              <TenderSearchResults 
                tenders={filteredTenders}
                onSelectTender={handleTenderSelect}
                selectedTenderId={selectedTender}
              />
              
              {/* Right column: Details */}
              <TenderSearchDetails
                tender={tenders.find(t => t.id === selectedTender)}
              />
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

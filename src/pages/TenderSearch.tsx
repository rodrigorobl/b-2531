
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import TenderSearchFilters from '@/components/tenders/TenderSearchFilters';
import TenderSearchResults from '@/components/tenders/TenderSearchResults';
import TenderSearchDetails from '@/components/tenders/TenderSearchDetails';
import TenderMap from '@/components/tenders/TenderMap';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BellRing } from 'lucide-react';

export type TenderStatus = 'open' | 'closed' | 'assigned';
export type TenderType = 'open' | 'restricted';
export type AccessRequestStatus = 'pending' | 'approved' | 'rejected' | null;

export interface TenderSearchResult {
  id: string;
  projectName: string;
  projectType: string;
  location: string;
  deadline: string;
  status: TenderStatus;
  tenderType: TenderType;
  accessRequestStatus: AccessRequestStatus;
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
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');

  const tenders: TenderSearchResult[] = [{
    id: "search-001",
    projectName: "Centre Commercial Riviera",
    projectType: "Commercial",
    location: "Paris",
    deadline: "30/08/2023",
    status: "open",
    tenderType: "open",
    accessRequestStatus: null,
    client: {
      name: "Unibail-Rodamco",
      logo: ""
    },
    lots: ["Gros œuvre", "Menuiseries", "Électricité", "CVC"],
    isFavorite: false,
    createdAt: "01/07/2023",
    description: "Construction d'un nouveau centre commercial sur 3 niveaux avec parking souterrain et espaces verts en toiture terrasse."
  }, {
    id: "search-002",
    projectName: "Résidence Les Ormes",
    projectType: "Logement",
    location: "Lyon",
    deadline: "15/09/2023",
    status: "open",
    tenderType: "restricted",
    accessRequestStatus: "pending",
    client: {
      name: "Nexity",
      logo: ""
    },
    lots: ["Second œuvre", "Plomberie", "Peinture"],
    isFavorite: true,
    createdAt: "15/07/2023",
    description: "Ensemble résidentiel de 45 logements avec jardin partagé et local à vélos."
  }, {
    id: "search-003",
    projectName: "Tour Horizon",
    projectType: "Tertiaire",
    location: "Nantes",
    deadline: "10/08/2023",
    status: "closed",
    tenderType: "restricted",
    accessRequestStatus: "approved",
    client: {
      name: "BNP Paribas Real Estate",
      logo: ""
    },
    lots: ["Façades", "Ascenseurs", "Sécurité incendie"],
    isFavorite: false,
    createdAt: "01/06/2023",
    description: "Immeuble de bureaux de grande hauteur avec certification environnementale HQE."
  }, {
    id: "search-004",
    projectName: "École Jean Jaurès",
    projectType: "Public",
    location: "Marseille",
    deadline: "25/07/2023",
    status: "assigned",
    tenderType: "restricted",
    accessRequestStatus: "rejected",
    client: {
      name: "Ville de Marseille",
      logo: ""
    },
    lots: ["Rénovation thermique", "Espaces extérieurs"],
    isFavorite: false,
    createdAt: "15/05/2023",
    description: "Rénovation énergétique d'un groupe scolaire avec mise aux normes d'accessibilité."
  }, {
    id: "search-005",
    projectName: "Hôtel Bellevue",
    projectType: "Hôtellerie",
    location: "Nice",
    deadline: "05/09/2023",
    status: "open",
    tenderType: "open",
    accessRequestStatus: null,
    client: {
      name: "Groupe Accor",
      logo: ""
    },
    lots: ["Gros œuvre", "Décoration", "Piscine", "Façades"],
    isFavorite: true,
    createdAt: "10/07/2023",
    description: "Rénovation complète d'un hôtel de luxe en front de mer."
  }];

  const filteredTenders = tenders.filter(tender => {
    if (selectedTab !== 'all' && tender.status !== selectedTab) return false;
    if (searchQuery && !tender.projectName.toLowerCase().includes(searchQuery.toLowerCase()) && !tender.projectType.toLowerCase().includes(searchQuery.toLowerCase()) && !tender.location.toLowerCase().includes(searchQuery.toLowerCase()) && !tender.lots.some(lot => lot.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    return true;
  });

  const handleTenderSelect = (tenderId: string) => {
    setSelectedTender(tenderId);
  };

  return <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Rechercher un Appel d'Offres</h1>
          
          <div className="mb-6 flex items-center justify-end">
            <Link to="/alerte-management">
              <Button variant="outline" className="flex items-center gap-2">
                <BellRing size={18} />
                <span>Gérer mes alertes</span>
              </Button>
            </Link>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
            <div className="flex h-[calc(100vh-230px)]">
              <TenderSearchFilters />
              
              {viewMode === 'map' ? <TenderMap tenders={filteredTenders} onSelectTender={handleTenderSelect} selectedTenderId={selectedTender} onViewModeChange={setViewMode} /> : <TenderSearchResults tenders={filteredTenders} onSelectTender={handleTenderSelect} selectedTenderId={selectedTender} viewMode={viewMode} onViewModeChange={setViewMode} />}
              
              <TenderSearchDetails tender={tenders.find(t => t.id === selectedTender)} />
            </div>
          </Tabs>
        </div>
      </div>
    </div>;
}

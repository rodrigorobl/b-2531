import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TenderFiltersSidebar from '@/components/tenders/TenderFiltersSidebar';
import TenderTable from '@/components/tenders/TenderTable';
import TenderDetails from '@/components/tenders/TenderDetails';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Building2, Clock, CheckCircle, Search, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';

export type TenderStatus = 'open' | 'closed' | 'assigned';
export type ParticipationStatus = 'to-submit' | 'pending' | 'approved' | 'rejected';

export interface Tender {
  id: string;
  projectName: string;
  lots: string[];
  status: TenderStatus;
  participationStatus: ParticipationStatus;
  deadline: string;
  location: string;
  projectType: string;
  createdAt: string;
  description: string;
  estimatedValue: string;
  isFavorite?: boolean;
}

export default function TenderOffers() {
  const [selectedTab, setSelectedTab] = useState<string>('open');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTender, setSelectedTender] = useState<string | null>(null);
  
  // Sample data
  const tenders: Tender[] = [
    {
      id: "tender-001",
      projectName: "Résidence Les Coteaux",
      lots: ["Gros œuvre", "Menuiseries"],
      status: "open" as const,
      participationStatus: "to-submit" as const,
      deadline: "15/06/2023",
      location: "Lyon",
      projectType: "Logement",
      createdAt: "01/05/2023",
      description: "Construction d'une résidence de 45 appartements sur 5 étages",
      estimatedValue: "780 000 €",
      isFavorite: true
    },
    {
      id: "tender-002",
      projectName: "Centre Commercial Atlantis",
      lots: ["Electricité", "Plomberie"],
      status: "open" as const,
      participationStatus: "pending" as const,
      deadline: "20/06/2023",
      location: "Nantes",
      projectType: "Commercial",
      createdAt: "05/05/2023",
      description: "Rénovation de l'espace central du centre commercial",
      estimatedValue: "450 000 €"
    },
    {
      id: "tender-003",
      projectName: "Ecole Primaire Jean Moulin",
      lots: ["Second œuvre", "Peinture"],
      status: "closed" as const,
      participationStatus: "rejected" as const,
      deadline: "10/04/2023",
      location: "Marseille",
      projectType: "Public",
      createdAt: "15/03/2023",
      description: "Réhabilitation de l'école primaire, mise aux normes PMR",
      estimatedValue: "320 000 €"
    },
    {
      id: "tender-004",
      projectName: "Immeuble de bureaux Le Triangle",
      lots: ["Structure métallique", "Façades"],
      status: "assigned" as const,
      participationStatus: "approved" as const,
      deadline: "02/03/2023",
      location: "Paris",
      projectType: "Tertiaire",
      createdAt: "15/01/2023",
      description: "Construction d'un immeuble de bureaux éco-responsable",
      estimatedValue: "1 200 000 €"
    },
    {
      id: "tender-005",
      projectName: "Hôtel Bellevue",
      lots: ["Menuiseries", "Sols"],
      status: "open" as const,
      participationStatus: "to-submit" as const,
      deadline: "30/07/2023",
      location: "Nice",
      projectType: "Hôtellerie",
      createdAt: "01/06/2023",
      description: "Rénovation complète d'un hôtel 4 étoiles en front de mer",
      estimatedValue: "950 000 €"
    },
  ];

  const filteredTenders = tenders.filter(tender => {
    // Filter by selected tab (status)
    if (selectedTab === 'favorites' && !tender.isFavorite) return false;
    if (selectedTab !== 'all' && selectedTab !== 'favorites' && tender.status !== selectedTab) return false;
    
    // Filter by search query
    if (searchQuery && 
        !tender.projectName.toLowerCase().includes(searchQuery.toLowerCase()) &&
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
          <h1 className="text-2xl font-bold mb-6">Mes Appels d'Offres</h1>
          
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher un appel d'offres..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="open" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="mb-6 w-full grid grid-cols-5">
              <TabsTrigger value="open" className="flex gap-2 items-center">
                <Clock size={16} />
                <span>En cours</span>
              </TabsTrigger>
              <TabsTrigger value="closed" className="flex gap-2 items-center">
                <Building2 size={16} />
                <span>Clôturés</span>
              </TabsTrigger>
              <TabsTrigger value="assigned" className="flex gap-2 items-center">
                <CheckCircle size={16} />
                <span>Attribués</span>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex gap-2 items-center">
                <Star size={16} />
                <span>Favoris</span>
              </TabsTrigger>
              <TabsTrigger value="all">Tous</TabsTrigger>
            </TabsList>
            
            <div className="flex h-[calc(100vh-230px)]">
              {/* Left column: Filters */}
              <TenderFiltersSidebar />
              
              {/* Middle column: Tenders table */}
              <div className="flex-1 bg-white rounded-lg shadow-sm mr-4 overflow-auto">
                <TabsContent value="open" className="m-0 h-full">
                  <TenderTable 
                    tenders={filteredTenders.filter(t => t.status === 'open')} 
                    onSelectTender={handleTenderSelect}
                    selectedTenderId={selectedTender}
                  />
                </TabsContent>
                <TabsContent value="closed" className="m-0 h-full">
                  <TenderTable 
                    tenders={filteredTenders.filter(t => t.status === 'closed')} 
                    onSelectTender={handleTenderSelect}
                    selectedTenderId={selectedTender}
                  />
                </TabsContent>
                <TabsContent value="assigned" className="m-0 h-full">
                  <TenderTable 
                    tenders={filteredTenders.filter(t => t.status === 'assigned')} 
                    onSelectTender={handleTenderSelect}
                    selectedTenderId={selectedTender}
                  />
                </TabsContent>
                <TabsContent value="favorites" className="m-0 h-full">
                  <TenderTable 
                    tenders={filteredTenders.filter(t => t.isFavorite)} 
                    onSelectTender={handleTenderSelect}
                    selectedTenderId={selectedTender}
                  />
                </TabsContent>
                <TabsContent value="all" className="m-0 h-full">
                  <TenderTable 
                    tenders={filteredTenders} 
                    onSelectTender={handleTenderSelect}
                    selectedTenderId={selectedTender}
                  />
                </TabsContent>
              </div>
              
              {/* Right column: Tender details */}
              <TenderDetails 
                tender={tenders.find(t => t.id === selectedTender)} 
              />
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

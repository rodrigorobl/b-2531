
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BellPlus } from 'lucide-react';

import ServicesTenderFilters from '@/components/services-tender/ServicesTenderFilters';
import ServicesTenderResults from '@/components/services-tender/ServicesTenderResults';
import ServicesTenderDetails from '@/components/services-tender/ServicesTenderDetails';

export type ServiceTenderStatus = 'open' | 'closed' | 'upcoming';
export type ConsultationMode = 'public' | 'private' | 'invited';
export type TenderOrigin = 'promoteur' | 'moe' | 'eg';

export interface ServiceTenderSearchResult {
  id: string;
  projectName: string;
  serviceType: string;
  location: string;
  budget: string;
  estimatedAmount: number;
  status: ServiceTenderStatus;
  deadline: string;
  consultationMode: ConsultationMode;
  clientName: string;
  clientType: TenderOrigin;
  competitors: number;
  isFavorite: boolean;
  createdAt: string;
  description: string;
  viewed: boolean;
  responded: boolean;
  assignedTo?: string;
}

export default function ServicesTenderSearch() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTender, setSelectedTender] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Mock data for services tenders
  const tenders: ServiceTenderSearchResult[] = [
    {
      id: "service-001",
      projectName: "Étude thermique - Résidence Les Ormes",
      serviceType: "Étude thermique",
      location: "Lyon",
      budget: "12 000 €",
      estimatedAmount: 12000,
      status: "open",
      deadline: "20/06/2024",
      consultationMode: "public",
      clientName: "Nexity",
      clientType: "promoteur",
      competitors: 3,
      isFavorite: false,
      createdAt: "01/05/2024",
      description: "Étude thermique réglementaire pour un ensemble de 45 logements avec objectif RT2020.",
      viewed: true,
      responded: false
    },
    {
      id: "service-002",
      projectName: "Étude de sol - Centre Commercial Riviera",
      serviceType: "Géotechnique",
      location: "Paris",
      budget: "8 500 €",
      estimatedAmount: 8500,
      status: "open",
      deadline: "15/06/2024",
      consultationMode: "private",
      clientName: "Unibail-Rodamco",
      clientType: "promoteur",
      competitors: 2,
      isFavorite: true,
      createdAt: "28/04/2024",
      description: "Étude de sol G2 pour la construction d'un centre commercial.",
      viewed: false,
      responded: false
    },
    {
      id: "service-003",
      projectName: "Coordination SPS - Tour Horizon",
      serviceType: "Coordination SPS",
      location: "Nantes",
      budget: "18 000 €",
      estimatedAmount: 18000,
      status: "upcoming",
      deadline: "01/07/2024",
      consultationMode: "invited",
      clientName: "Eiffage Construction",
      clientType: "eg",
      competitors: 0,
      isFavorite: false,
      createdAt: "05/05/2024",
      description: "Mission de coordination SPS pour la construction d'une tour de bureaux de 25 000 m².",
      viewed: false,
      responded: false
    },
    {
      id: "service-004",
      projectName: "Diagnostic amiante - École Jean Jaurès",
      serviceType: "Diagnostic amiante",
      location: "Marseille",
      budget: "5 000 €",
      estimatedAmount: 5000,
      status: "closed",
      deadline: "10/05/2024",
      consultationMode: "public",
      clientName: "Ville de Marseille",
      clientType: "moe",
      competitors: 4,
      isFavorite: false,
      createdAt: "15/04/2024",
      description: "Diagnostic amiante avant travaux pour la rénovation d'un groupe scolaire.",
      viewed: true,
      responded: true
    },
    {
      id: "service-005",
      projectName: "Étude acoustique - Hôtel Bellevue",
      serviceType: "Acoustique",
      location: "Nice",
      budget: "9 500 €",
      estimatedAmount: 9500,
      status: "open",
      deadline: "25/06/2024",
      consultationMode: "private",
      clientName: "Groupe Accor",
      clientType: "promoteur",
      competitors: 1,
      isFavorite: true,
      createdAt: "02/05/2024",
      description: "Étude acoustique pour la rénovation d'un hôtel de luxe en front de mer.",
      viewed: true,
      responded: false,
      assignedTo: "Sophie Martin"
    }
  ];

  const filteredTenders = tenders.filter(tender => {
    if (searchQuery && !tender.projectName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !tender.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !tender.location.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !tender.clientName.toLowerCase().includes(searchQuery.toLowerCase())) {
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
          <h1 className="text-2xl font-bold mb-6">Rechercher un Appel d'Offres Services</h1>
          
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Rechercher par mot-clé, service, localisation..." 
                className="pl-10 pr-4 py-6 text-base" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
              />
              <Button className="absolute right-1 top-1.5 h-9">
                Rechercher
              </Button>
            </div>
            <Link to="/tender-alert">
              <Button variant="outline" className="flex items-center gap-2">
                <BellPlus size={18} />
                <span>Créer une alerte</span>
              </Button>
            </Link>
          </div>
          
          <div className="flex h-[calc(100vh-230px)]">
            <ServicesTenderFilters />
            
            <ServicesTenderResults 
              tenders={filteredTenders} 
              onSelectTender={handleTenderSelect} 
              selectedTenderId={selectedTender} 
              viewMode={viewMode} 
              onViewModeChange={setViewMode} 
            />
            
            <ServicesTenderDetails 
              tender={tenders.find(t => t.id === selectedTender)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

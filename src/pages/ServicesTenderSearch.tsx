
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
      projectName: "Location de conteneurs de stockage - Chantier Les Ormes",
      serviceType: "LOCATION DE LOCAUX DE STOCKAGE",
      location: "Lyon",
      budget: "15 000 €",
      estimatedAmount: 15000,
      status: "open",
      deadline: "20/06/2024",
      consultationMode: "public",
      clientName: "Nexity",
      clientType: "promoteur",
      competitors: 3,
      isFavorite: false,
      createdAt: "01/05/2024",
      description: "Location de 5 conteneurs de stockage sécurisés pendant 18 mois pour un chantier de construction de 45 logements.",
      viewed: true,
      responded: false
    },
    {
      id: "service-002",
      projectName: "Photographie promotionnelle - Centre Commercial Riviera",
      serviceType: "SERVICES DE PHOTOGRAPHIE ET VIDÉO PROMOTIONNELLE",
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
      description: "Réalisation de photos et vidéos promotionnelles pour la commercialisation d'un centre commercial en fin de construction.",
      viewed: false,
      responded: false
    },
    {
      id: "service-003",
      projectName: "Suivi photographique de chantier - Tour Horizon",
      serviceType: "PHOTOGRAPHE DE CHANTIER",
      location: "Nantes",
      budget: "12 000 €",
      estimatedAmount: 12000,
      status: "upcoming",
      deadline: "01/07/2024",
      consultationMode: "invited",
      clientName: "Eiffage Construction",
      clientType: "eg",
      competitors: 0,
      isFavorite: false,
      createdAt: "05/05/2024",
      description: "Suivi photographique bimensuel d'un chantier de construction d'une tour de bureaux sur une durée de 24 mois.",
      viewed: false,
      responded: false
    },
    {
      id: "service-004",
      projectName: "Prises de vues aériennes - Résidence Le Parc",
      serviceType: "PILOTE DE DRONE POUR VUES AÉRIENNES",
      location: "Marseille",
      budget: "5 000 €",
      estimatedAmount: 5000,
      status: "closed",
      deadline: "10/05/2024",
      consultationMode: "public",
      clientName: "Bouygues Immobilier",
      clientType: "promoteur",
      competitors: 4,
      isFavorite: false,
      createdAt: "15/04/2024",
      description: "Réalisation de prises de vues aériennes par drone pour suivi de chantier et communication promotionnelle.",
      viewed: true,
      responded: true
    },
    {
      id: "service-005",
      projectName: "Home staging pour appartements témoins",
      serviceType: "SERVICES D'AMÉNAGEMENT INTÉRIEUR ET HOME STAGING",
      location: "Nice",
      budget: "18 500 €",
      estimatedAmount: 18500,
      status: "open",
      deadline: "25/06/2024",
      consultationMode: "private",
      clientName: "Vinci Immobilier",
      clientType: "promoteur",
      competitors: 1,
      isFavorite: true,
      createdAt: "02/05/2024",
      description: "Aménagement et décoration de 3 appartements témoins pour un programme immobilier de standing en bord de mer.",
      viewed: true,
      responded: false,
      assignedTo: "Sophie Martin"
    },
    {
      id: "service-006",
      projectName: "Organisation de visites pour clients VIP",
      serviceType: "ORGANISATION DE VISITES DE CHANTIER POUR LES CLIENTS",
      location: "Bordeaux",
      budget: "9 800 €",
      estimatedAmount: 9800,
      status: "open",
      deadline: "18/06/2024",
      consultationMode: "invited",
      clientName: "Kaufman & Broad",
      clientType: "promoteur",
      competitors: 2,
      isFavorite: false,
      createdAt: "29/04/2024",
      description: "Organisation de visites sécurisées du chantier pour les clients acquéreurs avec aménagement d'un espace d'accueil temporaire.",
      viewed: false,
      responded: false
    },
    {
      id: "service-007",
      projectName: "Campagne marketing sur site - Résidences Les Jardins",
      serviceType: "SERVICES DE MARKETING SUR LE CHANTIER",
      location: "Lille",
      budget: "22 000 €",
      estimatedAmount: 22000,
      status: "upcoming",
      deadline: "10/07/2024",
      consultationMode: "public",
      clientName: "Icade",
      clientType: "promoteur",
      competitors: 0,
      isFavorite: false,
      createdAt: "10/05/2024",
      description: "Mise en place d'une campagne marketing complète sur le site du chantier : signalétique, panneaux d'information, supports de communication.",
      viewed: false,
      responded: false
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

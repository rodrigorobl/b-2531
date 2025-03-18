
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger,
  TabsContent
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Clock, 
  Calendar, 
  CheckCircle, 
  Archive, 
  Filter, 
  Users,
  Plus,
  ArrowUpDown
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { TenderManagementTable, Tender, TenderStatus } from '@/components/tenders/TenderManagementTable';
import { renderStatusBadge } from '@/components/tenders/TenderManagementUtils';

// Add project type to Tender interface
interface ExtendedTender extends Tender {
  projectType: 'conception' | 'realisation' | 'services';
}

export default function TenderList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const statusFilter = searchParams.get('status');
  
  const [activeTab, setActiveTab] = useState<string>(statusFilter || 'open');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<string>('closingDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (statusFilter) {
      setActiveTab(statusFilter);
    }
  }, [statusFilter]);

  // Sample data with project type added
  const tenders: ExtendedTender[] = [
    {
      id: "tender-001",
      projectName: "Résidence Les Jardins",
      lotName: "Gros œuvre",
      status: "open",
      closingDate: "25/07/2023",
      receivedOffers: 4,
      budget: "850 000 €",
      clientName: "Nexity",
      projectType: "realisation"
    },
    {
      id: "tender-002",
      projectName: "Centre Commercial Horizon",
      lotName: "Électricité",
      status: "open",
      closingDate: "30/07/2023",
      receivedOffers: 2,
      budget: "420 000 €",
      clientName: "Unibail-Rodamco",
      projectType: "realisation"
    },
    {
      id: "tender-003",
      projectName: "École Maternelle Les Petits",
      lotName: "Second œuvre",
      status: "closed",
      closingDate: "10/05/2023",
      receivedOffers: 6,
      budget: "290 000 €",
      clientName: "Ville de Lyon",
      projectType: "realisation"
    },
    {
      id: "tender-004",
      projectName: "Immeuble de bureaux Crystal",
      lotName: "Façades",
      status: "assigned",
      closingDate: "15/04/2023",
      receivedOffers: 5,
      budget: "1 100 000 €",
      clientName: "BNP Paribas Real Estate",
      projectType: "realisation"
    },
    {
      id: "tender-005",
      projectName: "Résidence Seniors Les Oliviers",
      lotName: "Menuiseries",
      status: "open",
      closingDate: "12/08/2023",
      receivedOffers: 1,
      budget: "780 000 €",
      clientName: "Groupe ORPEA",
      projectType: "realisation"
    },
    {
      id: "tender-006",
      projectName: "Centre Aquatique Municipal",
      lotName: "Structure métallique",
      status: "closed",
      closingDate: "20/05/2023",
      receivedOffers: 3,
      budget: "1 600 000 €",
      clientName: "Mairie de Nantes",
      projectType: "realisation"
    },
    // Additional tender offers
    {
      id: "tender-007",
      projectName: "Hôpital Universitaire",
      lotName: "Conception architecturale",
      status: "open",
      closingDate: "18/08/2023",
      receivedOffers: 7,
      budget: "1 250 000 €",
      clientName: "CHU de Lille",
      projectType: "conception"
    },
    {
      id: "tender-008",
      projectName: "Complexe Sportif Olympique",
      lotName: "Conception technique",
      status: "open",
      closingDate: "22/07/2023",
      receivedOffers: 6,
      budget: "980 000 €",
      clientName: "Ville de Paris",
      projectType: "conception"
    },
    {
      id: "tender-009",
      projectName: "Bibliothèque Nationale",
      lotName: "Études structurelles",
      status: "closed",
      closingDate: "05/05/2023",
      receivedOffers: 4,
      budget: "720 000 €",
      clientName: "Ministère de la Culture",
      projectType: "conception"
    },
    {
      id: "tender-010",
      projectName: "Tour de bureaux La Défense",
      lotName: "Conception façades",
      status: "assigned",
      closingDate: "10/03/2023",
      receivedOffers: 8,
      budget: "2 300 000 €",
      clientName: "Groupe Vinci",
      projectType: "conception"
    },
    {
      id: "tender-011",
      projectName: "Aéroport International",
      lotName: "Services d'ingénierie",
      status: "open",
      closingDate: "01/09/2023",
      receivedOffers: 5,
      budget: "3 100 000 €",
      clientName: "Aéroports de Paris",
      projectType: "services"
    },
    {
      id: "tender-012",
      projectName: "Campus Universitaire",
      lotName: "Études environnementales",
      status: "closed",
      closingDate: "15/04/2023",
      receivedOffers: 3,
      budget: "450 000 €",
      clientName: "Université de Bordeaux",
      projectType: "services"
    },
    {
      id: "tender-013",
      projectName: "Centre de Recherche",
      lotName: "Acoustique",
      status: "assigned",
      closingDate: "20/02/2023",
      receivedOffers: 4,
      budget: "380 000 €",
      clientName: "CNRS",
      projectType: "services"
    },
    {
      id: "tender-014",
      projectName: "Hôtel 5 Étoiles Riviera",
      lotName: "CVC",
      status: "open",
      closingDate: "10/09/2023",
      receivedOffers: 2,
      budget: "1 800 000 €",
      clientName: "Groupe Accor",
      projectType: "realisation"
    },
    {
      id: "tender-015",
      projectName: "Stade Municipal",
      lotName: "Éclairage",
      status: "open",
      closingDate: "05/08/2023",
      receivedOffers: 3,
      budget: "950 000 €",
      clientName: "Ville de Marseille",
      projectType: "realisation"
    },
    {
      id: "tender-016",
      projectName: "Musée d'Art Contemporain",
      lotName: "Conception muséographique",
      status: "assigned",
      closingDate: "12/01/2023",
      receivedOffers: 9,
      budget: "1 750 000 €",
      clientName: "Fondation des Arts",
      projectType: "conception"
    },
    {
      id: "tender-017",
      projectName: "Quartier Écologique",
      lotName: "Études environnementales",
      status: "open",
      closingDate: "28/07/2023",
      receivedOffers: 4,
      budget: "680 000 €",
      clientName: "Ville de Grenoble",
      projectType: "services"
    },
    {
      id: "tender-018",
      projectName: "Centre Commercial Grand Est",
      lotName: "Plomberie",
      status: "closed",
      closingDate: "02/04/2023",
      receivedOffers: 5,
      budget: "520 000 €",
      clientName: "Klépierre",
      projectType: "realisation"
    }
  ];

  // Filter and sort tenders
  const filteredTenders = tenders
    .filter(tender => {
      // Filter by status (tab)
      if (activeTab !== 'all' && tender.status !== activeTab) return false;
      
      // Filter by search query
      if (searchQuery && 
          !tender.projectName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !tender.lotName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortField === 'projectName') {
        return sortDirection === 'asc' 
          ? a.projectName.localeCompare(b.projectName)
          : b.projectName.localeCompare(a.projectName);
      } else if (sortField === 'receivedOffers') {
        return sortDirection === 'asc' 
          ? a.receivedOffers - b.receivedOffers
          : b.receivedOffers - a.receivedOffers;
      } else if (sortField === 'budget') {
        const aBudget = parseInt(a.budget.replace(/[^\d]/g, ''));
        const bBudget = parseInt(b.budget.replace(/[^\d]/g, ''));
        return sortDirection === 'asc' ? aBudget - bBudget : bBudget - aBudget;
      } else {
        // Default sort by closing date
        const aDate = new Date(a.closingDate.split('/').reverse().join('-'));
        const bDate = new Date(b.closingDate.split('/').reverse().join('-'));
        return sortDirection === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
      }
    });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Function to get project type label
  const getProjectTypeLabel = (type: string) => {
    switch (type) {
      case 'conception':
        return 'Conception';
      case 'realisation':
        return 'Réalisation';
      case 'services':
        return 'Services';
      default:
        return type;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Liste des Appels d'Offres</h1>
          
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Rechercher un appel d'offres..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button asChild>
              <Link to="/create-tender">
                <Plus size={16} className="mr-1" />
                Nouvel appel d'offres
              </Link>
            </Button>
          </div>
          
          <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-4 mb-6">
              <TabsTrigger value="open" className="flex gap-2 items-center">
                <Clock size={16} />
                <span>En cours</span>
              </TabsTrigger>
              <TabsTrigger value="closed" className="flex gap-2 items-center">
                <Archive size={16} />
                <span>Clôturés</span>
              </TabsTrigger>
              <TabsTrigger value="assigned" className="flex gap-2 items-center">
                <CheckCircle size={16} />
                <span>Attribués</span>
              </TabsTrigger>
              <TabsTrigger value="all">Tous</TabsTrigger>
            </TabsList>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>Appels d'offres ({filteredTenders.length})</span>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter size={14} />
                    <span>Filtres avancés</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TabsContent value="open" className="m-0">
                  <ExtendedTenderManagementTable 
                    tenders={filteredTenders} 
                    renderStatusBadge={renderStatusBadge}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                    getProjectTypeLabel={getProjectTypeLabel}
                  />
                </TabsContent>
                <TabsContent value="closed" className="m-0">
                  <ExtendedTenderManagementTable 
                    tenders={filteredTenders} 
                    renderStatusBadge={renderStatusBadge}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                    getProjectTypeLabel={getProjectTypeLabel}
                  />
                </TabsContent>
                <TabsContent value="assigned" className="m-0">
                  <ExtendedTenderManagementTable 
                    tenders={filteredTenders} 
                    renderStatusBadge={renderStatusBadge}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                    getProjectTypeLabel={getProjectTypeLabel}
                  />
                </TabsContent>
                <TabsContent value="all" className="m-0">
                  <ExtendedTenderManagementTable 
                    tenders={filteredTenders} 
                    renderStatusBadge={renderStatusBadge}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                    getProjectTypeLabel={getProjectTypeLabel}
                  />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Extended Table Component with Type column
interface ExtendedTenderManagementTableProps {
  tenders: ExtendedTender[];
  renderStatusBadge: (status: TenderStatus) => React.ReactNode;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  handleSort: (field: string) => void;
  getProjectTypeLabel: (type: string) => string;
}

function ExtendedTenderManagementTable({ 
  tenders, 
  renderStatusBadge,
  sortField,
  sortDirection,
  handleSort,
  getProjectTypeLabel
}: ExtendedTenderManagementTableProps) {
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-medium cursor-pointer" onClick={() => handleSort('projectName')}>
              <div className="flex items-center gap-1">
                Projet 
                {sortField === 'projectName' && (
                  <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
                )}
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">Lot</th>
            <th className="py-3 px-4 text-left font-medium">Type</th>
            <th className="py-3 px-4 text-left font-medium cursor-pointer" onClick={() => handleSort('receivedOffers')}>
              <div className="flex items-center gap-1">
                <Users size={14} className="mr-1" />
                Offres 
                {sortField === 'receivedOffers' && (
                  <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
                )}
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">Statut</th>
            <th className="py-3 px-4 text-left font-medium cursor-pointer" onClick={() => handleSort('closingDate')}>
              <div className="flex items-center gap-1">
                <Calendar size={14} className="mr-1" />
                Date limite 
                {sortField === 'closingDate' && (
                  <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
                )}
              </div>
            </th>
            <th className="py-3 px-4 text-right font-medium cursor-pointer" onClick={() => handleSort('budget')}>
              <div className="flex items-center gap-1 justify-end">
                Budget 
                {sortField === 'budget' && (
                  <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
                )}
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-10 text-muted-foreground">
                Aucun appel d'offres ne correspond à vos critères
              </td>
            </tr>
          ) : (
            tenders.map((tender) => (
              <tr key={tender.id} className="hover:bg-muted/50 border-b">
                <td className="py-3 px-4">
                  <div className="font-medium">{tender.projectName}</div>
                  <div className="text-xs text-muted-foreground">{tender.clientName}</div>
                </td>
                <td className="py-3 px-4">{tender.lotName}</td>
                <td className="py-3 px-4">{getProjectTypeLabel(tender.projectType)}</td>
                <td className="py-3 px-4">{tender.receivedOffers}</td>
                <td className="py-3 px-4">{renderStatusBadge(tender.status)}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    {tender.status === 'open' ? (
                      <Clock size={14} className="text-amber-500" />
                    ) : (
                      <CheckCircle size={14} className="text-green-600" />
                    )}
                    <span>{tender.closingDate}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right font-medium">{tender.budget}</td>
                <td className="py-3 px-4">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/tender/${tender.id}/lot/${tender.id}`}>
                      Détails
                    </Link>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

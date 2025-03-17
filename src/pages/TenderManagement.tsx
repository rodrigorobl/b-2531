
import React, { useState } from 'react';
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
  Users 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TenderManagementTable, Tender, TenderStatus } from '@/components/tenders/TenderManagementTable';
import { renderStatusBadge } from '@/components/tenders/TenderManagementUtils';

export default function TenderManagement() {
  const [activeTab, setActiveTab] = useState<string>('open');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<string>('closingDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Sample data
  const tenders: Tender[] = [
    {
      id: "tender-001",
      projectName: "Résidence Les Coteaux",
      lotName: "Gros œuvre",
      status: "open",
      closingDate: "15/06/2023",
      receivedOffers: 3,
      budget: "780 000 €",
      clientName: "Nexity"
    },
    {
      id: "tender-002",
      projectName: "Centre Commercial Atlantis",
      lotName: "Électricité",
      status: "open",
      closingDate: "20/06/2023",
      receivedOffers: 2,
      budget: "450 000 €",
      clientName: "Unibail-Rodamco"
    },
    {
      id: "tender-003",
      projectName: "École Primaire Jean Moulin",
      lotName: "Second œuvre",
      status: "closed",
      closingDate: "10/04/2023",
      receivedOffers: 5,
      budget: "320 000 €",
      clientName: "Ville de Marseille"
    },
    {
      id: "tender-004",
      projectName: "Immeuble de bureaux Le Triangle",
      lotName: "Façades",
      status: "assigned",
      closingDate: "02/03/2023",
      receivedOffers: 4,
      budget: "1 200 000 €",
      clientName: "BNP Paribas Real Estate"
    },
    {
      id: "tender-005",
      projectName: "Hôtel Bellevue",
      lotName: "Menuiseries",
      status: "open",
      closingDate: "30/07/2023",
      receivedOffers: 0,
      budget: "950 000 €",
      clientName: "Groupe Accor"
    },
    {
      id: "tender-006",
      projectName: "Centre Sportif Olympe",
      lotName: "Structure métallique",
      status: "closed",
      closingDate: "05/05/2023",
      receivedOffers: 6,
      budget: "1 500 000 €",
      clientName: "Mairie de Lyon"
    },
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

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Gestion des Appels d'Offres</h1>
          
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
                Nouveau appel d'offres
              </Link>
            </Button>
          </div>
          
          <Tabs defaultValue="open" className="w-full" onValueChange={setActiveTab}>
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
                  <TenderManagementTable 
                    tenders={filteredTenders} 
                    renderStatusBadge={renderStatusBadge}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                  />
                </TabsContent>
                <TabsContent value="closed" className="m-0">
                  <TenderManagementTable 
                    tenders={filteredTenders} 
                    renderStatusBadge={renderStatusBadge}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                  />
                </TabsContent>
                <TabsContent value="assigned" className="m-0">
                  <TenderManagementTable 
                    tenders={filteredTenders} 
                    renderStatusBadge={renderStatusBadge}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                  />
                </TabsContent>
                <TabsContent value="all" className="m-0">
                  <TenderManagementTable 
                    tenders={filteredTenders} 
                    renderStatusBadge={renderStatusBadge}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
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

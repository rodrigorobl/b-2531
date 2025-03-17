
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger,
  TabsContent
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Clock, 
  Calendar, 
  CheckCircle, 
  Archive, 
  Users, 
  Filter, 
  ArrowUpDown 
} from 'lucide-react';
import { Link } from 'react-router-dom';

type TenderStatus = 'open' | 'closed' | 'assigned';

interface Tender {
  id: string;
  projectName: string;
  lotName: string;
  status: TenderStatus;
  closingDate: string;
  receivedOffers: number;
  budget: string;
  clientName: string;
}

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

  // Helper function to render the status badge
  const renderStatusBadge = (status: TenderStatus) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-amber-500">En cours</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">Clôturé</Badge>;
      case 'assigned':
        return <Badge className="bg-green-600">Attribué</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
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
                  <TenderTable 
                    tenders={filteredTenders} 
                    renderStatusBadge={renderStatusBadge}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                  />
                </TabsContent>
                <TabsContent value="closed" className="m-0">
                  <TenderTable 
                    tenders={filteredTenders} 
                    renderStatusBadge={renderStatusBadge}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                  />
                </TabsContent>
                <TabsContent value="assigned" className="m-0">
                  <TenderTable 
                    tenders={filteredTenders} 
                    renderStatusBadge={renderStatusBadge}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                  />
                </TabsContent>
                <TabsContent value="all" className="m-0">
                  <TenderTable 
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

interface TenderTableProps {
  tenders: Tender[];
  renderStatusBadge: (status: TenderStatus) => React.ReactNode;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  handleSort: (field: string) => void;
}

function TenderTable({ 
  tenders, 
  renderStatusBadge,
  sortField,
  sortDirection,
  handleSort
}: TenderTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead 
            className="cursor-pointer" 
            onClick={() => handleSort('projectName')}
          >
            <div className="flex items-center gap-1">
              Projet 
              {sortField === 'projectName' && (
                <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              )}
            </div>
          </TableHead>
          <TableHead>Lot</TableHead>
          <TableHead 
            className="cursor-pointer" 
            onClick={() => handleSort('receivedOffers')}
          >
            <div className="flex items-center gap-1">
              <Users size={14} className="mr-1" />
              Offres 
              {sortField === 'receivedOffers' && (
                <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              )}
            </div>
          </TableHead>
          <TableHead>Statut</TableHead>
          <TableHead 
            className="cursor-pointer" 
            onClick={() => handleSort('closingDate')}
          >
            <div className="flex items-center gap-1">
              <Calendar size={14} className="mr-1" />
              Date limite 
              {sortField === 'closingDate' && (
                <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              )}
            </div>
          </TableHead>
          <TableHead 
            className="cursor-pointer text-right" 
            onClick={() => handleSort('budget')}
          >
            <div className="flex items-center gap-1 justify-end">
              Budget 
              {sortField === 'budget' && (
                <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              )}
            </div>
          </TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tenders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
              Aucun appel d'offres ne correspond à vos critères
            </TableCell>
          </TableRow>
        ) : (
          tenders.map((tender) => (
            <TableRow key={tender.id} className="hover:bg-muted/50">
              <TableCell>
                <div className="font-medium">{tender.projectName}</div>
                <div className="text-xs text-muted-foreground">{tender.clientName}</div>
              </TableCell>
              <TableCell>{tender.lotName}</TableCell>
              <TableCell>{tender.receivedOffers}</TableCell>
              <TableCell>{renderStatusBadge(tender.status)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {tender.status === 'open' ? (
                    <Clock size={14} className="text-amber-500" />
                  ) : (
                    <CheckCircle size={14} className="text-green-600" />
                  )}
                  <span>{tender.closingDate}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">{tender.budget}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/tender/${tender.id}`}>
                    Détails
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

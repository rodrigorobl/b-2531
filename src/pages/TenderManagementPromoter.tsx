
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Building, 
  BarChart2,
  FileDown,
  Eye,
  Plus,
  Filter,
  ArrowUpDown,
  Search,
  Loader2
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { useTenderManagement } from '@/hooks/useTenderManagement';
import { TenderSearchResult } from '@/types/tenders';

export default function TenderManagementPromoter() {
  const navigate = useNavigate();
  const { tenders, isLoading, error, stats } = useTenderManagement();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('deadline');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter tenders based on search and status
  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = tender.projectName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (tender.location && tender.location.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || tender.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort tenders based on sort field and direction
  const sortedTenders = [...filteredTenders].sort((a, b) => {
    if (sortField === 'deadline') {
      // Convert deadline string to date for sorting
      const dateA = new Date(a.deadline.split('/').reverse().join('-'));
      const dateB = new Date(b.deadline.split('/').reverse().join('-'));
      return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else if (sortField === 'progress') {
      const progressA = a.progress || 0;
      const progressB = b.progress || 0;
      return sortDirection === 'asc' ? progressA - progressB : progressB - progressA;
    } else if (sortField === 'quotesReceived') {
      const quotesA = a.actualQuotesReceived || 0;
      const quotesB = b.actualQuotesReceived || 0;
      return sortDirection === 'asc' ? quotesA - quotesB : quotesB - quotesA;
    } else {
      // Sort by project name as default
      return sortDirection === 'asc' 
        ? a.projectName.localeCompare(b.projectName) 
        : b.projectName.localeCompare(a.projectName);
    }
  });

  // Helper function to get status color based on tender status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-status-pending">En cours</Badge>;
      case 'closed':
        return <Badge className="bg-status-closed">Clôturé</Badge>;
      case 'assigned':
        return <Badge className="bg-status-assigned">Attribué</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  // Helper function to get quote quality indicator
  const getQuoteQualityIndicator = (quality: string) => {
    switch (quality) {
      case 'poor':
        return <Badge variant="outline" className="text-red-500 border-red-500">Faible</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Moyen</Badge>;
      case 'good':
        return <Badge variant="outline" className="text-green-500 border-green-500">Bon</Badge>;
      default:
        return null;
    }
  };

  // Helper function to get budget respect indicator
  const getBudgetRespectIndicator = (budgetRespect: string) => {
    switch (budgetRespect) {
      case 'under':
        return <Badge variant="outline" className="text-green-500 border-green-500">Sous budget</Badge>;
      case 'on-target':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Dans le budget</Badge>;
      case 'over':
        return <Badge variant="outline" className="text-red-500 border-red-500">Dépassement</Badge>;
      default:
        return null;
    }
  };

  // Handle sort change
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
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Gestion des appels d'offres</h1>
            <p className="text-muted-foreground">
              Gérez et suivez tous vos appels d'offres en cours et les attributions de lots.
            </p>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AO en cours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeTenders}</div>
                <p className="text-xs text-muted-foreground">appels d'offres actifs</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lots attribués</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.assignedLots}</div>
                <p className="text-xs text-muted-foreground">sur l'ensemble des projets</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Devis reçus</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.receivedQuotes}</div>
                <p className="text-xs text-muted-foreground">pour tous les AO en cours</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Moyenne par lot</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageQuotes}</div>
                <p className="text-xs text-muted-foreground">devis par lot</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher un projet..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="open">En cours</SelectItem>
                  <SelectItem value="closed">Clôturé</SelectItem>
                  <SelectItem value="assigned">Attribué</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => navigate('/create-tender')}
                className="whitespace-nowrap"
              >
                <Plus size={16} className="mr-1" />
                Créer un AO
              </Button>
            </div>
          </div>
          
          {/* Tenders Table */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 w-full grid grid-cols-4">
              <TabsTrigger value="all" onClick={() => setStatusFilter('all')}>
                Tous
              </TabsTrigger>
              <TabsTrigger value="open" onClick={() => setStatusFilter('open')}>
                En cours
              </TabsTrigger>
              <TabsTrigger value="closed" onClick={() => setStatusFilter('closed')}>
                Clôturés
              </TabsTrigger>
              <TabsTrigger value="assigned" onClick={() => setStatusFilter('assigned')}>
                Attribués
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="m-0">
              <div className="rounded-md border bg-card">
                {isLoading ? (
                  <div className="flex justify-center items-center h-60">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : error ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <AlertCircle className="mx-auto h-8 w-8 text-destructive mb-2" />
                    <p>Une erreur est survenue lors du chargement des appels d'offres.</p>
                    <p className="text-xs text-destructive mt-1">{error}</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">
                          <div 
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={() => handleSort('projectName')}
                          >
                            Projet 
                            <ArrowUpDown size={14} />
                          </div>
                        </TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>
                          <div 
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={() => handleSort('deadline')}
                          >
                            Date limite 
                            <ArrowUpDown size={14} />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div 
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={() => handleSort('quotesReceived')}
                          >
                            Devis reçus 
                            <ArrowUpDown size={14} />
                          </div>
                        </TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>
                          <div 
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={() => handleSort('progress')}
                          >
                            Avancement 
                            <ArrowUpDown size={14} />
                          </div>
                        </TableHead>
                        <TableHead>Qualité</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedTenders.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={10} className="text-center py-10 text-muted-foreground">
                            Aucun appel d'offres correspondant à vos critères
                          </TableCell>
                        </TableRow>
                      ) : (
                        sortedTenders.map((tender) => (
                          <TableRow key={tender.id}>
                            <TableCell>
                              <div className="font-medium">{tender.projectName}</div>
                              <div className="text-xs text-muted-foreground">{tender.location}</div>
                            </TableCell>
                            <TableCell>{tender.projectType}</TableCell>
                            <TableCell>{getStatusBadge(tender.status)}</TableCell>
                            <TableCell>{tender.deadline}</TableCell>
                            <TableCell>
                              <div className="font-medium">{tender.actualQuotesReceived || 0}</div>
                              <div className="text-xs text-muted-foreground">devis</div>
                            </TableCell>
                            <TableCell>{tender.budget}</TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <Progress value={tender.progress || 0} className="h-2" />
                                <div className="text-xs text-muted-foreground">
                                  {tender.lotsAssigned || 0}/{tender.lotsTotal || 0} lots ({tender.progress || 0}%)
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{tender.quoteQuality && getQuoteQualityIndicator(tender.quoteQuality)}</TableCell>
                            <TableCell>{tender.budgetRespect && getBudgetRespectIndicator(tender.budgetRespect)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Link 
                                  to={`/tender-detail/${tender.id}`}
                                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
                                >
                                  <Eye size={14} />
                                  <span>Détails</span>
                                </Link>
                                
                                <Button size="sm" variant="outline" className="gap-1">
                                  <FileDown size={14} />
                                  <span>DCE</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="open" className="m-0">
              {/* Content will be filtered by the tab selection */}
            </TabsContent>
            
            <TabsContent value="closed" className="m-0">
              {/* Content will be filtered by the tab selection */}
            </TabsContent>
            
            <TabsContent value="assigned" className="m-0">
              {/* Content will be filtered by the tab selection */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

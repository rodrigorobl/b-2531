
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useTenderManagement } from '@/hooks/useTenderManagement';
import TenderStatsCards from '@/components/tenders/TenderStatsCards';
import TenderManagementTable from '@/components/tenders/TenderManagementTable';
import { TenderSearchResult } from '@/types/tenders';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TenderManagementPromoter() {
  const { tenders, isLoading, error } = useTenderManagement();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('projectName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  // Fonction pour ouvrir la fenêtre de détails des lots
  const openLotDetails = (tender: TenderSearchResult) => {
    console.log('Ouvrir détails des lots pour:', tender.id);
    // Implémentation à compléter
  };

  // Calculate stats based on tenders
  const stats = {
    totalOpen: tenders.filter(t => t.status === 'open').length,
    totalClosed: tenders.filter(t => t.status === 'closed').length,
    totalAssigned: tenders.filter(t => t.status === 'assigned').length,
    totalTenders: tenders.length,
    averageQuotes: Math.round(tenders.reduce((acc, t) => acc + (t.actualQuotesReceived || 0), 0) / (tenders.length || 1)),
    completionRate: Math.round(tenders.reduce((acc, t) => acc + (t.progress || 0), 0) / (tenders.length || 1)),
  };

  // Filter tenders based on search and status
  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = 
      tender.projectName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tender.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'open' && tender.status === 'open') ||
      (statusFilter === 'closed' && tender.status === 'closed') ||
      (statusFilter === 'assigned' && tender.status === 'assigned');
    
    return matchesSearch && matchesStatus;
  });

  // Sort tenders based on sort field and direction
  const sortedTenders = [...filteredTenders].sort((a, b) => {
    if (sortField === 'deadline') {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else if (sortField === 'quotesReceived') {
      const quotesA = a.actualQuotesReceived || 0;
      const quotesB = b.actualQuotesReceived || 0;
      return sortDirection === 'asc' ? quotesA - quotesB : quotesB - quotesA;
    } else if (sortField === 'progress') {
      const progressA = a.progress || 0;
      const progressB = b.progress || 0;
      return sortDirection === 'asc' ? progressA - progressB : progressB - progressA;
    } else {
      // Sort by project name as default
      return sortDirection === 'asc' 
        ? a.projectName.localeCompare(b.projectName) 
        : b.projectName.localeCompare(a.projectName);
    }
  });

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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Gestion des appels d'offres</h1>
              <p className="text-muted-foreground">
                Gérez et suivez tous vos appels d'offres.
              </p>
            </div>
            <Button 
              onClick={() => navigate('/create-tender')}
              className="gap-2"
            >
              <Plus size={16} />
              <span>Créer un appel d'offres</span>
            </Button>
          </div>
          
          {/* Statistics Cards */}
          <TenderStatsCards stats={stats} />
          
          {/* Filters and Search */}
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <div className="grow max-w-sm">
              <Input 
                placeholder="Rechercher un appel d'offres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-[150px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="open">Ouvert</SelectItem>
                  <SelectItem value="closed">Clôturé</SelectItem>
                  <SelectItem value="assigned">Attribué</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Tenders Table */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 w-full grid grid-cols-4">
              <TabsTrigger value="all" onClick={() => setStatusFilter('all')}>
                Tous
              </TabsTrigger>
              <TabsTrigger value="open" onClick={() => setStatusFilter('open')}>
                Ouverts
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
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mr-2" />
                    <span>Chargement des appels d'offres...</span>
                  </div>
                ) : (
                  <TenderManagementTable 
                    tenders={sortedTenders}
                    isLoading={isLoading}
                    error={error}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                    openLotDetails={openLotDetails}
                  />
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="open" className="m-0">
              {/* Le contenu sera filtré par la sélection des onglets */}
            </TabsContent>
            
            <TabsContent value="closed" className="m-0">
              {/* Le contenu sera filtré par la sélection des onglets */}
            </TabsContent>
            
            <TabsContent value="assigned" className="m-0">
              {/* Le contenu sera filtré par la sélection des onglets */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

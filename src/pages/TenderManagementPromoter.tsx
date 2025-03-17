import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TenderSearchResult } from '@/types/tenders';
import { useTenderManagement } from '@/hooks/useTenderManagement';
import TenderStatsCards from '@/components/tenders/TenderStatsCards';
import TenderFiltersBar from '@/components/tenders/TenderFiltersBar';
import TenderManagementTable from '@/components/tenders/TenderManagementTable';
import TenderLotDetailsDialog from '@/components/tenders/TenderLotDetailsDialog';

export default function TenderManagementPromoter() {
  const { tenders, isLoading, error, stats } = useTenderManagement();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('deadline');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedTender, setSelectedTender] = useState<TenderSearchResult | null>(null);
  const [showLotDetails, setShowLotDetails] = useState(false);

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

  // Handle sort change
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Open lot details dialog
  const openLotDetails = (tender: TenderSearchResult) => {
    setSelectedTender(tender);
    setShowLotDetails(true);
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
          <TenderStatsCards stats={stats} />
          
          {/* Filters and Search */}
          <TenderFiltersBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          
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
                <TenderManagementTable 
                  tenders={sortedTenders}
                  isLoading={isLoading}
                  error={error}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                  openLotDetails={openLotDetails}
                />
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

      {/* Lot Details Dialog */}
      <TenderLotDetailsDialog 
        selectedTender={selectedTender}
        showLotDetails={showLotDetails}
        setShowLotDetails={setShowLotDetails}
      />
    </div>
  );
}


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import TenderSearchFilters from '@/components/tenders/TenderSearchFilters';
import TenderSearchResults from '@/components/tenders/TenderSearchResults';
import TenderSearchDetails from '@/components/tenders/TenderSearchDetails';
import TenderMap from '@/components/tenders/TenderMap';
import TenderSearchBar from '@/components/tenders/TenderSearchBar';
import TenderStatusTabs from '@/components/tenders/TenderStatusTabs';
import { mockTenders } from '@/data/mockTenders';
import { filterTenders } from '@/utils/tenderFilters';
import TenderViewModeSelector from '@/components/tenders/TenderViewModeSelector';
import TenderFilterSortMenu from '@/components/tenders/TenderFilterSortMenu';

export default function TenderSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [selectedTender, setSelectedTender] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'budget' | 'location'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const filteredTenders = filterTenders(mockTenders, searchQuery, selectedTab);

  const handleTenderSelect = (tenderId: string) => {
    setSelectedTender(tenderId);
  };

  const handleViewTenderDetail = (tenderId: string) => {
    navigate(`/tender-detail/${tenderId}`);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Rechercher un Appel d'Offres</h1>
          
          <TenderSearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          
          <TenderStatusTabs 
            selectedTab={selectedTab} 
            setSelectedTab={setSelectedTab} 
          />
          
          <div className="flex h-[calc(100vh-230px)]">
            <TenderSearchFilters />
            
            <div className="flex-1 max-w-[55%] bg-white rounded-lg shadow-sm mr-4 overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="text-sm text-muted-foreground">
                  {filteredTenders.length} appels d'offres trouvés
                </div>
                
                <div className="flex items-center gap-2">
                  <TenderViewModeSelector 
                    viewMode={viewMode} 
                    onViewModeChange={setViewMode} 
                  />
                  
                  <TenderFilterSortMenu
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    setSortBy={setSortBy}
                    setSortDirection={setSortDirection}
                  />
                </div>
              </div>
              
              {viewMode === 'map' ? (
                <div className="h-[calc(100%-60px)]">
                  <TenderMap 
                    tenders={filteredTenders}
                    onSelectTender={handleTenderSelect}
                    selectedTenderId={selectedTender}
                  />
                </div>
              ) : (
                <TenderSearchResults 
                  tenders={filteredTenders}
                  onSelectTender={handleTenderSelect}
                  selectedTenderId={selectedTender}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />
              )}
            </div>
            
            <TenderSearchDetails
              tender={mockTenders.find(t => t.id === selectedTender)}
              onViewDetail={handleViewTenderDetail}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TenderSearchFilters from '@/components/tenders/TenderSearchFilters';
import TenderSearchResults from '@/components/tenders/TenderSearchResults';
import TenderSearchDetails from '@/components/tenders/TenderSearchDetails';
import TenderMap from '@/components/tenders/TenderMap';
import TenderSearchBar from '@/components/tenders/TenderSearchBar';
import TenderStatusTabs from '@/components/tenders/TenderStatusTabs';
import { mockTenders } from '@/data/mockTenders';
import { filterTenders } from '@/utils/tenderFilters';
import { TenderSearchResult } from '@/types/tenders';

export default function TenderSearch() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [selectedTender, setSelectedTender] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  
  const filteredTenders = filterTenders(mockTenders, searchQuery, selectedTab);

  const handleTenderSelect = (tenderId: string) => {
    setSelectedTender(tenderId);
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
            
            {viewMode === 'map' ? (
              <div className="flex-1 mr-4">
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
            
            <TenderSearchDetails
              tender={mockTenders.find(t => t.id === selectedTender)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

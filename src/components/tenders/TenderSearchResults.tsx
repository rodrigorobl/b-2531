
import React, { useState } from 'react';
import { TenderSearchResult } from '@/pages/TenderSearch';
import TenderViewModeSelector from './TenderViewModeSelector';
import TenderFilterSortMenu from './TenderFilterSortMenu';
import TenderGridView from './TenderGridView';
import TenderListView from './TenderListView';

interface TenderSearchResultsProps {
  tenders: TenderSearchResult[];
  onSelectTender: (tenderId: string) => void;
  selectedTenderId: string | null;
  viewMode: 'grid' | 'list' | 'map';
  onViewModeChange: (mode: 'grid' | 'list' | 'map') => void;
}

export default function TenderSearchResults({ 
  tenders, 
  onSelectTender, 
  selectedTenderId,
  viewMode,
  onViewModeChange
}: TenderSearchResultsProps) {
  const [sortBy, setSortBy] = useState<'date' | 'budget' | 'location'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Si le mode d'affichage est carte, on ne rend pas ce composant du tout
  // car TenderMap sera affiché à la place par le parent
  if (viewMode === 'map') {
    return null;
  }

  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm mr-4 overflow-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {tenders.length} appels d'offres trouvés
        </div>
        
        <div className="flex items-center gap-2">
          <TenderViewModeSelector 
            viewMode={viewMode} 
            onViewModeChange={onViewModeChange} 
          />
          
          <TenderFilterSortMenu
            sortBy={sortBy}
            sortDirection={sortDirection}
            setSortBy={setSortBy}
            setSortDirection={setSortDirection}
          />
        </div>
      </div>

      {viewMode === 'grid' ? (
        <TenderGridView 
          tenders={tenders} 
          selectedTenderId={selectedTenderId} 
          onSelectTender={onSelectTender} 
        />
      ) : (
        <TenderListView 
          tenders={tenders} 
          selectedTenderId={selectedTenderId} 
          onSelectTender={onSelectTender} 
        />
      )}
    </div>
  );
}


import React from 'react';
import { OpportunitySearchResult } from '@/pages/OpportunitiesSearch';
import OpportunityViewModeSelector from './OpportunityViewModeSelector';
import OpportunityFilterSortMenu from './OpportunityFilterSortMenu';
import OpportunityGridView from './OpportunityGridView';
import OpportunityListView from './OpportunityListView';

interface OpportunitySearchResultsProps {
  opportunities: OpportunitySearchResult[];
  onSelectOpportunity: (opportunityId: string) => void;
  selectedOpportunityId: string | null;
  viewMode: 'grid' | 'list' | 'map';
  onViewModeChange: (mode: 'grid' | 'list' | 'map') => void;
  onToggleFavorite: (opportunityId: string) => void;
  savedFavorites: string[];
}

export default function OpportunitySearchResults({ 
  opportunities, 
  onSelectOpportunity, 
  selectedOpportunityId,
  viewMode,
  onViewModeChange,
  onToggleFavorite,
  savedFavorites
}: OpportunitySearchResultsProps) {
  // Si le mode d'affichage est carte, on ne rend pas ce composant du tout
  // car OpportunityMap sera affiché à la place par le parent
  if (viewMode === 'map') {
    return null;
  }

  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm mr-4 overflow-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {opportunities.length} opportunités trouvées
        </div>
        
        <div className="flex items-center gap-2">
          <OpportunityViewModeSelector 
            viewMode={viewMode} 
            onViewModeChange={onViewModeChange} 
          />
          
          <OpportunityFilterSortMenu />
        </div>
      </div>

      {viewMode === 'grid' ? (
        <OpportunityGridView 
          opportunities={opportunities} 
          selectedOpportunityId={selectedOpportunityId} 
          onSelectOpportunity={onSelectOpportunity} 
          onToggleFavorite={onToggleFavorite}
          savedFavorites={savedFavorites}
        />
      ) : (
        <OpportunityListView 
          opportunities={opportunities} 
          selectedOpportunityId={selectedOpportunityId} 
          onSelectOpportunity={onSelectOpportunity} 
          onToggleFavorite={onToggleFavorite}
          savedFavorites={savedFavorites}
        />
      )}
    </div>
  );
}

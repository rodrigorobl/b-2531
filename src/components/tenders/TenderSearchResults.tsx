
import React, { useState } from 'react';
import { TenderSearchResult } from '@/types/tenders';
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
  viewMode
}: TenderSearchResultsProps) {
  // We only need to render Grid or List view content here
  return (
    <div className="overflow-auto h-[calc(100%-60px)]">
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

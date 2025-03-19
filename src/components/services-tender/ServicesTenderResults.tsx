
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceTenderSearchResult } from '@/pages/ServicesTenderSearch';
import { ChevronDown, ChevronUp, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import ServicesTenderListView from './ServicesTenderListView';
import ServicesTenderGridView from './ServicesTenderGridView';
import ServicesTenderViewModeSelector from './ServicesTenderViewModeSelector';
import ServicesTenderFilterSortMenu from './ServicesTenderFilterSortMenu';

interface ServicesTenderResultsProps {
  tenders: ServiceTenderSearchResult[];
  onSelectTender: (tenderId: string) => void;
  selectedTenderId: string | null;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export default function ServicesTenderResults({
  tenders,
  onSelectTender,
  selectedTenderId,
  viewMode,
  onViewModeChange
}: ServicesTenderResultsProps) {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'date' | 'budget' | 'alphabetical'>('date');

  const handleConsultAO = (tenderId: string) => {
    navigate(`/company-details-tender/${tenderId}`);
  };

  // Sort the tenders based on the sort options
  const sortedTenders = [...tenders].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' 
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'budget') {
      return sortOrder === 'asc' 
        ? a.estimatedAmount - b.estimatedAmount
        : b.estimatedAmount - a.estimatedAmount;
    } else {
      return sortOrder === 'asc'
        ? a.projectName.localeCompare(b.projectName)
        : b.projectName.localeCompare(a.projectName);
    }
  });

  return (
    <div className="flex-1 flex flex-col min-w-0 border-x">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {tenders.length} appel{tenders.length > 1 ? 's' : ''} d'offres trouvé{tenders.length > 1 ? 's' : ''}
        </div>
        
        <div className="flex items-center gap-2">
          <ServicesTenderFilterSortMenu 
            sortBy={sortBy} 
            sortOrder={sortOrder} 
            onSortByChange={setSortBy} 
            onSortOrderChange={setSortOrder} 
          />
          
          <ServicesTenderViewModeSelector 
            viewMode={viewMode} 
            onViewModeChange={onViewModeChange} 
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1 overflow-auto">
        <div className="p-4">
          {viewMode === 'grid' ? (
            <ServicesTenderGridView 
              tenders={sortedTenders} 
              selectedTenderId={selectedTenderId} 
              onSelectTender={onSelectTender}
              onConsultAO={handleConsultAO}
            />
          ) : (
            <ServicesTenderListView 
              tenders={sortedTenders} 
              selectedTenderId={selectedTenderId} 
              onSelectTender={onSelectTender}
              onConsultAO={handleConsultAO}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}


import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Map } from 'lucide-react';

interface OpportunityViewModeSelectorProps {
  viewMode: 'grid' | 'list' | 'map';
  onViewModeChange: (mode: 'grid' | 'list' | 'map') => void;
}

export default function OpportunityViewModeSelector({ 
  viewMode, 
  onViewModeChange 
}: OpportunityViewModeSelectorProps) {
  return (
    <div className="flex border rounded-md overflow-hidden">
      <Button 
        variant={viewMode === 'grid' ? 'default' : 'ghost'} 
        size="sm" 
        className={`rounded-none ${viewMode === 'grid' ? '' : 'hover:bg-accent'}`}
        onClick={() => onViewModeChange('grid')}
      >
        <LayoutGrid size={16} />
      </Button>
      <Button 
        variant={viewMode === 'list' ? 'default' : 'ghost'} 
        size="sm" 
        className={`rounded-none ${viewMode === 'list' ? '' : 'hover:bg-accent'}`}
        onClick={() => onViewModeChange('list')}
      >
        <List size={16} />
      </Button>
      <Button 
        variant={viewMode === 'map' ? 'default' : 'ghost'} 
        size="sm" 
        className={`rounded-none ${viewMode === 'map' ? '' : 'hover:bg-accent'}`}
        onClick={() => onViewModeChange('map')}
      >
        <Map size={16} />
      </Button>
    </div>
  );
}

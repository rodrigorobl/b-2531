
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, ListFilter } from 'lucide-react';

interface ServicesTenderViewModeSelectorProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export default function ServicesTenderViewModeSelector({ 
  viewMode, 
  onViewModeChange 
}: ServicesTenderViewModeSelectorProps) {
  return (
    <ToggleGroup type="single" value={viewMode} onValueChange={(value) => {
      if (value) onViewModeChange(value as 'grid' | 'list');
    }}>
      <ToggleGroupItem value="grid" aria-label="Affichage en grille">
        <LayoutGrid size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="Affichage en liste">
        <ListFilter size={16} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

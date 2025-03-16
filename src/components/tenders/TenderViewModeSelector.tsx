
import React from 'react';
import { LayoutGrid, LayoutList, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ViewMode = 'grid' | 'list' | 'map';

interface TenderViewModeSelectorProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function TenderViewModeSelector({ 
  viewMode, 
  onViewModeChange 
}: TenderViewModeSelectorProps) {
  if (viewMode === 'map') {
    return (
      <Select defaultValue={viewMode}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Mode d'affichage" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="grid" onClick={() => onViewModeChange('grid')}>
            <div className="flex items-center gap-2">
              <LayoutGrid size={16} />
              <span>Affichage grille</span>
            </div>
          </SelectItem>
          <SelectItem value="list" onClick={() => onViewModeChange('list')}>
            <div className="flex items-center gap-2">
              <LayoutList size={16} />
              <span>Affichage liste</span>
            </div>
          </SelectItem>
          <SelectItem value="map" onClick={() => onViewModeChange('map')}>
            <div className="flex items-center gap-2">
              <Map size={16} />
              <span>Affichage carte</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    );
  }
  
  return (
    <div className="flex gap-2">
      <Button 
        variant={viewMode === 'grid' ? 'default' : 'outline'} 
        size="sm" 
        onClick={() => onViewModeChange('grid')}
      >
        <LayoutGrid size={16} />
      </Button>
      <Button 
        variant={viewMode === 'list' ? 'default' : 'outline'} 
        size="sm" 
        onClick={() => onViewModeChange('list')}
      >
        <LayoutList size={16} />
      </Button>
      <Button 
        variant={viewMode === 'map' ? 'default' : 'outline'} 
        size="sm" 
        onClick={() => onViewModeChange('map')}
      >
        <Map size={16} />
      </Button>
    </div>
  );
}

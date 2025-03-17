
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
  // Use the button group for all views to maintain consistency
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

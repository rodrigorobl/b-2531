
import React from 'react';
import { Star } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface FavoritesFilterProps {
  showFavorites: boolean;
  setShowFavorites: (checked: boolean) => void;
}

export function FavoritesFilter({ showFavorites, setShowFavorites }: FavoritesFilterProps) {
  return (
    <div className="flex items-start space-x-2 pt-2">
      <Checkbox 
        id="favorites" 
        checked={showFavorites} 
        onCheckedChange={(checked) => setShowFavorites(checked === true)}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="favorites"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
        >
          <Star size={16} className="text-muted-foreground" />
          Appels d'offres favoris
        </label>
      </div>
    </div>
  );
}

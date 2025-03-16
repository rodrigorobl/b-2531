
import React from 'react';
import { Filter, ArrowUp, ArrowDown, Settings, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';

type SortBy = 'date' | 'budget' | 'location';
type SortDirection = 'asc' | 'desc';

interface TenderFilterSortMenuProps {
  sortBy: SortBy;
  sortDirection: SortDirection;
  setSortBy: (sortBy: SortBy) => void;
  setSortDirection: (direction: SortDirection) => void;
}

export default function TenderFilterSortMenu({ 
  sortBy, 
  sortDirection, 
  setSortBy, 
  setSortDirection 
}: TenderFilterSortMenuProps) {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter size={14} />
            <span>Filtrer</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Type de projet</DropdownMenuLabel>
          <DropdownMenuItem>Commercial</DropdownMenuItem>
          <DropdownMenuItem>Logement</DropdownMenuItem>
          <DropdownMenuItem>Tertiaire</DropdownMenuItem>
          <DropdownMenuItem>Public</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Statut</DropdownMenuLabel>
          <DropdownMenuItem>En cours</DropdownMenuItem>
          <DropdownMenuItem>Clôturés</DropdownMenuItem>
          <DropdownMenuItem>Attribués</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            {sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            <span>Trier</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => { setSortBy('date'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}>
            <Calendar size={14} className="mr-2" />
            Date {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setSortBy('budget'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}>
            <span className="mr-2">€</span>
            Budget {sortBy === 'budget' && (sortDirection === 'asc' ? '↑' : '↓')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setSortBy('location'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}>
            <MapPin size={14} className="mr-2" />
            Localisation {sortBy === 'location' && (sortDirection === 'asc' ? '↑' : '↓')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Settings size={14} />
            <span>Options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>Afficher tous les lots</DropdownMenuItem>
          <DropdownMenuItem>Projets favoris uniquement</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Exporter les résultats</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

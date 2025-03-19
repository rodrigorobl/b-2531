
import React from 'react';
import { Filter, ArrowUp, ArrowDown, Settings, MapPin, Calendar, Euro, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';

type SortBy = 'date' | 'budget' | 'location' | 'relevance';
type SortDirection = 'asc' | 'desc';

interface ServicesTenderFilterSortMenuProps {
  sortBy: SortBy;
  sortDirection: SortDirection;
  setSortBy: (sortBy: SortBy) => void;
  setSortDirection: (direction: SortDirection) => void;
}

export default function ServicesTenderFilterSortMenu({ 
  sortBy, 
  sortDirection, 
  setSortBy, 
  setSortDirection 
}: ServicesTenderFilterSortMenuProps) {
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
          <DropdownMenuLabel>Type de service</DropdownMenuLabel>
          <DropdownMenuItem>LOCATION DE LOCAUX DE STOCKAGE</DropdownMenuItem>
          <DropdownMenuItem>SERVICES DE PHOTOGRAPHIE ET VIDÉO PROMOTIONNELLE</DropdownMenuItem>
          <DropdownMenuItem>PHOTOGRAPHE DE CHANTIER</DropdownMenuItem>
          <DropdownMenuItem>PILOTE DE DRONE POUR VUES AÉRIENNES</DropdownMenuItem>
          <DropdownMenuItem>SERVICES DE MARKETING SUR LE CHANTIER</DropdownMenuItem>
          <DropdownMenuItem>ORGANISATION DE VISITES DE CHANTIER POUR LES CLIENTS</DropdownMenuItem>
          <DropdownMenuItem>SERVICES D'AMÉNAGEMENT INTÉRIEUR ET HOME STAGING</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Statut</DropdownMenuLabel>
          <DropdownMenuItem>En cours</DropdownMenuItem>
          <DropdownMenuItem>Clôturés</DropdownMenuItem>
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
          <DropdownMenuItem onClick={() => { setSortBy('relevance'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}>
            <Sparkles size={14} className="mr-2" />
            Pertinence {sortBy === 'relevance' && (sortDirection === 'asc' ? '↑' : '↓')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setSortBy('date'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}>
            <Calendar size={14} className="mr-2" />
            Date {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setSortBy('budget'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}>
            <Euro size={14} className="mr-2" />
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
          <DropdownMenuItem>Afficher les favoris uniquement</DropdownMenuItem>
          <DropdownMenuItem>Cacher les appels d'offres déjà consultés</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Exporter les résultats</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

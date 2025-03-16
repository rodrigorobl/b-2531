
import React, { useState } from 'react';
import { TenderSearchResult } from '@/pages/TenderSearch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LayoutGrid, LayoutList, MapPin, Calendar, Star, Building, ArrowRight, Eye, Map, Filter, ArrowDown, ArrowUp, List, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  viewMode,
  onViewModeChange
}: TenderSearchResultsProps) {
  const [sortBy, setSortBy] = useState<'date' | 'budget' | 'location'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-amber-500">En cours</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">Clôturé</Badge>;
      case 'assigned':
        return <Badge className="bg-green-600">Attribué</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm mr-4 overflow-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {tenders.length} appels d'offres trouvés
        </div>
        
        {viewMode === 'map' ? (
          <div className="flex items-center gap-2">
            <Select defaultValue="grid">
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
        ) : (
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
        )}
      </div>

      {tenders.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          Aucun appel d'offres correspondant à vos critères
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tenders.map((tender) => (
            <div
              key={tender.id}
              className={cn(
                "border rounded-lg p-4 transition-all cursor-pointer",
                selectedTenderId === tender.id ? "border-primary bg-primary/5" : "hover:border-primary/30"
              )}
              onClick={() => onSelectTender(tender.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-1">{tender.projectName}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Building size={14} />
                    <span>{tender.projectType}</span>
                    <span>•</span>
                    <MapPin size={14} />
                    <span>{tender.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(tender.status)}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={tender.isFavorite ? "text-amber-500" : "text-muted-foreground"}
                  >
                    <Star size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-sm">
                  <Calendar size={14} className="text-muted-foreground" />
                  <span>Échéance: {tender.deadline}</span>
                </div>
                <div className="text-sm font-medium">
                  {tender.budget}
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-1">
                {tender.lots.slice(0, 3).map((lot, index) => (
                  <Badge key={index} variant="outline" className="font-normal">
                    {lot}
                  </Badge>
                ))}
                {tender.lots.length > 3 && (
                  <Badge variant="outline" className="font-normal">
                    +{tender.lots.length - 3}
                  </Badge>
                )}
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {tender.client.name}
                </div>
                <div>
                  <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
                    <Eye size={14} />
                    <span>Détails</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : viewMode === 'list' ? (
        <div className="space-y-2">
          {tenders.map((tender) => (
            <div
              key={tender.id}
              className={cn(
                "border rounded-lg p-3 transition-all cursor-pointer flex items-center",
                selectedTenderId === tender.id ? "border-primary bg-primary/5" : "hover:border-primary/30"
              )}
              onClick={() => onSelectTender(tender.id)}
            >
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{tender.projectName}</h3>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(tender.status)}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={tender.isFavorite ? "text-amber-500" : "text-muted-foreground"}
                    >
                      <Star size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building size={14} />
                    <span>{tender.projectType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{tender.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{tender.deadline}</span>
                  </div>
                </div>
              </div>
              
              <div className="ml-4 flex items-center gap-3">
                <div className="text-sm font-medium">
                  {tender.budget}
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                  <Eye size={14} className="mr-1" />
                  <span>Détails</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

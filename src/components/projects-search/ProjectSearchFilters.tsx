
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Building, 
  MapPin, 
  Search, 
  Clock 
} from 'lucide-react';

interface FiltersProps {
  filters: {
    projectType: 'all' | 'conception' | 'realisation';
    referencing: 'all' | 'in-progress' | 'not-started';
    location: string;
    searchQuery: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    projectType: 'all' | 'conception' | 'realisation';
    referencing: 'all' | 'in-progress' | 'not-started';
    location: string;
    searchQuery: string;
  }>>;
}

export function ProjectSearchFilters({ filters, setFilters }: FiltersProps) {
  // Mock locations for the demo
  const locations = [
    { value: 'all', label: 'Toutes zones' },
    { value: 'Paris', label: 'Paris' },
    { value: 'Lyon', label: 'Lyon' },
    { value: 'Marseille', label: 'Marseille' },
    { value: 'Bordeaux', label: 'Bordeaux' },
    { value: 'Lille', label: 'Lille' },
    { value: 'Nantes', label: 'Nantes' },
    { value: 'Strasbourg', label: 'Strasbourg' },
    { value: 'Nice', label: 'Nice' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  return (
    <Card className="w-full md:w-80 h-fit">
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Filtres</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building size={16} className="text-muted-foreground" />
                <Label htmlFor="projectType">Type de projet</Label>
              </div>
              
              <Select 
                value={filters.projectType} 
                onValueChange={(value: 'all' | 'conception' | 'realisation') => 
                  setFilters(prev => ({ ...prev, projectType: value }))
                }
              >
                <SelectTrigger id="projectType">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="conception">Projets en Conception</SelectItem>
                  <SelectItem value="realisation">Projets en Réalisation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-muted-foreground" />
                <Label htmlFor="referencing">Référencement en cours</Label>
              </div>
              
              <Select 
                value={filters.referencing} 
                onValueChange={(value: 'all' | 'in-progress' | 'not-started') => 
                  setFilters(prev => ({ ...prev, referencing: value }))
                }
              >
                <SelectTrigger id="referencing">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="in-progress">Référencement en cours</SelectItem>
                  <SelectItem value="not-started">Référencement non démarré</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-muted-foreground" />
                <Label htmlFor="location">Zone géographique</Label>
              </div>
              
              <Select 
                value={filters.location} 
                onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, location: value }))
                }
              >
                <SelectTrigger id="location">
                  <SelectValue placeholder="Toutes zones" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Search size={16} className="text-muted-foreground" />
                <Label htmlFor="search">Recherche par mot-clé</Label>
              </div>
              
              <Input 
                id="search" 
                placeholder="Nom du projet, promoteur..." 
                value={filters.searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


import React from 'react';
import { Search, List, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ViewMode, CompanyCategory } from '@/types/directory';

interface CompanyDirectoryHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  selectedCategory: CompanyCategory | null;
  setSelectedCategory: (category: CompanyCategory | null) => void;
}

export default function CompanyDirectoryHeader({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  selectedCategory,
  setSelectedCategory
}: CompanyDirectoryHeaderProps) {
  const categories = [
    { id: 'architecte', label: 'Architectes' },
    { id: 'bureau-etudes', label: 'MOE & BET' },
    { id: 'construction', label: 'Entreprises de construction' },
    { id: 'services', label: 'Entreprises de services' },
    { id: 'industriel', label: 'Industriels' },
    { id: 'fournisseur', label: 'Fournisseurs' }
  ];
  
  const handleCategoryChange = (value: string) => {
    if (value === 'all') {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(value as CompanyCategory);
    }
  };
  
  return (
    <div className="border-b border-border p-4 space-y-4 bg-background">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Annuaire des Entreprises</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4 mr-2" />
            Liste
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('map')}
          >
            <Map className="w-4 h-4 mr-2" />
            Carte
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher une entreprise, spécialité, localisation..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs value={selectedCategory || 'all'} onValueChange={handleCategoryChange} className="w-full">
        <TabsList className="w-full h-auto flex flex-wrap justify-start">
          <TabsTrigger value="all" className="flex-grow-0">Toutes catégories</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex-grow-0">
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}

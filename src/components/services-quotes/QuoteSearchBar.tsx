
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface QuoteSearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function QuoteSearchBar({ searchTerm, onSearchChange }: QuoteSearchBarProps) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher par projet, service ou entreprise..."
          className="pl-8"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <Button variant="outline">
        <Filter size={16} className="mr-2" />
        Filtres
      </Button>
    </div>
  );
}

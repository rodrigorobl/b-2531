
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface TenderSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function TenderSearchBar({ searchQuery, setSearchQuery }: TenderSearchBarProps) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher par mot-clé, référence, localisation..."
          className="pl-10 pr-4 py-6 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className="absolute right-1 top-1.5 h-9">
          Rechercher
        </Button>
      </div>
    </div>
  );
}

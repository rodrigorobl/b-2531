
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface TenderFiltersBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export default function TenderFiltersBar({ 
  searchQuery, 
  setSearchQuery, 
  statusFilter, 
  setStatusFilter 
}: TenderFiltersBarProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex-1 w-full md:w-auto">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un projet..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex gap-4 w-full md:w-auto">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="open">En cours</SelectItem>
            <SelectItem value="closed">Clôturé</SelectItem>
            <SelectItem value="assigned">Attribué</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => navigate('/create-tender')}
          className="whitespace-nowrap"
        >
          <Plus size={16} className="mr-1" />
          Créer un AO
        </Button>
      </div>
    </div>
  );
}

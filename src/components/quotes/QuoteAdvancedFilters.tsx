
import React from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

type UrgencyLevel = 'high' | 'medium' | 'low';

interface QuoteAdvancedFiltersProps {
  projectOptions: string[];
  lotOptions: string[];
  filterProject: string;
  setFilterProject: (value: string) => void;
  filterLot: string;
  setFilterLot: (value: string) => void;
  filterUrgency: UrgencyLevel | 'all';
  setFilterUrgency: (value: UrgencyLevel | 'all') => void;
  resetFilters: () => void;
}

export const QuoteAdvancedFilters = ({
  projectOptions,
  lotOptions,
  filterProject,
  setFilterProject,
  filterLot,
  setFilterLot,
  filterUrgency,
  setFilterUrgency,
  resetFilters
}: QuoteAdvancedFiltersProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter size={16} />
          Filtres avancés
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Filtres avancés</AlertDialogTitle>
          <AlertDialogDescription>
            Affinez votre recherche de devis selon ces critères.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <label htmlFor="project-filter" className="text-sm font-medium">
              Projet
            </label>
            <Select 
              value={filterProject} 
              onValueChange={setFilterProject}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les projets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les projets</SelectItem>
                {projectOptions.map(project => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <label htmlFor="lot-filter" className="text-sm font-medium">
              Lot
            </label>
            <Select 
              value={filterLot} 
              onValueChange={setFilterLot}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les lots" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les lots</SelectItem>
                {lotOptions.map(lot => (
                  <SelectItem key={lot} value={lot}>{lot}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <label htmlFor="urgency-filter" className="text-sm font-medium">
              Urgence
            </label>
            <Select 
              value={filterUrgency} 
              onValueChange={(value) => setFilterUrgency(value as UrgencyLevel | 'all')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Toutes les urgences" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les urgences</SelectItem>
                <SelectItem value="high">Urgente</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="low">Basse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={resetFilters}>Réinitialiser</AlertDialogCancel>
          <AlertDialogAction>Appliquer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

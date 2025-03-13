
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  MapPin, 
  Building, 
  Calendar, 
  Star, 
  Euro, 
  Maximize, 
  Users, 
  Layers
} from 'lucide-react';

export default function TenderSearchFilters() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [budgetRange, setBudgetRange] = useState([0, 10000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 30000]);
  
  const projectTypes = [
    { value: 'all', label: 'Tous types' },
    { value: 'logement', label: 'Logement' },
    { value: 'tertiaire', label: 'Tertiaire' },
    { value: 'industriel', label: 'Industriel' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'public', label: 'Équipement public' },
    { value: 'hotellerie', label: 'Hôtellerie' },
  ];
  
  const locations = [
    { value: 'all', label: 'Toutes régions' },
    { value: 'idf', label: 'Île-de-France' },
    { value: 'paca', label: 'PACA' },
    { value: 'aura', label: 'Auvergne-Rhône-Alpes' },
    { value: 'occitanie', label: 'Occitanie' },
    { value: 'bretagne', label: 'Bretagne' },
    { value: 'normandie', label: 'Normandie' },
  ];

  const formatBudget = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatSurface = (value: number) => {
    return `${value} m²`;
  };

  return (
    <div className="w-80 min-w-80 bg-white rounded-lg shadow-sm p-4 mr-4 overflow-auto">
      <h3 className="font-medium mb-4">Filtres avancés</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Building size={16} className="text-muted-foreground" />
            <Label>Type de projet</Label>
          </div>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Tous types" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <Label>Localisation</Label>
          </div>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Toutes régions" />
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
            <Euro size={16} className="text-muted-foreground" />
            <Label>Budget estimé</Label>
          </div>
          <div className="pt-5 px-2">
            <Slider 
              value={budgetRange} 
              min={0} 
              max={10000000} 
              step={100000}
              onValueChange={setBudgetRange}
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{formatBudget(budgetRange[0])}</span>
              <span>{formatBudget(budgetRange[1])}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Maximize size={16} className="text-muted-foreground" />
            <Label>Surface du projet</Label>
          </div>
          <div className="pt-5 px-2">
            <Slider 
              value={surfaceRange} 
              min={0} 
              max={30000} 
              step={500}
              onValueChange={setSurfaceRange}
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{formatSurface(surfaceRange[0])}</span>
              <span>{formatSurface(surfaceRange[1])}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-muted-foreground" />
            <Label>Nombre de lots</Label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Min</Label>
              <Input type="number" min="1" defaultValue="1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Max</Label>
              <Input type="number" min="1" defaultValue="10" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-muted-foreground" />
            <Label>Date limite de soumission</Label>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Du</Label>
              <Input type="date" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Au</Label>
              <Input type="date" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-muted-foreground" />
            <Label>MOA / BET concernés</Label>
          </div>
          <Input placeholder="Saisir un nom" />
        </div>
        
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
        
        <Button className="w-full">Appliquer les filtres</Button>
        <Button variant="outline" className="w-full">Réinitialiser</Button>
      </div>
    </div>
  );
}

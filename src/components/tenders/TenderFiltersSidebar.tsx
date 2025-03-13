
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
import { MapPin, Building, Calendar, Star } from 'lucide-react';

export default function TenderFiltersSidebar() {
  const [showFavorites, setShowFavorites] = useState(false);
  
  const projectTypes = [
    { value: 'all', label: 'Tous types' },
    { value: 'logement', label: 'Logement' },
    { value: 'tertiaire', label: 'Tertiaire' },
    { value: 'industriel', label: 'Industriel' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'public', label: 'Équipement public' },
  ];
  
  const locations = [
    { value: 'all', label: 'Toutes régions' },
    { value: 'idf', label: 'Île-de-France' },
    { value: 'paca', label: 'PACA' },
    { value: 'aura', label: 'Auvergne-Rhône-Alpes' },
    { value: 'occitanie', label: 'Occitanie' },
    { value: 'bretagne', label: 'Bretagne' },
  ];

  return (
    <div className="w-64 min-w-64 bg-white rounded-lg shadow-sm p-4 mr-4 overflow-auto">
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

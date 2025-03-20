
import React from 'react';
import { MapPin } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export function LocationFilter() {
  const regions = [
    { value: 'all', label: 'Toutes régions' },
    { value: 'auvergne-rhone-alpes', label: 'Auvergne-Rhône-Alpes' },
    { value: 'bourgogne-franche-comte', label: 'Bourgogne-Franche-Comté' },
    { value: 'bretagne', label: 'Bretagne' },
    { value: 'centre-val-de-loire', label: 'Centre-Val de Loire' },
    { value: 'corse', label: 'Corse' },
    { value: 'grand-est', label: 'Grand Est' },
    { value: 'hauts-de-france', label: 'Hauts-de-France' },
    { value: 'ile-de-france', label: 'Île-de-France' },
    { value: 'normandie', label: 'Normandie' },
    { value: 'nouvelle-aquitaine', label: 'Nouvelle-Aquitaine' },
    { value: 'occitanie', label: 'Occitanie' },
    { value: 'pays-de-la-loire', label: 'Pays de la Loire' },
    { value: 'provence-alpes-cote-d-azur', label: 'Provence-Alpes-Côte d\'Azur' },
  ];

  const departements = [
    { value: 'all', label: 'Tous départements' },
    { value: '75', label: 'Paris (75)' },
    { value: '69', label: 'Rhône (69)' },
    { value: '13', label: 'Bouches-du-Rhône (13)' },
    { value: '33', label: 'Gironde (33)' },
    { value: '59', label: 'Nord (59)' },
    { value: '31', label: 'Haute-Garonne (31)' },
    { value: '06', label: 'Alpes-Maritimes (06)' },
    { value: '44', label: 'Loire-Atlantique (44)' },
    { value: '67', label: 'Bas-Rhin (67)' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-muted-foreground" />
        <Label>Zone géographique</Label>
      </div>
      <Select defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Toutes régions" />
        </SelectTrigger>
        <SelectContent>
          {regions.map(region => (
            <SelectItem key={region.value} value={region.value}>
              {region.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select defaultValue="all" className="mt-2">
        <SelectTrigger>
          <SelectValue placeholder="Tous départements" />
        </SelectTrigger>
        <SelectContent>
          {departements.map(departement => (
            <SelectItem key={departement.value} value={departement.value}>
              {departement.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

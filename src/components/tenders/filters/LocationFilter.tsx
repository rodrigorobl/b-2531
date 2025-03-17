
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
  const locations = [
    { value: 'all', label: 'Toutes régions' },
    { value: 'idf', label: 'Île-de-France' },
    { value: 'paca', label: 'PACA' },
    { value: 'aura', label: 'Auvergne-Rhône-Alpes' },
    { value: 'occitanie', label: 'Occitanie' },
    { value: 'bretagne', label: 'Bretagne' },
    { value: 'normandie', label: 'Normandie' },
  ];

  return (
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
  );
}

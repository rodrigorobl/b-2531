
import React from 'react';
import { Building } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export function ProjectTypeFilter() {
  const projectTypes = [
    { value: 'all', label: 'Tous types' },
    { value: 'logement', label: 'Logement' },
    { value: 'tertiaire', label: 'Tertiaire' },
    { value: 'industriel', label: 'Industriel' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'public', label: 'Équipement public' },
    { value: 'hotellerie', label: 'Hôtellerie' },
  ];

  return (
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
  );
}

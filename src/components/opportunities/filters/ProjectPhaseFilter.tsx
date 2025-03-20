
import React from 'react';
import { Clock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export function ProjectPhaseFilter() {
  const phases = [
    { value: 'all', label: 'Toutes phases' },
    { value: 'conception', label: 'Conception' },
    { value: 'consultation', label: 'Consultation des entreprises' },
    { value: 'travaux', label: 'Travaux en cours' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Clock size={16} className="text-muted-foreground" />
        <Label>Phase du projet</Label>
      </div>
      <Select defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Toutes phases" />
        </SelectTrigger>
        <SelectContent>
          {phases.map(phase => (
            <SelectItem key={phase.value} value={phase.value}>
              {phase.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

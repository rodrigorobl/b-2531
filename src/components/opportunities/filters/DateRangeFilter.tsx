
import React from 'react';
import { Calendar } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function DateRangeFilter() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Calendar size={16} className="text-muted-foreground" />
        <Label>Calendrier</Label>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Début du projet</Label>
          <Input type="date" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Livraison prévue</Label>
          <Input type="date" />
        </div>
      </div>
    </div>
  );
}

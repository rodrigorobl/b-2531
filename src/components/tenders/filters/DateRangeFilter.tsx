
import React from 'react';
import { Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function DateRangeFilter() {
  return (
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
  );
}

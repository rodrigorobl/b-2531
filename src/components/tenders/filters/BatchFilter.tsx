
import React from 'react';
import { Layers } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function BatchFilter() {
  return (
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
  );
}

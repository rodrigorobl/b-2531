
import React from 'react';
import { Users } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function ClientFilter() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Users size={16} className="text-muted-foreground" />
        <Label>Promoteurs / MOA</Label>
      </div>
      <Input 
        type="text" 
        placeholder="Rechercher un promoteur..."
      />
    </div>
  );
}


import React from 'react';
import { Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ClientSearchFilter() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Users size={16} className="text-muted-foreground" />
        <Label>MOA / BET concernés</Label>
      </div>
      <Input placeholder="Saisir un nom" />
    </div>
  );
}

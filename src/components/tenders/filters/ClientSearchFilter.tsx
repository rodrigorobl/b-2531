
import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ClientSearchFilter() {
  const [clientName, setClientName] = useState('');

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Users size={16} />
        <h4 className="font-medium">Maître d'ouvrage</h4>
      </div>
      <div className="space-y-1">
        <Label htmlFor="client-name">Rechercher par nom</Label>
        <Input 
          id="client-name"
          placeholder="Nom du maître d'ouvrage"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function BatchFilter() {
  const [batchNumber, setBatchNumber] = useState('');

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Layers size={16} />
        <h4 className="font-medium">Numéro de lot</h4>
      </div>
      <div className="space-y-1">
        <Label htmlFor="batch-number">Entrez le numéro de lot</Label>
        <Input 
          id="batch-number"
          placeholder="Ex: LOT-2023-001"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
        />
      </div>
    </div>
  );
}

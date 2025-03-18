
import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function BatchFilter() {
  const [selectedLots, setSelectedLots] = useState<string[]>([]);
  
  const lots = [
    { id: 'gros-oeuvre', label: 'Gros Œuvre' },
    { id: 'plomberie', label: 'Plomberie' },
    { id: 'electricite', label: 'Électricité' },
    { id: 'vrd', label: 'VRD' },
    { id: 'peinture', label: 'Peinture' },
    { id: 'menuiserie', label: 'Menuiserie' },
    { id: 'cvc', label: 'CVC' },
    { id: 'facades', label: 'Façades' },
    { id: 'charpente', label: 'Charpente' },
    { id: 'isolation', label: 'Isolation' }
  ];

  const handleLotChange = (lotId: string, checked: boolean) => {
    if (checked) {
      setSelectedLots(prev => [...prev, lotId]);
    } else {
      setSelectedLots(prev => prev.filter(id => id !== lotId));
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Layers size={16} />
        <h4 className="font-medium">Lots recherchés</h4>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {lots.map((lot) => (
          <div key={lot.id} className="flex items-center space-x-2">
            <Checkbox 
              id={lot.id}
              checked={selectedLots.includes(lot.id)}
              onCheckedChange={(checked) => handleLotChange(lot.id, checked === true)}
            />
            <Label 
              htmlFor={lot.id}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {lot.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

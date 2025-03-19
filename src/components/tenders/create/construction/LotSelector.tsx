
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface LotSelectorProps {
  form: UseFormReturn<any>;
}

const LotSelector: React.FC<LotSelectorProps> = ({ form }) => {
  const formLots = form.getValues('construction.lots' as any);
  
  // Define standard construction lots if none exist
  const standardLots = [
    { name: 'Gros Œuvre', description: 'Fondations, structure, maçonnerie', selected: false },
    { name: 'Charpente/Couverture', description: 'Éléments de structure et de toiture', selected: false },
    { name: 'CVC', description: 'Chauffage, ventilation, climatisation', selected: false },
    { name: 'Plomberie', description: 'Installation des réseaux d\'eau', selected: false },
    { name: 'Électricité', description: 'Installation des réseaux électriques', selected: false },
    { name: 'Menuiserie', description: 'Portes, fenêtres, aménagements intérieurs', selected: false },
    { name: 'Peinture', description: 'Peinture, revêtements muraux', selected: false },
    { name: 'Revêtements de sols', description: 'Carrelage, parquet, moquette', selected: false },
    { name: 'VRD', description: 'Voirie et réseaux divers', selected: false }
  ];

  const initialLots = Array.isArray(formLots) && formLots.length > 0 
    ? formLots 
    : standardLots;

  const [lots, setLots] = useState(initialLots);
  const [newLotName, setNewLotName] = useState('');
  const [newLotDescription, setNewLotDescription] = useState('');

  const checkIfLotExists = (name: string) => {
    if (!Array.isArray(lots)) return false;
    return lots.some(lot => lot.name.toLowerCase() === name.toLowerCase());
  };

  const handleSelectLot = (index: number, checked: boolean) => {
    const updatedLots = [...lots];
    updatedLots[index].selected = checked;
    
    setLots(updatedLots);
    form.setValue('construction.lots' as any, updatedLots);
  };

  const handleAddCustomLot = () => {
    if (!newLotName.trim() || checkIfLotExists(newLotName)) return;
    
    const newLot = {
      name: newLotName,
      description: newLotDescription,
      selected: true
    };
    
    const updatedLots = [...lots, newLot];
    setLots(updatedLots);
    form.setValue('construction.lots' as any, updatedLots);
    
    // Reset inputs
    setNewLotName('');
    setNewLotDescription('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Lots de construction</h3>
      <p className="text-sm text-muted-foreground">
        Sélectionnez les lots pour votre projet de construction
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Array.isArray(lots) && lots.map((lot, index) => (
          <div key={index} className="flex items-start space-x-2 border p-3 rounded-md">
            <Checkbox 
              id={`lot-${index}`} 
              checked={lot.selected}
              onCheckedChange={(checked) => handleSelectLot(index, !!checked)}
            />
            <div className="grid gap-1 flex-1">
              <Label htmlFor={`lot-${index}`} className="font-medium">{lot.name}</Label>
              {lot.description && <p className="text-sm text-muted-foreground">{lot.description}</p>}
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="text-base font-medium mb-3">Ajouter un lot personnalisé</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Label htmlFor="newLotName" className="mb-2 block">Nom du lot</Label>
            <Input
              id="newLotName"
              placeholder="Ex: Ascenseurs"
              value={newLotName}
              onChange={(e) => setNewLotName(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="newLotDescription" className="mb-2 block">Description</Label>
            <Input
              id="newLotDescription"
              placeholder="Installation et maintenance des ascenseurs"
              value={newLotDescription}
              onChange={(e) => setNewLotDescription(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button 
              onClick={handleAddCustomLot}
              disabled={!newLotName.trim() || checkIfLotExists(newLotName)}
            >
              Ajouter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotSelector;

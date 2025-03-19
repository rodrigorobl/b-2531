
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import { TenderFormProps } from '../TenderFormProps';

interface Lot {
  name: string;
  description?: string;
  selected: boolean;
}

const LotSelector: React.FC<TenderFormProps> = ({ form }) => {
  const [newLotName, setNewLotName] = useState('');
  
  const lots = form.getValues('construction.lots' as any) || [];
  
  const handleAddLot = () => {
    if (!newLotName.trim()) return;
    
    const newLot: Lot = {
      name: newLotName,
      selected: true
    };
    
    const updatedLots = [...(Array.isArray(lots) ? lots : []), newLot];
    form.setValue('construction.lots' as any, updatedLots);
    setNewLotName('');
  };
  
  const handleLotSelection = (index: number, selected: boolean) => {
    if (!Array.isArray(lots)) return;
    
    const updatedLots = [...lots];
    updatedLots[index] = {
      ...updatedLots[index],
      selected
    };
    
    form.setValue('construction.lots' as any, updatedLots);
  };
  
  const handleRemoveLot = (index: number) => {
    if (!Array.isArray(lots)) return;
    
    const updatedLots = lots.filter((_, i) => i !== index);
    form.setValue('construction.lots' as any, updatedLots);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Label htmlFor="newLot">Ajouter un lot</Label>
          <Input 
            id="newLot"
            placeholder="Nom du lot" 
            value={newLotName} 
            onChange={(e) => setNewLotName(e.target.value)} 
          />
        </div>
        <Button type="button" onClick={handleAddLot}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>
      
      {Array.isArray(lots) && lots.length > 0 ? (
        <div className="space-y-2">
          <Label>Lots disponibles</Label>
          <div className="border rounded-md p-2">
            {lots.map((lot, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center">
                  <Checkbox 
                    id={`lot-${index}`}
                    checked={lot.selected}
                    onCheckedChange={(checked) => handleLotSelection(index, Boolean(checked))}
                    className="mr-2"
                  />
                  <Label htmlFor={`lot-${index}`} className="cursor-pointer">
                    {lot.name}
                  </Label>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveLot(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground italic">
          Aucun lot n'a été ajouté pour ce projet.
        </div>
      )}
    </div>
  );
};

export default LotSelector;

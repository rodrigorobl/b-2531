
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash, ChevronsUpDown } from "lucide-react";
import { TenderFormProps } from '../TenderFormProps';
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Lot {
  name: string;
  description?: string;
  selected: boolean;
  budget?: number;
}

const commonLots = [
  "Gros Œuvre",
  "Étanchéité",
  "Charpente",
  "Couverture",
  "Menuiseries extérieures",
  "Menuiseries intérieures",
  "Plâtrerie",
  "Peinture",
  "Carrelage",
  "Revêtement de sol",
  "Électricité",
  "Plomberie",
  "Chauffage",
  "Ventilation",
  "VRD",
  "Espaces verts",
  "Démolition",
  "Isolation",
  "Serrurerie",
  "Ascenseur"
];

const LotSelector: React.FC<TenderFormProps<any>> = ({ form }) => {
  const [newLotName, setNewLotName] = useState('');
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  // Ensure lots is always an array, even if the form value is undefined
  const lotsValue = form.getValues('construction.lots' as any);
  const lots = Array.isArray(lotsValue) ? lotsValue : [];
  
  const handleAddLot = () => {
    if (!newLotName.trim()) return;
    
    const newLot: Lot = {
      name: newLotName,
      selected: true,
      budget: undefined
    };
    
    const updatedLots = [...lots, newLot];
    form.setValue('construction.lots' as any, updatedLots);
    setNewLotName('');
  };
  
  const handleLotSelection = (index: number, selected: boolean) => {
    const updatedLots = [...lots];
    updatedLots[index] = {
      ...updatedLots[index],
      selected
    };
    
    form.setValue('construction.lots' as any, updatedLots);
  };
  
  const handleRemoveLot = (index: number) => {
    const updatedLots = lots.filter((_, i) => i !== index);
    form.setValue('construction.lots' as any, updatedLots);
  };

  const handleBudgetChange = (index: number, budget: string) => {
    const numericBudget = budget === '' ? undefined : parseFloat(budget);
    
    const updatedLots = [...lots];
    updatedLots[index] = {
      ...updatedLots[index],
      budget: numericBudget
    };
    
    form.setValue('construction.lots' as any, updatedLots);
  };

  // Make sure filteredLots is always an array
  const filteredLots = inputValue === ''
    ? [...commonLots]
    : commonLots.filter((lot) =>
        lot.toLowerCase().includes(inputValue.toLowerCase())
      );
  
  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Label htmlFor="newLot">Ajouter un lot</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
                type="button"
              >
                {newLotName || "Sélectionner ou saisir un lot"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput 
                  placeholder="Rechercher un lot..." 
                  onValueChange={(value) => {
                    setInputValue(value);
                    setNewLotName(value);
                  }}
                />
                <CommandList>
                  <CommandEmpty>Aucun lot trouvé. Vous pouvez créer "{inputValue}"</CommandEmpty>
                  {filteredLots.length > 0 && (
                    <CommandGroup>
                      {filteredLots.map((lot) => (
                        <CommandItem
                          key={lot}
                          value={lot}
                          onSelect={(currentValue) => {
                            setNewLotName(currentValue);
                            setOpen(false);
                          }}
                        >
                          {lot}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Button type="button" onClick={handleAddLot}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>
      
      {lots.length > 0 ? (
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
                <div className="flex items-center gap-2">
                  <div className="w-36">
                    <Input
                      type="number"
                      placeholder="Budget (€)"
                      value={lot.budget || ''}
                      onChange={(e) => handleBudgetChange(index, e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveLot(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    type="button"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
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

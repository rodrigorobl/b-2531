
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface BuildingManagerProps {
  form: UseFormReturn<TenderFormValues>;
}

const BuildingManager: React.FC<BuildingManagerProps> = ({ form }) => {
  // State for managing building information
  const initialBuildings = form.getValues('construction.buildings') || [];
  // Ensure that the initial buildings have all required properties with default values if missing
  const safeInitialBuildings = initialBuildings.map(building => ({
    id: building.id || `building-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    levels: building.levels || 0
  }));
  
  const [buildings, setBuildings] = useState<Array<{id: string, levels: number}>>(safeInitialBuildings);
  const [newBuilding, setNewBuilding] = useState({ levels: 0 });
  
  const addBuilding = () => {
    if (newBuilding.levels < 0) return;
    
    const newBuildingItem = {
      id: `building-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      levels: newBuilding.levels
    };
    
    const updatedBuildings = [...buildings, newBuildingItem];
    setBuildings(updatedBuildings);
    form.setValue('construction.buildings', updatedBuildings);
    setNewBuilding({ levels: 0 });
  };
  
  const removeBuilding = (id: string) => {
    const updatedBuildings = buildings.filter(building => building.id !== id);
    setBuildings(updatedBuildings);
    form.setValue('construction.buildings', updatedBuildings);
  };

  return (
    <div className="space-y-2">
      <Label className="text-lg font-medium">Bâtiments</Label>
      <div className="space-y-3">
        {buildings.map((building) => (
          <div key={building.id} className="flex items-center p-3 border rounded-md bg-background">
            <div className="flex-1">
              <div className="font-medium">Bâtiment</div>
              <div className="text-sm text-muted-foreground">
                {building.levels === 0 ? 'Rez-de-chaussée' : `R+${building.levels}`}
              </div>
            </div>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={() => removeBuilding(building.id)}
            >
              <Trash2 size={16} className="text-destructive" />
            </Button>
          </div>
        ))}
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="buildingLevels" className="whitespace-nowrap">Nombre de niveaux:</Label>
            <Select 
              value={String(newBuilding.levels)}
              onValueChange={(value) => setNewBuilding({ ...newBuilding, levels: parseInt(value) })}
            >
              <SelectTrigger id="buildingLevels" className="w-full">
                <SelectValue placeholder="Niveaux" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">RDC (R+0)</SelectItem>
                <SelectItem value="1">R+1</SelectItem>
                <SelectItem value="2">R+2</SelectItem>
                <SelectItem value="3">R+3</SelectItem>
                <SelectItem value="4">R+4</SelectItem>
                <SelectItem value="5">R+5</SelectItem>
                <SelectItem value="6">R+6</SelectItem>
                <SelectItem value="7">R+7</SelectItem>
                <SelectItem value="8">R+8</SelectItem>
                <SelectItem value="9">R+9</SelectItem>
                <SelectItem value="10">R+10 ou plus</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="button" 
            onClick={addBuilding}
            size="default"
          >
            <Plus size={16} className="mr-2" />
            Ajouter un bâtiment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuildingManager;

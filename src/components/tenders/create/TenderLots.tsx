
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Search } from 'lucide-react';

interface TenderLotsProps {
  form: UseFormReturn<any>;
}

const TenderLots: React.FC<TenderLotsProps> = ({ form }) => {
  const [lotSearchQuery, setLotSearchQuery] = useState('');
  
  // Initialize selected lots from form or empty object
  const existingLots = form.getValues('construction.lots' as any);
  const initialSelectedLots: {[key: string]: boolean} = {};
  
  if (existingLots && Array.isArray(existingLots)) {
    existingLots.forEach(lot => {
      // Find the lot ID by matching the name
      const lotId = constructionLots.find(l => l.name === lot.name)?.id;
      if (lotId) initialSelectedLots[lotId] = true;
    });
  }
  
  const [selectedLots, setSelectedLots] = useState<{[key: string]: boolean}>(initialSelectedLots);
  
  const constructionLots = [
    { id: "lot-1", name: "Gros œuvre", description: "Fondations, structures porteuses, maçonnerie" },
    { id: "lot-2", name: "Charpente", description: "Structures de toit et supports" },
    { id: "lot-3", name: "Couverture", description: "Toiture et étanchéité" },
    { id: "lot-4", name: "Menuiseries extérieures", description: "Fenêtres, portes, façades" },
    { id: "lot-5", name: "Menuiseries intérieures", description: "Portes, cloisons, aménagements" },
    { id: "lot-6", name: "Plomberie", description: "Alimentation et évacuation d'eau" },
    { id: "lot-7", name: "Électricité", description: "Installation électrique et réseau" },
    { id: "lot-8", name: "CVC", description: "Chauffage, ventilation, climatisation" },
    { id: "lot-9", name: "Isolation", description: "Isolation thermique et acoustique" },
    { id: "lot-10", name: "Peinture", description: "Peinture et revêtements muraux" },
    { id: "lot-11", name: "VRD", description: "Voirie et réseaux divers" },
    { id: "lot-12", name: "Façades", description: "Revêtements et traitements des façades" },
    { id: "lot-13", name: "Sols", description: "Carrelage, parquet, revêtements de sol" }
  ];
  
  const toggleLot = (lotId: string) => {
    const newSelectedLots = {
      ...selectedLots,
      [lotId]: !selectedLots[lotId]
    };
    
    setSelectedLots(newSelectedLots);
    
    const formattedLots = constructionLots
      .filter(lot => newSelectedLots[lot.id])
      .map(lot => ({
        name: lot.name,
        description: lot.description,
        selected: true
      }));
    
    form.setValue('construction.lots' as any, formattedLots);
  };

  // Filter lots based on search query
  const filteredLots = constructionLots.filter(lot => 
    lot.name.toLowerCase().includes(lotSearchQuery.toLowerCase()) ||
    (lot.description && lot.description.toLowerCase().includes(lotSearchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-lg font-medium">Lots de travaux concernés</Label>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un lot..."
            className="pl-8"
            value={lotSearchQuery}
            onChange={(e) => setLotSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          {filteredLots.map((lot) => (
            <div key={lot.id} className="flex items-start space-x-2 border p-3 rounded-md">
              <Checkbox 
                id={lot.id} 
                checked={selectedLots[lot.id] || false}
                onCheckedChange={() => toggleLot(lot.id)}
              />
              <div className="grid gap-1.5">
                <label
                  htmlFor={lot.id}
                  className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {lot.name}
                </label>
                <p className="text-sm text-muted-foreground">
                  {lot.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TenderLots;

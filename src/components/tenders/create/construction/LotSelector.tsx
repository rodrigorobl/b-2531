
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from 'lucide-react';

interface LotSelectorProps {
  form: UseFormReturn<TenderFormValues>;
}

const LotSelector: React.FC<LotSelectorProps> = ({ form }) => {
  const [lotSearchQuery, setLotSearchQuery] = useState('');
  
  // Initialize selected lots from form values
  const existingLots = form.getValues('construction.lots') || [];
  const initialSelectedLots: { [key: string]: boolean } = {};
  
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
  
  // Create mapping from existing form values
  constructionLots.forEach(lot => {
    const isSelected = existingLots.some(existing => existing.name === lot.name);
    initialSelectedLots[lot.id] = isSelected;
  });
  
  const [selectedLots, setSelectedLots] = useState<{[key: string]: boolean}>(initialSelectedLots);
  
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
    
    form.setValue('construction.lots', formattedLots);
  };

  // Filter lots based on search query
  const filteredLots = constructionLots.filter(lot => 
    lot.name.toLowerCase().includes(lotSearchQuery.toLowerCase()) ||
    (lot.description && lot.description.toLowerCase().includes(lotSearchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Rechercher un lot..."
          value={lotSearchQuery}
          onChange={(e) => setLotSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <div className="space-y-2">
        {filteredLots.map((lot) => (
          <div 
            key={lot.id}
            className={`p-3 border rounded-md cursor-pointer ${
              selectedLots[lot.id] ? 'border-primary bg-primary/10' : 'hover:bg-secondary'
            }`}
            onClick={() => toggleLot(lot.id)}
          >
            <div className="flex items-start gap-2">
              <Checkbox 
                checked={selectedLots[lot.id] || false}
                onCheckedChange={() => toggleLot(lot.id)}
                className="mt-1"
              />
              <div>
                <div className="font-medium">{lot.name}</div>
                {lot.description && (
                  <div className="text-sm text-muted-foreground">{lot.description}</div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {filteredLots.length === 0 && (
          <div className="text-center p-4 text-muted-foreground">
            Aucun lot correspondant à votre recherche
          </div>
        )}
      </div>
    </div>
  );
};

export default LotSelector;

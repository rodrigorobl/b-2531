
import React, { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface ProjectUsageSelectorProps {
  form: UseFormReturn<TenderFormValues>;
}

const ProjectUsageSelector: React.FC<ProjectUsageSelectorProps> = ({ form }) => {
  const projectUsages = [
    { id: "usage-1", name: "Logements", description: "Appartements, maisons individuelles" },
    { id: "usage-2", name: "Bureaux", description: "Espaces de travail, coworking" },
    { id: "usage-3", name: "Hôtel", description: "Hébergement touristique" },
    { id: "usage-4", name: "Commerce", description: "Magasins, centres commerciaux" },
    { id: "usage-5", name: "Restaurant", description: "Restauration, cafés" },
    { id: "usage-6", name: "Santé", description: "Hôpitaux, cliniques, EHPAD" },
    { id: "usage-7", name: "Enseignement", description: "Écoles, universités" },
    { id: "usage-8", name: "Sport", description: "Gymnases, terrains sportifs" },
    { id: "usage-9", name: "Culture", description: "Théâtres, musées, salles de spectacle" },
    { id: "usage-10", name: "Industrie", description: "Usines, entrepôts" },
    { id: "usage-11", name: "Data center", description: "Centres de données informatiques" },
    { id: "usage-12", name: "Mixte", description: "Combinaison de plusieurs usages" }
  ];
  
  // Initialize selected usages from form values
  const existingUsages = form.getValues('construction.usages') || [];
  const initialSelectedUsages: { [key: string]: boolean } = {};
  
  // Create mapping from existing form values
  projectUsages.forEach(usage => {
    const isSelected = existingUsages.some(existing => existing.name === usage.name);
    initialSelectedUsages[usage.id] = isSelected;
  });
  
  const [selectedUsages, setSelectedUsages] = useState<{[key: string]: boolean}>(initialSelectedUsages);
  
  useEffect(() => {
    // Make sure form has initialized usages
    const formattedUsages = projectUsages
      .filter(usage => selectedUsages[usage.id])
      .map(usage => ({
        name: usage.name,
        description: usage.description
      }));
    
    form.setValue('construction.usages', formattedUsages);
  }, []);
  
  const toggleUsage = (usageId: string) => {
    const newSelectedUsages = {
      ...selectedUsages,
      [usageId]: !selectedUsages[usageId]
    };
    
    setSelectedUsages(newSelectedUsages);
    
    const formattedUsages = projectUsages
      .filter(usage => newSelectedUsages[usage.id])
      .map(usage => ({
        name: usage.name,
        description: usage.description
      }));
    
    form.setValue('construction.usages', formattedUsages);
  };

  return (
    <div className="space-y-2">
      <Label className="text-lg font-medium">Usage du projet</Label>
      <p className="text-sm text-muted-foreground mb-2">Sélectionnez un ou plusieurs usages pour votre projet</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {projectUsages.map((usage) => (
          <div 
            key={usage.id} 
            className={`border rounded-md p-3 cursor-pointer transition-colors ${
              selectedUsages[usage.id] ? 'bg-primary/10 border-primary' : 'hover:bg-secondary'
            }`}
            onClick={() => toggleUsage(usage.id)}
          >
            <div className="flex items-start gap-2">
              <Checkbox 
                checked={selectedUsages[usage.id] || false}
                onCheckedChange={() => toggleUsage(usage.id)}
                className="mt-1"
              />
              <div>
                <div className="font-medium">{usage.name}</div>
                <div className="text-xs text-muted-foreground">{usage.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {Object.values(selectedUsages).some(Boolean) && (
        <div className="flex flex-wrap gap-2 mt-3">
          {projectUsages
            .filter(usage => selectedUsages[usage.id])
            .map(usage => (
              <Badge key={usage.id} variant="outline" className="flex items-center gap-1">
                {usage.name}
                <button 
                  type="button" 
                  className="ml-1 text-muted-foreground hover:text-destructive"
                  onClick={() => toggleUsage(usage.id)}
                >
                  <span className="sr-only">Supprimer</span>
                  &times;
                </button>
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProjectUsageSelector;

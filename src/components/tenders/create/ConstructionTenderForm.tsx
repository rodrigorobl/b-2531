import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Plus, Trash2, User, Users, Search, Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface ConstructionTenderFormProps {
  form: UseFormReturn<TenderFormValues>;
}

const ConstructionTenderForm: React.FC<ConstructionTenderFormProps> = ({ form }) => {
  // State for managing building information
  const [buildings, setBuildings] = useState<Array<{id: string, levels: number}>>([]);
  const [newBuilding, setNewBuilding] = useState({ levels: 0 });
  
  // Team members management
  const [newTeamMember, setNewTeamMember] = useState({ name: '', role: 'architecte' });
  const [projectTeam, setProjectTeam] = useState<Array<{name: string, role: string}>>([]);
  
  // Lots management
  const [lotSearchQuery, setLotSearchQuery] = useState('');
  const [selectedLots, setSelectedLots] = useState<{[key: string]: boolean}>({});
  
  // Project usage management
  const [selectedUsages, setSelectedUsages] = useState<{[key: string]: boolean}>({});
  
  const teamRoles = [
    { value: 'architecte', label: 'Architecte' },
    { value: 'bet-structure', label: 'BET Structure' },
    { value: 'bet-fluides', label: 'BET Fluides' },
    { value: 'bet-electricite', label: 'BET Électricité' },
    { value: 'bet-thermique', label: 'BET Thermique' },
    { value: 'acousticien', label: 'Acousticien' },
    { value: 'bureau-controle', label: 'Bureau de contrôle' },
    { value: 'coordinateur-sps', label: 'Coordinateur SPS' },
    { value: 'economiste', label: 'Économiste' },
    { value: 'paysagiste', label: 'Paysagiste' },
    { value: 'autre', label: 'Autre' }
  ];
  
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

  const addTeamMember = () => {
    if (newTeamMember.name.trim() === '') return;
    
    const updatedTeam = [...projectTeam, { 
      name: newTeamMember.name, 
      role: newTeamMember.role 
    }];
    
    setProjectTeam(updatedTeam);
    form.setValue('construction.projectTeam', updatedTeam);
    setNewTeamMember({ name: '', role: 'architecte' });
  };
  
  const removeTeamMember = (index: number) => {
    const updatedTeam = [...projectTeam];
    updatedTeam.splice(index, 1);
    setProjectTeam(updatedTeam);
    form.setValue('construction.projectTeam', updatedTeam);
  };
  
  const addBuilding = () => {
    if (newBuilding.levels < 0) return;
    
    const newBuildingItem = {
      id: `building-${Date.now()}`,
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="constructionType">Nature des travaux</Label>
          <Select
            onValueChange={(value) => form.setValue("construction.constructionType", value as any)}
            defaultValue={form.getValues("construction.constructionType")}
          >
            <SelectTrigger id="constructionType">
              <SelectValue placeholder="Sélectionnez la nature des travaux" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="neuf">Construction neuve</SelectItem>
              <SelectItem value="réhabilitation">Réhabilitation</SelectItem>
              <SelectItem value="extension">Extension</SelectItem>
              <SelectItem value="renovation">Rénovation</SelectItem>
              <SelectItem value="demolition">Démolition</SelectItem>
              <SelectItem value="amenagement">Aménagement</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="area">Surface totale (m²)</Label>
          <Input
            id="area"
            type="text"
            placeholder="Ex: 2500"
            {...form.register("construction.area")}
          />
        </div>
      </div>
      
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
      
      <div className="space-y-2">
        <Label htmlFor="planning">Planning prévisionnel des travaux</Label>
        <Textarea
          id="planning"
          placeholder="Décrivez les principales phases et durées des travaux..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default ConstructionTenderForm;

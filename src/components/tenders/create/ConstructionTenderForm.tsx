
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Plus, Trash2, User, Users } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface ConstructionTenderFormProps {
  form: UseFormReturn<TenderFormValues>;
}

const ConstructionTenderForm: React.FC<ConstructionTenderFormProps> = ({ form }) => {
  const [newTeamMember, setNewTeamMember] = useState({ name: '', role: 'architecte' });
  const [projectTeam, setProjectTeam] = useState<Array<{name: string, role: string}>>([]);
  
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
  
  const [selectedLots, setSelectedLots] = useState<{[key: string]: boolean}>({});
  
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
        <div className="flex items-center gap-2">
          <Users size={18} />
          <Label className="text-lg font-medium">Équipe de projet</Label>
        </div>
        
        <div className="space-y-3 mt-2">
          {projectTeam.map((member, index) => (
            <div key={index} className="flex items-center p-3 border rounded-md bg-background">
              <div className="flex-1">
                <div className="font-medium">{member.name}</div>
                <div className="text-sm text-muted-foreground">
                  {teamRoles.find(role => role.value === member.role)?.label || member.role}
                </div>
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => removeTeamMember(index)}
              >
                <Trash2 size={16} className="text-destructive" />
              </Button>
            </div>
          ))}
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,auto] gap-2">
            <Input 
              placeholder="Nom de l'entreprise ou du contact" 
              value={newTeamMember.name}
              onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
            />
            
            <Select 
              value={newTeamMember.role}
              onValueChange={(value) => setNewTeamMember({ ...newTeamMember, role: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {teamRoles.map(role => (
                  <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              type="button" 
              onClick={addTeamMember}
              size="icon"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="text-lg font-medium">Lots de travaux concernés</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          {constructionLots.map((lot) => (
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

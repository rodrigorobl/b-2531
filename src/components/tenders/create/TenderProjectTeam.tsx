
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Users } from 'lucide-react';

interface TenderProjectTeamProps {
  form: UseFormReturn<TenderFormValues>;
}

const TenderProjectTeam: React.FC<TenderProjectTeamProps> = ({ form }) => {
  const [newTeamMember, setNewTeamMember] = useState({ name: '', role: 'architecte' });
  const [projectTeam, setProjectTeam] = useState<Array<{name: string, role: string}>>(
    form.getValues('construction.projectTeam') || []
  );
  
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
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Users size={18} />
          <Label className="text-lg font-medium">Équipe de projet</Label>
        </div>
        
        <p className="text-muted-foreground">
          Ajoutez les membres de l'équipe de projet (architecte, bureaux d'études, etc.)
        </p>
        
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
    </div>
  );
};

export default TenderProjectTeam;

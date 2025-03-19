
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { TenderFormProps } from './TenderFormProps';

interface TeamMember {
  name: string;
  role: string;
}

const TenderProjectTeam: React.FC<TenderFormProps> = ({ form }) => {
  const [newMember, setNewMember] = useState<TeamMember>({ name: '', role: '' });
  
  const projectTeam = form.getValues('construction.projectTeam' as any) || [];
  
  const handleAddMember = () => {
    if (!newMember.name.trim() || !newMember.role.trim()) return;
    
    const updatedTeam = Array.isArray(projectTeam) 
      ? [...projectTeam, { ...newMember }] 
      : [{ ...newMember }];
    
    form.setValue('construction.projectTeam' as any, updatedTeam);
    setNewMember({ name: '', role: '' });
  };
  
  const handleRemoveMember = (index: number) => {
    if (!Array.isArray(projectTeam)) return;
    
    const updatedTeam = projectTeam.filter((_, i) => i !== index);
    form.setValue('construction.projectTeam' as any, updatedTeam);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Équipe du projet</h2>
        <p className="text-muted-foreground mt-1">
          Ajoutez les principaux membres de l'équipe de conception et de maîtrise d'œuvre
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <Label htmlFor="memberName">Nom / Société</Label>
          <Input 
            id="memberName"
            placeholder="Cabinet d'architecture XYZ"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          />
        </div>
        
        <div className="flex-1">
          <Label htmlFor="memberRole">Rôle</Label>
          <Input 
            id="memberRole"
            placeholder="Architecte"
            value={newMember.role}
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
          />
        </div>
        
        <div className="flex items-end">
          <Button type="button" onClick={handleAddMember}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </div>
      </div>
      
      {Array.isArray(projectTeam) && projectTeam.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Nom / Société</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rôle</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {projectTeam.map((member, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap">{member.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{member.role}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveMember(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-6 border rounded-md text-muted-foreground">
          Aucun membre d'équipe ajouté
        </div>
      )}
    </div>
  );
};

export default TenderProjectTeam;

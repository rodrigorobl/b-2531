
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ProjectTeamMember {
  name: string;
  role: string;
}

interface TenderProjectTeamProps {
  form: UseFormReturn<any>;
}

const TenderProjectTeam: React.FC<TenderProjectTeamProps> = ({ form }) => {
  // Initialize team members from form or empty array
  const existingTeam = form.getValues('construction.projectTeam' as any);
  
  let initialTeam: ProjectTeamMember[] = [];
  if (existingTeam && Array.isArray(existingTeam)) {
    initialTeam = existingTeam.map(member => ({
      name: member.name || '',
      role: member.role || ''
    }));
  }
  
  const [teamMembers, setTeamMembers] = useState<ProjectTeamMember[]>(initialTeam);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');
  
  const addTeamMember = () => {
    if (!newMemberName.trim() || !newMemberRole.trim()) return;
    
    const newTeamMember = {
      name: newMemberName,
      role: newMemberRole
    };
    
    const updatedTeam = [...teamMembers, newTeamMember];
    setTeamMembers(updatedTeam);
    
    form.setValue('construction.projectTeam' as any, updatedTeam);
    
    // Reset input fields
    setNewMemberName('');
    setNewMemberRole('');
  };
  
  const removeTeamMember = (index: number) => {
    const updatedTeam = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedTeam);
    form.setValue('construction.projectTeam' as any, updatedTeam);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Équipe projet</h2>
        <p className="text-muted-foreground mt-1">
          Définissez les membres clés de l'équipe projet
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Label htmlFor="memberName" className="mb-2 block">Nom du membre</Label>
            <Input
              id="memberName"
              placeholder="Jean Dupont"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="memberRole" className="mb-2 block">Rôle</Label>
            <Input
              id="memberRole"
              placeholder="Architecte"
              value={newMemberRole}
              onChange={(e) => setNewMemberRole(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button 
              onClick={addTeamMember}
              disabled={!newMemberName.trim() || !newMemberRole.trim()}
              className="mb-0 h-10"
            >
              Ajouter
            </Button>
          </div>
        </div>
        
        {teamMembers.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Nom</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rôle</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y divide-border">
                {teamMembers.map((member, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap">{member.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{member.role}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeTeamMember(index)}
                      >
                        <X size={16} />
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
    </div>
  );
};

export default TenderProjectTeam;

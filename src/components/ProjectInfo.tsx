
import React, { useState } from 'react';
import UserProfileDialog from './UserProfileDialog';
import { InfoTabs } from './project-info/InfoTabs';

interface ProjectInfoProps {
  info: {
    description: string;
    surface: string;
    budget: string;
    lots: number;
    startDate: string;
    endDate: string;
    milestones: Array<{
      date: string;
      title: string;
      completed: boolean;
    }>;
    technicalTeam?: Array<{
      role: string;
      name: string;
      company: string;
      contact?: string;
    }>;
  }
}

export default function ProjectInfo({ info }: ProjectInfoProps) {
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    name: string;
    email: string;
    role: string;
    company?: {
      name: string;
      address: string;
      phone: string;
      siret?: string;
    };
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleUserClick = (member: any) => {
    // Créer un objet utilisateur format compatible avec UserProfileDialog
    setSelectedUser({
      id: Math.floor(Math.random() * 1000), // ID aléatoire pour demo
      name: member.name,
      email: member.contact || "",
      role: member.role,
      company: {
        name: member.company,
        address: "Adresse non spécifiée",
        phone: member.contact?.includes('@') ? "Non spécifié" : member.contact || "Non spécifié",
        siret: "Non spécifié"
      }
    });
    setDialogOpen(true);
  };

  return (
    <div className="column h-full animate-fade-in">
      <h2 className="column-header">Informations générales</h2>
      
      <div className="column-content">
        <InfoTabs info={info} onUserSelect={handleUserClick} />
      </div>
      
      <UserProfileDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        user={selectedUser} 
      />
    </div>
  );
}

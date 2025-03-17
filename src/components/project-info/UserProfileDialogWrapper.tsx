
import React, { useState } from 'react';
import UserProfileDialog from '../UserProfileDialog';

interface TechnicalTeamMember {
  role: string;
  name: string;
  company: string;
  contact?: string;
}

interface UserProfileDialogWrapperProps {
  children: React.ReactNode;
  onUserSelect: (member: TechnicalTeamMember) => void;
}

export function UserProfileDialogWrapper({ children, onUserSelect }: UserProfileDialogWrapperProps) {
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

  const handleUserClick = (member: TechnicalTeamMember) => {
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

  // Pass the handleUserClick to the children
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onUserSelect: handleUserClick } as any);
    }
    return child;
  });

  return (
    <>
      {childrenWithProps}
      
      <UserProfileDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        user={selectedUser} 
      />
    </>
  );
}

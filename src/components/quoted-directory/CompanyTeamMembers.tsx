
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Users, 
  UserRound, 
  Mail, 
  Phone, 
  BadgeCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import UserProfileDialog from '@/components/UserProfileDialog';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  avatar: string;
}

interface CompanyTeamMembersProps {
  companyId: string;
}

export default function CompanyTeamMembers({ companyId }: CompanyTeamMembersProps) {
  const navigate = useNavigate();
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  // Mock data for team members
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Jean Dupont',
      title: 'Directeur Général',
      email: 'jean.dupont@architecture-moderne.fr',
      phone: '01 23 45 67 89',
      isAdmin: true,
      avatar: 'https://github.com/shadcn.png'
    },
    {
      id: 2,
      name: 'Marie Martin',
      title: 'Architecte en chef',
      email: 'marie.martin@architecture-moderne.fr',
      phone: '01 23 45 67 90',
      isAdmin: false,
      avatar: 'https://github.com/shadcn.png'
    },
    {
      id: 3,
      name: 'Pierre Lefebvre',
      title: 'Chef de projet',
      email: 'pierre.lefebvre@architecture-moderne.fr',
      phone: '01 23 45 67 91',
      isAdmin: false,
      avatar: 'https://github.com/shadcn.png'
    },
    {
      id: 4,
      name: 'Sophie Bernard',
      title: 'Responsable commerciale',
      email: 'sophie.bernard@architecture-moderne.fr',
      phone: '01 23 45 67 92',
      isAdmin: false,
      avatar: 'https://github.com/shadcn.png'
    },
    {
      id: 5,
      name: 'Thomas Klein',
      title: 'Architecte d\'intérieur',
      email: 'thomas.klein@architecture-moderne.fr',
      phone: '01 23 45 67 93',
      isAdmin: false,
      avatar: 'https://github.com/shadcn.png'
    }
  ];
  
  const handleShowProfile = (member: TeamMember) => {
    setSelectedMember(member);
    setShowProfileDialog(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={18} />
            Membres de l'équipe ({teamMembers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden border hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                        <img 
                          src={member.avatar} 
                          alt={`${member.name} avatar`} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium flex items-center gap-1">
                          {member.name}
                          {member.isAdmin && (
                            <BadgeCheck size={16} className="text-primary" />
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">{member.title}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-muted-foreground" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={14} className="text-muted-foreground" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleShowProfile(member)}
                      >
                        <UserRound size={14} className="mr-1" />
                        Voir le profil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {selectedMember && (
        <UserProfileDialog
          open={showProfileDialog}
          onOpenChange={setShowProfileDialog}
          user={{
            id: selectedMember.id,
            name: selectedMember.name,
            email: selectedMember.email,
            role: selectedMember.title,
            company: {
              name: "Architecture Moderne",
              address: "15 Rue de la Paix, 75001 Paris",
              phone: "01 23 45 67 89",
              siret: "12345678900012"
            }
          }}
        />
      )}
    </>
  );
}

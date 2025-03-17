
import React from 'react';
import { User, Building, DraftingCompass, HardHat } from 'lucide-react';

interface TechnicalTeamMember {
  role: string;
  name: string;
  company: string;
  contact?: string;
}

interface TechnicalTeamTabProps {
  technicalTeam: TechnicalTeamMember[];
  onUserSelect: (member: TechnicalTeamMember) => void;
}

export function TechnicalTeamTab({ technicalTeam, onUserSelect }: TechnicalTeamTabProps) {
  return (
    <>
      <h3 className="text-sm font-semibold">Équipe technique du projet</h3>
      
      <div className="space-y-4">
        {technicalTeam.map((member, index) => (
          <div 
            key={index} 
            className="border rounded-md p-3 cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => onUserSelect(member)}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                {member.role.includes("Architecte") ? (
                  <DraftingCompass size={16} className="text-primary" />
                ) : member.role.includes("Maître d'Œuvre") ? (
                  <HardHat size={16} className="text-primary" />
                ) : member.role.includes("Bureau") ? (
                  <Building size={16} className="text-primary" />
                ) : (
                  <User size={16} className="text-primary" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium">{member.role}</div>
                    <div className="text-xs font-semibold text-muted-foreground">{member.name}</div>
                  </div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building size={12} />
                    <span>{member.company}</span>
                  </div>
                  {member.contact && (
                    <div className="mt-1">
                      {member.contact}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

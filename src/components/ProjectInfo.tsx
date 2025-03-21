
import React, { useState } from 'react';
import { Calendar, TrendingUp, Square, CheckCircle2, FileText, Layers, User, Building, DraftingCompass, HardHat, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import UserProfileDialog from './UserProfileDialog';

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
  };
  onContactClick?: () => void;
}

export default function ProjectInfo({ info, onContactClick }: ProjectInfoProps) {
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

  // Si technicalTeam n'est pas fourni, créer des données de démonstration
  const technicalTeam = info.technicalTeam || [
    { role: "Architecte", name: "Cabinet Durand & Associés", company: "Durand Architecture", contact: "contact@durand-archi.fr" },
    { role: "Maître d'Œuvre", name: "Martin Bernard", company: "MB Ingénierie", contact: "m.bernard@mb-ingenierie.fr" },
    { role: "Bureau de contrôle", name: "Véritas Construction", company: "Groupe Véritas", contact: "controle@veritas.fr" },
    { role: "Bureau d'études Structure", name: "Structure Concept", company: "Structure Concept SAS", contact: "info@structure-concept.fr" },
    { role: "Bureau d'études Fluides", name: "Climatherm", company: "Climatherm Ingénierie", contact: "contact@climatherm.fr" }
  ];

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
      
      <div className="column-content space-y-6">
        <div className="prose prose-sm max-w-none">
          <p>{info.description}</p>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold">Chiffres clés</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                <Square size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Surface</div>
                <div className="font-medium">{info.surface}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                <TrendingUp size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Budget</div>
                <div className="font-medium">{info.budget}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                <Layers size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Lots</div>
                <div className="font-medium">{info.lots}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                <FileText size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Documents</div>
                <div className="font-medium">8 fichiers</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold mb-3">Planning prévisionnel</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Calendar size={14} className="mr-2 text-muted-foreground" />
                <span>Date de début</span>
              </div>
              <span className="font-medium">{info.startDate}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Calendar size={14} className="mr-2 text-muted-foreground" />
                <span>Date de fin</span>
              </div>
              <span className="font-medium">{info.endDate}</span>
            </div>
            
            <div className="pt-2 border-t">
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Étapes clés</h4>
              
              <ul className="space-y-2">
                {info.milestones.map((milestone, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 
                      size={16} 
                      className={`mr-2 mt-0.5 ${milestone.completed ? 'text-status-completed' : 'text-muted-foreground'}`}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{milestone.title}</div>
                      <div className="text-xs text-muted-foreground">{milestone.date}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Équipe technique du projet</h3>
          
          <div className="space-y-4">
            {technicalTeam.map((member, index) => (
              <div 
                key={index} 
                className="border rounded-md p-3 hover:bg-accent/50 transition-colors"
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
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2" 
                      onClick={onContactClick}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contacter
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <UserProfileDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        user={selectedUser} 
      />
    </div>
  );
}

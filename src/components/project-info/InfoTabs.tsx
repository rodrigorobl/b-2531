
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralInfoTab } from './GeneralInfoTab';
import { TechnicalTeamTab } from './TechnicalTeamTab';

interface InfoTabsProps {
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
  onUserSelect: (member: any) => void;
}

export function InfoTabs({ info, onUserSelect }: InfoTabsProps) {
  // Si technicalTeam n'est pas fourni, créer des données de démonstration
  const technicalTeam = info.technicalTeam || [
    { role: "Architecte", name: "Cabinet Durand & Associés", company: "Durand Architecture", contact: "contact@durand-archi.fr" },
    { role: "Maître d'Œuvre", name: "Martin Bernard", company: "MB Ingénierie", contact: "m.bernard@mb-ingenierie.fr" },
    { role: "Bureau de contrôle", name: "Véritas Construction", company: "Groupe Véritas", contact: "controle@veritas.fr" },
    { role: "Bureau d'études Structure", name: "Structure Concept", company: "Structure Concept SAS", contact: "info@structure-concept.fr" },
    { role: "Bureau d'études Fluides", name: "Climatherm", company: "Climatherm Ingénierie", contact: "contact@climatherm.fr" }
  ];

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="general">Général</TabsTrigger>
        <TabsTrigger value="technical-team">Équipe technique</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="space-y-6">
        <GeneralInfoTab info={info} />
      </TabsContent>
      
      <TabsContent value="technical-team" className="space-y-4">
        <TechnicalTeamTab technicalTeam={technicalTeam} onUserSelect={onUserSelect} />
      </TabsContent>
    </Tabs>
  );
}

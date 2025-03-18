
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Users, UserPlus, X } from 'lucide-react';

interface TenderContactsManagerProps {
  form: UseFormReturn<TenderFormValues>;
}

// Sample data for internal team members
const internalTeamMembers = [
  { id: "int-1", name: "Jean Dupont", role: "Directeur de projet" },
  { id: "int-2", name: "Marie Martin", role: "Chargée d'opérations" },
  { id: "int-3", name: "Paul Bernard", role: "Responsable administratif" },
];

// Sample data for external consultants
const externalConsultants = [
  { id: "ext-1", name: "Cabinet ABC", role: "BET Structure", mission: "Études structurelles" },
  { id: "ext-2", name: "Acoustix", role: "Acousticien", mission: "Études acoustiques" },
  { id: "ext-3", name: "EcoConstruct", role: "Économiste", mission: "Économie de la construction" },
];

const TenderContactsManager: React.FC<TenderContactsManagerProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="internal" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="internal" className="flex-1">
            <Users className="mr-2 h-4 w-4" />
            Contacts internes
          </TabsTrigger>
          <TabsTrigger value="external" className="flex-1">
            <User className="mr-2 h-4 w-4" />
            Contacts externes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="internal">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Équipe du promoteur</h3>
                  <Button variant="outline" size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Ajouter un membre
                  </Button>
                </div>

                <div className="divide-y">
                  {internalTeamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <User className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="external">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">BET & MOE associés</h3>
                  <Button variant="outline" size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Ajouter un intervenant
                  </Button>
                </div>

                <div className="divide-y">
                  {externalConsultants.map((consultant) => (
                    <div key={consultant.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <User className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{consultant.name}</p>
                          <p className="text-sm text-muted-foreground">{consultant.role}</p>
                          <p className="text-xs text-muted-foreground">{consultant.mission}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TenderContactsManager;

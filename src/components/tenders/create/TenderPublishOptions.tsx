
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { Calendar, Bell, Users, Lightning } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TenderPublishOptionsProps {
  form: UseFormReturn<TenderFormValues>;
}

const TenderPublishOptions: React.FC<TenderPublishOptionsProps> = ({ form }) => {
  const [publishLater, setPublishLater] = React.useState(false);
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Options de publication</h2>
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <Label htmlFor="publish-later" className="font-medium">Planifier la publication</Label>
            </div>
            <Switch 
              id="publish-later"
              checked={publishLater}
              onCheckedChange={setPublishLater}
            />
          </div>
          {publishLater && (
            <div className="pl-6 mt-2">
              <Input
                type="date"
                className="w-full"
              />
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="h-4 w-4 mr-2 text-primary" />
            <Label htmlFor="auto-reminders" className="font-medium">Relances automatiques</Label>
          </div>
          <Switch id="auto-reminders" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-primary" />
            <Label htmlFor="notifications" className="font-medium">Notifier les entreprises ciblées</Label>
          </div>
          <Switch id="notifications" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Lightning className="h-4 w-4 mr-2 text-primary" />
            <Label htmlFor="ai-suggestions" className="font-medium">Suggestions d'entreprises par IA</Label>
          </div>
          <Switch id="ai-suggestions" defaultChecked />
        </div>
      </div>
      
      <div className="pt-4 mt-4 border-t">
        <h3 className="font-medium mb-2">Après la publication</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start text-muted-foreground">
            <span className="mr-2">•</span>
            Les entreprises correspondant à vos critères seront notifiées
          </li>
          <li className="flex items-start text-muted-foreground">
            <span className="mr-2">•</span>
            Vous recevrez un récapitulatif par email
          </li>
          <li className="flex items-start text-muted-foreground">
            <span className="mr-2">•</span>
            L'IA analysera les réponses pour vous aider dans votre choix
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TenderPublishOptions;

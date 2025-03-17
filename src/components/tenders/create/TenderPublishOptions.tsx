
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Zap, Calendar, Bell, Eye } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/types/tenderFormTypes';
import { useToast } from '@/hooks/use-toast';

interface TenderPublishOptionsProps {
  onPublish?: () => void;
  form?: UseFormReturn<TenderFormValues>;
}

const TenderPublishOptions: React.FC<TenderPublishOptionsProps> = ({ onPublish, form }) => {
  const [publishMode, setPublishMode] = useState('immediate');
  const { toast } = useToast();
  
  const handlePublish = () => {
    if (onPublish) {
      onPublish();
    } else if (form) {
      // If we have a form but no onPublish handler, we can trigger form submission
      toast({
        title: "Publication en cours",
        description: "Votre appel d'offres est en cours de publication.",
      });
      form.handleSubmit((data) => {
        console.log("Publication de l'appel d'offres:", data);
        toast({
          title: "Publication réussie",
          description: "Votre appel d'offres a été publié avec succès.",
        });
      })();
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mode de publication</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            defaultValue="immediate" 
            className="space-y-4"
            value={publishMode}
            onValueChange={setPublishMode}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="immediate" id="immediate" />
              <Label htmlFor="immediate" className="flex items-center">
                <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                <span>Publier immédiatement</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="scheduled" id="scheduled" />
              <Label htmlFor="scheduled" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                <span>Planifier la publication</span>
              </Label>
            </div>
          </RadioGroup>
          
          {publishMode === 'scheduled' && (
            <div className="mt-4 p-3 border rounded-md">
              <Label htmlFor="publish-date" className="block mb-2">Date de publication</Label>
              <input 
                type="datetime-local" 
                id="publish-date" 
                className="w-full p-2 border rounded-md"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notifications et relances</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-reminders" className="flex items-center">
              <Bell className="mr-2 h-4 w-4 text-violet-500" />
              <span>Activer les relances automatiques</span>
            </Label>
            <Switch id="auto-reminders" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="target-notifications" className="flex items-center">
              <Eye className="mr-2 h-4 w-4 text-green-500" />
              <span>Notifications aux entreprises ciblées</span>
            </Label>
            <Switch id="target-notifications" />
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handlePublish}
        className="w-full"
        size="lg"
      >
        Publier l'appel d'offres
      </Button>
    </div>
  );
};

export default TenderPublishOptions;

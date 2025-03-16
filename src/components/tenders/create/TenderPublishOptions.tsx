
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Zap, Calendar, Bell, Eye } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';

interface TenderPublishOptionsProps {
  onPublish: () => void;
}

const TenderPublishOptions: React.FC<TenderPublishOptionsProps> = ({ onPublish }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mode de publication</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="immediate" className="space-y-4">
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
        onClick={onPublish}
        className="w-full"
        size="lg"
      >
        Publier l'appel d'offres
      </Button>
    </div>
  );
};

export default TenderPublishOptions;

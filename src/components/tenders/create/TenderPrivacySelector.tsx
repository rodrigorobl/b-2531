
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/types/tenderFormTypes';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Globe, Lock, Users } from 'lucide-react';

interface TenderPrivacySelectorProps {
  form: UseFormReturn<TenderFormValues>;
}

const TenderPrivacySelector: React.FC<TenderPrivacySelectorProps> = ({ form }) => {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-medium text-sm mb-2">Confidentialité de l'appel d'offres</h3>
        <RadioGroup
          defaultValue={form.getValues("privacy")}
          onValueChange={(value) => form.setValue("privacy", value as any)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2 p-3 rounded-md border hover:bg-accent cursor-pointer">
            <RadioGroupItem value="open" id="privacy-open" />
            <Label htmlFor="privacy-open" className="flex items-center cursor-pointer">
              <Globe className="h-4 w-4 mr-2 text-primary" />
              <div>
                <span className="font-medium">Ouvert</span>
                <p className="text-xs text-muted-foreground">Tout le monde peut voir et répondre</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-3 rounded-md border hover:bg-accent cursor-pointer">
            <RadioGroupItem value="restricted" id="privacy-restricted" />
            <Label htmlFor="privacy-restricted" className="flex items-center cursor-pointer">
              <Users className="h-4 w-4 mr-2 text-primary" />
              <div>
                <span className="font-medium">Restreint</span>
                <p className="text-xs text-muted-foreground">Accès sur demande</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-3 rounded-md border hover:bg-accent cursor-pointer">
            <RadioGroupItem value="closed" id="privacy-closed" />
            <Label htmlFor="privacy-closed" className="flex items-center cursor-pointer">
              <Lock className="h-4 w-4 mr-2 text-primary" />
              <div>
                <span className="font-medium">Fermé</span>
                <p className="text-xs text-muted-foreground">Sur invitation uniquement</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default TenderPrivacySelector;

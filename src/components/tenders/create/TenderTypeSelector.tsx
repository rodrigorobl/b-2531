
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/types/tenderFormTypes';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Building, PenTool, Briefcase } from 'lucide-react';

interface TenderTypeSelectorProps {
  form: UseFormReturn<TenderFormValues>;
}

const TenderTypeSelector: React.FC<TenderTypeSelectorProps> = ({ form }) => {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-medium text-sm mb-2">Type d'appel d'offres</h3>
        <RadioGroup
          defaultValue={form.getValues("type")}
          onValueChange={(value) => form.setValue("type", value as any)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2 p-3 rounded-md border hover:bg-accent cursor-pointer">
            <RadioGroupItem value="design" id="type-design" />
            <Label htmlFor="type-design" className="flex items-center cursor-pointer">
              <PenTool className="h-4 w-4 mr-2 text-primary" />
              <div>
                <span className="font-medium">Conception</span>
                <p className="text-xs text-muted-foreground">Architecte, Bureau d'études</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-3 rounded-md border hover:bg-accent cursor-pointer">
            <RadioGroupItem value="construction" id="type-construction" />
            <Label htmlFor="type-construction" className="flex items-center cursor-pointer">
              <Building className="h-4 w-4 mr-2 text-primary" />
              <div>
                <span className="font-medium">Réalisation</span>
                <p className="text-xs text-muted-foreground">Entreprise de construction</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-3 rounded-md border hover:bg-accent cursor-pointer">
            <RadioGroupItem value="service" id="type-service" />
            <Label htmlFor="type-service" className="flex items-center cursor-pointer">
              <Briefcase className="h-4 w-4 mr-2 text-primary" />
              <div>
                <span className="font-medium">Services</span>
                <p className="text-xs text-muted-foreground">Maintenance, Sécurité, Nettoyage</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default TenderTypeSelector;

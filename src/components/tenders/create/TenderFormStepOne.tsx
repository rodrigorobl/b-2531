
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/types/tenderFormTypes';
import { Card, CardContent } from "@/components/ui/card";
import TenderTypeSelector from "@/components/tenders/create/TenderTypeSelector";
import TenderPrivacySelector from "@/components/tenders/create/TenderPrivacySelector";

interface TenderFormStepOneProps {
  form: UseFormReturn<TenderFormValues>;
}

const TenderFormStepOne: React.FC<TenderFormStepOneProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Type selection */}
      <Card className="md:col-span-3">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Paramètres de l'appel d'offres</h2>
          <div className="space-y-6">
            <TenderTypeSelector form={form} />
            <TenderPrivacySelector form={form} />
          </div>
        </CardContent>
      </Card>
      
      {/* General information */}
      <Card className="md:col-span-3">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Informations générales</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Titre de l'appel d'offres</label>
              <input 
                id="title" 
                {...form.register("title")} 
                className="w-full p-2 border rounded-md" 
                placeholder="Ex: Construction d'un immeuble de bureaux" 
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <textarea 
                id="description" 
                {...form.register("description")} 
                className="w-full p-2 border rounded-md min-h-[120px]" 
                placeholder="Décrivez votre projet en quelques lignes..." 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenderFormStepOne;

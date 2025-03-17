
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues, TenderType } from '@/types/tenderFormTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Building, MapPin, Calendar, FileText } from 'lucide-react';
import DesignTenderForm from '@/components/tenders/create/DesignTenderForm';
import ConstructionTenderForm from '@/components/tenders/create/ConstructionTenderForm';
import ServiceTenderForm from '@/components/tenders/create/ServiceTenderForm';

interface TenderFormStepTwoProps {
  form: UseFormReturn<TenderFormValues>;
}

const TenderFormStepTwo: React.FC<TenderFormStepTwoProps> = ({ form }) => {
  const watchType = form.watch("type") as TenderType;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* General information card - always visible */}
      <Card className="md:col-span-1">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Informations générales</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <Building size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Type d'appel d'offres</p>
                <p className="text-sm">
                  {watchType === 'design' && 'Conception'}
                  {watchType === 'construction' && 'Réalisation'}
                  {watchType === 'service' && 'Services'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <MapPin size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Localisation</p>
                <input 
                  type="text" 
                  {...form.register("location")} 
                  className="w-full p-2 border rounded-md text-sm" 
                  placeholder="Adresse du projet" 
                />
                {form.formState.errors.location && (
                  <p className="text-xs text-red-500">{form.formState.errors.location.message}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <Calendar size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Date limite</p>
                <input 
                  type="date" 
                  {...form.register("deadline", {
                    setValueAs: v => v ? new Date(v) : undefined
                  })} 
                  className="w-full p-2 border rounded-md text-sm" 
                />
                {form.formState.errors.deadline && (
                  <p className="text-xs text-red-500">{form.formState.errors.deadline.message}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <FileText size={16} className="text-primary" />
              </div>
              <div className="w-full">
                <p className="text-sm font-medium">Budget estimatif</p>
                <input 
                  type="text" 
                  {...form.register("budget")} 
                  className="w-full p-2 border rounded-md text-sm" 
                  placeholder="Ex: 150 000 €" 
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Dynamic form based on tender type */}
      <Card className="md:col-span-2">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {watchType === 'design' && 'Détails de l\'appel d\'offres de Conception'}
            {watchType === 'construction' && 'Détails de l\'appel d\'offres de Réalisation'}
            {watchType === 'service' && 'Détails de l\'appel d\'offres de Services'}
          </h2>
          
          {watchType === 'design' && <DesignTenderForm form={form} />}
          {watchType === 'construction' && <ConstructionTenderForm form={form} />}
          {watchType === 'service' && <ServiceTenderForm form={form} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default TenderFormStepTwo;

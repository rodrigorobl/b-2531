
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/types/tenderFormTypes';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Building, FileText, Clock } from 'lucide-react';
import TenderPublishOptions from '@/components/tenders/create/TenderPublishOptions';

interface TenderFormStepFourProps {
  form: UseFormReturn<TenderFormValues>;
}

const TenderFormStepFour: React.FC<TenderFormStepFourProps> = ({ form }) => {
  const watchType = form.watch("type");
  
  return (
    <>
      <Card className="md:col-span-2">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Prévisualisation de l'appel d'offres</h2>
          
          <div className="border rounded-lg p-4 space-y-4">
            <div>
              <h3 className="text-lg font-medium">{form.getValues("title") || "Titre de l'appel d'offres"}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin size={14} className="mr-1" />
                <span>{form.getValues("location") || "Adresse du projet"}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <Building size={14} className="mr-1 text-muted-foreground" />
                <span>
                  {watchType === 'design' && 'Conception'}
                  {watchType === 'construction' && 'Réalisation'}
                  {watchType === 'service' && 'Services'}
                </span>
              </div>
              
              <div className="flex items-center">
                <FileText size={14} className="mr-1 text-muted-foreground" />
                <span>Budget: {form.getValues("budget") || "Non spécifié"}</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={14} className="mr-1 text-muted-foreground" />
                <span>
                  Date limite: {form.getValues("deadline") 
                    ? new Date(form.getValues("deadline")).toLocaleDateString() 
                    : "Non spécifiée"}
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Description</h4>
              <p className="text-sm">{form.getValues("description") || "Aucune description fournie."}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Documents</h4>
              <p className="text-sm text-muted-foreground">Aucun document joint.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-1">
        <CardContent className="p-6">
          <TenderPublishOptions form={form} />
        </CardContent>
      </Card>
    </>
  );
};

export default TenderFormStepFour;

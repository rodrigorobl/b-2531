
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues, TenderType } from '@/types/tenderFormTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TenderFormStepThreeProps {
  form: UseFormReturn<TenderFormValues>;
}

const TenderFormStepThree: React.FC<TenderFormStepThreeProps> = ({ form }) => {
  const watchType = form.watch("type") as TenderType;
  
  return (
    <Card className="md:col-span-3">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Documents</h2>
        <p className="text-muted-foreground mb-4">
          Ajoutez les documents nécessaires à la compréhension de votre projet
          {watchType === 'design' && ' (programme, esquisses, etc.)'}
          {watchType === 'construction' && ' (plans, DCE, DPGF, etc.)'}
          {watchType === 'service' && ' (cahier des charges, plans des locaux, etc.)'}
        </p>
        
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-1">Glissez-déposez vos fichiers ici</h3>
          <p className="text-sm text-muted-foreground mb-4">ou</p>
          <Button variant="outline">Parcourir les fichiers</Button>
          <p className="text-xs text-muted-foreground mt-4">
            Formats acceptés: PDF, DOC, DOCX, XLS, XLSX, DWG, JPG, PNG (max 50MB)
          </p>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Documents joints (0)</h3>
          <p className="text-sm text-muted-foreground">
            Aucun document n'a été ajouté pour le moment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TenderFormStepThree;

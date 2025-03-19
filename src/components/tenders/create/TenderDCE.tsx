
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TenderDCEProps {
  form: UseFormReturn<TenderFormValues>;
}

const TenderDCE: React.FC<TenderDCEProps> = ({ form }) => {
  const [dpgfMethod, setDpgfMethod] = useState<'ai' | 'upload'>('ai');
  
  const handleDpgfMethodChange = (value: 'ai' | 'upload') => {
    setDpgfMethod(value);
    form.setValue('construction.dpgfMethod', value);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Dossier de Consultation des Entreprises (DCE)</h2>
      <p className="text-muted-foreground">
        Cette section vous permet de gérer les documents techniques de votre appel d'offres.
      </p>
      
      <div className="bg-secondary/50 p-6 rounded-lg border border-border flex items-center justify-center flex-col h-[300px]">
        <p className="text-muted-foreground text-center mb-4">
          Déposez vos documents techniques ici ou parcourez vos dossiers
        </p>
        <Button variant="outline">Parcourir</Button>
      </div>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">Mode de génération du DPGF</Label>
        <RadioGroup 
          value={dpgfMethod} 
          onValueChange={(value) => handleDpgfMethodChange(value as 'ai' | 'upload')}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <RadioGroupItem value="ai" id="dpgf-ai" />
            <div className="grid gap-1.5 ml-2">
              <Label htmlFor="dpgf-ai" className="font-medium">Générer avec IA</Label>
              <p className="text-sm text-muted-foreground">
                Notre IA analysera votre projet et générera automatiquement un DPGF adapté.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <RadioGroupItem value="upload" id="dpgf-upload" />
            <div className="grid gap-1.5 ml-2">
              <Label htmlFor="dpgf-upload" className="font-medium">Téléverser mon DPGF</Label>
              <p className="text-sm text-muted-foreground">
                Utilisez votre propre fichier DPGF au format XLS ou XLSX.
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>
      
      {dpgfMethod === 'upload' && (
        <div className="bg-secondary/50 p-6 rounded-lg border border-border flex items-center justify-center flex-col h-[200px]">
          <Upload className="h-8 w-8 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center mb-4">
            Déposez votre fichier DPGF ici ou parcourez vos dossiers
          </p>
          <Button variant="outline">Parcourir</Button>
        </div>
      )}
    </div>
  );
};

export default TenderDCE;


import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DesignTenderFormProps {
  form: UseFormReturn<TenderFormValues>;
}

const DesignTenderForm: React.FC<DesignTenderFormProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="projectNature">Nature du projet</Label>
          <Select
            onValueChange={(value) => form.setValue("projectNature", value)}
            defaultValue={form.getValues("projectNature")}
          >
            <SelectTrigger id="projectNature">
              <SelectValue placeholder="Sélectionnez la nature du projet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="logement">Logement</SelectItem>
              <SelectItem value="tertiaire">Tertiaire</SelectItem>
              <SelectItem value="industriel">Industriel</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="hospitalier">Hospitalier</SelectItem>
              <SelectItem value="scolaire">Scolaire</SelectItem>
              <SelectItem value="autres">Autres</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="area">Surface estimée (m²)</Label>
          <Input
            id="area"
            type="text"
            placeholder="Ex: 2500"
            {...form.register("area")}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Bureaux d'études recherchés</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {["Structure", "Fluides", "Acoustique", "Environnement", "Économie", "VRD"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <input type="checkbox" id={`bet-${type}`} className="rounded" />
              <label htmlFor={`bet-${type}`} className="text-sm">{type}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="planning">Planning estimatif</Label>
        <Textarea
          id="planning"
          placeholder="Décrivez les principales échéances du projet..."
          className="min-h-[80px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="additionalDetails">Attentes particulières</Label>
        <Textarea
          id="additionalDetails"
          placeholder="Précisez vos attentes spécifiques concernant la mission de conception..."
          className="min-h-[120px]"
        />
      </div>
    </div>
  );
};

export default DesignTenderForm;

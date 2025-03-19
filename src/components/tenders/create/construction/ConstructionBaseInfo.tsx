
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ConstructionBaseInfoProps {
  form: UseFormReturn<any>;
}

const ConstructionBaseInfo: React.FC<ConstructionBaseInfoProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="constructionType">Nature des travaux</Label>
          <Select
            onValueChange={(value) => form.setValue("construction.constructionType", value as any)}
            defaultValue={form.getValues("construction.constructionType")}
          >
            <SelectTrigger id="constructionType">
              <SelectValue placeholder="Sélectionnez la nature des travaux" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="neuf">Construction neuve</SelectItem>
              <SelectItem value="réhabilitation">Réhabilitation</SelectItem>
              <SelectItem value="extension">Extension</SelectItem>
              <SelectItem value="renovation">Rénovation</SelectItem>
              <SelectItem value="demolition">Démolition</SelectItem>
              <SelectItem value="amenagement">Aménagement</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="area">Surface totale (m²)</Label>
          <Input
            id="area"
            type="text"
            placeholder="Ex: 2500"
            {...form.register("construction.area")}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="planning">Planning prévisionnel des travaux</Label>
        <Textarea
          id="planning"
          placeholder="Décrivez les principales phases et durées des travaux..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default ConstructionBaseInfo;

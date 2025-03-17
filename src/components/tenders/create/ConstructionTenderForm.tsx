
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/types/tenderFormTypes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ConstructionTenderFormProps {
  form: UseFormReturn<TenderFormValues>;
}

const ConstructionTenderForm: React.FC<ConstructionTenderFormProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="constructionType">Nature des travaux</Label>
          <Select
            onValueChange={(value) => form.setValue("constructionType", value)}
            defaultValue={form.getValues("constructionType")}
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
            {...form.register("area")}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Membres de l'équipe de conception</Label>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center space-x-2 p-2 border rounded-md">
            <Input type="text" placeholder="Nom du cabinet d'architecte" className="flex-1" />
            <Select defaultValue="architecte">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="architecte">Architecte</SelectItem>
                <SelectItem value="bet">Bureau d'études</SelectItem>
                <SelectItem value="economiste">Économiste</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button type="button" className="text-sm text-primary hover:underline">
            + Ajouter un autre membre
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Lots de travaux concernés</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            "Gros œuvre", "Charpente", "Couverture", "Menuiseries", "Plomberie", 
            "Électricité", "CVC", "Isolation", "Peinture", "VRD", "Façades", "Sols"
          ].map((lot) => (
            <div key={lot} className="flex items-center space-x-2">
              <input type="checkbox" id={`lot-${lot}`} className="rounded" />
              <label htmlFor={`lot-${lot}`} className="text-sm">{lot}</label>
            </div>
          ))}
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

export default ConstructionTenderForm;

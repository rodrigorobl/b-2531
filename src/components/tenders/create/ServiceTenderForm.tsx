
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from 'lucide-react';

interface ServiceTenderFormProps {
  form: UseFormReturn<TenderFormValues>;
}

const ServiceTenderForm: React.FC<ServiceTenderFormProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="serviceSearch">Je cherche...</Label>
        <div className="relative">
          <Input
            id="serviceSearch"
            placeholder="Décrivez le service que vous recherchez..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground">
          Notre IA vous suggère des prestataires en fonction de votre description
        </p>
      </div>
      
      <div className="p-3 bg-muted/50 rounded-md">
        <h3 className="font-medium mb-2">Suggestions de services</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {["Nettoyage de bureaux", "Maintenance climatisation", "Sécurité incendie", "Entretien espaces verts", "Gardiennage", "Contrôle d'accès"].map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <input type="checkbox" id={`service-${service}`} className="rounded" />
              <label htmlFor={`service-${service}`} className="text-sm">{service}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="serviceScope">Périmètre d'intervention</Label>
          <Select
            onValueChange={(value) => form.setValue("serviceScope", value)}
            defaultValue={form.getValues("serviceScope")}
          >
            <SelectTrigger id="serviceScope">
              <SelectValue placeholder="Sélectionnez le périmètre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local</SelectItem>
              <SelectItem value="départemental">Départemental</SelectItem>
              <SelectItem value="régional">Régional</SelectItem>
              <SelectItem value="national">National</SelectItem>
              <SelectItem value="international">International</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="serviceDuration">Durée du contrat</Label>
          <Select
            onValueChange={(value) => form.setValue("serviceDuration", value)}
            defaultValue={form.getValues("serviceDuration")}
          >
            <SelectTrigger id="serviceDuration">
              <SelectValue placeholder="Sélectionnez la durée" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ponctuel">Ponctuel</SelectItem>
              <SelectItem value="3mois">3 mois</SelectItem>
              <SelectItem value="6mois">6 mois</SelectItem>
              <SelectItem value="1an">1 an</SelectItem>
              <SelectItem value="2ans">2 ans</SelectItem>
              <SelectItem value="3ans">3 ans et plus</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="serviceDetails">Détails supplémentaires</Label>
        <Textarea
          id="serviceDetails"
          placeholder="Précisez vos attentes, fréquence d'intervention, spécificités techniques..."
          className="min-h-[120px]"
        />
      </div>
    </div>
  );
};

export default ServiceTenderForm;

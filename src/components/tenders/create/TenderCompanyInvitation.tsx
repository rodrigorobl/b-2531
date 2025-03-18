import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, UserPlus, Check, X } from 'lucide-react';
interface TenderCompanyInvitationProps {
  form: UseFormReturn<TenderFormValues>;
}

// Données fictives d'entreprises pour la démonstration
const dummyCompanies = [{
  id: "comp-1",
  name: "Martin Construction"
}, {
  id: "comp-2",
  name: "Electricité Dupont"
}, {
  id: "comp-3",
  name: "CVC Solutions"
}, {
  id: "comp-4",
  name: "Durand & Fils Menuiserie"
}, {
  id: "comp-5",
  name: "Peinture Express"
}, {
  id: "comp-6",
  name: "Plomberie Générale"
}, {
  id: "comp-7",
  name: "Ascenseurs Modernes"
}, {
  id: "comp-8",
  name: "Façades & Co"
}, {
  id: "comp-9",
  name: "Charpentes Thomas"
}, {
  id: "comp-10",
  name: "Isolation Performante"
}];
const TenderCompanyInvitation: React.FC<TenderCompanyInvitationProps> = ({
  form
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<{
    id: string;
    name: string;
    selected?: boolean;
  }[]>(
  // Ensure that we only use valid companies with id and name defined
  (form.getValues("invitedCompanies") || []).filter((company): company is {
    id: string;
    name: string;
    selected?: boolean;
  } => typeof company.id === 'string' && typeof company.name === 'string'));

  // Filtrer les entreprises en fonction du terme de recherche
  const filteredCompanies = dummyCompanies.filter(company => company.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Vérifier si une entreprise est déjà sélectionnée
  const isCompanySelected = (id: string) => {
    return selectedCompanies.some(company => company.id === id && company.selected);
  };

  // Gérer la sélection d'une entreprise
  const handleCompanySelection = (company: {
    id: string;
    name: string;
  }) => {
    const companyExists = selectedCompanies.find(c => c.id === company.id);
    let updatedCompanies;
    if (companyExists) {
      // Si l'entreprise existe déjà, inverser son état de sélection
      updatedCompanies = selectedCompanies.map(c => c.id === company.id ? {
        ...c,
        selected: !c.selected
      } : c);
    } else {
      // Sinon, ajouter l'entreprise avec selected à true
      updatedCompanies = [...selectedCompanies, {
        ...company,
        selected: true
      }];
    }
    setSelectedCompanies(updatedCompanies);
    form.setValue("invitedCompanies", updatedCompanies);
  };
  return <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="company-search">Rechercher des entreprises</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input id="company-search" placeholder="Rechercher par nom d'entreprise" className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted p-2 border-b">
          <h3 className="font-medium">Entreprises suggérées</h3>
        </div>
        <div className="divide-y max-h-72 overflow-y-auto">
          {filteredCompanies.length > 0 ? filteredCompanies.map(company => <div key={company.id} className="flex items-center justify-between p-3 hover:bg-muted/50">
              <div className="flex items-center">
                <Checkbox id={`company-${company.id}`} checked={isCompanySelected(company.id)} onCheckedChange={() => handleCompanySelection(company)} />
                <Label htmlFor={`company-${company.id}`} className="ml-2 cursor-pointer">
                  {company.name}
                </Label>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleCompanySelection(company)}>
                {isCompanySelected(company.id) ? <X className="h-4 w-4 text-muted-foreground" /> : <UserPlus className="h-4 w-4 text-muted-foreground" />}
              </Button>
            </div>) : <div className="p-4 text-center text-muted-foreground">
              Aucune entreprise trouvée
            </div>}
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted p-2 border-b flex justify-between items-center">
          <h3 className="font-medium">Entreprises sélectionnées</h3>
          <span className="text-xs text-muted-foreground">
            {selectedCompanies.filter(c => c.selected).length} entreprises
          </span>
        </div>
        <div className="divide-y max-h-48 overflow-y-auto">
          {selectedCompanies.filter(c => c.selected).length > 0 ? selectedCompanies.filter(company => company.selected).map(company => <div key={company.id} className="flex items-center justify-between p-3">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>{company.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleCompanySelection(company)}>
                    <X className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>) : <div className="p-4 text-center text-muted-foreground">
              Aucune entreprise sélectionnée
            </div>}
        </div>
      </div>
    </div>;
};
export default TenderCompanyInvitation;
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, UserPlus, Check, X, Info, Percent } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TenderCompanyInvitationProps {
  form: UseFormReturn<TenderFormValues>;
}

// Données fictives d'entreprises pour la démonstration
const dummyCompanies = [
  // ... keep existing code (dummyCompanies array)
];

// Lots pour les différents types d'appels d'offres
const designLots = [
  { id: "architecte", name: "Architecte" },
  { id: "bet-structure", name: "BET Structure" },
  { id: "bet-fluides", name: "BET Fluides" },
  { id: "acousticien", name: "Acousticien" },
  { id: "economiste", name: "Économiste" },
  { id: "bet-hqe", name: "BET HQE" }
];

const constructionLots = [
  { id: "gros-oeuvre", name: "Gros Œuvre" },
  { id: "peinture", name: "Peinture" },
  { id: "plomberie", name: "Plomberie" },
  { id: "electricite", name: "Électricité" },
  { id: "menuiserie", name: "Menuiserie" },
  { id: "cvc", name: "CVC" },
  { id: "facades", name: "Façades" },
  { id: "charpente", name: "Charpente" },
  { id: "vrd", name: "VRD" },
  { id: "isolation", name: "Isolation" },
  { id: "ascenseurs", name: "Ascenseurs" }
];

const serviceLots = [
  { id: "maintenance", name: "Maintenance" },
  { id: "securite", name: "Sécurité" },
  { id: "nettoyage", name: "Nettoyage" },
  { id: "entretien", name: "Entretien espaces verts" }
];

const TenderCompanyInvitation: React.FC<TenderCompanyInvitationProps> = ({
  form
}) => {
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});
  const tenderType = form.getValues("type");
  const invitedCompanies = form.getValues("invitedCompanies") || [];
  const [selectedCompanies, setSelectedCompanies] = useState<Array<{
    id: string;
    name: string;
    lotId: string;
    selected: boolean;
  }>>(invitedCompanies.map(company => ({
    id: company.id,
    name: company.name,
    lotId: company.lotId || '',
    selected: true
  })));

  // Déterminer les lots appropriés en fonction du type d'appel d'offres
  const lotsForType = () => {
    switch (tenderType) {
      case 'design':
        return designLots;
      case 'construction':
        return constructionLots;
      case 'service':
        return serviceLots;
      default:
        return [];
    }
  };

  // Mettre à jour le terme de recherche pour un lot spécifique
  const updateSearchTerm = (lotId: string, value: string) => {
    setSearchTerms(prev => ({
      ...prev,
      [lotId]: value
    }));
  };

  // Filtrer les entreprises en fonction du terme de recherche et du lot
  const getFilteredCompanies = (lotId: string) => {
    const searchTerm = searchTerms[lotId] || '';
    return dummyCompanies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLot = company.specialty.includes(lotId);
      return matchesSearch && matchesLot;
    }).sort((a, b) => b.recommendation - a.recommendation);
  };

  // Vérifier si une entreprise est déjà sélectionnée pour un lot spécifique
  const isCompanySelected = (id: string, lotId: string) => {
    return selectedCompanies.some(company => company.id === id && company.lotId === lotId && company.selected);
  };

  // Gérer la sélection d'une entreprise pour un lot spécifique
  const handleCompanySelection = (company: { id: string; name: string }, lotId: string) => {
    const existingIndex = selectedCompanies.findIndex(c => c.id === company.id && c.lotId === lotId);
    let updatedCompanies: Array<{ id: string; name: string; lotId: string; selected: boolean }>;
    
    if (existingIndex >= 0) {
      updatedCompanies = [...selectedCompanies];
      updatedCompanies[existingIndex].selected = !updatedCompanies[existingIndex].selected;
    } else {
      updatedCompanies = [...selectedCompanies, { 
        id: company.id, 
        name: company.name, 
        lotId: lotId,
        selected: true 
      }];
    }
    
    setSelectedCompanies(updatedCompanies);
    
    const formattedCompanies = updatedCompanies
      .filter(c => c.selected)
      .map(({ id, name, lotId }) => ({ id, name, lotId, selected: true }));
      
    form.setValue("invitedCompanies", formattedCompanies);
  };

  // Obtenir le nom du lot à partir de son ID
  const getLotName = (lotId: string) => {
    const lots = lotsForType();
    const lot = lots.find(l => l.id === lotId);
    return lot ? lot.name : lotId;
  };

  // Obtenir les entreprises sélectionnées pour un lot spécifique
  const getSelectedCompaniesForLot = (lotId: string) => {
    return selectedCompanies.filter(company => company.lotId === lotId && company.selected);
  };

  // Obtenir les infos de l'entreprise par son ID
  const getCompanyInfo = (companyId: string) => {
    return dummyCompanies.find(company => company.id === companyId);
  };

  // Calculer le nombre total d'entreprises sélectionnées
  const totalSelectedCompanies = selectedCompanies.filter(c => c.selected).length;

  const lots = lotsForType();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lots.map(lot => (
          <Card key={lot.id} className="overflow-hidden">
            <CardHeader className="bg-muted py-3">
              <CardTitle className="text-base font-medium">{lot.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder={`Rechercher pour ${lot.name}`} 
                    className="pl-10" 
                    value={searchTerms[lot.id] || ''} 
                    onChange={e => updateSearchTerm(lot.id, e.target.value)} 
                  />
                </div>
                
                <div className="divide-y max-h-64 overflow-y-auto border rounded-md">
                  {getFilteredCompanies(lot.id).length > 0 ? getFilteredCompanies(lot.id).map(company => (
                    <div key={`${company.id}-${lot.id}`} className="flex items-center justify-between p-3 hover:bg-muted/50">
                      <div className="flex items-center">
                        <Checkbox 
                          id={`company-${company.id}-${lot.id}`} 
                          checked={isCompanySelected(company.id, lot.id)}
                          onCheckedChange={() => handleCompanySelection(company, lot.id)} 
                        />
                        <Label htmlFor={`company-${company.id}-${lot.id}`} className="ml-2 cursor-pointer">
                          {company.name}
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="space-y-3">
                              <h4 className="font-semibold">{company.name}</h4>
                              <div className="text-sm text-muted-foreground">
                                <p><strong>Adresse:</strong> {company.info.address}</p>
                                <p><strong>Employés:</strong> {company.info.employees}</p>
                                <p><strong>Fondée en:</strong> {company.info.founded}</p>
                                <p><strong>Projets réalisés:</strong> {company.info.projects}</p>
                                <p className="mt-1">{company.info.description}</p>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center text-green-600 font-medium">
                          <Percent className="h-4 w-4 mr-1" />
                          {company.recommendation}%
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleCompanySelection(company, lot.id)}>
                          {isCompanySelected(company.id, lot.id) ? (
                            <X className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <UserPlus className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )) : (
                    <div className="p-4 text-center text-muted-foreground">
                      Aucune entreprise trouvée
                    </div>
                  )}
                </div>
                
                {getSelectedCompaniesForLot(lot.id).length > 0 && (
                  <div className="mt-3 space-y-2">
                    <h4 className="text-sm font-medium">Entreprises sélectionnées ({getSelectedCompaniesForLot(lot.id).length})</h4>
                    <div className="space-y-2">
                      {getSelectedCompaniesForLot(lot.id).map(company => {
                        const companyInfo = getCompanyInfo(company.id);
                        
                        return (
                          <div key={`selected-${company.id}-${lot.id}`} className="flex items-center justify-between bg-muted/20 p-2 rounded-md">
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              <span>{company.name}</span>
                              {companyInfo && (
                                <HoverCard>
                                  <HoverCardTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                  </HoverCardTrigger>
                                  <HoverCardContent className="w-80">
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <h4 className="font-semibold">{companyInfo.name}</h4>
                                        <div className="flex items-center text-green-600 font-medium">
                                          <Percent className="h-4 w-4 mr-1" />
                                          {companyInfo.recommendation}%
                                        </div>
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        <p>{companyInfo.info.description}</p>
                                      </div>
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
                              )}
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleCompanySelection(company, lot.id)}
                            >
                              <X className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalSelectedCompanies > 0 && (
        <div className="rounded-md bg-muted p-4">
          <div className="font-medium">Résumé des invitations</div>
          <div className="text-sm text-muted-foreground mt-1">
            Vous avez sélectionné {totalSelectedCompanies} entreprises pour {lots.length} lots
          </div>
        </div>
      )}
    </div>
  );
};

export default TenderCompanyInvitation;

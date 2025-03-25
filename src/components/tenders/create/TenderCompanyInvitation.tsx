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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TenderCompanyInvitationProps {
  form: UseFormReturn<TenderFormValues>;
}

// Données fictives d'entreprises pour la démonstration
const dummyCompanies = [
  {
    id: "company1",
    name: "Architect & Partners",
    specialty: ["architecte", "economiste"],
    recommendation: 95,
    info: {
      address: "15 rue de la République, Paris",
      employees: 45,
      founded: 2005,
      projects: 132,
      description: "Cabinet d'architectes spécialisé dans les projets résidentiels haut de gamme et tertiaires."
    }
  },
  {
    id: "company2",
    name: "Structures Modernes",
    specialty: ["bet-structure"],
    recommendation: 92,
    info: {
      address: "8 avenue des Ingénieurs, Lyon",
      employees: 28,
      founded: 2010,
      projects: 87,
      description: "Bureau d'études techniques spécialisé dans les structures complexes et les bâtiments de grande hauteur."
    }
  },
  {
    id: "company3",
    name: "Fluid Systems",
    specialty: ["bet-fluides", "bet-hqe"],
    recommendation: 88,
    info: {
      address: "22 rue de l'Innovation, Bordeaux",
      employees: 35,
      founded: 2008,
      projects: 115,
      description: "Expert en ingénierie des fluides et solutions environnementales pour bâtiments performants."
    }
  },
  {
    id: "company4",
    name: "Acoustic Design",
    specialty: ["acousticien"],
    recommendation: 96,
    info: {
      address: "11 rue du Son, Nantes",
      employees: 12,
      founded: 2014,
      projects: 64,
      description: "Spécialiste en solutions acoustiques pour tous types de bâtiments, de l'auditorium à l'habitation."
    }
  },
  {
    id: "company5",
    name: "Budget Construction",
    specialty: ["economiste"],
    recommendation: 89,
    info: {
      address: "4 rue des Finances, Marseille",
      employees: 18,
      founded: 2011,
      projects: 93,
      description: "Cabinet d'économistes de la construction offrant des services de chiffrage précis et d'optimisation budgétaire."
    }
  },
  {
    id: "company6",
    name: "Eco Building Solutions",
    specialty: ["bet-hqe", "architecte"],
    recommendation: 91,
    info: {
      address: "30 rue Verte, Toulouse",
      employees: 22,
      founded: 2012,
      projects: 76,
      description: "Experts en conception de bâtiments écologiques et certifications environnementales."
    }
  },
  {
    id: "company7", 
    name: "Construction Générale SA",
    specialty: ["gros-oeuvre", "demolition"],
    recommendation: 94,
    info: {
      address: "52 rue du Bâtiment, Lille",
      employees: 120,
      founded: 1998,
      projects: 215,
      description: "Entreprise de construction générale spécialisée dans les ouvrages complexes et les grandes infrastructures."
    }
  },
  {
    id: "company8",
    name: "Façades & Design",
    specialty: ["facades", "isolation"],
    recommendation: 87,
    info: {
      address: "17 avenue de l'Architecture, Nice",
      employees: 45,
      founded: 2007,
      projects: 128,
      description: "Spécialiste des façades innovantes et solutions d'isolation thermique performantes."
    }
  },
  {
    id: "company9",
    name: "Electricité Pro",
    specialty: ["electricite"],
    recommendation: 93,
    info: {
      address: "9 rue de l'Énergie, Strasbourg",
      employees: 65,
      founded: 2001,
      projects: 176,
      description: "Entreprise d'électricité générale pour projets tertiaires, industriels et résidentiels de grande envergure."
    }
  },
  {
    id: "company10",
    name: "Plomberie & Fluides",
    specialty: ["plomberie", "cvc"],
    recommendation: 90,
    info: {
      address: "14 rue des Canalisations, Rennes",
      employees: 38,
      founded: 2009,
      projects: 104,
      description: "Expert en installations de plomberie et systèmes de fluides pour tous types de constructions."
    }
  },
  {
    id: "company11",
    name: "Peinture Décoration Plus",
    specialty: ["peinture"],
    recommendation: 91,
    info: {
      address: "6 rue des Couleurs, Montpellier",
      employees: 29,
      founded: 2013,
      projects: 83,
      description: "Entreprise de peinture et décoration pour projets haut de gamme et espaces professionnels."
    }
  },
  {
    id: "company12",
    name: "Bois & Menuiserie",
    specialty: ["menuiserie", "charpente"],
    recommendation: 95,
    info: {
      address: "25 rue du Bois, Grenoble",
      employees: 42,
      founded: 2004,
      projects: 137,
      description: "Artisans spécialisés dans les ouvrages en bois, la menuiserie sur mesure et les charpentes complexes."
    }
  },
  {
    id: "company13",
    name: "Climatisation Expertise",
    specialty: ["cvc"],
    recommendation: 88,
    info: {
      address: "31 rue du Confort, Dijon",
      employees: 26,
      founded: 2011,
      projects: 92,
      description: "Spécialiste des systèmes CVC innovants et solutions de confort thermique pour tous bâtiments."
    }
  },
  {
    id: "company14",
    name: "Rénovation Bâtiment",
    specialty: ["gros-oeuvre", "renovation"],
    recommendation: 86,
    info: {
      address: "12 rue de la Réhabilitation, Tours",
      employees: 35,
      founded: 2008,
      projects: 98,
      description: "Entreprise spécialisée dans la rénovation de bâtiments anciens et la réhabilitation d'espaces."
    }
  },
  {
    id: "company15",
    name: "Élévateurs Modernes",
    specialty: ["ascenseurs"],
    recommendation: 92,
    info: {
      address: "8 rue de la Mobilité, Angers",
      employees: 19,
      founded: 2012,
      projects: 64,
      description: "Installation et maintenance d'ascenseurs et systèmes d'élévation pour tous types de bâtiments."
    }
  },
  {
    id: "company16",
    name: "VRD Solutions",
    specialty: ["vrd"],
    recommendation: 89,
    info: {
      address: "43 route des Réseaux, Clermont-Ferrand",
      employees: 48,
      founded: 2005,
      projects: 121,
      description: "Spécialiste des travaux de voirie, réseaux divers et aménagements extérieurs."
    }
  },
  {
    id: "company17",
    name: "Service Entretien Pro",
    specialty: ["maintenance", "entretien"],
    recommendation: 93,
    info: {
      address: "16 rue de la Maintenance, Paris",
      employees: 75,
      founded: 2002,
      projects: 240,
      description: "Entreprise spécialisée dans les services de maintenance et d'entretien régulier de bâtiments."
    }
  },
  {
    id: "company18",
    name: "Sécurité Bâtiment",
    specialty: ["securite"],
    recommendation: 94,
    info: {
      address: "28 rue de la Protection, Lyon",
      employees: 52,
      founded: 2007,
      projects: 186,
      description: "Expert en installation de systèmes de sécurité et surveillance pour bâtiments professionnels."
    }
  },
  {
    id: "company19",
    name: "Propreté & Services",
    specialty: ["nettoyage"],
    recommendation: 90,
    info: {
      address: "9 avenue de la Propreté, Marseille",
      employees: 128,
      founded: 1999,
      projects: 312,
      description: "Société de nettoyage professionnel pour bureaux, commerces et espaces industriels."
    }
  },
  {
    id: "company20",
    name: "Espaces Verts Concept",
    specialty: ["entretien"],
    recommendation: 91,
    info: {
      address: "17 rue des Jardins, Bordeaux",
      employees: 34,
      founded: 2010,
      projects: 109,
      description: "Conception, aménagement et entretien d'espaces verts pour projets résidentiels et tertiaires."
    }
  }
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
                  <div className="flex items-center justify-between p-3 bg-muted/30">
                    <div className="flex items-center font-medium text-sm text-muted-foreground">
                      Entreprises suggérées
                    </div>
                    <div className="flex items-center gap-1 font-medium text-sm text-muted-foreground">
                      Scoring BTP CONNECT
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                              <Info className="h-3.5 w-3.5 text-muted-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[250px]">
                            <p>Le Scoring BTP CONNECT évalue la pertinence d'une entreprise pour un projet en fonction de sa taille, de sa proximité et de sa capacité financière.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
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

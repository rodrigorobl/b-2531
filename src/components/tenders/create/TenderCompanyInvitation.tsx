
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, UserPlus, Check, X, Info, Percent } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface TenderCompanyInvitationProps {
  form: UseFormReturn<TenderFormValues>;
}

// Données fictives d'entreprises pour la démonstration
const dummyCompanies = [{
  id: "comp-1",
  name: "Martin Construction",
  recommendation: 98,
  specialty: ["gros-oeuvre", "bet-structure"],
  info: {
    address: "15 rue des Bâtisseurs, 75001 Paris",
    employees: "50-100",
    founded: "1985",
    projects: 125,
    description: "Spécialiste en construction de bâtiments résidentiels et commerciaux."
  }
}, {
  id: "comp-2",
  name: "Électricité Dupont",
  recommendation: 95,
  specialty: ["electricite"],
  info: {
    address: "8 avenue des Lumières, 69002 Lyon",
    employees: "20-50",
    founded: "1992",
    projects: 230,
    description: "Expert en installations électriques pour bâtiments."
  }
}, {
  id: "comp-3",
  name: "CVC Solutions",
  recommendation: 92,
  specialty: ["cvc"],
  info: {
    address: "12 rue de la Ventilation, 44000 Nantes",
    employees: "10-20",
    founded: "2005",
    projects: 87,
    description: "Solutions complètes de chauffage, ventilation et climatisation."
  }
}, {
  id: "comp-4",
  name: "Durand & Fils Menuiserie",
  recommendation: 89,
  specialty: ["menuiserie"],
  info: {
    address: "3 rue du Bois, 33000 Bordeaux",
    employees: "10-20",
    founded: "1978",
    projects: 340,
    description: "Menuiserie intérieure et extérieure de qualité supérieure."
  }
}, {
  id: "comp-5",
  name: "Peinture Express",
  recommendation: 88,
  specialty: ["peinture"],
  info: {
    address: "5 allée des Couleurs, 59000 Lille",
    employees: "5-10",
    founded: "2010",
    projects: 156,
    description: "Services de peinture intérieure et extérieure pour tous types de bâtiments."
  }
}, {
  id: "comp-6",
  name: "Plomberie Générale",
  recommendation: 87,
  specialty: ["plomberie"],
  info: {
    address: "18 rue des Fontaines, 31000 Toulouse",
    employees: "5-10",
    founded: "1995",
    projects: 210,
    description: "Installation et maintenance de systèmes de plomberie résidentiels et commerciaux."
  }
}, {
  id: "comp-7",
  name: "Ascenseurs Modernes",
  recommendation: 86,
  specialty: ["ascenseurs"],
  info: {
    address: "7 rue de la Montée, 67000 Strasbourg",
    employees: "20-50",
    founded: "2003",
    projects: 45,
    description: "Installation et maintenance d'ascenseurs pour tous types de bâtiments."
  }
}, {
  id: "comp-8",
  name: "Façades & Co",
  recommendation: 85,
  specialty: ["facades"],
  info: {
    address: "9 boulevard de l'Architecture, 06000 Nice",
    employees: "10-20",
    founded: "2007",
    projects: 67,
    description: "Spécialiste en traitement et rénovation de façades."
  }
}, {
  id: "comp-9",
  name: "Charpentes Thomas",
  recommendation: 84,
  specialty: ["charpente"],
  info: {
    address: "22 rue Haute, 13000 Marseille",
    employees: "5-10",
    founded: "1983",
    projects: 192,
    description: "Construction et réparation de charpentes traditionnelles et modernes."
  }
}, {
  id: "comp-10",
  name: "Isolation Performante",
  recommendation: 83,
  specialty: ["isolation"],
  info: {
    address: "14 rue du Confort, 35000 Rennes",
    employees: "5-10",
    founded: "2012",
    projects: 128,
    description: "Solutions d'isolation thermique et acoustique pour tous types de bâtiments."
  }
}, {
  id: "comp-11",
  name: "Acoustique Expert",
  recommendation: 96,
  specialty: ["acousticien"],
  info: {
    address: "27 rue du Silence, 75015 Paris",
    employees: "5-10",
    founded: "2008",
    projects: 73,
    description: "Bureau d'études spécialisé en acoustique architectural et environnemental."
  }
}, {
  id: "comp-12",
  name: "BET Structure Pro",
  recommendation: 94,
  specialty: ["bet-structure"],
  info: {
    address: "5 avenue des Ingénieurs, 69003 Lyon",
    employees: "20-50",
    founded: "1998",
    projects: 215,
    description: "Bureau d'études techniques spécialisé en structure et génie civil."
  }
}, {
  id: "comp-13",
  name: "Fluides Concept",
  recommendation: 91,
  specialty: ["bet-fluides"],
  info: {
    address: "12 rue de la Technique, 44200 Nantes",
    employees: "10-20",
    founded: "2002",
    projects: 167,
    description: "Bureau d'études fluides pour tous types de projets de construction."
  }
}, {
  id: "comp-14",
  name: "VRD Aménagement",
  recommendation: 90,
  specialty: ["vrd"],
  info: {
    address: "8 avenue du Terrassement, 33100 Bordeaux",
    employees: "20-50",
    founded: "1990",
    projects: 320,
    description: "Spécialiste en conception et réalisation de voirie et réseaux divers."
  }
}];

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
  const [searchTerm, setSearchTerm] = useState('');
  const tenderType = form.getValues("type");
  const [currentLot, setCurrentLot] = useState('');
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

  // Filtrer les entreprises en fonction du terme de recherche et du lot sélectionné
  const filteredCompanies = dummyCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLot = currentLot ? company.specialty.includes(currentLot) : true;
    return matchesSearch && matchesLot;
  }).sort((a, b) => b.recommendation - a.recommendation);

  // Vérifier si une entreprise est déjà sélectionnée pour le lot courant
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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="lot-select">Sélectionner un lot</Label>
        <Select value={currentLot} onValueChange={setCurrentLot}>
          <SelectTrigger id="lot-select">
            <SelectValue placeholder="Choisir un lot" />
          </SelectTrigger>
          <SelectContent>
            {lotsForType().map(lot => (
              <SelectItem key={lot.id} value={lot.id}>{lot.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentLot && (
        <>
          <div className="space-y-2">
            <Label htmlFor="company-search">Rechercher des entreprises pour ce lot</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                id="company-search" 
                placeholder="Rechercher par nom d'entreprise" 
                className="pl-10" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <div className="bg-muted p-2 border-b">
              <h3 className="font-medium">Entreprises suggérées pour {getLotName(currentLot)}</h3>
            </div>
            <div className="divide-y max-h-72 overflow-y-auto">
              {filteredCompanies.length > 0 ? filteredCompanies.map(company => (
                <div key={company.id} className="flex items-center justify-between p-3 hover:bg-muted/50">
                  <div className="flex items-center">
                    <Checkbox 
                      id={`company-${company.id}-${currentLot}`} 
                      checked={isCompanySelected(company.id, currentLot)}
                      onCheckedChange={() => handleCompanySelection(company, currentLot)} 
                    />
                    <Label htmlFor={`company-${company.id}-${currentLot}`} className="ml-2 cursor-pointer">
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
                    <Button variant="ghost" size="sm" onClick={() => handleCompanySelection(company, currentLot)}>
                      {isCompanySelected(company.id, currentLot) ? (
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
          </div>
        </>
      )}

      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted p-2 border-b flex justify-between items-center">
          <h3 className="font-medium">Entreprises sélectionnées par lot</h3>
          <span className="text-xs text-muted-foreground">
            {selectedCompanies.filter(c => c.selected).length} entreprises
          </span>
        </div>
        <div className="divide-y max-h-72 overflow-y-auto">
          {lotsForType().map(lot => {
            const companiesForLot = getSelectedCompaniesForLot(lot.id);
            
            if (companiesForLot.length === 0) return null;
            
            return (
              <div key={lot.id} className="p-3 border-b">
                <h4 className="font-medium mb-2">{lot.name}</h4>
                <div className="space-y-2">
                  {companiesForLot.map(company => {
                    const companyInfo = getCompanyInfo(company.id);
                    
                    return (
                      <div key={`${company.id}-${lot.id}`} className="flex items-center justify-between bg-muted/20 p-2 rounded-md">
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
            );
          })}
          
          {selectedCompanies.filter(c => c.selected).length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              Aucune entreprise sélectionnée
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenderCompanyInvitation;

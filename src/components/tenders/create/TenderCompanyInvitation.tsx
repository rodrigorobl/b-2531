import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/types/tender-forms';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, UserPlus, Check, X, Info, Percent, Download, Edit, Trash2 } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface TenderCompanyInvitationProps {
  form: UseFormReturn<TenderFormValues>;
}

// Added interface for extracted contacts
interface ExtractedContact {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  address: string;
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

const TenderCompanyInvitation: React.FC<TenderCompanyInvitationProps> = ({ form }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('design');
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [bulkContactData, setBulkContactData] = useState('');
  const [extractedContacts, setExtractedContacts] = useState<ExtractedContact[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [contactSearchTerm, setContactSearchTerm] = useState('');
  const { toast } = useToast();
  
  const getLots = () => {
    if (selectedTab === 'design') return designLots;
    if (selectedTab === 'construction') return constructionLots;
    return serviceLots;
  };

  const filteredCompanies = dummyCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = company.specialty.some(s => 
      getLots().some(lot => lot.id === s)
    );
    return matchesSearch && matchesSpecialty;
  });

  const handleInviteCompany = (company) => {
    const currentInvitedCompanies = form.getValues('invitedCompanies') || [];
    
    if (!currentInvitedCompanies.some(c => c.id === company.id)) {
      form.setValue('invitedCompanies', [
        ...currentInvitedCompanies, 
        { id: company.id, name: company.name, selected: true }
      ]);
      
      toast({
        title: "Entreprise invitée",
        description: `${company.name} a été ajoutée à la liste des invitations.`,
      });
    }
  };

  const handleProcessBulkData = () => {
    if (!bulkContactData.trim()) {
      toast({
        title: "Données manquantes",
        description: "Veuillez coller des informations de contact à traiter.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate AI processing with a timeout
    setTimeout(() => {
      // Generate mock extracted contacts based on the input
      const lines = bulkContactData.split('\n').filter(line => line.trim());
      const mockExtracted = lines.map((line, index) => {
        // Simple parsing logic - in a real app this would be AI-powered
        const parts = line.split(/[,;]/);
        
        return {
          id: `extracted-${index}`,
          firstName: parts[0]?.trim() || 'Prénom',
          lastName: parts[1]?.trim() || 'Nom',
          company: parts[2]?.trim() || 'Entreprise',
          email: parts[3]?.trim() || `contact${index}@example.com`,
          phone: parts[4]?.trim() || '01 23 45 67 89',
          address: parts[5]?.trim() || 'Adresse non spécifiée'
        };
      });

      setExtractedContacts(mockExtracted);
      setIsProcessing(false);
      
      toast({
        title: "Traitement terminé",
        description: `${mockExtracted.length} contacts ont été extraits.`
      });
    }, 2000);
  };

  const handleRemoveContact = (contactId: string) => {
    setExtractedContacts(extractedContacts.filter(contact => contact.id !== contactId));
  };

  const handleEditContact = (contactId: string, field: keyof ExtractedContact, value: string) => {
    setExtractedContacts(extractedContacts.map(contact => 
      contact.id === contactId ? { ...contact, [field]: value } : contact
    ));
  };

  const handleInviteExtractedContacts = () => {
    toast({
      title: "Invitations envoyées",
      description: `${extractedContacts.length} entreprises ont été invitées à rejoindre BTP CONNECT.`
    });
    setShowInviteDialog(false);
    // In a real app, you would also add these to the form's invitedCompanies
  };

  const downloadContactsCSV = () => {
    // Create CSV content
    const headers = "Prénom,Nom,Entreprise,Email,Téléphone,Adresse\n";
    const rows = extractedContacts.map(contact => 
      `${contact.firstName},${contact.lastName},${contact.company},${contact.email},${contact.phone},"${contact.address}"`
    ).join('\n');
    
    const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`;
    const encodedUri = encodeURI(csvContent);
    
    // Create a link and trigger download
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'contacts_invitation.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredContacts = extractedContacts.filter(contact => {
    const searchLower = contactSearchTerm.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(searchLower) ||
      contact.lastName.toLowerCase().includes(searchLower) ||
      contact.company.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Inviter des entreprises</h2>
        <p className="text-muted-foreground">
          Sélectionnez les entreprises que vous souhaitez inviter à soumissionner à votre appel d'offres.
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher une entreprise..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button onClick={() => setShowInviteDialog(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Inviter des entreprises
        </Button>
      </div>

      <Tabs defaultValue="design" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="design">Conception</TabsTrigger>
          <TabsTrigger value="construction">Construction</TabsTrigger>
          <TabsTrigger value="service">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="mb-2 font-medium">Entreprises suggérées</div>
              <div className="space-y-2">
                {filteredCompanies.filter(company => 
                  company.specialty.some(s => designLots.some(lot => lot.id === s))
                ).map(company => (
                  <Card key={company.id} className="overflow-hidden">
                    <div className="flex items-start p-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{company.name}</h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          {company.specialty.map(s => 
                            designLots.find(lot => lot.id === s)?.name
                          ).filter(Boolean).join(', ')}
                        </div>
                      </div>
                      <div className="flex items-center mr-2">
                        <div className="text-right">
                          <div className="flex items-center">
                            <span className="font-medium mr-1">
                              {company.recommendation}%
                            </span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="space-y-1 w-48">
                                    <p className="text-xs">
                                      Le Scoring BTP CONNECT évalue la pertinence d'une entreprise pour un projet en fonction de sa taille, de sa proximité et de sa capacité financière.
                                    </p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <div className="text-xs text-muted-foreground">Scoring BTP CONNECT</div>
                        </div>
                      </div>
                      <Button variant="ghost" onClick={() => handleInviteCompany(company)}>
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <div className="mb-2 font-medium">Entreprises invitées</div>
              <div className="space-y-2">
                {(form.getValues('invitedCompanies') || []).map(company => (
                  <Card key={company.id} className="overflow-hidden">
                    <div className="flex items-start p-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{company.name}</h3>
                      </div>
                      <Checkbox
                        checked={company.selected}
                        onCheckedChange={(checked) => {
                          const currentInvited = form.getValues('invitedCompanies');
                          form.setValue('invitedCompanies', 
                            currentInvited.map(c => 
                              c.id === company.id ? { ...c, selected: !!checked } : c
                            )
                          );
                        }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="construction" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="mb-2 font-medium">Entreprises suggérées</div>
              <div className="space-y-2">
                {filteredCompanies.filter(company => 
                  company.specialty.some(s => constructionLots.some(lot => lot.id === s))
                ).map(company => (
                  <Card key={company.id} className="overflow-hidden">
                    <div className="flex items-start p-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{company.name}</h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          {company.specialty.map(s => 
                            constructionLots.find(lot => lot.id === s)?.name
                          ).filter(Boolean).join(', ')}
                        </div>
                      </div>
                      <div className="flex items-center mr-2">
                        <div className="text-right">
                          <div className="flex items-center">
                            <span className="font-medium mr-1">
                              {company.recommendation}%
                            </span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="space-y-1 w-48">
                                    <p className="text-xs">
                                      Le Scoring BTP CONNECT évalue la pertinence d'une entreprise pour un projet en fonction de sa taille, de sa proximité et de sa capacité financière.
                                    </p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <div className="text-xs text-muted-foreground">Scoring BTP CONNECT</div>
                        </div>
                      </div>
                      <Button variant="ghost" onClick={() => handleInviteCompany(company)}>
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <div className="mb-2 font-medium">Entreprises invitées</div>
              <div className="space-y-2">
                {(form.getValues('invitedCompanies') || []).map(company => (
                  <Card key={company.id} className="overflow-hidden">
                    <div className="flex items-start p-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{company.name}</h3>
                      </div>
                      <Checkbox
                        checked={company.selected}
                        onCheckedChange={(checked) => {
                          const currentInvited = form.getValues('invitedCompanies');
                          form.setValue('invitedCompanies', 
                            currentInvited.map(c => 
                              c.id === company.id ? { ...c, selected: !!checked } : c
                            )
                          );
                        }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="service" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="mb-2 font-medium">Entreprises suggérées</div>
              <div className="space-y-2">
                {filteredCompanies.filter(company => 
                  company.specialty.some(s => serviceLots.some(lot => lot.id === s))
                ).map(company => (
                  <Card key={company.id} className="overflow-hidden">
                    <div className="flex items-start p-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{company.name}</h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          {company.specialty.map(s => 
                            serviceLots.find(lot => lot.id === s)?.name
                          ).filter(Boolean).join(', ')}
                        </div>
                      </div>
                      <div className="flex items-center mr-2">
                        <div className="text-right">
                          <div className="flex items-center">
                            <span className="font-medium mr-1">
                              {company.recommendation}%
                            </span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="space-y-1 w-48">
                                    <p className="text-xs">
                                      Le Scoring BTP CONNECT évalue la pertinence d'une entreprise pour un projet en fonction de sa taille, de sa proximité et de sa capacité financière.
                                    </p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <div className="text-xs text-muted-foreground">Scoring BTP CONNECT</div>
                        </div>
                      </div>
                      <Button variant="ghost" onClick={() => handleInviteCompany(company)}>
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <div className="mb-2 font-medium">Entreprises invitées</div>
              <div className="space-y-2">
                {(form.getValues('invitedCompanies') || []).map(company => (
                  <Card key={company.id} className="overflow-hidden">
                    <div className="flex items-start p-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{company.name}</h3>
                      </div>
                      <Checkbox
                        checked={company.selected}
                        onCheckedChange={(checked) => {
                          const currentInvited = form.getValues('invitedCompanies');
                          form.setValue('invitedCompanies', 
                            currentInvited.map(c => 
                              c.id === company.id ? { ...c, selected: !!checked } : c
                            )
                          );
                        }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inviter des entreprises</DialogTitle>
            <DialogDescription>
              Collez en vrac des informations de contact non structurées. Notre IA analyse et organise automatiquement ces données.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="bulk-data">Informations de contact</Label>
              <Textarea 
                id="bulk-data"
                className="h-40 mt-2" 
                placeholder="Exemple: Jean Dupont, Entreprise XYZ, jean.dupont@xyz.com, 01 23 45 67 89, 5 rue de la Construction 75001 Paris" 
                value={bulkContactData}
                onChange={(e) => setBulkContactData(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Collez prénoms, noms, adresses, numéros de téléphone, noms d'entreprises, emails, etc.
              </p>
            </div>

            <Button 
              onClick={handleProcessBulkData} 
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? "Traitement en cours..." : "Analyser et extraire les contacts"}
            </Button>

            {extractedContacts.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Contacts extraits ({extractedContacts.length})
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={downloadContactsCSV}>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger CSV
                    </Button>
                  </div>
                </div>

                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher un contact..."
                    className="pl-8 mb-4"
                    value={contactSearchTerm}
                    onChange={(e) => setContactSearchTerm(e.target.value)}
                  />
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Entreprise</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead className="w-32">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContacts.map(contact => (
                        <TableRow key={contact.id}>
                          <TableCell>{contact.firstName}</TableCell>
                          <TableCell>{contact.lastName}</TableCell>
                          <TableCell>{contact.company}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.phone}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="icon" asChild>
                                <Popover>
                                  <PopoverTrigger>
                                    <Edit className="h-4 w-4" />
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80">
                                    <div className="space-y-2">
                                      <h4 className="font-medium">Modifier le contact</h4>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <Label htmlFor={`firstname-${contact.id}`}>Prénom</Label>
                                          <Input 
                                            id={`firstname-${contact.id}`}
                                            value={contact.firstName}
                                            onChange={(e) => handleEditContact(contact.id, 'firstName', e.target.value)}
                                          />
                                        </div>
                                        <div>
                                          <Label htmlFor={`lastname-${contact.id}`}>Nom</Label>
                                          <Input 
                                            id={`lastname-${contact.id}`}
                                            value={contact.lastName}
                                            onChange={(e) => handleEditContact(contact.id, 'lastName', e.target.value)}
                                          />
                                        </div>
                                        <div className="col-span-2">
                                          <Label htmlFor={`company-${contact.id}`}>Entreprise</Label>
                                          <Input 
                                            id={`company-${contact.id}`}
                                            value={contact.company}
                                            onChange={(e) => handleEditContact(contact.id, 'company', e.target.value)}
                                          />
                                        </div>
                                        <div className="col-span-2">
                                          <Label htmlFor={`email-${contact.id}`}>Email</Label>
                                          <Input 
                                            id={`email-${contact.id}`}
                                            value={contact.email}
                                            onChange={(e) => handleEditContact(contact.id, 'email', e.target.value)}
                                          />
                                        </div>
                                        <div className="col-span-2">
                                          <Label htmlFor={`phone-${contact.id}`}>Téléphone</Label>
                                          <Input 
                                            id={`phone-${contact.id}`}
                                            value={contact.phone}
                                            onChange={(e) => handleEditContact(contact.id, 'phone', e.target.value)}
                                          />
                                        </div>
                                        <div className="col-span-2">
                                          <Label htmlFor={`address-${contact.id}`}>Adresse</Label>
                                          <Textarea 
                                            id={`address-${contact.id}`}
                                            value={contact.address}
                                            onChange={(e) => handleEditContact(contact.id, 'address', e.target.value)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleRemoveContact(contact.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredContacts.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            {contactSearchTerm ? "Aucun contact ne correspond à votre recherche." : "Aucun contact extrait."}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteDialog(false)}>Annuler</Button>
            <Button 
              onClick={handleInviteExtractedContacts}
              disabled={extractedContacts.length === 0}
            >
              Inviter les entreprises
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TenderCompanyInvitation;


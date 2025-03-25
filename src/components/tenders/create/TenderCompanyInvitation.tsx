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
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ExtractedContact {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

const dummyCompanies = [
  // ... keep existing dummy companies data
];

const designLots = [
  // ... keep existing designLots data
];

const constructionLots = [
  // ... keep existing constructionLots data
];

const serviceLots = [
  // ... keep existing serviceLots data
];

const TenderCompanyInvitation: React.FC<TenderCompanyInvitationProps> = ({ form, isOpen, onOpenChange }) => {
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

  const dialogOpen = isOpen !== undefined ? isOpen : showInviteDialog;
  const setDialogOpen = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setShowInviteDialog(open);
    }
  };

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

    setTimeout(() => {
      const lines = bulkContactData.split('\n').filter(line => line.trim());
      const mockExtracted = lines.map((line, index) => {
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
  };

  const downloadContactsCSV = () => {
    const headers = "Prénom,Nom,Entreprise,Email,Téléphone,Adresse\n";
    const rows = extractedContacts.map(contact => 
      `${contact.firstName},${contact.lastName},${contact.company},${contact.email},${contact.phone},"${contact.address}"`
    ).join('\n');
    
    const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`;
    const encodedUri = encodeURI(csvContent);
    
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
        
        <Button onClick={() => setDialogOpen(true)}>
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
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

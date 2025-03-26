
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, FileDown, Mail, Search, Trash2, UserPlus, X } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  selected: boolean;
}

interface BulkCompanyInvitationProps {
  onInviteCompanies: (contacts: Contact[]) => void;
}

const BulkCompanyInvitation: React.FC<BulkCompanyInvitationProps> = ({ onInviteCompanies }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [extractedContacts, setExtractedContacts] = useState<Contact[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'selected'>('all');

  // Fonction simulant l'extraction d'information via IA
  const extractContactInfo = async (text: string) => {
    setIsExtracting(true);
    
    // Simuler un délai de traitement IA
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // En production, ici on appellerait une API d'IA pour extraire les informations
    // Pour notre démo, on va simuler une extraction
    const lines = text.split('\n').filter(line => line.trim());
    
    const extractedData: Contact[] = lines.map((line, index) => {
      // Simulation d'une extraction basique
      const parts = line.split(/[,;]/).map(part => part.trim());
      
      // Extraction très basique - en réalité une IA ferait un travail bien plus précis
      return {
        id: `extracted-${index}`,
        firstName: parts[0]?.split(' ')[0] || '',
        lastName: parts[0]?.split(' ').slice(1).join(' ') || '',
        company: parts[1] || '',
        email: parts.find(p => p.includes('@')) || '',
        phone: parts.find(p => /\d{10}/.test(p.replace(/\D/g, ''))) || '',
        address: parts.length > 2 ? parts[parts.length - 1] : '',
        selected: true
      };
    });
    
    setIsExtracting(false);
    setExtractedContacts(extractedData);
  };
  
  const handleExtract = () => {
    if (!inputText.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez coller du texte contenant des informations de contact",
        variant: "destructive"
      });
      return;
    }
    
    extractContactInfo(inputText);
  };
  
  const handleAddContacts = () => {
    const selectedContacts = extractedContacts.filter(contact => contact.selected);
    if (selectedContacts.length === 0) {
      toast({
        title: "Attention",
        description: "Aucun contact sélectionné"
      });
      return;
    }
    
    setContacts(prev => [...prev, ...selectedContacts]);
    setExtractedContacts([]);
    setInputText('');
    
    toast({
      title: "Contacts ajoutés",
      description: `${selectedContacts.length} contact(s) ajouté(s) avec succès`
    });
  };
  
  const handleRemoveContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };
  
  const handleUpdateContact = (id: string, field: keyof Contact, value: string) => {
    setContacts(prev => 
      prev.map(contact => 
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };
  
  const handleDownloadCSV = () => {
    const headers = ["Prénom", "Nom", "Entreprise", "Email", "Téléphone", "Adresse"];
    const rows = contacts.map(contact => [
      contact.firstName,
      contact.lastName,
      contact.company,
      contact.email,
      contact.phone,
      contact.address
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'contacts_entreprises.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Téléchargement réussi",
      description: "Liste des contacts téléchargée au format CSV"
    });
  };
  
  const handleInvite = () => {
    if (contacts.length === 0) {
      toast({
        title: "Erreur",
        description: "Aucun contact à inviter",
        variant: "destructive"
      });
      return;
    }
    
    onInviteCompanies(contacts);
    
    toast({
      title: "Invitations envoyées",
      description: `${contacts.length} invitation(s) envoyée(s) avec succès`,
      variant: "default"
    });
    
    setIsOpen(false);
    setContacts([]);
  };
  
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm);
      
    if (selectedFilter === 'selected') {
      return matchesSearch && contact.selected;
    }
    
    return matchesSearch;
  });
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">
          <UserPlus className="mr-2 h-4 w-4" />
          Inviter des entreprises
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Inviter des entreprises</DialogTitle>
          <DialogDescription>
            Collez des informations de contact non structurées (noms, emails, téléphones, entreprises).
            Notre IA analysera et organisera automatiquement ces données.
          </DialogDescription>
        </DialogHeader>
        
        {extractedContacts.length === 0 ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bulk-input">Informations de contact</Label>
              <Textarea
                id="bulk-input"
                placeholder="Collez ici les informations de contact..."
                className="min-h-[200px]"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Exemple: Jean Dupont, Entreprise ABC, jean.dupont@email.com, 0123456789, 123 rue de Paris
              </p>
            </div>
            
            <Button onClick={handleExtract} disabled={isExtracting}>
              {isExtracting ? "Analyse en cours..." : "Analyser avec l'IA"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-muted p-3 rounded-md">
              <h3 className="font-medium mb-1">Contacts extraits</h3>
              <p className="text-sm text-muted-foreground">
                Vérifiez et corrigez les informations extraites si nécessaire avant de les ajouter.
              </p>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <input 
                        type="checkbox"
                        checked={extractedContacts.every(c => c.selected)}
                        onChange={(e) => {
                          setExtractedContacts(prev => 
                            prev.map(c => ({...c, selected: e.target.checked}))
                          );
                        }}
                      />
                    </TableHead>
                    <TableHead>Prénom</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {extractedContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        <input 
                          type="checkbox"
                          checked={contact.selected}
                          onChange={(e) => {
                            setExtractedContacts(prev => 
                              prev.map(c => 
                                c.id === contact.id ? {...c, selected: e.target.checked} : c
                              )
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>{contact.firstName}</TableCell>
                      <TableCell>{contact.lastName}</TableCell>
                      <TableCell>{contact.company}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setExtractedContacts([])}>
                Annuler
              </Button>
              <Button onClick={handleAddContacts}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Ajouter les contacts
              </Button>
            </div>
          </div>
        )}
        
        {contacts.length > 0 && (
          <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Liste des contacts à inviter ({contacts.length})</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-9 w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Button variant="outline" size="sm" onClick={handleDownloadCSV}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Exporter CSV
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden max-h-[350px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prénom</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <Input 
                            value={contact.firstName} 
                            onChange={(e) => handleUpdateContact(contact.id, 'firstName', e.target.value)}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={contact.lastName} 
                            onChange={(e) => handleUpdateContact(contact.id, 'lastName', e.target.value)}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={contact.company} 
                            onChange={(e) => handleUpdateContact(contact.id, 'company', e.target.value)}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={contact.email} 
                            onChange={(e) => handleUpdateContact(contact.id, 'email', e.target.value)}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={contact.phone} 
                            onChange={(e) => handleUpdateContact(contact.id, 'phone', e.target.value)}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemoveContact(contact.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        Aucun contact trouvé
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between items-center pt-4">
          <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
            <p>Les entreprises recevront une invitation officielle par email pour rejoindre BTP CONNECT.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Annuler</Button>
            <Button onClick={handleInvite} disabled={contacts.length === 0}>
              <Mail className="mr-2 h-4 w-4" />
              Inviter les entreprises
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkCompanyInvitation;

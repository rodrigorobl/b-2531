
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search, Download, X, Plus, Edit, Trash2, SendHorizontal, Brain, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Types pour les contacts
interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

interface CompanyInvitationManagerProps {
  standalone?: boolean;
  onInvitationsComplete?: (contacts: Contact[]) => void;
}

// Validation schema pour la modification d'un contact
const contactSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  company: z.string().min(1, "Le nom de l'entreprise est requis"),
  email: z.string().email("L'email n'est pas valide"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const CompanyInvitationManager: React.FC<CompanyInvitationManagerProps> = ({ 
  standalone = false,
  onInvitationsComplete
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [rawText, setRawText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  // Réinitialiser le formulaire lorsqu'un contact est sélectionné pour modification
  useEffect(() => {
    if (editContact) {
      form.reset({
        firstName: editContact.firstName,
        lastName: editContact.lastName,
        company: editContact.company,
        email: editContact.email,
        phone: editContact.phone || "",
        address: editContact.address || "",
      });
    }
  }, [editContact, form]);

  // Fonction pour analyser le texte brut et extraire des contacts
  const processRawText = () => {
    if (!rawText.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez coller du texte à analyser",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulation d'analyse par IA - Normalement ici on appellerait une API d'IA
    setTimeout(() => {
      // Exemple de parsing basique - dans un cas réel, ceci serait fait par une IA
      const lines = rawText.split('\n').filter(line => line.trim());
      const newContacts: Contact[] = [];
      
      lines.forEach((line, index) => {
        // Simulation d'extraction d'information
        // Dans un vrai cas, une IA extrairait ces informations correctement
        const words = line.split(/\s+/);
        
        // Heuristique simple pour extraire des données
        const isEmail = (word: string) => word.includes('@');
        const isPhone = (word: string) => /^\+?[\d\s()-]{8,}$/.test(word);
        
        const emails = words.filter(isEmail);
        const phones = words.filter(isPhone);
        
        // Attribution arbitraire - dans un vrai cas l'IA ferait mieux
        const email = emails.length > 0 ? emails[0] : `contact${index}@example.com`;
        const phone = phones.length > 0 ? phones[0] : "";
        
        // Génération d'un contact avec des données extraites ou générées
        const firstName = words[0] || `Prénom${index}`;
        const lastName = words[1] || `Nom${index}`;
        const company = words.length > 2 ? words.slice(2, emails.length ? words.indexOf(emails[0]) : undefined).join(' ') : `Entreprise ${index}`;
        const address = words.length > 5 ? words.slice(words.length - 4).join(' ') : "";
        
        newContacts.push({
          id: `contact-${Date.now()}-${index}`,
          firstName,
          lastName,
          company,
          email,
          phone,
          address
        });
      });
      
      setContacts(prev => [...prev, ...newContacts]);
      setRawText("");
      setIsProcessing(false);
      
      toast({
        title: "Analyse terminée",
        description: `${newContacts.length} contacts ont été extraits`,
      });
    }, 1500);
  };

  // Filtrer les contacts en fonction de la recherche
  const filteredContacts = contacts.filter(contact => {
    const query = searchQuery.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query) ||
      contact.company.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.phone.toLowerCase().includes(query) ||
      contact.address.toLowerCase().includes(query)
    );
  });

  // Fonction pour supprimer un contact
  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast({
      title: "Contact supprimé",
      description: "Le contact a été supprimé avec succès",
    });
  };

  // Fonction pour éditer un contact
  const handleEdit = (contact: Contact) => {
    setEditContact(contact);
  };

  // Fonction pour sauvegarder les modifications d'un contact
  const handleSaveEdit = (values: z.infer<typeof contactSchema>) => {
    if (!editContact) return;
    
    setContacts(contacts.map(contact => 
      contact.id === editContact.id 
        ? { 
            ...contact, 
            firstName: values.firstName,
            lastName: values.lastName,
            company: values.company,
            email: values.email,
            phone: values.phone || "",
            address: values.address || ""
          } 
        : contact
    ));
    
    setEditContact(null);
    form.reset();
    
    toast({
      title: "Contact modifié",
      description: "Le contact a été modifié avec succès",
    });
  };

  // Fonction pour ajouter un nouveau contact manuellement
  const handleAddContact = (values: z.infer<typeof contactSchema>) => {
    const newContact: Contact = {
      id: `contact-${Date.now()}`,
      firstName: values.firstName,
      lastName: values.lastName,
      company: values.company,
      email: values.email,
      phone: values.phone || "",
      address: values.address || ""
    };
    
    setContacts([...contacts, newContact]);
    form.reset();
    
    toast({
      title: "Contact ajouté",
      description: "Le nouveau contact a été ajouté avec succès",
    });
  };

  // Fonction pour télécharger les contacts en CSV
  const downloadCSV = () => {
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
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'contacts_entreprises.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Téléchargement réussi",
      description: "La liste des contacts a été téléchargée en format CSV",
    });
  };

  // Fonction pour envoyer les invitations
  const sendInvitations = () => {
    if (contacts.length === 0) {
      toast({
        title: "Erreur",
        description: "Aucun contact à inviter",
        variant: "destructive",
      });
      return;
    }
    
    // Ici, on simulerait l'envoi d'emails d'invitation
    toast({
      title: "Invitations envoyées",
      description: `${contacts.length} entreprises ont été invitées à rejoindre BTP CONNECT`,
    });
    
    // Si on est dans un contexte de composant intégré, appeler la fonction de callback
    if (onInvitationsComplete) {
      onInvitationsComplete(contacts);
      setIsOpen(false);
    }
    
    if (standalone) {
      // Réinitialiser l'état si nous sommes sur la page autonome
      setContacts([]);
    }
  };

  // Contenu principal du gestionnaire d'invitations
  const InvitationManagerContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain size={20} /> Analyse de données non structurées
          </CardTitle>
          <CardDescription>
            Collez des informations non structurées (noms, adresses, téléphones, emails, entreprises).
            Notre IA analysera, nettoiera et organisera automatiquement ces données.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea 
              placeholder="Collez vos contacts ici... 
Exemple:
Jean Dupont Entreprise Construction jean.dupont@mail.com 0123456789 123 rue de Paris
Marie Martin Bâtisseurs Pro marie@batisseurs.fr 06 12 34 56 78
..." 
              className="min-h-[150px]"
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
            />
            <div className="flex justify-end">
              <Button 
                onClick={processRawText}
                disabled={isProcessing || !rawText.trim()}
              >
                {isProcessing ? "Analyse en cours..." : "Analyser et extraire"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Rechercher un contact..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus size={16} className="mr-2" /> Ajouter manuellement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un contact</DialogTitle>
                <DialogDescription>
                  Ajoutez manuellement les informations d'un nouveau contact.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddContact)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Jean" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Dupont" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entreprise</FormLabel>
                        <FormControl>
                          <Input placeholder="Entreprise Construction" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="jean.dupont@mail.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <Input placeholder="01 23 45 67 89" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input placeholder="123 rue de Paris" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2">
                    <Button type="submit">Ajouter</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" onClick={downloadCSV} disabled={contacts.length === 0}>
            <FileSpreadsheet size={16} className="mr-2" /> Exporter CSV
          </Button>
        </div>
      </div>

      {contacts.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prénom</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead className="hidden md:table-cell">Adresse</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell className="hidden md:table-cell">{contact.address}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(contact)}>
                            <Edit size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Modifier le contact</DialogTitle>
                            <DialogDescription>
                              Modifiez les informations de ce contact.
                            </DialogDescription>
                          </DialogHeader>
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSaveEdit)} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="firstName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Prénom</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="lastName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Nom</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Entreprise</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="phone"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Téléphone</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Adresse</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="flex justify-end gap-2">
                                <Button type="submit">Enregistrer</Button>
                              </div>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" onClick={() => deleteContact(contact.id)}>
                        <Trash2 size={16} className="text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center text-muted-foreground">
              <p>Aucun contact à afficher.</p>
              <p className="text-sm">Collez des données ou ajoutez manuellement des contacts.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-muted p-4 rounded-md">
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Invitation aux entreprises</h3>
          <p className="text-sm text-muted-foreground">
            En cliquant sur "Inviter les entreprises", un email d'invitation officielle sera envoyé à chaque contact avec un lien personnalisé pour s'inscrire sur la plateforme BTP CONNECT.
          </p>
          <div className="flex justify-end mt-2">
            <Button 
              onClick={sendInvitations} 
              disabled={contacts.length === 0}
              className="gap-2"
            >
              <SendHorizontal size={16} />
              Inviter les entreprises ({contacts.length})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Si le composant est utilisé de manière autonome (page dédiée)
  if (standalone) {
    return <InvitationManagerContent />;
  }

  // Si le composant est intégré dans une autre page (dialogue ou tiroir)
  return isMobile ? (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <SendHorizontal size={16} className="mr-2" />
          Inviter des entreprises
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4">
        <div className="pt-6 pb-12">
          <h3 className="text-lg font-semibold mb-4">Inviter des entreprises</h3>
          <InvitationManagerContent />
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SendHorizontal size={16} className="mr-2" />
          Inviter des entreprises
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Inviter des entreprises</DialogTitle>
          <DialogDescription>
            Ajoutez et invitez des entreprises à rejoindre la plateforme BTP CONNECT
          </DialogDescription>
        </DialogHeader>
        <InvitationManagerContent />
      </DialogContent>
    </Dialog>
  );
};

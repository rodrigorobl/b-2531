
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Users, Mail, Send, Building, DraftingCompass, HardHat, Plus, Edit, Trash, UserPlus, Save } from 'lucide-react';
import { toast } from 'sonner';

interface Contact {
  id: string;
  name: string;
  role: string;
  company?: string;
  email: string;
}

interface Message {
  id: string;
  sender: string;
  senderType: 'promoteur' | 'entreprise' | 'bet';
  content: string;
  timestamp: string;
}

interface TenderContactsTabProps {
  tenderId: string;
}

export function TenderContactsTab({ tenderId }: TenderContactsTabProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  
  // Contact form states
  const [contactName, setContactName] = useState('');
  const [contactRole, setContactRole] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactType, setContactType] = useState<'internal' | 'external'>('internal');

  // Mock data for internal team members
  const [internalTeamMembers, setInternalTeamMembers] = useState<Contact[]>([
    { id: "int-1", name: "Jean Dupont", role: "Directeur de projet", email: "jean.dupont@example.com" },
    { id: "int-2", name: "Marie Martin", role: "Chargée d'opérations", email: "marie.martin@example.com" },
    { id: "int-3", name: "Paul Bernard", role: "Responsable administratif", email: "paul.bernard@example.com" },
  ]);

  // Mock data for external consultants
  const [externalConsultants, setExternalConsultants] = useState<Contact[]>([
    { id: "ext-1", name: "Cabinet ABC", role: "BET Structure", company: "Cabinet ABC", email: "contact@cabinetabc.com" },
    { id: "ext-2", name: "Acoustix", role: "Acousticien", company: "Acoustix", email: "info@acoustix.com" },
    { id: "ext-3", name: "EcoConstruct", role: "Économiste", company: "EcoConstruct", email: "contact@ecoconstruct.fr" },
  ]);

  const handleSendMessage = () => {
    if (!messageContent.trim()) {
      toast.error("Le message ne peut pas être vide");
      return;
    }

    // In a real app, this would send the message to an API
    toast.success(`Message envoyé à ${selectedContact?.name}`);
    setMessageContent('');
    setMessageOpen(false);
  };

  const openMessageDialog = (contact: Contact) => {
    setSelectedContact(contact);
    setMessageOpen(true);
  };

  const openEditDialog = (contact: Contact) => {
    setSelectedContact(contact);
    setContactName(contact.name);
    setContactRole(contact.role);
    setContactCompany(contact.company || '');
    setContactEmail(contact.email);
    setContactType(contact.id.startsWith('int') ? 'internal' : 'external');
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (contact: Contact) => {
    setSelectedContact(contact);
    setDeleteDialogOpen(true);
  };

  const openAddDialog = (type: 'internal' | 'external') => {
    setContactType(type);
    // Reset form fields
    setContactName('');
    setContactRole('');
    setContactCompany('');
    setContactEmail('');
    setAddDialogOpen(true);
  };

  const handleAddContact = () => {
    if (!contactName || !contactRole || !contactEmail) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const newContact: Contact = {
      id: `${contactType === 'internal' ? 'int' : 'ext'}-${Date.now()}`,
      name: contactName,
      role: contactRole,
      email: contactEmail,
    };

    if (contactType === 'external' && contactCompany) {
      newContact.company = contactCompany;
    }

    if (contactType === 'internal') {
      setInternalTeamMembers([...internalTeamMembers, newContact]);
    } else {
      setExternalConsultants([...externalConsultants, newContact]);
    }

    toast.success("Intervenant ajouté avec succès");
    setAddDialogOpen(false);
  };

  const handleEditContact = () => {
    if (!selectedContact) return;
    
    if (!contactName || !contactRole || !contactEmail) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const updatedContact: Contact = {
      ...selectedContact,
      name: contactName,
      role: contactRole,
      email: contactEmail,
    };

    if (contactType === 'external') {
      updatedContact.company = contactCompany;
    } else {
      delete updatedContact.company;
    }

    if (selectedContact.id.startsWith('int')) {
      setInternalTeamMembers(
        internalTeamMembers.map(c => 
          c.id === selectedContact.id ? updatedContact : c
        )
      );
    } else {
      setExternalConsultants(
        externalConsultants.map(c => 
          c.id === selectedContact.id ? updatedContact : c
        )
      );
    }

    toast.success("Intervenant modifié avec succès");
    setEditDialogOpen(false);
  };

  const handleDeleteContact = () => {
    if (!selectedContact) return;

    if (selectedContact.id.startsWith('int')) {
      setInternalTeamMembers(
        internalTeamMembers.filter(c => c.id !== selectedContact.id)
      );
    } else {
      setExternalConsultants(
        externalConsultants.filter(c => c.id !== selectedContact.id)
      );
    }

    toast.success("Intervenant supprimé avec succès");
    setDeleteDialogOpen(false);
  };

  const getContactIcon = (role: string) => {
    if (role.includes("Architecte")) {
      return <DraftingCompass className="h-8 w-8 text-primary" />;
    } else if (role.includes("BET")) {
      return <Building className="h-8 w-8 text-primary" />;
    } else if (role.includes("Maître") || role.includes("Responsable")) {
      return <HardHat className="h-8 w-8 text-primary" />;
    } else {
      return <User className="h-8 w-8 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="internal" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="internal" className="flex-1">
            <Users className="mr-2 h-4 w-4" />
            Intervenants internes
          </TabsTrigger>
          <TabsTrigger value="external" className="flex-1">
            <Building className="mr-2 h-4 w-4" />
            Intervenants externes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="internal">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Équipe du promoteur</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => openAddDialog('internal')}
              >
                <UserPlus className="h-4 w-4" />
                Ajouter un intervenant
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {internalTeamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <User className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => openMessageDialog(member)}
                      >
                        <Mail className="h-4 w-4" />
                        Contacter
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditDialog(member)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openDeleteDialog(member)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {internalTeamMembers.length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    Aucun intervenant interne. Cliquez sur "Ajouter un intervenant" pour en créer un.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="external">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>BET & MOE associés</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => openAddDialog('external')}
              >
                <UserPlus className="h-4 w-4" />
                Ajouter un intervenant
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {externalConsultants.map((consultant) => (
                  <div key={consultant.id} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      {getContactIcon(consultant.role)}
                      <div>
                        <p className="font-medium">{consultant.name}</p>
                        <p className="text-sm text-muted-foreground">{consultant.role}</p>
                        {consultant.company && (
                          <p className="text-sm text-muted-foreground">{consultant.company}</p>
                        )}
                        <p className="text-sm text-muted-foreground">{consultant.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => openMessageDialog(consultant)}
                      >
                        <Mail className="h-4 w-4" />
                        Contacter
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditDialog(consultant)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openDeleteDialog(consultant)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {externalConsultants.length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    Aucun intervenant externe. Cliquez sur "Ajouter un intervenant" pour en créer un.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Message Dialog */}
      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>Message à {selectedContact?.name}</span>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient">Destinataire</Label>
              <Input 
                id="recipient" 
                value={selectedContact ? `${selectedContact.name} <${selectedContact.email}>` : ''} 
                readOnly 
                className="mt-1 bg-muted"
              />
            </div>
            
            <div>
              <Label htmlFor="subject">Sujet</Label>
              <Input 
                id="subject" 
                placeholder="Entrez le sujet du message" 
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Tapez votre message ici..." 
                className="mt-1 min-h-[150px]"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageOpen(false)}>Annuler</Button>
            <Button onClick={handleSendMessage} className="gap-2">
              <Send className="h-4 w-4" />
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Contact Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                <span>Ajouter un intervenant</span>
              </div>
            </DialogTitle>
            <DialogDescription>
              Ajoutez un {contactType === 'internal' ? 'intervenant interne' : 'intervenant externe'} au projet.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactName">Nom</Label>
              <Input 
                id="contactName" 
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Nom de l'intervenant" 
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="contactRole">Rôle</Label>
              <Input 
                id="contactRole" 
                value={contactRole}
                onChange={(e) => setContactRole(e.target.value)}
                placeholder="Rôle ou fonction" 
                className="mt-1"
              />
            </div>

            {contactType === 'external' && (
              <div>
                <Label htmlFor="contactCompany">Entreprise</Label>
                <Input 
                  id="contactCompany" 
                  value={contactCompany}
                  onChange={(e) => setContactCompany(e.target.value)}
                  placeholder="Nom de l'entreprise" 
                  className="mt-1"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="contactEmail">Email</Label>
              <Input 
                id="contactEmail" 
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                type="email"
                placeholder="Adresse email" 
                className="mt-1"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleAddContact} className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Contact Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                <span>Modifier un intervenant</span>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="editContactName">Nom</Label>
              <Input 
                id="editContactName" 
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Nom de l'intervenant" 
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="editContactRole">Rôle</Label>
              <Input 
                id="editContactRole" 
                value={contactRole}
                onChange={(e) => setContactRole(e.target.value)}
                placeholder="Rôle ou fonction" 
                className="mt-1"
              />
            </div>

            {contactType === 'external' && (
              <div>
                <Label htmlFor="editContactCompany">Entreprise</Label>
                <Input 
                  id="editContactCompany" 
                  value={contactCompany}
                  onChange={(e) => setContactCompany(e.target.value)}
                  placeholder="Nom de l'entreprise" 
                  className="mt-1"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="editContactEmail">Email</Label>
              <Input 
                id="editContactEmail" 
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                type="email"
                placeholder="Adresse email" 
                className="mt-1"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleEditContact} className="gap-2">
              <Save className="h-4 w-4" />
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Contact Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2 text-destructive">
                <Trash className="h-5 w-5" />
                <span>Supprimer un intervenant</span>
              </div>
            </DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer {selectedContact?.name} ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Annuler</Button>
            <Button variant="destructive" onClick={handleDeleteContact} className="gap-2">
              <Trash className="h-4 w-4" />
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

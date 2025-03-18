
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { User, Users, Mail, Send, Building, DraftingCompass, HardHat } from 'lucide-react';
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

  // Mock data for internal team members
  const internalTeamMembers: Contact[] = [
    { id: "int-1", name: "Jean Dupont", role: "Directeur de projet", email: "jean.dupont@example.com" },
    { id: "int-2", name: "Marie Martin", role: "Chargée d'opérations", email: "marie.martin@example.com" },
    { id: "int-3", name: "Paul Bernard", role: "Responsable administratif", email: "paul.bernard@example.com" },
  ];

  // Mock data for external consultants
  const externalConsultants: Contact[] = [
    { id: "ext-1", name: "Cabinet ABC", role: "BET Structure", company: "Cabinet ABC", email: "contact@cabinetabc.com" },
    { id: "ext-2", name: "Acoustix", role: "Acousticien", company: "Acoustix", email: "info@acoustix.com" },
    { id: "ext-3", name: "EcoConstruct", role: "Économiste", company: "EcoConstruct", email: "contact@ecoconstruct.fr" },
  ];

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
            Contacts internes
          </TabsTrigger>
          <TabsTrigger value="external" className="flex-1">
            <Building className="mr-2 h-4 w-4" />
            Contacts externes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="internal">
          <Card>
            <CardHeader>
              <CardTitle>Équipe du promoteur</CardTitle>
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => openMessageDialog(member)}
                    >
                      <Mail className="h-4 w-4" />
                      Contacter
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="external">
          <Card>
            <CardHeader>
              <CardTitle>BET & MOE associés</CardTitle>
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => openMessageDialog(consultant)}
                    >
                      <Mail className="h-4 w-4" />
                      Contacter
                    </Button>
                  </div>
                ))}
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
    </div>
  );
}

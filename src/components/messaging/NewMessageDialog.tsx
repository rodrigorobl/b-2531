
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Search, User } from 'lucide-react';

// Sample contacts data
const contactsData = [
  {
    id: 'contact-001',
    name: 'Martine Laforet',
    company: 'InnovaSpace',
    role: 'Maître d\'ouvrage',
    email: 'martine.laforet@innovaspace.fr',
    projects: ['Résidence Les Ormes', 'Centre commercial Grand Place']
  },
  {
    id: 'contact-002',
    name: 'Philippe Dubois',
    company: 'Atelier Architecture',
    role: 'Architecte',
    email: 'p.dubois@atelierarchitecture.fr',
    projects: ['Centre commercial Grand Place']
  },
  {
    id: 'contact-003',
    name: 'Clara Sanchez',
    company: 'IngeConseil',
    role: 'Ingénieure Structure',
    email: 'c.sanchez@ingeconseil.fr',
    projects: ['École Saint-Pierre']
  },
  {
    id: 'contact-004',
    name: 'Sophie Martin',
    company: 'VINCI',
    role: 'Chef de projet',
    email: 's.martin@vinci.fr',
    projects: ['Entrepôt Logistique Nord']
  },
  {
    id: 'contact-005',
    name: 'Jean Moreau',
    company: 'BET Fluides',
    role: 'Ingénieur CVC',
    email: 'j.moreau@betfluides.fr',
    projects: ['Résidence Les Ormes', 'École Saint-Pierre']
  }
];

interface NewMessageDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateMessage: (recipient: any) => void;
}

export function NewMessageDialog({ open, onClose, onCreateMessage }: NewMessageDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [subject, setSubject] = useState('');
  
  const filteredContacts = contactsData.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCreateMessage = () => {
    if (selectedContact) {
      onCreateMessage({
        ...selectedContact,
        subject
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouvelle conversation</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="recipient">Destinataire</Label>
            {selectedContact ? (
              <div className="flex items-center justify-between border rounded-md p-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {selectedContact.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{selectedContact.name}</div>
                    <div className="text-xs text-muted-foreground">{selectedContact.role} • {selectedContact.company}</div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedContact(null)}
                >
                  Changer
                </Button>
              </div>
            ) : (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    id="recipient" 
                    placeholder="Rechercher un contact..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="border rounded-md max-h-48 overflow-y-auto mt-2">
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map(contact => (
                      <div 
                        key={contact.id}
                        className="p-2 hover:bg-accent cursor-pointer border-b last:border-b-0 flex items-center gap-2"
                        onClick={() => {
                          setSelectedContact(contact);
                          setSearchTerm('');
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-xs text-muted-foreground">{contact.role} • {contact.company}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-center text-muted-foreground">
                      Aucun contact trouvé
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Sujet</Label>
            <Input 
              id="subject" 
              placeholder="Sujet de la conversation"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            type="button" 
            onClick={handleCreateMessage}
            disabled={!selectedContact || !subject}
          >
            Créer la conversation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

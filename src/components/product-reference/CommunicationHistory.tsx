
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  date: string;
  sender: string;
  senderRole: string;
  content: string;
  isRead: boolean;
  recipient?: string; // Who the message is addressed to
}

interface Contact {
  name: string;
  role: string;
  company: string;
  email?: string;
  phone?: string;
}

interface CommunicationHistoryProps {
  messages: Message[];
  promoterContacts?: Contact[];
  betContacts?: Contact[];
  contractorContacts?: Contact[];
}

export default function CommunicationHistory({ 
  messages, 
  promoterContacts = [], 
  betContacts = [], 
  contractorContacts = [] 
}: CommunicationHistoryProps) {
  const [newMessage, setNewMessage] = useState('');
  const [selectedRecipientType, setSelectedRecipientType] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<string>('');
  
  // Group all contacts
  const allContacts = [
    ...promoterContacts.map(contact => ({ ...contact, type: 'promoter' })),
    ...betContacts.map(contact => ({ ...contact, type: 'bet' })),
    ...contractorContacts.map(contact => ({ ...contact, type: 'contractor' }))
  ];

  // Filter messages based on selected recipient type
  const filteredMessages = messages.filter(message => {
    if (selectedRecipientType === 'all') return true;
    if (selectedRecipientType === 'promoter') return message.senderRole.toLowerCase().includes('promoteur') || message.recipient === 'promoter';
    if (selectedRecipientType === 'bet') return message.senderRole.toLowerCase().includes('architecte') || message.senderRole.toLowerCase().includes('ingénieur') || message.recipient === 'bet';
    if (selectedRecipientType === 'contractor') return message.senderRole.toLowerCase().includes('chef de projet') || message.senderRole.toLowerCase().includes('titulaire') || message.recipient === 'contractor';
    return true;
  });

  const handleSend = () => {
    // Just clear the input field - in a real app, this would send the message
    setNewMessage('');
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Communications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select 
            value={selectedRecipientType} 
            onValueChange={setSelectedRecipientType}
          >
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="Filtrer par destinataire" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les messages</SelectItem>
              <SelectItem value="promoter">Promoteur</SelectItem>
              <SelectItem value="bet">Bureaux d'études</SelectItem>
              <SelectItem value="contractor">Entreprise titulaire</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-8 space-y-4 max-h-[400px] overflow-y-auto">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <div key={message.id} className={`flex gap-4 ${message.sender === 'Mon Équipe' ? 'justify-end' : ''}`}>
                <div className={`max-w-[80%] ${message.sender === 'Mon Équipe' ? 'order-2' : 'order-1'}`}>
                  <div className={`p-4 rounded-lg ${message.sender === 'Mon Équipe' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-sm">{message.sender}</p>
                        <p className={`text-xs ${message.sender === 'Mon Équipe' 
                          ? 'text-primary-foreground/80' 
                          : 'text-muted-foreground'}`}
                        >
                          {message.senderRole}
                        </p>
                      </div>
                      <span className={`text-xs ${message.sender === 'Mon Équipe' 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground'}`}
                      >
                        {message.date}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
                <Avatar className={`h-8 w-8 ${message.sender === 'Mon Équipe' ? 'order-1' : 'order-2'}`}>
                  <AvatarFallback>
                    {message.sender.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>Aucun message avec ce destinataire</p>
            </div>
          )}
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">Répondre</h3>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Sélectionner le destinataire
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sélectionner le destinataire</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Promoteur</h4>
                    <div className="space-y-2">
                      {promoterContacts.length > 0 ? promoterContacts.map((contact, index) => (
                        <div 
                          key={`promoter-${index}`}
                          className={`p-2 border rounded-md cursor-pointer hover:bg-muted transition-colors ${
                            selectedContact === `promoter-${contact.name}` ? 'border-primary' : ''
                          }`}
                          onClick={() => setSelectedContact(`promoter-${contact.name}`)}
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{contact.name}</p>
                              <p className="text-xs text-muted-foreground">{contact.role}</p>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <p className="text-sm text-muted-foreground">Aucun contact disponible</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Bureaux d'études</h4>
                    <div className="space-y-2">
                      {betContacts.length > 0 ? betContacts.map((contact, index) => (
                        <div 
                          key={`bet-${index}`}
                          className={`p-2 border rounded-md cursor-pointer hover:bg-muted transition-colors ${
                            selectedContact === `bet-${contact.name}` ? 'border-primary' : ''
                          }`}
                          onClick={() => setSelectedContact(`bet-${contact.name}`)}
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{contact.name}</p>
                              <p className="text-xs text-muted-foreground">{contact.role} - {contact.company}</p>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <p className="text-sm text-muted-foreground">Aucun contact disponible</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Entreprise titulaire</h4>
                    <div className="space-y-2">
                      {contractorContacts.length > 0 ? contractorContacts.map((contact, index) => (
                        <div 
                          key={`contractor-${index}`}
                          className={`p-2 border rounded-md cursor-pointer hover:bg-muted transition-colors ${
                            selectedContact === `contractor-${contact.name}` ? 'border-primary' : ''
                          }`}
                          onClick={() => setSelectedContact(`contractor-${contact.name}`)}
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{contact.name}</p>
                              <p className="text-xs text-muted-foreground">{contact.role} - {contact.company}</p>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <p className="text-sm text-muted-foreground">Aucun contact disponible</p>
                      )}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-3">
            {selectedContact && (
              <div className="bg-muted/50 p-2 rounded-md text-sm flex justify-between items-center">
                <div>
                  Destinataire: <span className="font-medium">
                    {selectedContact.split('-')[1]} 
                    ({selectedContact.startsWith('promoter') ? 'Promoteur' : 
                      selectedContact.startsWith('bet') ? 'BET' : 'Entreprise titulaire'})
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedContact('')}
                  className="h-6 w-6 p-0"
                >
                  ✕
                </Button>
              </div>
            )}
            
            <Textarea 
              placeholder="Tapez votre message ici..." 
              className="min-h-[120px]"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewMessage('')}>Annuler</Button>
              <Button onClick={handleSend} disabled={!newMessage.trim() || !selectedContact}>
                <Send className="mr-2 h-4 w-4" />
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

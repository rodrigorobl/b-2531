
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: {
    name: string;
    role: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface LotMessagesProps {
  lotId: string;
}

export function LotMessages({ lotId }: LotMessagesProps) {
  const [newMessage, setNewMessage] = useState('');
  
  // Mock messages for demonstration
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: {
        name: 'Alex Dubois',
        role: 'Bureau d\'études',
      },
      content: 'Les plans techniques fournis par ElectroPro SARL sont conformes à nos attentes. Je recommande leur offre.',
      timestamp: '2023-05-11T09:30:00',
      isCurrentUser: false
    },
    {
      id: '2',
      sender: {
        name: 'Sophie Martin',
        role: 'Promoteur',
      },
      content: 'Pourriez-vous préciser quels aspects du devis d\'ElectroSystems ne sont pas conformes aux spécifications techniques?',
      timestamp: '2023-05-12T10:15:00',
      isCurrentUser: true
    },
    {
      id: '3',
      sender: {
        name: 'Alex Dubois',
        role: 'Bureau d\'études',
      },
      content: 'Les sections de câbles proposées ne sont pas conformes aux normes requises pour ce type de bâtiment. De plus, certains équipements spécifiés dans le cahier des charges sont absents du devis.',
      timestamp: '2023-05-12T11:45:00',
      isCurrentUser: false
    }
  ]);
  
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: {
        name: 'Sophie Martin',
        role: 'Promoteur',
      },
      content: newMessage,
      timestamp: new Date().toISOString(),
      isCurrentUser: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    toast.success('Message envoyé');
  };
  
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('fr-FR') + ' à ' + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isCurrentUser 
                  ? 'bg-primary text-primary-foreground ml-12' 
                  : 'bg-muted mr-12'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {!message.isCurrentUser && (
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <span className="font-medium text-sm">{message.sender.name}</span>
                <span className="text-xs opacity-70">({message.sender.role})</span>
              </div>
              <p className="text-sm">{message.content}</p>
              <div className="text-xs opacity-70 mt-1 text-right">
                {formatDateTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-3">
        <div className="flex gap-2">
          <Textarea
            placeholder="Votre message..."
            className="flex-1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button onClick={sendMessage} className="self-end">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

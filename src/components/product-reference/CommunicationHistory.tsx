
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  date: string;
  sender: string;
  senderRole: string;
  content: string;
  isRead: boolean;
}

interface CommunicationHistoryProps {
  messages: Message[];
}

export default function CommunicationHistory({ messages }: CommunicationHistoryProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Communications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-8 space-y-4">
          {messages.map((message) => (
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
          ))}
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-2">Répondre</h3>
          <div className="space-y-3">
            <Textarea 
              placeholder="Tapez votre message ici..." 
              className="min-h-[120px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline">Annuler</Button>
              <Button>
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

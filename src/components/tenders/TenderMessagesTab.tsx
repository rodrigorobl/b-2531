
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  sender: string;
  senderType: 'promoteur' | 'entreprise' | 'bet';
  content: string;
  timestamp: string;
}

interface TenderMessagesTabProps {
  messages: Message[];
}

export function TenderMessagesTab({ messages }: TenderMessagesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Historique des échanges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`p-4 rounded-lg border ${
                message.senderType === 'promoteur' ? 'bg-primary/10 ml-12' : 'bg-muted'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <span className="font-medium">{message.sender}</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {message.senderType === 'promoteur' ? 'MOA' : message.senderType === 'bet' ? 'BET' : 'Entreprise'}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">{message.timestamp}</span>
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Button className="w-full">
            <MessageSquare size={16} className="mr-1.5" />
            Envoyer un nouveau message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

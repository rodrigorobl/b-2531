
import React, { useState } from 'react';
import { TenderDetailData } from '@/types/tenderDetail';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface TenderMessagesPanelProps {
  tender: TenderDetailData;
}

export default function TenderMessagesPanel({ tender }: TenderMessagesPanelProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // This would be handled by an API call in a real application
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">Messages</h2>

      <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
        {tender.messages.map((message) => {
          const date = new Date(message.timestamp);
          const formattedDate = date.toLocaleDateString('fr-FR');
          const formattedTime = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
          
          return (
            <div key={message.id} className="bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-medium">{message.sender}</span>
                  <span className="text-xs text-muted-foreground ml-2">({message.senderRole})</span>
                </div>
                <span className="text-xs text-muted-foreground">{formattedDate} - {formattedTime}</span>
              </div>
              <p className="text-sm">{message.message}</p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrivez votre message ici..."
          className="flex-1"
        />
        <Button onClick={handleSendMessage} className="self-end">
          <Send className="w-4 h-4 mr-1" />
          Envoyer
        </Button>
      </div>
    </div>
  );
}

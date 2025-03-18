
import React, { useState } from 'react';
import { Paperclip, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { QuoteMessage } from '@/types/services-quotes';
import { Separator } from '@/components/ui/separator';

interface QuoteChatProps {
  messages: QuoteMessage[];
  onSendMessage: (message: string, attachments?: File[]) => void;
}

export function QuoteChat({ messages, onSendMessage }: QuoteChatProps) {
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSend = () => {
    if (newMessage.trim() || attachments.length > 0) {
      onSendMessage(newMessage.trim(), attachments.length > 0 ? attachments : undefined);
      setNewMessage('');
      setAttachments([]);
    }
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <div className="font-medium">{message.senderName}</div>
              <div className="text-xs text-muted-foreground">
                {formatDateTime(message.createdAt)}
              </div>
            </div>
            <div className="bg-muted/50 rounded-md p-3">
              <p className="whitespace-pre-wrap">{message.message}</p>
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 pt-2 border-t border-border">
                  <div className="text-sm font-medium mb-1">Pièces jointes:</div>
                  <div className="flex flex-wrap gap-2">
                    {message.attachments.map((attachment) => (
                      <a
                        key={attachment.id}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md hover:bg-primary/20"
                      >
                        <Paperclip size={12} />
                        {attachment.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {messages.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            Aucun message. Démarrez la conversation !
          </div>
        )}
      </div>
      
      <Separator className="my-2" />
      
      {attachments.length > 0 && (
        <div className="mb-2">
          <div className="text-sm font-medium mb-1">Pièces jointes à envoyer:</div>
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div key={index} className="text-sm flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                <Paperclip size={12} />
                {file.name}
                <button 
                  type="button" 
                  className="ml-1 text-muted-foreground hover:text-destructive"
                  onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleAttachmentClick}
        >
          <Paperclip size={18} />
        </Button>
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Écrivez votre message..."
          className="flex-1 resize-none"
          rows={2}
        />
        <Button type="button" onClick={handleSend}>
          <Send size={18} className="mr-2" />
          Envoyer
        </Button>
      </div>
    </div>
  );
}

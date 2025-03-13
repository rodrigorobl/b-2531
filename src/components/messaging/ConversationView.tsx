
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontal, Paperclip, MoreVertical, ArrowLeft, File, Download, User } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface Message {
  id: string;
  conversationId: string;
  sender: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments: Array<{
    name: string;
    size: string;
    type: string;
  }>;
}

interface Conversation {
  id: string;
  contact: {
    id: string;
    name: string;
    company: string;
    role: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    isRead: boolean;
    isFromMe: boolean;
  };
  unreadCount: number;
  isPriority: boolean;
  project: string;
}

interface ConversationViewProps {
  conversation: Conversation;
  messages: Message[];
  onSendMessage: (content: string, attachments: any[]) => void;
}

export default function ConversationView({ conversation, messages, onSendMessage }: ConversationViewProps) {
  const [messageText, setMessageText] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (messageText.trim() || attachments.length > 0) {
      // Convert File objects to the expected format
      const attachmentData = attachments.map(file => ({
        name: file.name,
        size: `${Math.round(file.size / 1024)} Ko`,
        type: file.type.split('/')[1].toUpperCase()
      }));
      
      onSendMessage(messageText, attachmentData);
      setMessageText('');
      setAttachments([]);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setAttachments([...attachments, ...fileArray]);
    }
  };
  
  return (
    <>
      {/* Conversation Header */}
      <div className="p-4 border-b flex items-center justify-between bg-background sticky top-0 z-10">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="relative">
            {conversation.contact.avatar ? (
              <Avatar>
                <img 
                  src={conversation.contact.avatar} 
                  alt={conversation.contact.name} 
                />
              </Avatar>
            ) : (
              <Avatar>
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
              </Avatar>
            )}
            
            {/* Online status indicator */}
            <div className={cn(
              "absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-background",
              conversation.contact.isOnline ? "bg-green-500" : "bg-gray-400"
            )} />
          </div>
          
          <div className="ml-3">
            <div className="font-medium">{conversation.contact.name}</div>
            <div className="text-xs text-muted-foreground flex items-center">
              <span>{conversation.contact.role}</span>
              <span className="mx-1">•</span>
              <span>{conversation.contact.company}</span>
              <span className="mx-1">•</span>
              <span>{conversation.project}</span>
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Marquer comme non lu</DropdownMenuItem>
            <DropdownMenuItem>Ajouter des participants</DropdownMenuItem>
            <DropdownMenuItem>Exporter la conversation</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Supprimer la conversation</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto bg-secondary/10">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              isFromMe={message.sender.id === 'user'} 
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message Input */}
      <div className="p-4 border-t bg-background">
        {/* Attachment preview */}
        {attachments.length > 0 && (
          <div className="mb-2 p-2 bg-secondary/20 rounded-md">
            <div className="text-xs font-medium mb-1">Pièces jointes ({attachments.length})</div>
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center gap-1 text-xs bg-background p-1 rounded">
                  <File className="h-3 w-3 text-primary" />
                  <span className="truncate max-w-40">{file.name}</span>
                  <button 
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-start gap-2">
          <Textarea
            placeholder="Écrivez votre message..."
            className="min-h-[80px] resize-none"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          <div className="flex flex-col gap-2">
            <Button 
              type="button" 
              size="icon" 
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4" />
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                className="hidden" 
                multiple 
              />
            </Button>
            
            <Button 
              type="button" 
              size="icon" 
              onClick={handleSendMessage}
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function MessageBubble({ message, isFromMe }: { message: Message, isFromMe: boolean }) {
  return (
    <div className={cn(
      "flex",
      isFromMe ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg p-3",
        isFromMe ? "bg-primary text-primary-foreground" : "bg-background border"
      )}>
        {!isFromMe && (
          <div className="flex items-center gap-1 mb-1">
            <span className="font-medium text-sm">{message.sender.name}</span>
            <span className="text-xs opacity-70">{message.sender.role}</span>
          </div>
        )}
        
        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
        
        {message.attachments.length > 0 && (
          <div className="mt-2 pt-2 border-t border-primary-foreground/20">
            {message.attachments.map((attachment, index) => (
              <div key={index} className="flex items-center text-xs mt-1">
                <File className="h-3 w-3 mr-1" />
                <span className="flex-1">{attachment.name}</span>
                <span className="mx-2 opacity-70">{attachment.size}</span>
                <button className="opacity-70 hover:opacity-100">
                  <Download className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className={cn(
          "text-xs mt-1",
          isFromMe ? "text-primary-foreground/70 text-right" : "text-muted-foreground"
        )}>
          {message.timestamp}
          {isFromMe && (
            <span className="ml-1">{message.isRead ? '✓✓' : '✓'}</span>
          )}
        </div>
      </div>
    </div>
  );
}

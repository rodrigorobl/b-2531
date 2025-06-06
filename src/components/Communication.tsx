import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SendHorizontal, File, Download, User, Clock, Paperclip, FileText, DollarSign } from 'lucide-react';
import { QuoteMessageDialog } from './construction-site/QuoteMessageDialog';

interface Message {
  id: string;
  sender: {
    name: string;
    avatar?: string;
    role: string;
  };
  content: string;
  timestamp: string;
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
  }>;
  quoteInfo?: {
    service: string;
    price: string;
  };
}

interface LegacyMessage {
  id: string;
  date: string;
  sender: string;
  senderRole: string;
  content: string;
  isRead: boolean;
  recipient: string;
}

type MessageOrLegacy = Message | LegacyMessage;

function isLegacyMessage(message: MessageOrLegacy): message is LegacyMessage {
  return 'date' in message && 'senderRole' in message;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success';
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
}

interface LegacyDocument {
  id: string;
  name: string;
  type: string;
  date: string;
}

type DocumentOrLegacy = Document | LegacyDocument;

function isLegacyDocument(doc: DocumentOrLegacy): doc is LegacyDocument {
  return 'date' in doc && !('uploadDate' in doc);
}

interface CommunicationProps {
  messages: MessageOrLegacy[];
  notifications: Notification[];
  documents: DocumentOrLegacy[];
  onSendMessage?: (content: string, attachments?: any[]) => void;
  onSendQuote?: (quoteData: {
    message: string;
    service: string;
    price: string;
    document?: File;
  }) => void;
}

export default function Communication({ 
  messages, 
  notifications, 
  documents, 
  onSendMessage,
  onSendQuote 
}: CommunicationProps) {
  const [messageText, setMessageText] = React.useState('');
  
  const handleSendMessage = () => {
    if (messageText.trim() && onSendMessage) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="column h-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h2 className="column-header">Communication et suivi</h2>
      
      <Tabs defaultValue="messages" className="w-full flex-1 flex flex-col">
        <TabsList className="w-full mb-4 grid grid-cols-3">
          <TabsTrigger 
            value="messages" 
            className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
          >
            Messages
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="documents" 
            className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
          >
            Documents
          </TabsTrigger>
        </TabsList>
        
        <div className="column-content">
          <TabsContent value="messages" className="m-0 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
              {messages.length === 0 && (
                <EmptyState message="Aucun message" />
              )}
            </div>
            
            <div className="mt-auto">
              <div className="relative">
                <textarea 
                  className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary pr-10 resize-none"
                  placeholder="Écrivez votre message..."
                  rows={2}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button 
                  className="absolute right-3 bottom-3 text-primary hover:text-primary/80 transition-colors"
                  onClick={handleSendMessage}
                >
                  <SendHorizontal size={18} />
                </button>
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <button className="hover:text-foreground transition-colors">
                    <Paperclip size={14} className="inline mr-1" />
                    Joindre un fichier
                  </button>
                  
                  {onSendQuote && (
                    <QuoteMessageDialog onSendQuote={onSendQuote} />
                  )}
                </div>
                <div>Destinataire: Maître d'ouvrage</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="m-0">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
              {notifications.length === 0 && (
                <EmptyState message="Aucune notification" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="m-0">
            <div className="space-y-3">
              {documents.map((document) => (
                <DocumentItem key={document.id} document={document} />
              ))}
              {documents.length === 0 && (
                <EmptyState message="Aucun document" />
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function MessageItem({ message }: { message: MessageOrLegacy }) {
  if (isLegacyMessage(message)) {
    // Convert legacy message format to new format
    const formattedMessage: Message = {
      id: message.id,
      sender: {
        name: message.sender,
        role: message.senderRole
      },
      content: message.content,
      timestamp: message.date
    };
    
    return renderMessage(formattedMessage);
  } else {
    return renderMessage(message);
  }
}

function renderMessage(message: Message) {
  return (
    <div className="bg-secondary/30 rounded-lg p-3">
      <div className="flex items-start">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
          {message.sender.avatar ? (
            <img src={message.sender.avatar} alt={message.sender.name} className="w-full h-full rounded-full" />
          ) : (
            <User size={16} className="text-primary" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <div>
              <span className="font-medium text-sm">{message.sender.name}</span>
              <span className="text-xs text-muted-foreground ml-2">{message.sender.role}</span>
            </div>
            <div className="text-xs text-muted-foreground flex items-center">
              <Clock size={12} className="mr-1" />
              {message.timestamp}
            </div>
          </div>
          
          <div className="text-sm">{message.content}</div>
          
          {/* Show quote information if this is a quote message */}
          {message.quoteInfo && (
            <div className="mt-2 p-3 bg-primary/5 rounded-md border border-primary/20">
              <div className="flex items-center mb-1">
                <FileText size={14} className="text-primary mr-1" />
                <span className="text-sm font-medium">Devis: {message.quoteInfo.service}</span>
              </div>
              <div className="flex items-center text-sm">
                <DollarSign size={14} className="text-primary mr-1" />
                <span>Prix: {message.quoteInfo.price} €</span>
              </div>
            </div>
          )}
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 pt-2 border-t">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center mt-1 text-xs">
                  <File size={12} className="mr-1 text-muted-foreground" />
                  <span>{attachment.name}</span>
                  <span className="text-muted-foreground ml-2">{attachment.size}</span>
                  <button className="ml-auto text-primary hover:text-primary/80 transition-colors">
                    <Download size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <div className={`
      p-3 rounded-lg border-l-4 transition-all
      ${notification.read ? 'bg-secondary/30' : 'bg-secondary/50 shadow-subtle'}
      ${notification.type === 'info' ? 'border-primary' : 
       notification.type === 'warning' ? 'border-status-pending' : 
       'border-status-completed'}
    `}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-medium">{notification.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{notification.description}</p>
        </div>
        <div className="text-xs text-muted-foreground">{notification.timestamp}</div>
      </div>
    </div>
  );
}

function DocumentItem({ document }: { document: DocumentOrLegacy }) {
  const formattedDoc: Document = isLegacyDocument(document) 
    ? {
        id: document.id,
        name: document.name,
        type: document.type,
        size: `${Math.round(Math.random() * 10)}MB`, // Fallback for missing size
        uploadDate: document.date
      }
    : document;
    
  return (
    <div className="flex items-center p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-all">
      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center mr-3">
        <File size={16} className="text-primary" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{formattedDoc.name}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          <span>{formattedDoc.type}</span>
          <span className="mx-2">•</span>
          <span>{formattedDoc.size}</span>
        </div>
      </div>
      <button className="text-primary hover:text-primary/80 transition-colors">
        <Download size={18} />
      </button>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="h-40 flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <p>{message}</p>
      </div>
    </div>
  );
}

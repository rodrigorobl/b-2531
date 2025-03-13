
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MessageSidebar from '@/components/messaging/MessageSidebar';
import ConversationView from '@/components/messaging/ConversationView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { NewMessageDialog } from '@/components/messaging/NewMessageDialog';

// Sample conversation data
const conversationsData = [
  {
    id: 'conv-001',
    contact: {
      id: 'contact-001',
      name: 'Martine Laforet',
      company: 'InnovaSpace',
      role: 'Maître d\'ouvrage',
      avatar: '',
      isOnline: true
    },
    lastMessage: {
      content: 'Pouvez-vous me faire parvenir les plans modifiés pour le lot électricité ?',
      timestamp: 'Aujourd\'hui, 10:30',
      isRead: false,
      isFromMe: false
    },
    unreadCount: 1,
    isPriority: true,
    project: 'Résidence Les Ormes'
  },
  {
    id: 'conv-002',
    contact: {
      id: 'contact-002',
      name: 'Philippe Dubois',
      company: 'Atelier Architecture',
      role: 'Architecte',
      avatar: '',
      isOnline: true
    },
    lastMessage: {
      content: 'Les modifications demandées ont été prises en compte dans la nouvelle version.',
      timestamp: 'Hier, 15:45',
      isRead: true,
      isFromMe: true
    },
    unreadCount: 0,
    isPriority: false,
    project: 'Centre commercial Grand Place'
  },
  {
    id: 'conv-003',
    contact: {
      id: 'contact-003',
      name: 'Équipe BET Structure',
      company: 'IngeConseil',
      role: 'Bureau d\'études',
      avatar: '',
      isOnline: false
    },
    lastMessage: {
      content: 'Rapport d\'étude de sol disponible pour consultation.',
      timestamp: '22/04/2024',
      isRead: true,
      isFromMe: false
    },
    unreadCount: 0,
    isPriority: false,
    project: 'École Saint-Pierre'
  },
  {
    id: 'conv-004',
    contact: {
      id: 'contact-004',
      name: 'Sophie Martin',
      company: 'VINCI',
      role: 'Chef de projet',
      avatar: '',
      isOnline: false
    },
    lastMessage: {
      content: 'Réunion de chantier planifiée pour jeudi prochain à 9h.',
      timestamp: '20/04/2024',
      isRead: true,
      isFromMe: false
    },
    unreadCount: 0,
    isPriority: true,
    project: 'Entrepôt Logistique Nord'
  }
];

// Sample messages for the first conversation
const messagesData = [
  {
    id: 'msg-001',
    conversationId: 'conv-001',
    sender: {
      id: 'contact-001',
      name: 'Martine Laforet',
      role: 'Maître d\'ouvrage',
      avatar: ''
    },
    content: 'Bonjour, suite à notre réunion d\'hier, pourriez-vous me faire parvenir les plans modifiés pour le lot électricité ?',
    timestamp: 'Aujourd\'hui, 10:30',
    isRead: false,
    attachments: []
  },
  {
    id: 'msg-002',
    conversationId: 'conv-001',
    sender: {
      id: 'user',
      name: 'Thomas Dubois',
      role: 'Votre entreprise',
      avatar: ''
    },
    content: 'Bonjour Martine, je prépare ces documents et vous les envoie avant la fin de journée.',
    timestamp: 'Aujourd\'hui, 10:45',
    isRead: true,
    attachments: []
  },
  {
    id: 'msg-003',
    conversationId: 'conv-001',
    sender: {
      id: 'contact-001',
      name: 'Martine Laforet',
      role: 'Maître d\'ouvrage',
      avatar: ''
    },
    content: 'Merci beaucoup, n\'oubliez pas d\'inclure les modifications concernant l\'emplacement du tableau électrique principal comme discuté hier.',
    timestamp: 'Aujourd\'hui, 11:00',
    isRead: false,
    attachments: [
      { name: 'compte_rendu_reunion.pdf', size: '450 Ko', type: 'PDF' }
    ]
  }
];

export default function Messaging() {
  const [conversations, setConversations] = useState(conversationsData);
  const [messages, setMessages] = useState(messagesData);
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredConversations = conversations.filter(conv => {
    // Filter by search term
    const matchesSearch = conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         conv.project.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    if (currentFilter === 'unread') {
      return matchesSearch && conv.unreadCount > 0;
    } else if (currentFilter === 'priority') {
      return matchesSearch && conv.isPriority;
    }
    
    return matchesSearch;
  });

  const handleSendMessage = (content: string, attachments: any[] = []) => {
    if (!content.trim() && attachments.length === 0) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversation.id,
      sender: {
        id: 'user',
        name: 'Thomas Dubois',
        role: 'Votre entreprise',
        avatar: ''
      },
      content,
      timestamp: 'À l\'instant',
      isRead: true,
      attachments
    };

    // Update messages
    setMessages([...messages, newMessage]);
    
    // Update last message in conversations
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          lastMessage: {
            content,
            timestamp: 'À l\'instant',
            isRead: true,
            isFromMe: true
          }
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès.",
    });
  };

  const handleMarkAsRead = (conversationId: string) => {
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          unreadCount: 0,
          lastMessage: {
            ...conv.lastMessage,
            isRead: true
          }
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    // Also mark all messages in this conversation as read
    const updatedMessages = messages.map(msg => {
      if (msg.conversationId === conversationId) {
        return {
          ...msg,
          isRead: true
        };
      }
      return msg;
    });
    
    setMessages(updatedMessages);
  };

  const handleCreateNewMessage = (recipient: any) => {
    // This would create a new conversation in a real app
    toast({
      title: "Nouvelle conversation",
      description: `Conversation créée avec ${recipient.name}`,
    });
    setIsDialogOpen(false);
  };

  const currentConversationMessages = messages.filter(
    msg => msg.conversationId === activeConversation?.id
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="py-4 px-6 border-b bg-background sticky top-0 z-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Messagerie</h1>
            <Button onClick={() => setIsDialogOpen(true)}>Nouveau message</Button>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Rechercher une conversation..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Conversation List */}
          <div className="w-full md:w-1/3 border-r">
            <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentFilter}>
              <div className="px-4 pt-2">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="unread">Non lus</TabsTrigger>
                  <TabsTrigger value="priority">Prioritaires</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="m-0">
                <MessageSidebar 
                  conversations={filteredConversations} 
                  activeConversationId={activeConversation?.id}
                  onSelectConversation={(conv) => {
                    setActiveConversation(conv);
                    handleMarkAsRead(conv.id);
                  }}
                />
              </TabsContent>
              
              <TabsContent value="unread" className="m-0">
                <MessageSidebar 
                  conversations={filteredConversations} 
                  activeConversationId={activeConversation?.id}
                  onSelectConversation={(conv) => {
                    setActiveConversation(conv);
                    handleMarkAsRead(conv.id);
                  }}
                />
              </TabsContent>
              
              <TabsContent value="priority" className="m-0">
                <MessageSidebar 
                  conversations={filteredConversations} 
                  activeConversationId={activeConversation?.id}
                  onSelectConversation={(conv) => {
                    setActiveConversation(conv);
                    handleMarkAsRead(conv.id);
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Conversation View */}
          <div className="hidden md:flex md:flex-1 md:flex-col">
            {activeConversation ? (
              <ConversationView 
                conversation={activeConversation}
                messages={currentConversationMessages}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-muted-foreground">Sélectionnez une conversation</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <NewMessageDialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        onCreateMessage={handleCreateNewMessage}
      />
    </div>
  );
}

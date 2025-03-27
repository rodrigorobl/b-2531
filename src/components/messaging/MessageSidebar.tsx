
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Star, Archive, Trash2, Briefcase } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

interface MessageSidebarProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
}

export default function MessageSidebar({ 
  conversations, 
  activeConversationId,
  onSelectConversation
}: MessageSidebarProps) {
  
  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-muted-foreground">Aucune conversation trouvée</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y overflow-auto max-h-[calc(100vh-14rem)]">
      {conversations.map((conversation) => (
        <div 
          key={conversation.id}
          className={cn(
            "p-4 hover:bg-accent/50 cursor-pointer transition-colors",
            activeConversationId === conversation.id && "bg-accent"
          )}
          onClick={() => onSelectConversation(conversation)}
        >
          <div className="flex items-start gap-3">
            <div className="relative">
              {conversation.contact.avatar ? (
                <img 
                  src={conversation.contact.avatar} 
                  alt={conversation.contact.name} 
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {conversation.contact.name.charAt(0)}
                </div>
              )}
              
              {/* Online status indicator */}
              <div className={cn(
                "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
                conversation.contact.isOnline ? "bg-green-500" : "bg-gray-400"
              )} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div className="truncate font-medium">
                  {conversation.contact.name}
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {conversation.lastMessage.timestamp}
                </div>
              </div>
              
              {/* Project badge */}
              <div className="flex items-center gap-1 text-xs mt-1">
                <Briefcase className="h-3 w-3 text-primary" />
                <span className="font-medium text-primary truncate">{conversation.project}</span>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <span>{conversation.contact.role}</span>
                <span className="mx-1">•</span>
                <span>{conversation.contact.company}</span>
              </div>
              
              <div className="flex items-start mt-1">
                <p className={cn(
                  "text-sm truncate flex-1",
                  conversation.lastMessage.isRead ? "text-muted-foreground" : "font-medium"
                )}>
                  {conversation.lastMessage.isFromMe && "Vous: "}
                  {conversation.lastMessage.content}
                </p>
                
                {conversation.unreadCount > 0 && (
                  <Badge variant="default" className="ml-2 bg-primary">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Action buttons shown on hover */}
          <div className="mt-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground p-1 rounded">
                    {conversation.isPriority ? (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {conversation.isPriority ? "Retirer des prioritaires" : "Marquer comme prioritaire"}
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground p-1 rounded">
                    <Archive className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  Archiver
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-destructive p-1 rounded">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  Supprimer
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      ))}
    </div>
  );
}

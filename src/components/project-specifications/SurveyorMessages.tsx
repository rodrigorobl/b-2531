
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, UserCircle, Building, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import UserProfileDialog from '@/components/UserProfileDialog';

// Sample conversation data structure
const conversationData = [
  {
    id: 'conv-1',
    user: {
      id: 1,
      name: 'Robert Legrand',
      email: 'robert.legrand@entreprisesarl.com',
      role: 'Chef de projet',
      company: {
        name: 'Entreprise SARL',
        address: '45 Rue de la Construction, 75001 Paris',
        phone: '01 23 45 67 89',
        siret: '12345678901234'
      }
    },
    messages: [
      {
        id: 'msg-1-1',
        sender: 'Robert Legrand',
        senderInitials: 'RL',
        timestamp: '15/07/2023 - 09:30',
        content: 'Bonjour, pouvez-vous me confirmer la date limite pour l\'achat des métrés du lot Électricité ? Nous aimerions savoir si nous avons encore le temps de les acquérir avant de soumettre notre offre.'
      }
    ]
  },
  {
    id: 'conv-2',
    user: {
      id: 2,
      name: 'Sophie Clement',
      email: 'sophie.clement@menuiseries-express.com',
      role: 'Responsable commercial',
      company: {
        name: 'Menuiseries Express',
        address: '78 Avenue des Arts, 75002 Paris',
        phone: '01 34 56 78 90',
        siret: '98765432109876'
      }
    },
    messages: [
      {
        id: 'msg-2-1',
        sender: 'Sophie Clement',
        senderInitials: 'SC',
        timestamp: '16/07/2023 - 14:15',
        content: 'Bonjour, nous sommes intéressés par l\'achat des métrés des lots Menuiseries et Gros œuvre. Serait-il possible d\'obtenir une remise si nous achetons les deux lots ensemble ? Merci d\'avance pour votre réponse.'
      }
    ]
  },
  {
    id: 'conv-3',
    user: {
      id: 3,
      name: 'Thomas Petit',
      email: 'thomas.petit@cvc-ingenierie.com',
      role: 'Ingénieur CVC',
      company: {
        name: 'CVC Ingénierie',
        address: '123 Rue de la Ventilation, 75003 Paris',
        phone: '01 45 67 89 01',
        siret: '45678901234567'
      }
    },
    messages: [
      {
        id: 'msg-3-1',
        sender: 'Thomas Petit',
        senderInitials: 'TP',
        timestamp: '17/07/2023 - 11:05',
        content: 'Bonjour, pourriez-vous me préciser si les métrés du lot CVC incluent également les plans détaillés avec les emplacements des équipements ? Nous sommes intéressés mais aimerions connaître le contenu exact avant l\'achat.'
      }
    ]
  },
  {
    id: 'conv-4',
    user: {
      id: 4,
      name: 'Michel Blanc',
      email: 'michel.blanc@electricite-generale.com',
      role: 'Directeur technique',
      company: {
        name: 'Électricité Générale',
        address: '56 Boulevard de l\'Énergie, 75004 Paris',
        phone: '01 56 78 90 12',
        siret: '56789012345678'
      }
    },
    messages: [
      {
        id: 'msg-4-1',
        sender: 'Michel Blanc',
        senderInitials: 'MB',
        timestamp: '18/07/2023 - 16:40',
        content: 'Bonjour, est-il possible d\'accélérer la livraison des métrés pour le lot Électricité ? Nous sommes prêts à payer un supplément pour une livraison en 2 jours au lieu de 4. Notre calendrier est très serré et nous devons finaliser notre offre rapidement.'
      }
    ]
  }
];

export default function SurveyorMessages() {
  const [activeConversation, setActiveConversation] = useState('conv-1');
  const [newMessage, setNewMessage] = useState('');
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast.success('Message envoyé');
      setNewMessage('');
    }
  };

  const handleViewProfile = (user: any) => {
    setSelectedUser(user);
    setUserProfileOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeConversation} onValueChange={setActiveConversation}>
          <TabsList className="mb-4 grid grid-cols-4">
            {conversationData.map((conversation) => (
              <TabsTrigger key={conversation.id} value={conversation.id}>
                {conversation.user.name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {conversationData.map((conversation) => (
            <TabsContent key={conversation.id} value={conversation.id} className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    {conversation.user.name.split(' ').map(part => part[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{conversation.user.name}</p>
                    <p className="text-sm text-muted-foreground">{conversation.user.company.name}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewProfile(conversation.user)}
                  >
                    <UserCircle size={14} className="mr-1" />
                    Profil
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewProfile(conversation.user)}
                  >
                    <Building size={14} className="mr-1" />
                    Entreprise
                  </Button>
                </div>
              </div>
              
              {conversation.messages.map((message) => (
                <div key={message.id} className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      {message.senderInitials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{message.sender}</p>
                      <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              ))}
              
              {/* Zone de réponse */}
              <div className="mt-6">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Votre réponse..."
                  className="min-h-[100px] mb-2"
                />
                <div className="flex justify-end">
                  <Button onClick={handleSendMessage}>
                    <MessageCircle size={16} className="mr-2" />
                    Répondre
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      
      {/* User Profile Dialog */}
      <UserProfileDialog 
        open={userProfileOpen} 
        onOpenChange={setUserProfileOpen} 
        user={selectedUser}
      />
    </Card>
  );
}

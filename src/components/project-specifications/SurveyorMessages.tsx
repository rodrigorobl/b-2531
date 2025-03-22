
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function SurveyorMessages() {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast.success('Message envoyé');
      setNewMessage('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Exemple 1: Question sur la date de remise */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                RL
              </div>
              <div>
                <p className="text-sm font-medium">Robert Legrand (Entreprise SARL)</p>
                <p className="text-xs text-muted-foreground">15/07/2023 - 09:30</p>
              </div>
            </div>
            <p className="text-sm">Bonjour, pouvez-vous me confirmer la date limite pour l'achat des métrés du lot Électricité ? Nous aimerions savoir si nous avons encore le temps de les acquérir avant de soumettre notre offre.</p>
          </div>
          
          {/* Exemple 2: Demande de remise */}
          <div className="bg-accent/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                SC
              </div>
              <div>
                <p className="text-sm font-medium">Sophie Clement (Menuiseries Express)</p>
                <p className="text-xs text-muted-foreground">16/07/2023 - 14:15</p>
              </div>
            </div>
            <p className="text-sm">Bonjour, nous sommes intéressés par l'achat des métrés des lots Menuiseries et Gros œuvre. Serait-il possible d'obtenir une remise si nous achetons les deux lots ensemble ? Merci d'avance pour votre réponse.</p>
          </div>
          
          {/* Exemple 3: Question sur le contenu */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                TP
              </div>
              <div>
                <p className="text-sm font-medium">Thomas Petit (CVC Ingénierie)</p>
                <p className="text-xs text-muted-foreground">17/07/2023 - 11:05</p>
              </div>
            </div>
            <p className="text-sm">Bonjour, pourriez-vous me préciser si les métrés du lot CVC incluent également les plans détaillés avec les emplacements des équipements ? Nous sommes intéressés mais aimerions connaître le contenu exact avant l'achat.</p>
          </div>
          
          {/* Exemple 4: Demande d'urgence */}
          <div className="bg-accent/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                MB
              </div>
              <div>
                <p className="text-sm font-medium">Michel Blanc (Électricité Générale)</p>
                <p className="text-xs text-muted-foreground">18/07/2023 - 16:40</p>
              </div>
            </div>
            <p className="text-sm">Bonjour, est-il possible d'accélérer la livraison des métrés pour le lot Électricité ? Nous sommes prêts à payer un supplément pour une livraison en 2 jours au lieu de 4. Notre calendrier est très serré et nous devons finaliser notre offre rapidement.</p>
          </div>
          
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
        </div>
      </CardContent>
    </Card>
  );
}

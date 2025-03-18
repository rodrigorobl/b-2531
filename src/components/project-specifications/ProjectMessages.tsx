
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProjectMessages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                JD
              </div>
              <div>
                <p className="text-sm font-medium">Jean Dupont (MOA)</p>
                <p className="text-xs text-muted-foreground">12/07/2023 - 10:45</p>
              </div>
            </div>
            <p className="text-sm">Bonjour à tous, merci de noter que la visite du site est obligatoire pour répondre à cet appel d'offres. Merci de prendre contact avec notre secrétariat pour organiser votre visite.</p>
          </div>
          <div className="bg-accent/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                ML
              </div>
              <div>
                <p className="text-sm font-medium">Marie Lambert (Entreprise)</p>
                <p className="text-xs text-muted-foreground">13/07/2023 - 15:22</p>
              </div>
            </div>
            <p className="text-sm">Merci pour cette information. Pourriez-vous préciser si les plans d'exécution sont définitifs ou s'ils sont susceptibles d'évoluer ?</p>
          </div>
          <div className="flex">
            <Button className="ml-auto">
              <MessageSquare size={14} className="mr-2" />
              Envoyer un message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

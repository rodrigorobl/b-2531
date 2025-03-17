
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export default function TenderMessagesTab() {
  return (
    <div className="h-full m-0 flex flex-col">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="bg-muted/50 p-3 rounded-lg">
          <p className="text-sm font-medium">Jean Dupont (MOA)</p>
          <p className="text-xs text-muted-foreground">12/05/2023 - 10:45</p>
          <p className="text-sm mt-2">Bonjour, pouvez-vous préciser vos délais d'intervention pour ce projet ?</p>
        </div>
      </div>
      
      <div className="p-4 pt-2 border-t mt-auto">
        <div className="flex gap-2">
          <Button className="w-full" variant="outline" size="sm">
            <MessageSquare size={14} className="mr-1" />
            <span>Envoyer un message</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

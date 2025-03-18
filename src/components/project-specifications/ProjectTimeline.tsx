
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProjectTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendrier du projet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center text-primary-foreground">
              1
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Publication de l'Appel d'Offres</h3>
              <p className="text-sm text-muted-foreground">01/07/2023</p>
            </div>
            <Badge>Terminé</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center text-primary-foreground">
              2
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Date limite de remise des offres</h3>
              <p className="text-sm text-muted-foreground">30/08/2023</p>
            </div>
            <Badge variant="outline">À venir</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground">
              3
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Analyse des offres</h3>
              <p className="text-sm text-muted-foreground">01/09/2023 - 15/09/2023</p>
            </div>
            <Badge variant="outline">À venir</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground">
              4
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Attribution des lots</h3>
              <p className="text-sm text-muted-foreground">30/09/2023</p>
            </div>
            <Badge variant="outline">À venir</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

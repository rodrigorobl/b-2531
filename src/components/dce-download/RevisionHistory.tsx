
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RevisionItem {
  id: string;
  date: string;
  author: string;
  document: string;
  changes: string;
  version: string;
}

export function RevisionHistory() {
  const revisions: RevisionItem[] = [
    {
      id: 'rev-1',
      date: '25/04/2023',
      author: 'Martin Dubois',
      document: 'Règlement d\'appel d\'offres',
      changes: 'Mise à jour des dates limites de remise des offres',
      version: 'v1.2',
    },
    {
      id: 'rev-2',
      date: '23/04/2023',
      author: 'Sophie Mercier',
      document: 'DPGF Lot 3',
      changes: 'Ajout de postes supplémentaires pour l\'électricité',
      version: 'v1.1',
    },
    {
      id: 'rev-3',
      date: '20/04/2023',
      author: 'Jean Lefebvre',
      document: 'CCAP',
      changes: 'Clarification des clauses de pénalités',
      version: 'v1.1',
    },
    {
      id: 'rev-4',
      date: '17/04/2023',
      author: 'Aurélie Moreau',
      document: 'Plan Façades',
      changes: 'Correction des cotations en façade sud',
      version: 'v1.1',
    },
    {
      id: 'rev-5',
      date: '15/04/2023',
      author: 'Pierre Durand',
      document: 'Plans Architecte',
      changes: 'Publication initiale',
      version: 'v1.0',
    },
    {
      id: 'rev-6',
      date: '12/04/2023',
      author: 'Claire Bernard',
      document: 'Note de Calcul Structure',
      changes: 'Publication initiale',
      version: 'v1.0',
    },
    {
      id: 'rev-7',
      date: '10/04/2023',
      author: 'Nicolas Martin',
      document: 'Étude Thermique',
      changes: 'Révision complète suite aux nouveaux objectifs énergétiques',
      version: 'v2.0',
    },
    {
      id: 'rev-8',
      date: '05/04/2023',
      author: 'Sylvie Leroy',
      document: 'Étude Sol',
      changes: 'Publication initiale',
      version: 'v1.0',
    },
  ];

  // Function to get badge color based on version
  const getVersionBadgeVariant = (version: string): "default" | "secondary" | "outline" => {
    if (version.includes('2.0')) return "secondary";
    if (version.includes('1.0')) return "outline";
    return "default";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des révisions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="space-y-4">
            {revisions.map(revision => (
              <div 
                key={revision.id} 
                className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{revision.document}</h3>
                    <p className="text-sm text-muted-foreground">{revision.changes}</p>
                  </div>
                  <Badge variant={getVersionBadgeVariant(revision.version)}>
                    {revision.version}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{revision.date}</span>
                  <span>{revision.author}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

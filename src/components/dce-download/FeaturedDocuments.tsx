
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText } from 'lucide-react';

interface FeaturedDocument {
  id: string;
  name: string;
  description: string;
  size: number; // in bytes
  version: string;
  lastUpdated: string;
  icon: React.ReactNode;
}

export function FeaturedDocuments() {
  const featuredDocs: FeaturedDocument[] = [
    {
      id: 'doc-1',
      name: 'Règlement d\'appel d\'offres',
      description: 'Document principal détaillant les règles de l\'appel d\'offres',
      size: 3500000,
      version: 'v1.2',
      lastUpdated: '25/04/2023',
      icon: <FileText className="h-8 w-8 text-primary" />,
    },
    {
      id: 'doc-2',
      name: 'Étude thermique',
      description: 'Étude complète des performances thermiques du bâtiment',
      size: 8500000,
      version: 'v2.0',
      lastUpdated: '10/04/2023',
      icon: <FileText className="h-8 w-8 text-green-500" />,
    },
    {
      id: 'doc-3',
      name: 'CCAP',
      description: 'Cahier des Clauses Administratives Particulières',
      size: 2800000,
      version: 'v1.1',
      lastUpdated: '20/04/2023',
      icon: <FileText className="h-8 w-8 text-blue-500" />,
    },
  ];

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {featuredDocs.map(doc => (
        <Card key={doc.id} className="relative overflow-hidden">
          <div className="absolute top-0 right-0">
            <Badge variant="outline" className="m-2">
              {doc.version}
            </Badge>
          </div>
          <CardContent className="pt-6 pb-4">
            <div className="flex flex-col items-center text-center mb-4">
              {doc.icon}
              <h3 className="text-lg font-medium mt-2">{doc.name}</h3>
              <p className="text-sm text-muted-foreground">{doc.description}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mis à jour le:</span>
                <span>{doc.lastUpdated}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taille:</span>
                <span>{formatSize(doc.size)}</span>
              </div>
              <Button className="w-full mt-4 gap-2">
                <Download className="h-4 w-4" />
                <span>Télécharger</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

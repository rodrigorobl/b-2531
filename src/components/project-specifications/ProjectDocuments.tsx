
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ProjectDocuments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Documents du projet</span>
          <Button variant="outline" size="sm">
            <Download size={14} className="mr-2" />
            Tout télécharger
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between hover:bg-accent p-3 rounded-md cursor-pointer">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium">DCE_Complet.zip</p>
                <p className="text-xs text-muted-foreground">Dossier de Consultation des Entreprises</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">15.2 MB</Badge>
              <Download size={16} />
            </div>
          </div>
          <div className="flex items-center justify-between hover:bg-accent p-3 rounded-md cursor-pointer">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium">Plans_Architecte.pdf</p>
                <p className="text-xs text-muted-foreground">Plans d'exécution</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">8.7 MB</Badge>
              <Download size={16} />
            </div>
          </div>
          <div className="flex items-center justify-between hover:bg-accent p-3 rounded-md cursor-pointer">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium">DPGF.xlsx</p>
                <p className="text-xs text-muted-foreground">Décomposition du Prix Global et Forfaitaire</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">1.5 MB</Badge>
              <Download size={16} />
            </div>
          </div>
          <div className="flex items-center justify-between hover:bg-accent p-3 rounded-md cursor-pointer">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium">CCTP.pdf</p>
                <p className="text-xs text-muted-foreground">Cahier des Clauses Techniques Particulières</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">5.3 MB</Badge>
              <Download size={16} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

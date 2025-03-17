
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, FileDown } from 'lucide-react';

export default function TenderDocumentsTab() {
  return (
    <div className="space-y-2">
      <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-3">
        <FileText size={20} className="text-muted-foreground" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">Dossier de Consultation des Entreprises.pdf</p>
          <p className="text-xs text-muted-foreground">3.2 MB</p>
        </div>
        <Button variant="ghost" size="sm">
          <FileDown size={14} />
        </Button>
      </div>
      
      <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-3">
        <FileText size={20} className="text-muted-foreground" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">DPGF.xlsx</p>
          <p className="text-xs text-muted-foreground">1.5 MB</p>
        </div>
        <Button variant="ghost" size="sm">
          <FileDown size={14} />
        </Button>
      </div>
      
      <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-3">
        <FileText size={20} className="text-muted-foreground" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">Plans_Architecte.pdf</p>
          <p className="text-xs text-muted-foreground">8.7 MB</p>
        </div>
        <Button variant="ghost" size="sm">
          <FileDown size={14} />
        </Button>
      </div>
    </div>
  );
}

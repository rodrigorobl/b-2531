
import React from 'react';
import { FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function DceKeywordsFilter() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <FileText size={16} className="text-muted-foreground" />
        <Label>Mots-clés dans les DCE</Label>
      </div>
      
      <Input placeholder="Échelle à Crinoline" />
    </div>
  );
}

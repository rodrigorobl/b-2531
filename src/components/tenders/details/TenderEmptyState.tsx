
import React from 'react';
import { FileText } from 'lucide-react';

export default function TenderEmptyState() {
  return (
    <div className="w-96 min-w-96 bg-white rounded-lg shadow-sm flex items-center justify-center">
      <div className="text-center p-6 text-muted-foreground">
        <FileText className="mx-auto mb-2 opacity-20" size={40} />
        <p>Sélectionnez un appel d'offres pour voir les détails</p>
      </div>
    </div>
  );
}

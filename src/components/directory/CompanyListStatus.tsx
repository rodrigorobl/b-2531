
import React from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';

interface CompanyListStatusProps {
  loading: boolean;
  error: string | null;
}

export default function CompanyListStatus({ loading, error }: CompanyListStatusProps) {
  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement des entreprises...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex items-center justify-center h-full">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium">Erreur de chargement</h3>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return null;
}

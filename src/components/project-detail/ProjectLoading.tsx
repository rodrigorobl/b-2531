
import React from 'react';
import { Loader2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

export function ProjectLoading() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 flex items-center justify-center overflow-auto">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Chargement des données du projet...</p>
          </div>
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export default function DashboardConstruction() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-4 md:px-6 md:py-8 overflow-auto">
        <header className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">Bonjour, Charles</h1>
            <Button 
              variant="default" 
              size={isMobile ? "default" : "sm"}
              onClick={() => navigate('/tender-search')}
              className="whitespace-nowrap w-full sm:w-auto"
            >
              <Plus size={16} className="mr-1" />
              Rechercher des AO
            </Button>
          </div>
          <p className="text-muted-foreground">
            Bienvenue sur votre tableau de bord d'entreprise de construction.
          </p>
        </header>
        
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-muted-foreground">
            Tableau de bord Entreprise de construction en développement
          </p>
        </div>
      </main>
    </div>
  );
}

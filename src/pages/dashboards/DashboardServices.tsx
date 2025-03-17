
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

export default function DashboardServices() {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 px-6 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">Bonjour, Sophie</h1>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => navigate('/tender-search')}
              className="whitespace-nowrap"
            >
              <Plus size={16} className="mr-1" />
              Rechercher des AO
            </Button>
          </div>
          <p className="text-muted-foreground">
            Bienvenue sur votre tableau de bord d'entreprise de services.
          </p>
        </header>
        
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-muted-foreground">
            Tableau de bord Entreprise de services en développement
          </p>
        </div>
      </main>
    </div>
  );
}

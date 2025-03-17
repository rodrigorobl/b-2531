
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

export default function DashboardBET() {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 px-6 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">Bonjour, Bernard</h1>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => navigate('/create-tender')}
              className="whitespace-nowrap"
            >
              <Plus size={16} className="mr-1" />
              Créer un projet
            </Button>
          </div>
          <p className="text-muted-foreground">
            Bienvenue sur votre tableau de bord de maître d'œuvre/BET.
          </p>
        </header>
        
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-muted-foreground">
            Tableau de bord Maître d'Œuvre/BET en développement
          </p>
        </div>
      </main>
    </div>
  );
}

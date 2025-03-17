
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';

interface ProjectErrorProps {
  error: string | null;
}

export function ProjectError({ error }: ProjectErrorProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Erreur</h2>
        <p className="text-muted-foreground">{error || "Projet non trouvé"}</p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => navigate('/project-management')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste des projets
        </Button>
      </div>
    </div>
  );
}

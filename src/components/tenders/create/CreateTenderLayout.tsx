
import React from 'react';
import { Save, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import TenderFormNav from "@/components/tenders/create/TenderFormNav";

interface CreateTenderLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
}

const CreateTenderLayout: React.FC<CreateTenderLayoutProps> = ({
  children,
  currentStep,
  totalSteps,
  onStepClick,
  onNext,
  onPrevious,
  onSaveDraft,
  onSubmit
}) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background w-full">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-y-auto w-full">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b bg-background p-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Créer un appel d'offres</h1>
              <p className="text-muted-foreground">Étape {currentStep} sur {totalSteps}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onSaveDraft}>
                <Save className="mr-1 h-4 w-4" />
                Enregistrer comme brouillon
              </Button>
              
              {currentStep < totalSteps ? (
                <Button size="sm" onClick={onNext}>
                  Suivant
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button size="sm" onClick={onSubmit}>
                  Publier l'appel d'offres
                </Button>
              )}
            </div>
          </div>
          
          {/* Progress indicator */}
          <TenderFormNav currentStep={currentStep} totalSteps={totalSteps} onStepClick={onStepClick} />
        </header>
        
        <main className="flex-1 p-4 md:p-6 w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CreateTenderLayout;

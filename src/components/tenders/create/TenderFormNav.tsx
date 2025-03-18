
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface TenderFormNavProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

const TenderFormNav: React.FC<TenderFormNavProps> = ({ 
  currentStep, 
  totalSteps,
  onStepClick
}) => {
  // Create an array of step labels with updated names
  const steps = [
    { id: 1, label: "Type d'AO" },
    { id: 2, label: "Confidentialité" },
    { id: 3, label: "Informations" },
    { id: 4, label: "Détails" },
    { id: 5, label: "DCE" },
    { id: 6, label: "Documents" },
    { id: 7, label: "Invitations" },
    { id: 8, label: "Planification" },
    { id: 9, label: "Publication" },
  ];
  
  return (
    <div className="flex items-center justify-between mt-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* Step button */}
          <button
            type="button"
            onClick={() => onStepClick(step.id)}
            className={cn(
              "flex flex-col items-center",
              "focus:outline-none transition-colors",
              step.id < currentStep ? "text-primary" : 
              step.id === currentStep ? "text-primary" : 
              "text-muted-foreground"
            )}
            disabled={step.id > currentStep + 1}
          >
            {/* Step circle */}
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                "border-2 transition-colors",
                step.id < currentStep ? "border-primary bg-primary text-primary-foreground" : 
                step.id === currentStep ? "border-primary" : 
                "border-muted-foreground/30"
              )}
            >
              {step.id < currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            
            {/* Step label */}
            <span className="text-xs mt-1">{step.label}</span>
          </button>
          
          {/* Connector line (except after the last step) */}
          {index < steps.length - 1 && (
            <div 
              className={cn(
                "h-[2px] flex-1 mx-2",
                index < currentStep - 1 ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TenderFormNav;

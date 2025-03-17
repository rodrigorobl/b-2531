
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/types/tenderFormTypes';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface TenderFormNavigationProps {
  currentStep: number;
  totalSteps: number;
  form: UseFormReturn<TenderFormValues>;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: (data: TenderFormValues) => void;
}

const TenderFormNavigation: React.FC<TenderFormNavigationProps> = ({
  currentStep,
  totalSteps,
  form,
  onPrevious,
  onNext,
  onSubmit
}) => {
  return (
    <div className="flex justify-between items-center pt-4">
      {currentStep > 1 ? (
        <Button type="button" variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Précédent
        </Button>
      ) : (
        <div></div>
      )}
      
      {currentStep < totalSteps ? (
        <Button type="button" onClick={onNext}>
          Suivant
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      ) : (
        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
          Publier l'appel d'offres
        </Button>
      )}
    </div>
  );
};

export default TenderFormNavigation;

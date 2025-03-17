
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from '@/hooks/use-toast';
import { tenderSchema, TenderFormValues } from '@/types/tenderFormTypes';
import CreateTenderLayout from '@/components/tenders/create/CreateTenderLayout';
import TenderFormStepOne from '@/components/tenders/create/TenderFormStepOne';
import TenderFormStepTwo from '@/components/tenders/create/TenderFormStepTwo';
import TenderFormStepThree from '@/components/tenders/create/TenderFormStepThree';
import TenderFormStepFour from '@/components/tenders/create/TenderFormStepFour';
import TenderFormNavigation from '@/components/tenders/create/TenderFormNavigation';

export default function CreateTender() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<TenderFormValues>({
    resolver: zodResolver(tenderSchema),
    defaultValues: {
      type: "design",
      privacy: "open",
      title: "",
      description: "",
      location: "",
      budget: "",
      documents: []
    }
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSaveDraft = () => {
    // In a real app, this would save the current state to a database
    console.log("Saved as draft:", form.getValues());
    toast({
      title: "Brouillon enregistré",
      description: "Votre appel d'offres a été enregistré comme brouillon.",
    });
  };
  
  const onSubmit = (data: TenderFormValues) => {
    console.log("Form submitted:", data);
    // In a real app, this would submit the data to the server
    // and redirect to the tender details page
    navigate("/tender-management");
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return <TenderFormStepOne form={form} />;
      case 2:
        return <TenderFormStepTwo form={form} />;
      case 3:
        return <TenderFormStepThree form={form} />;
      case 4:
        return <TenderFormStepFour form={form} />;
      default:
        return <TenderFormStepOne form={form} />;
    }
  };

  return (
    <CreateTenderLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onStepClick={setCurrentStep}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSaveDraft={handleSaveDraft}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {renderFormStep()}
        </div>
        
        {/* Bottom navigation */}
        <TenderFormNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          form={form}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={onSubmit}
        />
      </form>
    </CreateTenderLayout>
  );
}

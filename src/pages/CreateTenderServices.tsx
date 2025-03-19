
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/Layout";
import TenderFormNav from '@/components/tenders/create/TenderFormNav';
import TenderPrivacySelector from '@/components/tenders/create/TenderPrivacySelector';
import TenderCompanyInvitation from '@/components/tenders/create/TenderCompanyInvitation';
import ServiceTenderForm from '@/components/tenders/create/ServiceTenderForm';
import TenderDCE from '@/components/tenders/create/TenderDCE';
import TenderAdminDocuments from '@/components/tenders/create/TenderAdminDocuments';
import TenderPublishOptions from '@/components/tenders/create/TenderPublishOptions';
import TenderSummary from '@/components/tenders/create/TenderSummary';
import { SaveIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ServiceTenderFormValues } from '@/types/tender-forms';

const serviceTenderSchema = z.object({
  serviceScope: z.enum(['local', 'départemental', 'régional', 'national', 'international']),
  serviceDuration: z.enum(['ponctuel', '3mois', '6mois', '1an', '2ans', '3ans']),
});

const formSchema = z.object({
  type: z.literal('service'),
  privacy: z.enum(['open', 'restricted', 'closed']),
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  service: serviceTenderSchema,
  invitedCompanies: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      lotId: z.string().optional(),
      selected: z.boolean()
    })
  ),
  adminDocuments: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ).optional(),
});

export default function CreateTenderServices() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<ServiceTenderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "service",
      privacy: "open",
      projectName: "",
      description: "",
      service: {
        serviceScope: "local",
        serviceDuration: "ponctuel"
      },
      invitedCompanies: [],
      adminDocuments: [],
    },
  });

  function onSubmit(data: ServiceTenderFormValues) {
    console.log("Form values:", data);
    toast({
      title: "Appel d'offres publié",
      description: "Votre appel d'offres a été publié avec succès.",
    });
    navigate('/tender-list');
  }
  
  function saveDraft() {
    const formData = form.getValues();
    console.log("Saving draft:", formData);
    toast({
      title: "Brouillon enregistré",
      description: "Votre brouillon a été enregistré avec succès.",
    });
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const steps = [
    { id: 1, label: "Confidentialité" },
    { id: 2, label: "Informations" },
    { id: 3, label: "Détails" },
    { id: 4, label: "DCE" },
    { id: 5, label: "Administratif" },
    { id: 6, label: "Invitations" },
    { id: 7, label: "Publication" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Créer un Appel d'Offres - Services
            </h1>
            <p className="text-muted-foreground mt-1">
              Publiez un nouvel appel d'offres pour des prestations de services
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex justify-between items-center mb-4">
                <Button
                  variant="outline"
                  onClick={goToPreviousStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Précédent
                </Button>

                <Button
                  variant="outline"
                  onClick={goToNextStep}
                  disabled={currentStep === steps.length}
                >
                  Suivant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <TenderFormNav 
                  currentStep={currentStep}
                  totalSteps={steps.length}
                  onStepClick={(step) => setCurrentStep(step)}
                />
              </div>

              {currentStep === 1 && (
                <TenderPrivacySelector form={form as any} />
              )}

              {currentStep === 2 && (
                <div className="space-y-3">
                  <div>
                    <FormField
                      control={form.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom du projet</FormLabel>
                          <FormControl>
                            <Input placeholder="Maintenance électrique" {...field} />
                          </FormControl>
                          <FormDescription>
                            Quel est le nom de votre projet ?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Décrivez votre besoin en détail" 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Donnez le plus de détails possible.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <ServiceTenderForm form={form} />
              )}

              {currentStep === 4 && (
                <TenderDCE form={form as any} />
              )}

              {currentStep === 5 && (
                <TenderAdminDocuments form={form as any} />
              )}

              {currentStep === 6 && (
                <TenderCompanyInvitation form={form as any} />
              )}

              {currentStep === 7 && (
                <div className="space-y-6">
                  <TenderSummary form={form as any} />
                  <TenderPublishOptions form={form as any} />
                </div>
              )}

              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={saveDraft}
                  className="mr-2"
                >
                  <SaveIcon size={16} className="mr-2" />
                  Enregistrer brouillon
                </Button>
                
                {currentStep < steps.length ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)}>Suivant</Button>
                ) : (
                  <Button type="submit">
                    Publier
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

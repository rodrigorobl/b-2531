
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
import ConstructionTenderForm from '@/components/tenders/create/ConstructionTenderForm';
import TenderProjectTeam from '@/components/tenders/create/TenderProjectTeam';
import TenderLots from '@/components/tenders/create/TenderLots';
import TenderDCE from '@/components/tenders/create/TenderDCE';
import TenderAdminDocuments from '@/components/tenders/create/TenderAdminDocuments';
import TenderKeyDates from '@/components/tenders/create/TenderKeyDates';
import TenderLotsClosureDate from '@/components/tenders/create/TenderLotsClosureDate';
import TenderPublishOptions from '@/components/tenders/create/TenderPublishOptions';
import TenderSummary from '@/components/tenders/create/TenderSummary';
import { SaveIcon, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import ProjectMap from '@/components/ProjectMap';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ConstructionTenderFormValues } from '@/types/tender-forms';

const constructionTenderSchema = z.object({
  constructionType: z.enum(['neuf', 'réhabilitation', 'extension', 'renovation', 'demolition', 'amenagement']),
  area: z.string(),
  location: z.object({
    address: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }).optional(),
  buildings: z.array(z.object({
    id: z.string(),
    levels: z.number(),
  })).optional(),
  projectTeam: z.array(z.object({
    name: z.string(),
    role: z.string(),
  })).optional(),
  lots: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    selected: z.boolean(),
  })).optional(),
  dpgfMethod: z.enum(['ai', 'upload']).optional(),
  keyDates: z.array(z.object({
    id: z.string(),
    name: z.string(),
    date: z.date().optional(),
  })).optional(),
  lotClosureDates: z.array(z.object({
    lotName: z.string(),
    closureDate: z.date().optional(),
  })).optional(),
  usages: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
  })).optional(),
});

const formSchema = z.object({
  type: z.literal('construction'),
  privacy: z.enum(['open', 'restricted', 'closed']),
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  construction: constructionTenderSchema,
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

export default function CreateTenderRealisation() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState<{address: string; lat: number; lng: number} | null>(null);
  const [address, setAddress] = useState('');

  const form = useForm<ConstructionTenderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "construction",
      privacy: "open",
      projectName: "",
      description: "",
      construction: {
        constructionType: "neuf",
        area: "",
        location: undefined,
        buildings: [],
        projectTeam: [],
        lots: [],
        dpgfMethod: 'ai',
        usages: [],
      },
      invitedCompanies: [],
      adminDocuments: [],
    },
  });

  function onSubmit(data: ConstructionTenderFormValues) {
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

  function handleLocateAddress() {
    if (!address.trim()) return;
    
    // This would normally use a geocoding service
    // For demo purposes, we'll set a fixed location
    const mockLocation = {
      address: address,
      lat: 48.8566, // Paris coordinates as example
      lng: 2.3522
    };
    
    setLocation(mockLocation);
    form.setValue('construction.location', mockLocation);
  };

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
    { id: 4, label: "Équipe" },
    { id: 5, label: "Lots" },
    { id: 6, label: "DCE" },
    { id: 7, label: "Administratif" },
    { id: 8, label: "Invitations" },
    { id: 9, label: "Publication" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Créer un Appel d'Offres - Réalisation
            </h1>
            <p className="text-muted-foreground mt-1">
              Publiez un nouvel appel d'offres pour des travaux de construction
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
                <TenderPrivacySelector form={form} />
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
                            <Input placeholder="Résidence Les Cerisiers" {...field} />
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
                              placeholder="Décrivez votre projet en détail" 
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
                  
                  <div className="space-y-3 mt-6">
                    <FormItem>
                      <FormLabel>Adresse du projet</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input 
                            placeholder="Entrez l'adresse du projet" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="flex-1"
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          onClick={handleLocateAddress}
                          className="shrink-0"
                        >
                          <MapPin size={16} className="mr-2" />
                          Localiser
                        </Button>
                      </div>
                      <FormDescription>
                        Localisation précise du projet
                      </FormDescription>
                    </FormItem>
                    
                    <div className="h-[300px] mt-2">
                      <ProjectMap 
                        location={location || undefined}
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <ConstructionTenderForm form={form} />
              )}

              {currentStep === 4 && (
                <TenderProjectTeam form={form} />
              )}
              
              {currentStep === 5 && (
                <TenderLots form={form} />
              )}

              {currentStep === 6 && (
                <TenderDCE form={form} />
              )}

              {currentStep === 7 && (
                <TenderAdminDocuments form={form} />
              )}

              {currentStep === 8 && (
                <TenderCompanyInvitation form={form} />
              )}

              {currentStep === 9 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <TenderKeyDates form={form} />
                    <TenderLotsClosureDate form={form} />
                    <TenderSummary form={form} />
                  </div>
                  <TenderPublishOptions form={form} />
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

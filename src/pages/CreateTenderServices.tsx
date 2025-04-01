
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
import { SaveIcon, ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ServiceTenderFormValues } from '@/types/tender-forms';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

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

// Liste de projets existants
const existingProjects = [
  { id: "1", name: "Rénovation Centre Commercial", city: "Paris" },
  { id: "2", name: "Maintenance électrique bureaux", city: "Lyon" },
  { id: "3", name: "Entretien espaces verts", city: "Marseille" },
  { id: "4", name: "Installation système sécurité", city: "Bordeaux" },
  { id: "5", name: "Nettoyage façades", city: "Lille" },
  { id: "6", name: "Audit énergétique", city: "Toulouse" },
];

export default function CreateTenderServices() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>("");

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
  
  // Gestion du choix de projet
  const selectProject = (projectId: string) => {
    const project = existingProjects.find(p => p.id === projectId);
    if (project) {
      form.setValue("projectName", project.name);
      setSelectedProject(projectId);
      setOpen(false);
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
                          <div className="space-y-2">
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  className={cn(
                                    "w-full justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value || "Sélectionnez un projet existant ou saisissez un nouveau"}
                                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0" align="start">
                                <Command>
                                  <CommandInput placeholder="Rechercher un projet..." />
                                  <CommandEmpty>Aucun projet trouvé.</CommandEmpty>
                                  <CommandGroup>
                                    {existingProjects.map((project) => (
                                      <CommandItem
                                        key={project.id}
                                        value={project.id}
                                        onSelect={() => selectProject(project.id)}
                                      >
                                        <div className="flex flex-col">
                                          <span>{project.name}</span>
                                          <span className="text-xs text-muted-foreground">
                                            {project.city}
                                          </span>
                                        </div>
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            {!selectedProject && (
                              <Input
                                {...field}
                                placeholder="Ou saisissez le nom de votre projet ici"
                              />
                            )}
                          </div>
                          <FormDescription>
                            Sélectionnez un projet existant ou saisissez un nouveau nom
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

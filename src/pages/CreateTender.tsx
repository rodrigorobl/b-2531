
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/Layout";
import TenderFormNav from '@/components/tenders/create/TenderFormNav';
import TenderTypeSelector from '@/components/tenders/create/TenderTypeSelector';
import TenderPrivacySelector from '@/components/tenders/create/TenderPrivacySelector';
import TenderCompanyInvitation from '@/components/tenders/create/TenderCompanyInvitation';

const designTenderSchema = z.object({
  projectNature: z.enum(['logement', 'tertiaire', 'industriel', 'commercial', 'hospitalier', 'scolaire', 'autres']),
  area: z.string(),
});

const constructionTenderSchema = z.object({
  constructionType: z.enum(['neuf', 'réhabilitation', 'extension', 'renovation', 'demolition', 'amenagement']),
  area: z.string(),
});

const serviceTenderSchema = z.object({
  serviceScope: z.enum(['local', 'départemental', 'régional', 'national', 'international']),
  serviceDuration: z.enum(['ponctuel', '3mois', '6mois', '1an', '2ans', '3ans']),
});

const formSchema = z.object({
  type: z.enum(['design', 'construction', 'service']),
  privacy: z.enum(['open', 'restricted', 'closed']),
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  design: designTenderSchema.optional(),
  construction: constructionTenderSchema.optional(),
  service: serviceTenderSchema.optional(),
  invitedCompanies: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      lotId: z.string().optional(),
      selected: z.boolean()
    })
  ),
});

export type TenderFormValues = z.infer<typeof formSchema>;

interface CreateTenderProps {
  isEditing?: boolean;
}

export default function CreateTender({ isEditing = false }: CreateTenderProps) {
  const { tenderId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<TenderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "design",
      privacy: "open",
      projectName: "",
      description: "",
      design: {
        projectNature: "logement",
        area: ""
      },
      construction: {
        constructionType: "neuf",
        area: ""
      },
      service: {
        serviceScope: "local",
        serviceDuration: "ponctuel"
      },
      invitedCompanies: [],
    },
  });

  function onSubmit(data: TenderFormValues) {
    console.log("Form values:", data);
  }

  useEffect(() => {
    if (isEditing && tenderId) {
      const mockTenderData: TenderFormValues = {
        type: "design",
        privacy: "open",
        projectName: "Mock Project Name",
        description: "This is a mock tender description for testing purposes.",
        design: {
          projectNature: "logement",
          area: ""
        },
        invitedCompanies: []
      };
      form.reset(mockTenderData);
    }
  }, [isEditing, tenderId, form]);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              {isEditing ? "Modifier l'Appel d'Offres" : "Créer un Appel d'Offres"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditing 
                ? "Modifiez les paramètres de votre appel d'offres" 
                : "Publiez un nouvel appel d'offres"}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <TenderFormNav 
                currentStep={currentStep}
                totalSteps={9}
                onStepClick={(step) => setCurrentStep(step)}
              />

              {currentStep === 1 && (
                <TenderTypeSelector form={form} />
              )}

              {currentStep === 2 && (
                <TenderPrivacySelector form={form} />
              )}

              {currentStep === 3 && (
                <div className="space-y-3">
                  <div>
                    <FormItem>
                      <FormLabel>Nom du projet</FormLabel>
                      <FormControl>
                        <Input placeholder="Résidence Les Cerisiers" {...form.register("projectName")} />
                      </FormControl>
                      <FormDescription>
                        Quel est le nom de votre projet ?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </div>

                  <div>
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Décrivez votre projet en détail" {...form.register("description")} />
                      </FormControl>
                      <FormDescription>
                        Donnez le plus de détails possible.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <TenderCompanyInvitation form={form} />
              )}

              <div className="flex justify-end">
                {currentStep > 1 && (
                  <Button
                    variant="secondary"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="mr-2"
                  >
                    Précédent
                  </Button>
                )}
                {currentStep < 9 ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)}>Suivant</Button>
                ) : (
                  <Button type="submit">
                    {isEditing ? "Mettre à jour" : "Publier"}
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

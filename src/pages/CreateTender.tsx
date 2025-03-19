
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SaveIcon } from 'lucide-react';
import ProjectMap from '@/components/ProjectMap';
import ConstructionTenderForm from '@/components/tenders/create/ConstructionTenderForm';

const designTenderSchema = z.object({
  projectNature: z.enum(['logement', 'tertiaire', 'industriel', 'commercial', 'hospitalier', 'scolaire', 'autres']),
  area: z.string(),
});

const constructionTenderSchema = z.object({
  constructionType: z.enum(['neuf', 'réhabilitation', 'extension', 'renovation', 'demolition', 'amenagement']),
  area: z.string(),
  location: z.object({
    address: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }).optional(),
  projectTeam: z.array(z.object({
    name: z.string(),
    role: z.string(),
  })).optional(),
  lots: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    selected: z.boolean(),
  })).optional(),
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
  const [location, setLocation] = useState<{address: string; lat: number; lng: number} | null>(null);

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
        area: "",
        location: undefined,
        projectTeam: [],
        lots: []
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
  
  function saveDraft() {
    const formData = form.getValues();
    console.log("Saving draft:", formData);
    // Here you would save the draft to your database/storage
    // For now we'll just show a mock success in the console
    console.log("Draft saved successfully!");
  }

  // Handle address selection on map
  const handleAddressChange = (address: string) => {
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
              <div className="flex justify-between items-center">
                <TenderFormNav 
                  currentStep={currentStep}
                  totalSteps={9}
                  onStepClick={(step) => setCurrentStep(step)}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={saveDraft}
                  className="flex items-center gap-2"
                >
                  <SaveIcon size={16} />
                  Enregistrer brouillon
                </Button>
              </div>

              {currentStep === 1 && (
                <TenderTypeSelector form={form} />
              )}

              {currentStep === 2 && (
                <TenderPrivacySelector form={form} />
              )}

              {currentStep === 3 && (
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
                  
                  {form.getValues("type") === "construction" && (
                    <div className="space-y-3 mt-6">
                      <FormItem>
                        <FormLabel>Adresse du projet</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Entrez l'adresse du projet" 
                            onChange={(e) => handleAddressChange(e.target.value)}
                          />
                        </FormControl>
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
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  {form.getValues("type") === "design" && (
                    <>
                      <h2 className="text-xl font-semibold">Détails du projet de conception</h2>
                      
                      <FormField
                        control={form.control}
                        name="design.projectNature"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nature du projet</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez la nature du projet" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="logement">Logement</SelectItem>
                                <SelectItem value="tertiaire">Tertiaire</SelectItem>
                                <SelectItem value="industriel">Industriel</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="hospitalier">Hospitalier</SelectItem>
                                <SelectItem value="scolaire">Scolaire</SelectItem>
                                <SelectItem value="autres">Autres</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choisissez la nature de votre projet de conception
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="design.area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Surface (m²)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="1000" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Indiquez la surface approximative du projet
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  {form.getValues("type") === "construction" && (
                    <ConstructionTenderForm form={form} />
                  )}
                  
                  {form.getValues("type") === "service" && (
                    <>
                      <h2 className="text-xl font-semibold">Détails de la prestation de service</h2>
                      
                      <FormField
                        control={form.control}
                        name="service.serviceScope"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Étendue géographique</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez l'étendue géographique" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="local">Local</SelectItem>
                                <SelectItem value="départemental">Départemental</SelectItem>
                                <SelectItem value="régional">Régional</SelectItem>
                                <SelectItem value="national">National</SelectItem>
                                <SelectItem value="international">International</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choisissez l'étendue géographique de la prestation
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="service.serviceDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Durée de la prestation</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez la durée" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ponctuel">Ponctuel</SelectItem>
                                <SelectItem value="3mois">3 mois</SelectItem>
                                <SelectItem value="6mois">6 mois</SelectItem>
                                <SelectItem value="1an">1 an</SelectItem>
                                <SelectItem value="2ans">2 ans</SelectItem>
                                <SelectItem value="3ans">3 ans</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Indiquez la durée prévue de la prestation
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Dossier de Consultation des Entreprises (DCE)</h2>
                  <p className="text-muted-foreground">
                    Cette section vous permet de gérer les documents techniques de votre appel d'offres.
                  </p>
                  
                  <div className="bg-secondary/50 p-6 rounded-lg border border-border flex items-center justify-center flex-col h-[300px]">
                    <p className="text-muted-foreground text-center mb-4">
                      Déposez vos fichiers ici ou parcourez vos dossiers
                    </p>
                    <Button variant="outline">Parcourir</Button>
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Documents administratifs</h2>
                  <p className="text-muted-foreground">
                    Ajoutez les documents administratifs nécessaires pour votre appel d'offres.
                  </p>
                  
                  <div className="bg-secondary/50 p-6 rounded-lg border border-border flex items-center justify-center flex-col h-[300px]">
                    <p className="text-muted-foreground text-center mb-4">
                      Déposez vos fichiers ici ou parcourez vos dossiers
                    </p>
                    <Button variant="outline">Parcourir</Button>
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <TenderCompanyInvitation form={form} />
              )}

              {currentStep === 8 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Planification</h2>
                  <p className="text-muted-foreground">
                    Définissez le calendrier de votre appel d'offres
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormItem>
                      <FormLabel>Date de publication</FormLabel>
                      <FormControl>
                        <Input type="date" />
                      </FormControl>
                      <FormDescription>
                        Date à laquelle l'appel d'offres sera visible
                      </FormDescription>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>Date limite de réponse</FormLabel>
                      <FormControl>
                        <Input type="date" />
                      </FormControl>
                      <FormDescription>
                        Date limite pour recevoir les propositions
                      </FormDescription>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>Date de début du projet</FormLabel>
                      <FormControl>
                        <Input type="date" />
                      </FormControl>
                      <FormDescription>
                        Date prévue pour le démarrage du projet
                      </FormDescription>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>Durée estimée (en mois)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder="12" />
                      </FormControl>
                      <FormDescription>
                        Durée estimée du projet en mois
                      </FormDescription>
                    </FormItem>
                  </div>
                </div>
              )}

              {currentStep === 9 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Publication</h2>
                  <p className="text-muted-foreground">
                    Vérifiez les informations avant de publier votre appel d'offres
                  </p>
                  
                  <div className="bg-secondary/30 p-6 rounded-lg border border-border">
                    <h3 className="font-medium mb-4">Récapitulatif</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-medium">
                          {form.getValues("type") === "design" ? "Conception" : 
                           form.getValues("type") === "construction" ? "Réalisation" : 
                           "Services"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Confidentialité</span>
                        <span className="font-medium">
                          {form.getValues("privacy") === "open" ? "Ouvert" : 
                           form.getValues("privacy") === "restricted" ? "Restreint" : 
                           "Privé"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Nom du projet</span>
                        <span className="font-medium">{form.getValues("projectName") || "Non défini"}</span>
                      </div>
                      
                      <div className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Entreprises invitées</span>
                        <span className="font-medium">{form.getValues("invitedCompanies").length}</span>
                      </div>
                    </div>
                  </div>
                </div>
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

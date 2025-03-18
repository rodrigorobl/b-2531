
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, ChevronRight, Save, Clock, MapPin, FileText, Upload, Calendar, Building, ArrowLeft, ArrowRight, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import TenderFormNav from "@/components/tenders/create/TenderFormNav";
import TenderTypeSelector from "@/components/tenders/create/TenderTypeSelector";
import TenderPrivacySelector from "@/components/tenders/create/TenderPrivacySelector";
import DesignTenderForm from "@/components/tenders/create/DesignTenderForm";
import ConstructionTenderForm from "@/components/tenders/create/ConstructionTenderForm";
import ServiceTenderForm from "@/components/tenders/create/ServiceTenderForm";
import TenderPublishOptions from "@/components/tenders/create/TenderPublishOptions";
import TenderCompanyInvitation from "@/components/tenders/create/TenderCompanyInvitation";
import TenderAdminDocuments from "@/components/tenders/create/TenderAdminDocuments";

export type TenderType = 'design' | 'construction' | 'service';
export type TenderPrivacy = 'open' | 'restricted' | 'closed';

// Schema for the tender form
const tenderSchema = z.object({
  type: z.enum(["design", "construction", "service"] as const),
  privacy: z.enum(["open", "restricted", "closed"] as const),
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
  description: z.string().optional(),
  // Common fields will be required for all tender types
  location: z.string().min(3, "Veuillez indiquer une adresse valide"),
  budget: z.string().min(1, "Veuillez indiquer un budget estimatif"),
  deadline: z.date({
    required_error: "Veuillez sélectionner une date limite"
  }),
  // Optional fields depending on tender type
  projectNature: z.string().optional(),
  area: z.string().optional(),
  constructionType: z.string().optional(),
  serviceScope: z.string().optional(),
  serviceDuration: z.string().optional(),
  documents: z.array(z.object({
    name: z.string(),
    size: z.number()
  })).optional(),
  adminDocuments: z.array(z.object({
    id: z.string(),
    name: z.string()
  })).optional(),
  invitedCompanies: z.array(z.object({
    id: z.string(),
    name: z.string(),
    selected: z.boolean().optional()
  })).optional()
});

export type TenderFormValues = z.infer<typeof tenderSchema>;

export default function CreateTender() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8; // Updated total steps
  const navigate = useNavigate();
  
  const form = useForm<TenderFormValues>({
    resolver: zodResolver(tenderSchema),
    defaultValues: {
      type: "design",
      privacy: "open",
      title: "",
      description: "",
      location: "",
      budget: "",
      documents: [],
      adminDocuments: [],
      invitedCompanies: []
    }
  });
  
  const watchType = form.watch("type") as TenderType;
  
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
    // Show success toast
    window.alert("Brouillon enregistré avec succès!");
  };
  
  const onSubmit = (data: TenderFormValues) => {
    console.log("Form submitted:", data);
    // In a real app, this would submit the data to the server
    // and redirect to the tender details page
    navigate("/tender-management");
  };
  
  return <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b bg-background p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Créer un appel d'offres</h1>
              <p className="text-muted-foreground">Étape {currentStep} sur {totalSteps}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleSaveDraft}>
                <Save className="mr-1 h-4 w-4" />
                Enregistrer comme brouillon
              </Button>
              
              {currentStep < totalSteps ? <Button size="sm" onClick={handleNext}>
                  Suivant
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button> : <Button size="sm" onClick={form.handleSubmit(onSubmit)}>
                  Publier l'appel d'offres
                </Button>}
            </div>
          </div>
          
          {/* Progress indicator */}
          <TenderFormNav currentStep={currentStep} totalSteps={totalSteps} onStepClick={setCurrentStep} />
        </header>
        
        <main className="flex-1 p-4 md:p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1: Type selection */}
              {currentStep === 1 && 
                <Card className="md:col-span-3">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Type d'appel d'offres</h2>
                    <TenderTypeSelector form={form} />
                  </CardContent>
                </Card>
              }
              
              {/* Step 2: Privacy selection */}
              {currentStep === 2 && 
                <Card className="md:col-span-3">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Confidentialité de l'appel d'offres</h2>
                    <TenderPrivacySelector form={form} />
                  </CardContent>
                </Card>
              }
              
              {/* Step 3: General information */}
              {currentStep === 3 && 
                <Card className="md:col-span-3">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Informations générales</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Titre de l'appel d'offres</label>
                        <input id="title" {...form.register("title")} className="w-full p-2 border rounded-md" placeholder="Ex: Construction d'un immeuble de bureaux" />
                        {form.formState.errors.title && <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">Description</label>
                        <textarea id="description" {...form.register("description")} className="w-full p-2 border rounded-md min-h-[120px]" placeholder="Décrivez votre projet en quelques lignes..." />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="location" className="text-sm font-medium">Localisation</label>
                          <input type="text" id="location" {...form.register("location")} className="w-full p-2 border rounded-md" placeholder="Adresse du projet" />
                          {form.formState.errors.location && <p className="text-sm text-red-500">{form.formState.errors.location.message}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="budget" className="text-sm font-medium">Budget estimatif</label>
                          <input type="text" id="budget" {...form.register("budget")} className="w-full p-2 border rounded-md" placeholder="Ex: 150 000 €" />
                          {form.formState.errors.budget && <p className="text-sm text-red-500">{form.formState.errors.budget.message}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="deadline" className="text-sm font-medium">Date limite</label>
                          <input type="date" id="deadline" {...form.register("deadline", {
                            setValueAs: v => v ? new Date(v) : undefined
                          })} className="w-full p-2 border rounded-md" />
                          {form.formState.errors.deadline && <p className="text-sm text-red-500">{form.formState.errors.deadline.message}</p>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              }
              
              {/* Step 4: Tender details based on type */}
              {currentStep === 4 && 
                <Card className="md:col-span-3">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      {watchType === 'design' && 'Détails de l\'appel d\'offres de Conception'}
                      {watchType === 'construction' && 'Détails de l\'appel d\'offres de Réalisation'}
                      {watchType === 'service' && 'Détails de l\'appel d\'offres de Services'}
                    </h2>
                    
                    {watchType === 'design' && <DesignTenderForm form={form} />}
                    {watchType === 'construction' && <ConstructionTenderForm form={form} />}
                    {watchType === 'service' && <ServiceTenderForm form={form} />}
                  </CardContent>
                </Card>
              }
              
              {/* Step 5: DCE (renamed from Documents upload) */}
              {currentStep === 5 && 
                <Card className="md:col-span-3">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">DCE (Dossier de Consultation des Entreprises)</h2>
                    <p className="text-muted-foreground mb-4">
                      Ajoutez les documents techniques nécessaires à la consultation des entreprises
                      {watchType === 'design' && ' (programme, esquisses, etc.)'}
                      {watchType === 'construction' && ' (plans, cahier des charges, DPGF, etc.)'}
                      {watchType === 'service' && ' (cahier des charges, plans des locaux, etc.)'}
                    </p>
                    
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-1">Glissez-déposez vos fichiers ici</h3>
                      <p className="text-sm text-muted-foreground mb-4">ou</p>
                      <Button variant="outline">Parcourir les fichiers</Button>
                      <p className="text-xs text-muted-foreground mt-4">
                        Formats acceptés: PDF, DOC, DOCX, XLS, XLSX, DWG, JPG, PNG (max 50MB)
                      </p>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Documents joints (0)</h3>
                      <p className="text-sm text-muted-foreground">
                        Aucun document n'a été ajouté pour le moment.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              }
              
              {/* Step 6: New administrative documents step */}
              {currentStep === 6 && 
                <Card className="md:col-span-3">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Documents administratifs à fournir</h2>
                    <TenderAdminDocuments form={form} />
                  </CardContent>
                </Card>
              }
              
              {/* Step 7: Company invitation (moved from step 6) */}
              {currentStep === 7 && 
                <Card className="md:col-span-3">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Invitation des entreprises</h2>
                    <TenderCompanyInvitation form={form} />
                  </CardContent>
                </Card>
              }
              
              {/* Step 8: Publication options (moved from step 7) */}
              {currentStep === 8 && <>
                  <Card className="md:col-span-2">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Prévisualisation de l'appel d'offres</h2>
                      
                      <div className="border rounded-lg p-4 space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">{form.getValues("title") || "Titre de l'appel d'offres"}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{form.getValues("location") || "Adresse du projet"}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center">
                            <Building size={14} className="mr-1 text-muted-foreground" />
                            <span>
                              {watchType === 'design' && 'Conception'}
                              {watchType === 'construction' && 'Réalisation'}
                              {watchType === 'service' && 'Services'}
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            <FileText size={14} className="mr-1 text-muted-foreground" />
                            <span>Budget: {form.getValues("budget") || "Non spécifié"}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1 text-muted-foreground" />
                            <span>Date limite: {form.getValues("deadline") ? new Date(form.getValues("deadline")).toLocaleDateString() : "Non spécifiée"}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-1">Description</h4>
                          <p className="text-sm">{form.getValues("description") || "Aucune description fournie."}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-1">DCE</h4>
                          <p className="text-sm text-muted-foreground">Aucun document joint.</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-1">Documents administratifs requis</h4>
                          {form.getValues("adminDocuments")?.length ? (
                            <ul className="text-sm list-disc pl-5">
                              {form.getValues("adminDocuments")
                                ?.filter(doc => doc.name.trim() !== '')
                                .map(doc => (
                                  <li key={doc.id}>{doc.name}</li>
                                ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">Aucun document administratif requis.</p>
                          )}
                        </div>

                        <div>
                          <h4 className="font-medium mb-1">Entreprises invitées</h4>
                          {form.getValues("invitedCompanies")?.length ? (
                            <ul className="text-sm list-disc pl-5">
                              {form.getValues("invitedCompanies")
                                ?.filter(company => company.selected)
                                .map(company => (
                                  <li key={company.id}>{company.name}</li>
                                ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">Aucune entreprise invitée.</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-1">
                    <CardContent className="p-6">
                      <TenderPublishOptions form={form} />
                    </CardContent>
                  </Card>
                </>}
            </div>
            
            {/* Bottom navigation */}
            <div className="flex justify-between items-center pt-4">
              {currentStep > 1 ? <Button type="button" variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Précédent
                </Button> : <div></div>}
              
              {currentStep < totalSteps ? <Button type="button" onClick={handleNext}>
                  Suivant
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button> : <Button type="submit">
                  Publier l'appel d'offres
                </Button>}
            </div>
          </form>
        </main>
      </div>
    </div>;
}

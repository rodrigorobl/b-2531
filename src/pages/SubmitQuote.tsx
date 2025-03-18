
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Upload, FileText, FileSpreadsheet, ArrowRight, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Define the form schema
const quoteFormSchema = z.object({
  quoteFile: z.any().optional(), // Changed from required to optional
  dpgfFile: z.any().optional(),  // Changed from required to optional
  adminDocs: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      file: z.any().optional(),
      isRequired: z.boolean().default(true),
    })
  ),
  amount: z.string().min(1, "Le montant HT est obligatoire"),
  termsAgreed: z.boolean().refine((value) => value === true, {
    message: "Vous devez attester avoir vérifié la conformité de votre offre",
  }),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export default function SubmitQuote() {
  const { tenderId, lotId } = useParams<{ tenderId: string; lotId: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [quoteVersion, setQuoteVersion] = useState<number | null>(null);
  
  // Mock data - in a real app, this would come from an API
  const tenderData = {
    id: tenderId || "t1",
    title: "Rénovation Résidence Les Ormes",
    lotName: "Lot 3 - Plomberie",
    client: "SCI Immobilière Centrale",
    deadline: "25/06/2024",
  };
  
  // Default admin documents required
  const defaultAdminDocs = [
    { id: "doc-1", name: "Responsabilité civile 2025", file: null, isRequired: true },
    { id: "doc-2", name: "Décennale 2025", file: null, isRequired: true },
    { id: "doc-3", name: "Déclaration URSSAF 2025", file: null, isRequired: true },
    { id: "doc-4", name: "Kbis de moins de 6 mois", file: null, isRequired: true },
    { id: "doc-5", name: "RIB", file: null, isRequired: true },
  ];
  
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      quoteFile: undefined,
      dpgfFile: undefined,
      adminDocs: defaultAdminDocs,
      amount: "",
      termsAgreed: false,
    },
  });
  
  const [uploadedQuoteFile, setUploadedQuoteFile] = useState<File | null>(null);
  const [uploadedDpgfFile, setUploadedDpgfFile] = useState<File | null>(null);
  const [uploadedAdminDocs, setUploadedAdminDocs] = useState<{[key: string]: File | null}>({});
  
  const handleQuoteFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file && file.type === "application/pdf") {
      setUploadedQuoteFile(file);
      form.setValue("quoteFile", [file]);
    } else if (file) {
      // Show error for wrong file type
      console.error("Format de fichier invalide. Veuillez soumettre un PDF.");
    }
  };
  
  const handleDpgfFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    // Check if file is Excel format
    if (file && (file.type === "application/vnd.ms-excel" || 
                 file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
      setUploadedDpgfFile(file);
      form.setValue("dpgfFile", [file]);
    } else if (file) {
      // Show error for wrong file type
      console.error("Format de fichier invalide. Veuillez soumettre un fichier Excel.");
    }
  };
  
  const handleAdminDocUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      // Update the uploadedAdminDocs state
      setUploadedAdminDocs({
        ...uploadedAdminDocs,
        [id]: file,
      });
      
      // Update the form value by finding and updating the specific doc in the array
      const updatedDocs = form.getValues("adminDocs").map(doc => {
        if (doc.id === id) {
          return { ...doc, file: file };
        }
        return doc;
      });
      form.setValue("adminDocs", updatedDocs);
    }
  };
  
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      // Move to next step regardless of validation
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const onSubmit = (data: QuoteFormValues) => {
    console.log("Form submitted:", data);
    // In a real app, this would send the data to an API
    alert("Votre offre a été soumise avec succès !");
    navigate(`/tender/${tenderId}`);
  };
  
  // Check if all documents are uploaded for the final step - now just checks if amount is entered
  const canSubmitForm = () => {
    return form.getValues("amount") && form.getValues("termsAgreed");
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Soumettre une offre</CardTitle>
                <CardDescription className="mt-2">
                  {tenderData.title} - {tenderData.lotName}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">Client: {tenderData.client}</Badge>
                  <Badge variant="outline">Date limite: {tenderData.deadline}</Badge>
                  {quoteVersion && (
                    <Badge variant="secondary">Version du devis: {quoteVersion}</Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Étape {currentStep} sur {totalSteps}</div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 w-6 rounded-full ${i + 1 <= currentStep ? 'bg-primary' : 'bg-muted'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Step 1: Upload Quote */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Dépôt du devis</h2>
                    <p className="text-muted-foreground">
                      Veuillez téléverser votre devis au format PDF.
                    </p>
                    
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-1">Glissez-déposez votre devis ici</h3>
                      <p className="text-sm text-muted-foreground mb-4">ou</p>
                      <div>
                        <label htmlFor="quote-upload">
                          <div className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 cursor-pointer">
                            Parcourir les fichiers
                          </div>
                          <input
                            id="quote-upload"
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleQuoteFileUpload}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        Format accepté: PDF uniquement (max 10MB)
                      </p>
                    </div>
                    
                    {uploadedQuoteFile && (
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                        <FileText className="text-primary" size={20} />
                        <div className="flex-1">
                          <p className="font-medium">{uploadedQuoteFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(uploadedQuoteFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-600 border-0">
                          <CheckCircle size={12} className="mr-1" /> Chargé
                        </Badge>
                      </div>
                    )}
                    
                    <div className="text-amber-700 text-sm flex items-center gap-2">
                      <Info size={14} /> 
                      Le dépôt du devis est recommandé mais non obligatoire.
                    </div>
                  </div>
                )}
                
                {/* Step 2: Upload DPGF */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Dépôt du DPGF</h2>
                    <p className="text-muted-foreground">
                      Veuillez téléverser votre DPGF au format Excel.
                    </p>
                    
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-1">Glissez-déposez votre DPGF ici</h3>
                      <p className="text-sm text-muted-foreground mb-4">ou</p>
                      <div>
                        <label htmlFor="dpgf-upload">
                          <div className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 cursor-pointer">
                            Parcourir les fichiers
                          </div>
                          <input
                            id="dpgf-upload"
                            type="file"
                            accept=".xls,.xlsx"
                            className="hidden"
                            onChange={handleDpgfFileUpload}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        Formats acceptés: XLS, XLSX uniquement (max 10MB)
                      </p>
                    </div>
                    
                    {uploadedDpgfFile && (
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                        <FileSpreadsheet className="text-primary" size={20} />
                        <div className="flex-1">
                          <p className="font-medium">{uploadedDpgfFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(uploadedDpgfFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-600 border-0">
                          <CheckCircle size={12} className="mr-1" /> Chargé
                        </Badge>
                      </div>
                    )}
                    
                    <div className="text-amber-700 text-sm flex items-center gap-2">
                      <Info size={14} /> 
                      Le dépôt du DPGF est recommandé mais non obligatoire.
                    </div>
                  </div>
                )}
                
                {/* Step 3: Admin Documents */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Dépôt des pièces administratives</h2>
                    <p className="text-muted-foreground">
                      Veuillez téléverser tous les documents administratifs requis.
                    </p>
                    
                    <div className="space-y-3 mt-4">
                      {form.getValues("adminDocs").map((doc) => (
                        <div key={doc.id} className="flex items-center gap-3 p-3 border rounded-md">
                          <FileText className="text-muted-foreground flex-shrink-0" size={18} />
                          <div className="flex-1">
                            <p className="font-medium">{doc.name}</p>
                            {doc.isRequired && (
                              <Badge variant="outline" className="text-xs mt-1">Recommandé</Badge>
                            )}
                          </div>
                          <div>
                            <label htmlFor={`admin-doc-${doc.id}`}>
                              <div className={`${uploadedAdminDocs[doc.id] ? 'bg-green-600' : 'bg-primary'} text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 px-3 py-2 cursor-pointer`}>
                                {uploadedAdminDocs[doc.id] ? (
                                  <>
                                    <CheckCircle size={14} className="mr-1" /> Chargé
                                  </>
                                ) : (
                                  "Téléverser"
                                )}
                              </div>
                              <input
                                id={`admin-doc-${doc.id}`}
                                type="file"
                                className="hidden"
                                onChange={(e) => handleAdminDocUpload(doc.id, e)}
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2 text-sm text-amber-700">
                      <Info size={14} />
                      <p>Le dépôt des documents administratifs est recommandé mais non obligatoire.</p>
                    </div>
                  </div>
                )}
                
                {/* Step 4: Quote Amount */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Montant du devis</h2>
                    <p className="text-muted-foreground">
                      Veuillez indiquer le montant HT de votre devis.
                    </p>
                    
                    <div className="space-y-4 mt-4">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Montant HT (€)</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  placeholder="Ex: 12500" 
                                  {...field} 
                                  type="number"
                                  min="0"
                                  step="0.01"
                                />
                              </FormControl>
                              <div className="absolute right-3 top-2.5 text-muted-foreground">€</div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 flex items-start gap-2">
                        <Info size={16} className="mt-0.5 flex-shrink-0" />
                        <p>
                          Le prorata est compris à hauteur de <strong>1.5%</strong> dans ce montant.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 5: Confirmation */}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Validation finale</h2>
                    <p className="text-muted-foreground">
                      Veuillez vérifier que toutes les informations sont correctes avant de soumettre votre offre.
                    </p>
                    
                    <div className="rounded-md border p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Devis</h3>
                          <p className="font-medium">{uploadedQuoteFile?.name || "Non fourni"}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">DPGF</h3>
                          <p className="font-medium">{uploadedDpgfFile?.name || "Non fourni"}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Montant HT</h3>
                          <p className="font-medium">{form.getValues("amount")} €</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Prorata</h3>
                          <p className="font-medium">1.5%</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Documents administratifs</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {form.getValues("adminDocs").map((doc) => (
                            <div key={doc.id} className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${uploadedAdminDocs[doc.id] ? 'bg-green-500' : 'bg-amber-500'}`} />
                              <span className="text-sm">{doc.name}: {uploadedAdminDocs[doc.id] ? "Fourni" : "Non fourni"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Terms agreement checkbox */}
                    <div className="flex items-start space-x-2 pt-4">
                      <Checkbox
                        id="terms"
                        checked={form.getValues("termsAgreed")}
                        onCheckedChange={(checked) => {
                          form.setValue("termsAgreed", checked === true);
                        }}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          J'atteste avoir vérifié la conformité de mon offre et des documents fournis.
                        </label>
                        {form.formState.errors.termsAgreed && (
                          <p className="text-destructive text-xs">
                            {form.formState.errors.termsAgreed.message?.toString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Navigation buttons */}
                <div className="flex justify-between pt-6">
                  {currentStep > 1 ? (
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      Précédent
                    </Button>
                  ) : (
                    <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                      Annuler
                    </Button>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <Button type="button" onClick={handleNextStep}>
                      Suivant <ArrowRight className="ml-1" size={16} />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={!canSubmitForm()}
                    >
                      Soumettre l'offre
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

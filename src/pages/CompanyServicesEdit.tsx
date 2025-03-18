import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, Save, RotateCcw, Lightbulb, Upload, PlusCircle, ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import EditSidebar from "@/components/edit-company/EditSidebar";
import CompanyPresentation from "@/components/edit-company/CompanyPresentation";
import CompanyParticulars from "@/components/edit-company/CompanyParticulars";
import CompanyContacts from "@/components/edit-company/CompanyContacts";
import CompanyPreview from "@/components/edit-company/CompanyPreview";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ServiceCompany, Service } from "@/types/company-services";

// Mock data - same as in CompanyServices.tsx
const MOCK_COMPANY: ServiceCompany = {
  id: "service-company-1",
  name: "BTP Services Plus",
  logo: "https://via.placeholder.com/100",
  description: "BTP Services Plus est une entreprise spécialisée dans les services aux chantiers de construction depuis 2010. Notre équipe expérimentée propose des solutions adaptées aux besoins spécifiques de chaque projet, garantissant efficacité et qualité.",
  contact: {
    phone: "01 23 45 67 89",
    email: "contact@btpservicesplus.fr",
    website: "https://www.btpservicesplus.fr",
    linkedin: "https://www.linkedin.com/company/btpservicesplus"
  },
  services: [
    {
      id: "service-1",
      name: "Pilotage de drone pour relevés et inspections",
      description: "Service de pilotage de drone professionnel pour réaliser des relevés topographiques, inspections d'ouvrages, suivi de chantier et prises de vue aériennes. Nos pilotes sont certifiés et nos équipements sont de dernière génération.",
      price: {
        type: 'range',
        value: "600€ - 1200€",
        unit: "par jour"
      },
      duration: {
        value: "1-2 jours"
      },
      requirements: [
        "Certification S1/S3",
        "Assurance spécifique",
        "Autorisation de vol"
      ]
    },
    {
      id: "service-2",
      name: "Nettoyage fin de chantier",
      description: "Service complet de nettoyage professionnel pour les chantiers terminés. Nous prenons en charge l'évacuation des déchets, le nettoyage des surfaces, des vitrages et des espaces extérieurs pour une remise impeccable.",
      price: {
        type: 'fixed',
        value: "12€",
        unit: "par m²"
      },
      duration: {
        value: "2-5 jours selon surface"
      }
    },
    {
      id: "service-3",
      name: "Location d'engins de chantier avec opérateur",
      description: "Service de location d'engins de chantier (mini-pelles, chargeurs, nacelles) avec opérateur qualifié. Nos machines sont régulièrement entretenues et nos opérateurs formés aux dernières normes de sécurité.",
      price: {
        type: 'range',
        value: "500€ - 1500€",
        unit: "par jour"
      },
      duration: {
        value: "À la demande"
      },
      requirements: [
        "CACES à jour",
        "Équipements aux normes CE"
      ]
    },
    {
      id: "service-4",
      name: "Formation sécurité chantier",
      description: "Formation spécialisée pour les équipes de chantier sur les aspects de sécurité, prévention des risques et premiers secours. Nos formateurs sont certifiés et adaptent le contenu aux spécificités de votre chantier.",
      price: {
        type: 'quote',
      },
      duration: {
        value: "1-3 jours"
      },
      requirements: [
        "Certification INRS",
        "Agrément formateur"
      ]
    }
  ],
  coverageAreas: {
    regions: ["Île-de-France", "Hauts-de-France", "Normandie"],
    cities: ["Paris", "Lille", "Rouen", "Amiens", "Beauvais"],
    description: "Nous intervenons principalement en Île-de-France et dans les régions limitrophes. Pour les grands projets, nous pouvons étendre notre zone d'intervention à toute la France métropolitaine."
  },
  reviews: [],
  projects: [],
  financials: {
    solvabilityScore: 85,
    administrativeScore: 92,
    lastUpdated: "15/04/2024"
  }
};

// Schema for service form validation
const serviceSchema = z.object({
  name: z.string().min(3, "Le nom du service doit contenir au moins 3 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  priceType: z.enum(["fixed", "range", "quote"]),
  priceValue: z.string().optional(),
  priceUnit: z.string().optional(),
  duration: z.string().min(1, "Veuillez indiquer une durée"),
  requirements: z.string().optional(),
  status: z.boolean()
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

export default function CompanyServicesEdit() {
  const navigate = useNavigate();
  const [completionPercentage, setCompletionPercentage] = useState(75);
  const [activeSection, setActiveSection] = useState("presentation");
  const [company, setCompany] = useState<ServiceCompany>(MOCK_COMPANY);
  const [services, setServices] = useState<Service[]>(MOCK_COMPANY.services);
  const [editingService, setEditingService] = useState<Service | null>(null);
  
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      priceType: "fixed",
      priceValue: "",
      priceUnit: "",
      duration: "",
      requirements: "",
      status: true
    }
  });
  
  const handlePreview = () => {
    toast({
      title: "Prévisualisation",
      description: "Ouverture du mode prévisualisation de votre page entreprise."
    });
  };

  const handleSave = () => {
    toast({
      title: "Modifications enregistrées",
      description: "Vos modifications ont été enregistrées avec succès."
    });
    navigate("/company-services");
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };
  
  const handleEditService = (service: Service) => {
    setEditingService(service);
    
    // Map the service data to form values
    form.reset({
      name: service.name,
      description: service.description,
      priceType: service.price.type,
      priceValue: service.price.value || "",
      priceUnit: service.price.unit || "",
      duration: service.duration.value,
      requirements: service.requirements?.join(", ") || "",
      status: true // Assuming all services in the mock data are active
    });
  };
  
  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(service => service.id !== serviceId));
    toast({
      title: "Service supprimé",
      description: "Le service a été supprimé avec succès."
    });
    
    // Clear form if we're editing the deleted service
    if (editingService && editingService.id === serviceId) {
      setEditingService(null);
      form.reset();
    }
  };
  
  const handleAddNewService = () => {
    setEditingService(null);
    form.reset({
      name: "",
      description: "",
      priceType: "fixed",
      priceValue: "",
      priceUnit: "",
      duration: "",
      requirements: "",
      status: true
    });
  };
  
  const onSubmit = (data: ServiceFormValues) => {
    const requirements = data.requirements 
      ? data.requirements.split(",").map(req => req.trim()).filter(req => req)
      : [];
    
    const updatedService: Service = {
      id: editingService ? editingService.id : `service-${Date.now()}`,
      name: data.name,
      description: data.description,
      price: {
        type: data.priceType,
        value: data.priceValue,
        unit: data.priceUnit
      },
      duration: {
        value: data.duration
      },
      requirements: requirements.length > 0 ? requirements : undefined
    };
    
    if (editingService) {
      // Update existing service
      setServices(services.map(service => 
        service.id === editingService.id ? updatedService : service
      ));
      toast({
        title: "Service mis à jour",
        description: "Les modifications ont été enregistrées avec succès."
      });
    } else {
      // Add new service
      setServices([...services, updatedService]);
      toast({
        title: "Service ajouté",
        description: "Le nouveau service a été ajouté avec succès."
      });
    }
    
    setEditingService(null);
    form.reset();
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background border-b p-4">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">Édition de mes services</h1>
                <div className="flex items-center mt-2">
                  <Progress value={completionPercentage} className="w-48 h-2" />
                  <span className="ml-2 text-sm text-muted-foreground">{completionPercentage}% complété</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handlePreview}
                >
                  <Eye size={16} />
                  Prévisualiser
                </Button>
                <Button 
                  className="flex items-center gap-2"
                  onClick={handleSave}
                >
                  <Save size={16} />
                  Enregistrer
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="container mx-auto py-6 px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left column - Navigation and editing tools */}
            <div className="md:col-span-3">
              <EditSidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
            </div>

            {/* Middle column - Editable content */}
            <div className="md:col-span-6 space-y-6">
              {activeSection === "presentation" && <CompanyPresentation />}
              {activeSection === "particulars" && <CompanyParticulars />}
              {activeSection === "contacts" && <CompanyContacts />}
              {activeSection === "services" && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Liste des services</h2>
                  <p className="text-muted-foreground mb-4">Gérez les services que vous proposez à vos clients.</p>
                  
                  <div className="mb-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom du service</TableHead>
                          <TableHead>Tarif</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {services.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">
                              {service.name}
                            </TableCell>
                            <TableCell>
                              {service.price.type === 'fixed' && service.price.value && `${service.price.value} ${service.price.unit || ''}`}
                              {service.price.type === 'range' && service.price.value && `${service.price.value} ${service.price.unit || ''}`}
                              {service.price.type === 'quote' && 'Sur devis'}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditService(service)}
                                  className="h-8 px-2"
                                >
                                  <PlusCircle size={16} className="mr-1" />
                                  Modifier
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteService(service.id)}
                                  className="h-8 px-2 text-destructive"
                                >
                                  <Trash2 size={16} className="mr-1" />
                                  Supprimer
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <Button 
                    onClick={handleAddNewService}
                    className="flex items-center gap-2"
                  >
                    <PlusCircle size={16} />
                    Ajouter un service
                  </Button>

                  {/* Service Form */}
                  {(editingService || form.formState.isDirty) && (
                    <div className="mt-8 border p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">
                        {editingService ? 'Modifier le service' : 'Nouveau service'}
                      </h3>
                      
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nom du service</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="ex: Nettoyage fin de chantier" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea {...field} placeholder="Description détaillée du service" rows={4} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="priceType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Type de tarification</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="fixed">Prix fixe</SelectItem>
                                      <SelectItem value="range">Fourchette de prix</SelectItem>
                                      <SelectItem value="quote">Sur devis</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            {form.watch("priceType") !== "quote" && (
                              <FormField
                                control={form.control}
                                name="priceValue"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Prix</FormLabel>
                                    <FormControl>
                                      <Input {...field} placeholder={form.watch("priceType") === "range" ? "ex: 500€ - 1000€" : "ex: 150€"} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>
                          
                          {form.watch("priceType") !== "quote" && (
                            <FormField
                              control={form.control}
                              name="priceUnit"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Unité de prix</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="ex: par jour, par m², par heure" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                          
                          <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Durée d'exécution</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="ex: 2-3 jours, à la demande" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="requirements"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Certifications et exigences (séparées par des virgules)</FormLabel>
                                <FormControl>
                                  <Textarea {...field} placeholder="ex: CACES à jour, Certification INRS" rows={2} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel>Statut du service</FormLabel>
                                  <div className="text-sm text-muted-foreground">
                                    Activer ou désactiver ce service
                                  </div>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end space-x-2 pt-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => {
                                setEditingService(null);
                                form.reset();
                              }}
                            >
                              Annuler
                            </Button>
                            <Button type="submit">
                              {editingService ? 'Mettre à jour' : 'Ajouter'}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  )}
                </div>
              )}
              {activeSection === "projects" && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Projets réalisés</h2>
                  <p className="text-muted-foreground mb-4">Ajoutez vos projets réalisés pour mettre en valeur votre expertise.</p>
                  <Button className="flex items-center gap-2">
                    <PlusCircle size={16} />
                    Ajouter un projet
                  </Button>
                </div>
              )}
              {activeSection === "coverage" && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Zone de couverture</h2>
                  <p className="text-muted-foreground mb-4">Définissez votre zone d'intervention géographique.</p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <FormLabel>Régions couvertes (séparées par des virgules)</FormLabel>
                      <Input 
                        value={company.coverageAreas.regions.join(", ")}
                        onChange={e => setCompany({
                          ...company,
                          coverageAreas: {
                            ...company.coverageAreas,
                            regions: e.target.value.split(",").map(r => r.trim())
                          }
                        })}
                        placeholder="ex: Île-de-France, Normandie"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Villes principales (séparées par des virgules)</FormLabel>
                      <Input 
                        value={company.coverageAreas.cities.join(", ")}
                        onChange={e => setCompany({
                          ...company,
                          coverageAreas: {
                            ...company.coverageAreas,
                            cities: e.target.value.split(",").map(c => c.trim())
                          }
                        })}
                        placeholder="ex: Paris, Rouen, Lille"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Description de la zone d'intervention</FormLabel>
                      <Textarea 
                        value={company.coverageAreas.description}
                        onChange={e => setCompany({
                          ...company,
                          coverageAreas: {
                            ...company.coverageAreas,
                            description: e.target.value
                          }
                        })}
                        rows={4}
                        placeholder="Précisez votre zone d'intervention, les conditions de déplacement, etc."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right column - Preview and validation */}
            <div className="md:col-span-3">
              <CompanyPreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

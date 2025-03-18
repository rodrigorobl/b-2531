
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, ArrowLeft, Save, Trash2, MapPin, Euro, Clock, CheckCircle, X } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const [company, setCompany] = useState<ServiceCompany>(MOCK_COMPANY);
  const [services, setServices] = useState<Service[]>(MOCK_COMPANY.services);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState("services");
  
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
  
  const handleSaveAllChanges = () => {
    // In a real app, this would send the data to the backend
    toast({
      title: "Modifications enregistrées",
      description: "Toutes les modifications ont été enregistrées avec succès."
    });
    navigate("/company-services");
  };
  
  const handleCancel = () => {
    navigate("/company-services");
  };
  
  const updateCompanyInfo = (field: string, value: string) => {
    setCompany(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const updateContactInfo = (field: string, value: string) => {
    setCompany(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };
  
  const updateCoverageArea = (field: string, value: string | string[]) => {
    setCompany(prev => ({
      ...prev,
      coverageAreas: {
        ...prev.coverageAreas,
        [field]: value
      }
    }));
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Modifier mes services</h1>
          <div className="flex-1"></div>
          <Button 
            variant="default" 
            onClick={handleSaveAllChanges}
            className="flex items-center gap-2"
          >
            <Save size={16} />
            Enregistrer les modifications
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="company">Informations générales</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="coverage">Zone de couverture</TabsTrigger>
          </TabsList>
          
          {/* Company Information Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'entreprise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel>Nom de l'entreprise</FormLabel>
                    <Input 
                      value={company.name}
                      onChange={e => updateCompanyInfo('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Logo</FormLabel>
                    <div className="flex items-center gap-4">
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="h-16 w-16 object-contain border rounded"
                      />
                      <Button variant="outline">Modifier le logo</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Description</FormLabel>
                  <Textarea 
                    value={company.description}
                    onChange={e => updateCompanyInfo('description', e.target.value)}
                    rows={4}
                  />
                </div>
                
                <h3 className="text-lg font-medium mt-6">Coordonnées de contact</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel>Téléphone</FormLabel>
                    <Input 
                      value={company.contact.phone}
                      onChange={e => updateContactInfo('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <Input 
                      value={company.contact.email}
                      onChange={e => updateContactInfo('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Site web</FormLabel>
                    <Input 
                      value={company.contact.website}
                      onChange={e => updateContactInfo('website', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>LinkedIn</FormLabel>
                    <Input 
                      value={company.contact.linkedin}
                      onChange={e => updateContactInfo('linkedin', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Liste des services</CardTitle>
                    <Button 
                      onClick={handleAddNewService}
                      className="flex items-center gap-2"
                    >
                      <PlusCircle size={16} />
                      Ajouter un service
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom du service</TableHead>
                          <TableHead>Tarification</TableHead>
                          <TableHead>Durée</TableHead>
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
                            <TableCell>{service.duration.value}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleEditService(service)}
                                >
                                  <PlusCircle size={16} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteService(service.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {editingService ? 'Modifier le service' : 'Ajouter un service'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Coverage Tab */}
          <TabsContent value="coverage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Zone de couverture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <FormLabel>Régions couvertes (séparées par des virgules)</FormLabel>
                  <Input 
                    value={company.coverageAreas.regions.join(", ")}
                    onChange={e => updateCoverageArea('regions', e.target.value.split(",").map(r => r.trim()))}
                    placeholder="ex: Île-de-France, Normandie"
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Villes principales (séparées par des virgules)</FormLabel>
                  <Input 
                    value={company.coverageAreas.cities.join(", ")}
                    onChange={e => updateCoverageArea('cities', e.target.value.split(",").map(c => c.trim()))}
                    placeholder="ex: Paris, Rouen, Lille"
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Description de la zone d'intervention</FormLabel>
                  <Textarea 
                    value={company.coverageAreas.description}
                    onChange={e => updateCoverageArea('description', e.target.value)}
                    rows={4}
                    placeholder="Précisez votre zone d'intervention, les conditions de déplacement, etc."
                  />
                </div>
                
                <div className="mt-4 p-4 border rounded-lg bg-muted">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={18} className="text-muted-foreground" />
                    <h3 className="font-medium">Aperçu de la carte</h3>
                  </div>
                  <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Aperçu de la carte non disponible en mode édition
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

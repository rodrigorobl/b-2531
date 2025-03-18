import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { BellRing, Filter, Mail, Bell, Clock, Map, Building, Euro, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

interface AlertFormValues {
  name: string;
  tenderType: string[];
  projectType: string[];
  location: string;
  sector: string[];
  budgetRange: number[];
  keywords: string;
  frequency: 'instant' | 'daily' | 'weekly' | 'monthly';
  notificationMethod: 'email' | 'both';
  isActive: boolean;
}

export default function TenderAlert() {
  const navigate = useNavigate();
  const [maxBudget, setMaxBudget] = useState<number[]>([0, 10000000]);
  
  const form = useForm<AlertFormValues>({
    defaultValues: {
      name: '',
      tenderType: [],
      projectType: [],
      location: '',
      sector: [],
      budgetRange: [0, 10000000],
      keywords: '',
      frequency: 'weekly',
      notificationMethod: 'email',
      isActive: true,
    }
  });

  const onSubmit = (data: AlertFormValues) => {
    console.log('Alert created:', data);
    toast.success('Alerte créée avec succès');
    navigate('/alerte-management');
  };

  const formatBudget = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0 
    }).format(value);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center mb-6">
          <BellRing className="mr-2 h-6 w-6" />
          <h1 className="text-2xl font-bold">Créer une alerte d'appel d'offres</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                    <CardDescription>
                      Donnez un nom à votre alerte et choisissez si elle doit être active
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de l'alerte</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Projets de rénovation à Paris" {...field} />
                          </FormControl>
                          <FormDescription>
                            Ce nom vous aidera à identifier cette alerte dans votre liste
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Activer l'alerte
                            </FormLabel>
                            <FormDescription>
                              Recevez des notifications en fonction de vos critères
                            </FormDescription>
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
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-5 w-5" />
                      <CardTitle>Critères de recherche</CardTitle>
                    </div>
                    <CardDescription>
                      Définissez les critères pour lesquels vous souhaitez être alerté
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">Type d'appel d'offres</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {['Conception', 'Réalisation', 'Services', 'Fourniture'].map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox id={`tender-type-${type}`} />
                              <label
                                htmlFor={`tender-type-${type}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {type}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">Nature du projet</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {['Résidentiel', 'Bureaux', 'Commercial', 'Industriel', 'Public', 'Hôtellerie'].map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox id={`project-type-${type}`} />
                              <label
                                htmlFor={`project-type-${type}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {type}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Map className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Label>Localisation</Label>
                        </div>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Toutes régions" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toutes régions</SelectItem>
                            <SelectItem value="idf">Île-de-France</SelectItem>
                            <SelectItem value="paca">PACA</SelectItem>
                            <SelectItem value="aura">Auvergne-Rhône-Alpes</SelectItem>
                            <SelectItem value="occitanie">Occitanie</SelectItem>
                            <SelectItem value="bretagne">Bretagne</SelectItem>
                            <SelectItem value="normandie">Normandie</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Label>Secteur d'activité</Label>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {['Construction', 'Plomberie', 'Électricité', 'CVC', 'Menuiserie', 'Peinture'].map((sector) => (
                            <div key={sector} className="flex items-center space-x-2">
                              <Checkbox id={`sector-${sector}`} />
                              <label
                                htmlFor={`sector-${sector}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {sector}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Euro className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Label>Budget estimé</Label>
                        </div>
                        <div className="pt-6 pb-2 px-2">
                          <Slider
                            value={maxBudget}
                            min={0}
                            max={10000000}
                            step={100000}
                            onValueChange={setMaxBudget}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{formatBudget(maxBudget[0])}</span>
                          <span>{formatBudget(maxBudget[1])}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Label>Mots-clés dans les DCE</Label>
                        </div>
                        <FormField
                          control={form.control}
                          name="keywords"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Entrez des mots-clés spécifiques, séparés par des virgules"
                                  className="min-h-[80px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription className="mt-2">
                                <div className="text-sm text-muted-foreground">
                                  <p className="mb-2">Il est nécessaire d'ajouter des mots-clés précis afin d'éviter d'obtenir trop de résultats.</p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                    <div className="rounded-md bg-green-50 p-2 border border-green-200">
                                      <p className="text-xs font-medium text-green-800">Bon exemple:</p>
                                      <p className="text-xs text-green-700">chauffage géothermique</p>
                                    </div>
                                    <div className="rounded-md bg-red-50 p-2 border border-red-200">
                                      <p className="text-xs font-medium text-red-800">Mauvais exemple:</p>
                                      <p className="text-xs text-red-700">béton armé</p>
                                    </div>
                                  </div>
                                </div>
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Bell className="mr-2 h-5 w-5" />
                      <CardTitle>Préférences de contact</CardTitle>
                    </div>
                    <CardDescription>
                      Comment et quand souhaitez-vous être notifié
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex items-center mb-4">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Label>Fréquence des alertes</Label>
                      </div>
                      <RadioGroup defaultValue="weekly" className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="instant" id="frequency-instant" />
                          <Label htmlFor="frequency-instant">Instantanée</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="daily" id="frequency-daily" />
                          <Label htmlFor="frequency-daily">Quotidienne</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekly" id="frequency-weekly" />
                          <Label htmlFor="frequency-weekly">Hebdomadaire</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="frequency-monthly" />
                          <Label htmlFor="frequency-monthly">Mensuelle</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-4">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Label>Mode de notification</Label>
                      </div>
                      <RadioGroup defaultValue="email" className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="notification-email" />
                          <Label htmlFor="notification-email">Email uniquement</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="notification-both" />
                          <Label htmlFor="notification-both">Email + SMS</Label>
                        </div>
                      </RadioGroup>
                      <p className="text-sm text-muted-foreground mt-2">
                        Les SMS sont envoyés uniquement pour les alertes importantes
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                    Annuler
                  </Button>
                  <Button type="submit">Créer l'alerte</Button>
                </CardFooter>
              </form>
            </Form>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Les alertes vous permettent de rester informé des nouveaux appels d'offres qui correspondent à vos critères sans avoir à effectuer des recherches manuelles.
                </p>
                
                <div className="rounded-md bg-muted p-4">
                  <h4 className="text-sm font-medium mb-2">Conseils</h4>
                  <ul className="text-sm space-y-2 list-disc pl-4">
                    <li>Soyez précis dans vos critères pour éviter de recevoir trop d'alertes</li>
                    <li>Vous pouvez créer plusieurs alertes avec des critères différents</li>
                    <li>Vous pouvez modifier ou supprimer vos alertes à tout moment</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Building, MapPin, Clock, Star, MessageSquare, ArrowUpDown, HelpCircle, Send, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, ExternalLink, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SurveyProvider {
  id: string;
  name: string;
  price: number;
  estimatedDelivery: string; 
  rating: number;
  isAvailable: boolean;
  hasBeenUsedByCompetitor?: string; 
  reviewCount: number;
  description?: string;
  website?: string;
  address?: string;
}

const messageSchema = z.object({
  message: z.string().min(1, "Le message ne peut pas être vide")
});

type MessageFormValues = z.infer<typeof messageSchema>;

export default function QuantitySurveyRequest() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const lotId = searchParams.get('lot');
  const [activeTab, setActiveTab] = useState('providers');
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedProvider, setSelectedProvider] = useState<SurveyProvider | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const navigate = useNavigate();
  
  const messageForm = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: ''
    }
  });

  const projectData = {
    id: projectId || 'unknown',
    name: 'Centre Commercial Riviera',
    location: 'Paris, France',
    lot: {
      id: lotId || 'lot-1',
      name: 'Gros œuvre',
      description: 'Travaux de fondation et structure du bâtiment',
      budget: '850,000 €',
    },
    client: 'Unibail-Rodamco',
  };

  const surveyProviders: SurveyProvider[] = [
    {
      id: 'provider-1',
      name: 'MetroExpert',
      price: 2500,
      estimatedDelivery: '5 jours',
      rating: 4.8,
      reviewCount: 124,
      isAvailable: true,
      description: "Expert en métrés et études de prix depuis 2010",
      website: "https://metroexpert.fr",
      address: "15 rue des Entrepreneurs, 75015 Paris",
    },
    {
      id: 'provider-2',
      name: 'QuantiPro',
      price: 2100,
      estimatedDelivery: '7 jours',
      rating: 4.5,
      reviewCount: 89,
      isAvailable: true,
      hasBeenUsedByCompetitor: 'Entreprise Durand',
      description: "Solutions de métrés innovantes pour le BTP",
      website: "https://quantipro.fr",
      address: "23 avenue du Bâtiment, 69003 Lyon",
    },
    {
      id: 'provider-3',
      name: 'SurveyMasters',
      price: 3200,
      estimatedDelivery: '3 jours',
      rating: 4.9,
      reviewCount: 156,
      isAvailable: true,
      description: "Le métré de précision pour vos projets d'envergure",
      website: "https://surveymasters.com",
      address: "8 rue de la Mesure, 13001 Marseille",
    },
    {
      id: 'provider-4',
      name: 'BatiMesure',
      price: 1900,
      estimatedDelivery: '10 jours',
      rating: 4.2,
      reviewCount: 62,
      isAvailable: true,
      description: "Métrés rapides et économiques pour les petits projets",
      address: "45 boulevard des Géomètres, 31000 Toulouse",
    },
    {
      id: 'provider-5',
      name: 'MetreTech',
      price: 2800,
      estimatedDelivery: '4 jours',
      rating: 4.7,
      reviewCount: 95,
      isAvailable: false,
      description: "Technologies de pointe pour des métrés toujours plus précis",
      website: "https://metretech.com",
      address: "10 impasse de l'Innovation, 44000 Nantes",
    },
  ];

  const sortedProviders = [...surveyProviders].sort((a, b) => {
    if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortBy === 'delivery') {
      const aDelivery = parseInt(a.estimatedDelivery.split(' ')[0]);
      const bDelivery = parseInt(b.estimatedDelivery.split(' ')[0]);
      return sortOrder === 'asc' ? aDelivery - bDelivery : bDelivery - aDelivery;
    } else if (sortBy === 'rating') {
      return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    }
    return 0;
  });

  const handleSort = (criteria: string) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  const handleContactProvider = (provider: SurveyProvider) => {
    setSelectedProvider(provider);
    setShowContactDialog(true);
    messageForm.reset();
  };

  const handleSelectProvider = (provider: SurveyProvider) => {
    setSelectedProvider(provider);
    setShowConfirmation(true);
  };

  const confirmProviderSelection = () => {
    setShowConfirmation(false);
  };

  const onSendMessage = (data: MessageFormValues) => {
    console.log("Sending message:", data.message);
    setShowContactDialog(false);
    messageForm.reset();
  };

  const handleViewRatings = (providerId: string) => {
    navigate(`/provider/${providerId}/ratings`);
  };

  const renderStarRating = (rating: number, reviewCount: number, providerId: string) => {
    return (
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  handleViewRatings(providerId);
                }}
                className="flex items-center hover:text-primary transition-colors"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={cn(
                      "mr-0.5",
                      star <= Math.round(rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"
                    )}
                  />
                ))}
                <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
                <span className="ml-1 text-sm text-muted-foreground flex items-center">
                  ({reviewCount} <Plus className="h-3 w-3 ml-0.5" />)
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              Voir les {reviewCount} avis clients
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="container py-6 space-y-6 max-w-7xl">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">Faire réaliser les métrés</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Building size={14} />
                  <span>{projectData.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">•</span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={14} />
                  <span>{projectData.location}</span>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informations du lot</CardTitle>
              <CardDescription>
                Détails du lot pour lequel vous souhaitez faire réaliser les métrés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Nom du lot</h3>
                  <p className="mt-1 font-medium">{projectData.lot.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Budget estimé</h3>
                  <p className="mt-1 font-medium">{projectData.lot.budget}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Maître d'ouvrage</h3>
                  <p className="mt-1 font-medium">{projectData.client}</p>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="mt-1">{projectData.lot.description}</p>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="providers">Prestataires disponibles</TabsTrigger>
              <TabsTrigger value="cost-sharing">Partage des frais</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="providers" className="space-y-6">
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-center">
                    <CardTitle>Prestataires pour métrés</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleSort('price')}>
                        <DollarSign size={14} className="mr-1" />
                        Prix
                        {sortBy === 'price' && (
                          <ArrowUpDown size={14} className={`ml-1 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                        )}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleSort('delivery')}>
                        <Clock size={14} className="mr-1" />
                        Délai
                        {sortBy === 'delivery' && (
                          <ArrowUpDown size={14} className={`ml-1 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                        )}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleSort('rating')}>
                        <Star size={14} className="mr-1" />
                        Note
                        {sortBy === 'rating' && (
                          <ArrowUpDown size={14} className={`ml-1 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                        )}
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Sélectionnez un prestataire pour réaliser les métrés de votre lot
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {sortedProviders.map((provider) => (
                      <Card key={provider.id} className={`border ${!provider.isAvailable ? 'opacity-60' : ''}`}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div>
                              <h3 className="font-medium text-lg flex items-center gap-2">
                                <HoverCard>
                                  <HoverCardTrigger asChild>
                                    <button className="hover:text-primary transition-colors flex items-center gap-1">
                                      {provider.name}
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </button>
                                  </HoverCardTrigger>
                                  <HoverCardContent className="w-80">
                                    <div className="space-y-2">
                                      <p className="text-sm">{provider.description}</p>
                                      <div className="text-sm">
                                        <div className="text-muted-foreground">{provider.address}</div>
                                        {provider.website && (
                                          <a 
                                            href={provider.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-primary hover:underline mt-1"
                                          >
                                            Voir le site web
                                            <ExternalLink className="h-3 w-3" />
                                          </a>
                                        )}
                                      </div>
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="w-full mt-2"
                                        onClick={() => navigate(`/provider/${provider.id}`)}
                                      >
                                        Voir la fiche entreprise
                                        <ExternalLink className="h-4 w-4 ml-1" />
                                      </Button>
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
                                {provider.hasBeenUsedByCompetitor && (
                                  <Badge variant="outline" className="text-amber-500 border-amber-500">
                                    Déjà exploité
                                  </Badge>
                                )}
                              </h3>
                              <div className="mt-1">{renderStarRating(provider.rating, provider.reviewCount, provider.id)}</div>
                              <div className="grid grid-cols-2 gap-4 mt-2">
                                <div>
                                  <span className="text-sm text-muted-foreground">Prix:</span>
                                  <span className="ml-2 font-medium">{provider.price} € HT</span>
                                </div>
                                <div>
                                  <span className="text-sm text-muted-foreground">Délai:</span>
                                  <span className="ml-2 font-medium">{provider.estimatedDelivery}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button 
                                variant="outline" 
                                onClick={() => handleContactProvider(provider)}
                                disabled={!provider.isAvailable}
                              >
                                <MessageSquare size={16} className="mr-1" />
                                Contacter
                              </Button>
                              <Button 
                                onClick={() => handleSelectProvider(provider)}
                                disabled={!provider.isAvailable}
                              >
                                Sélectionner
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cost-sharing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Partage des frais</CardTitle>
                  <CardDescription>
                    Partagez les frais de la prestation avec d'autres entreprises
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Le partage des frais vous permet de réduire le coût de la prestation de métrés en le partageant avec d'autres entreprises concurrentes.
                    </p>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Avantages du partage des frais</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Réduction des coûts pour chaque entreprise participante</li>
                        <li>Accès aux mêmes informations de métré que vos concurrents</li>
                        <li>Harmonisation des données pour toutes les entreprises soumissionnaires</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Questions fréquentes</CardTitle>
                  <CardDescription>
                    Tout ce que vous devez savoir sur les prestations de métrés
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        <HelpCircle size={16} />
                        Qu'est-ce qu'un métré comprend ?
                      </h3>
                      <p className="mt-1 text-muted-foreground pl-6">
                        Un métré est un document qui détaille les quantités d'ouvrages à réaliser pour un projet de construction.
                        Il comprend généralement les mesures détaillées de toutes les dimensions du projet, les calculs de surfaces, 
                        de volumes et de quantités de matériaux nécessaires.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        <HelpCircle size={16} />
                        Comment sont calculés les prix des prestations ?
                      </h3>
                      <p className="mt-1 text-muted-foreground pl-6">
                        Les prix des prestations de métrés sont généralement calculés en fonction de la complexité du projet, 
                        de la surface concernée, du type de lot et du niveau de détail requis. Les tarifs peuvent varier d'un 
                        prestataire à l'autre en fonction de leur expertise et de leur réputation.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        <HelpCircle size={16} />
                        Quelle est la durée typique pour la remise d'un métré ?
                      </h3>
                      <p className="mt-1 text-muted-foreground pl-6">
                        La durée de réalisation d'un métré dépend de la complexité et de l'ampleur du projet. Pour un lot de 
                        taille moyenne, le délai peut varier entre 3 et 10 jours ouvrables. Les prestataires indiquent leur délai 
                        estimé dans leur offre.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        <HelpCircle size={16} />
                        Que se passe-t-il après la livraison du métré ?
                      </h3>
                      <p className="mt-1 text-muted-foreground pl-6">
                        Après livraison, vous recevez un dossier complet contenant les relevés de métrés détaillés. Vous pouvez 
                        ensuite l'utiliser pour établir votre devis avec précision. Si vous avez des questions ou besoin de 
                        clarifications, le prestataire reste généralement disponible pour y répondre.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer votre choix</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedProvider && (
              <div className="space-y-4">
                <p>Vous êtes sur le point de sélectionner <strong>{selectedProvider.name}</strong> pour réaliser les métrés du lot <strong>{projectData.lot.name}</strong>.</p>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Prix</p>
                      <p className="font-medium">{selectedProvider.price} € HT</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Délai estimé</p>
                      <p className="font-medium">{selectedProvider.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  En confirmant, vous acceptez les conditions générales de vente du prestataire 
                  et vous serez redirigé vers le paiement.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>Annuler</Button>
            <Button onClick={confirmProviderSelection}>Confirmer et payer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contacter {selectedProvider?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Envoyez un message au prestataire pour obtenir plus d'informations sur ses services.
              </p>
              
              <Form {...messageForm}>
                <form onSubmit={messageForm.handleSubmit(onSendMessage)} className="space-y-4">
                  <FormField
                    control={messageForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Votre message</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            className="min-h-[100px]" 
                            placeholder="Décrivez votre besoin ou posez vos questions..."
                          />
                        </FormControl>
                        <FormDescription>
                          Soyez précis dans votre demande pour obtenir une réponse adaptée.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowContactDialog(false)}>Annuler</Button>
                    <Button type="submit">
                      <Send size={14} className="mr-2" />
                      Envoyer
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

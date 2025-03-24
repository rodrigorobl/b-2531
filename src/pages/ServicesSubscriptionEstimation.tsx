
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalculatorIcon, CheckCircle2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

// Define types for our data structures
interface Area {
  id: string;
  name: string;
  code: string;
  basePrice: number;
  region: string;
}

interface Service {
  id: string;
  name: string;
  basePrice: number;
}

interface Region {
  id: string;
  name: string;
  areas: string[]; // area codes
}

const ServicesSubscriptionEstimation = () => {
  // Define areas data (similar to departments but for services context)
  const areas: Area[] = [
    { id: 'area-91', name: 'Essonne', code: '91', basePrice: 750, region: 'ile-de-france' },
    { id: 'area-92', name: 'Hauts-de-Seine', code: '92', basePrice: 850, region: 'ile-de-france' },
    { id: 'area-93', name: 'Seine-Saint-Denis', code: '93', basePrice: 800, region: 'ile-de-france' },
    { id: 'area-94', name: 'Val-de-Marne', code: '94', basePrice: 800, region: 'ile-de-france' },
    { id: 'area-95', name: 'Val-d\'Oise', code: '95', basePrice: 750, region: 'ile-de-france' },
  ];

  // Define services data
  const services: Service[] = [
    { id: 'serv-nettoyage', name: 'Nettoyage de chantier', basePrice: 350 },
    { id: 'serv-securite', name: 'Sécurité et gardiennage', basePrice: 450 },
    { id: 'serv-materiel', name: 'Location de matériel', basePrice: 500 },
    { id: 'serv-dechets', name: 'Gestion des déchets', basePrice: 400 },
    { id: 'serv-maintenance', name: 'Maintenance équipements', basePrice: 550 },
  ];

  // Define regions data
  const regions: Region[] = [
    { 
      id: 'reg-idf', 
      name: 'Île-de-France', 
      areas: ['91', '92', '93', '94', '95']
    }
  ];

  // State for selected areas and services
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [subscriptionTerm, setSubscriptionTerm] = useState<'monthly' | 'annual'>('monthly');
  const [showSummary, setShowSummary] = useState(false);

  // Determine if prices should be visible - show when at least one service is checked AND at least one area
  const shouldShowPrices = selectedServices.length > 0 && selectedAreas.length > 0;

  // Function to check if all areas in a region are selected
  const isRegionComplete = (region: Region) => {
    return region.areas.every(areaCode => 
      selectedAreas.includes(areaCode)
    );
  };

  // Function to handle region selection
  const toggleRegion = (region: Region) => {
    // Check if all areas in the region are already selected
    const allSelected = isRegionComplete(region);
    
    if (allSelected) {
      // If all are selected, deselect all areas in this region
      setSelectedAreas(prev => 
        prev.filter(areaCode => !region.areas.includes(areaCode))
      );
    } else {
      // If not all selected, select all areas in this region
      const newAreas = [...selectedAreas];
      region.areas.forEach(areaCode => {
        if (!newAreas.includes(areaCode)) {
          newAreas.push(areaCode);
        }
      });
      setSelectedAreas(newAreas);
    }
  };

  // Calculate total price based on selections
  const calculateTotalPrice = () => {
    if (!shouldShowPrices) {
      return {
        areasPrice: 0,
        servicesPrice: 0,
        discount: 0,
        subscriptionDiscount: 0,
        total: 0
      };
    }

    // Base calculation from areas
    const areaTotal = selectedAreas.reduce((sum, areaCode) => {
      const area = areas.find(a => a.code === areaCode);
      // Area price is scaled by number of services
      const serviceMultiplier = Math.max(selectedServices.length, 1);
      return sum + (area ? area.basePrice * serviceMultiplier * 0.2 + area.basePrice : 0);
    }, 0);

    // Service price calculation (multiplied by selected areas count)
    const areaMultiplier = Math.max(selectedAreas.length, 1); // At least 1
    const serviceTotal = selectedServices.reduce((sum, servId) => {
      const service = services.find(s => s.id === servId);
      return sum + (service ? service.basePrice * areaMultiplier : 0);
    }, 0);

    // Calculate regional discounts
    let discount = 0;
    regions.forEach(region => {
      if (isRegionComplete(region)) {
        // Apply 15% discount on areas in this region
        const regionAreaTotal = region.areas.reduce((sum, areaCode) => {
          const area = areas.find(a => a.code === areaCode);
          return sum + (area ? area.basePrice : 0);
        }, 0);
        discount += regionAreaTotal * 0.15;
      }
    });

    // Calculate subscription term discount
    let total = areaTotal + serviceTotal - discount;
    if (subscriptionTerm === 'annual') {
      // Apply 15% annual discount
      total = total * 0.85;
    }

    return {
      areasPrice: areaTotal,
      servicesPrice: serviceTotal,
      discount: discount,
      subscriptionDiscount: subscriptionTerm === 'annual' ? (areaTotal + serviceTotal - discount) * 0.15 : 0,
      total: total
    };
  };

  const priceDetails = calculateTotalPrice();

  // Handle area selection
  const toggleArea = (areaCode: string) => {
    setSelectedAreas(prev => 
      prev.includes(areaCode) 
        ? prev.filter(a => a !== areaCode) 
        : [...prev, areaCode]
    );
  };

  // Handle service selection
  const toggleService = (servId: string) => {
    setSelectedServices(prev => 
      prev.includes(servId) 
        ? prev.filter(s => s !== servId) 
        : [...prev, servId]
    );
  };

  // Handle subscription term change
  const handleTermChange = (value: string) => {
    setSubscriptionTerm(value as 'monthly' | 'annual');
  };

  // Generate summary
  const handleGenerateSummary = () => {
    if (selectedAreas.length === 0 || selectedServices.length === 0) {
      toast.error("Veuillez sélectionner au moins une zone et un service");
      return;
    }
    setShowSummary(true);
  };

  // Calculate area price impact with selected services
  const getAreaPriceImpact = (area: Area) => {
    if (!shouldShowPrices) return 0;
    
    const serviceMultiplier = Math.max(selectedServices.length, 1);
    return area.basePrice * serviceMultiplier * 0.2 + area.basePrice;
  };

  // Calculate service price impact with selected areas
  const getServicePriceImpact = (service: Service) => {
    if (selectedAreas.length === 0 || !shouldShowPrices) return 0;
    
    const areaMultiplier = Math.max(selectedAreas.length, 1);
    return service.basePrice * areaMultiplier;
  };

  return (
    <div className="container max-w-6xl py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Estimation du prix d'abonnement services</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Selections */}
        <div className="lg:col-span-2 space-y-8">
          {!showSummary ? (
            <>
              {/* Subscription Term - MOVED TO TOP */}
              <Card>
                <CardHeader>
                  <CardTitle>Durée d'abonnement</CardTitle>
                  <CardDescription>
                    Choisissez entre un abonnement mensuel ou annuel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="monthly" value={subscriptionTerm} onValueChange={handleTermChange}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="monthly">Mensuel</TabsTrigger>
                      <TabsTrigger value="annual">Annuel (-15%)</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Areas Selection with Region selection at the top */}
              <Card>
                <CardHeader>
                  <CardTitle>Zones d'intervention</CardTitle>
                  <CardDescription>
                    Sélectionnez les zones où vous souhaitez proposer vos services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Region Selection */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Sélection par région</h3>
                    <div className="space-y-2">
                      {regions.map(region => (
                        <div 
                          key={region.id} 
                          className="flex items-center space-x-3 p-3 rounded-md border hover:bg-accent/20 transition-colors"
                        >
                          <Checkbox 
                            id={`region-${region.id}`} 
                            checked={isRegionComplete(region)}
                            onCheckedChange={() => toggleRegion(region)}
                          />
                          <div className="flex-1">
                            <label htmlFor={`region-${region.id}`} className="font-medium cursor-pointer">
                              {region.name}
                            </label>
                            {isRegionComplete(region) && shouldShowPrices && (
                              <Badge variant="destructive" className="ml-2">
                                Remise -15%
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Areas List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {areas.map((area) => {
                      const isSelected = selectedAreas.includes(area.code);
                      const priceImpact = getAreaPriceImpact(area);
                      
                      return (
                        <div key={area.id} className="flex items-start space-x-3 p-3 rounded-md border hover:bg-accent/20 transition-colors">
                          <Checkbox 
                            id={area.id} 
                            checked={isSelected}
                            onCheckedChange={() => toggleArea(area.code)}
                          />
                          <div className="flex-1">
                            <label htmlFor={area.id} className="font-medium cursor-pointer">
                              {area.name} ({area.code})
                            </label>
                            {shouldShowPrices && (isSelected ? (
                              <Badge variant="destructive" className="ml-2">
                                -{priceImpact.toFixed(0)}€ HT
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="ml-2 bg-green-500 text-white">
                                +{priceImpact.toFixed(0)}€ HT
                              </Badge>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Services Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Services</CardTitle>
                  <CardDescription>
                    Sélectionnez les services que vous proposez
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => {
                      const isSelected = selectedServices.includes(service.id);
                      const priceImpact = getServicePriceImpact(service);
                      
                      return (
                        <div key={service.id} className="flex items-start space-x-3 p-3 rounded-md border hover:bg-accent/20 transition-colors">
                          <Checkbox 
                            id={service.id} 
                            checked={isSelected}
                            onCheckedChange={() => toggleService(service.id)}
                          />
                          <div className="flex-1">
                            <label htmlFor={service.id} className="font-medium cursor-pointer">
                              {service.name}
                            </label>
                            {shouldShowPrices && (isSelected ? (
                              <Badge variant="destructive" className="ml-2">
                                -{priceImpact.toFixed(0)}€ HT
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="ml-2 bg-green-500 text-white">
                                +{priceImpact.toFixed(0)}€ HT
                              </Badge>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif de votre abonnement</CardTitle>
                <CardDescription>
                  Détails de l'abonnement personnalisé selon vos critères
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Areas Summary */}
                <div>
                  <h3 className="font-semibold mb-2">Zones sélectionnées</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedAreas.map(areaCode => {
                      const area = areas.find(a => a.code === areaCode);
                      return area ? (
                        <div key={area.code} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>{area.name} ({area.code})</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Services Summary */}
                <div>
                  <h3 className="font-semibold mb-2">Services sélectionnés</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedServices.map(servId => {
                      const service = services.find(s => s.id === servId);
                      return service ? (
                        <div key={service.id} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>{service.name}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Regional Discounts */}
                <div>
                  <h3 className="font-semibold mb-2">Remises appliquées</h3>
                  <div className="space-y-2">
                    {regions.map(region => (
                      isRegionComplete(region) ? (
                        <div key={region.id} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>Remise régionale: {region.name} (-15%)</span>
                        </div>
                      ) : null
                    ))}
                    {subscriptionTerm === 'annual' && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Remise abonnement annuel (-15%)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Detailed Price Breakdown */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Détail du prix</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Prix des zones:</span>
                      <span>{priceDetails.areasPrice.toFixed(0)}€ HT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prix des services:</span>
                      <span>{priceDetails.servicesPrice.toFixed(0)}€ HT</span>
                    </div>
                    {priceDetails.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Remise régionale:</span>
                        <span>-{priceDetails.discount.toFixed(0)}€ HT</span>
                      </div>
                    )}
                    {priceDetails.subscriptionDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Remise abonnement annuel:</span>
                        <span>-{priceDetails.subscriptionDiscount.toFixed(0)}€ HT</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start">
                <div className="w-full flex justify-between items-center py-4 border-t">
                  <div>
                    <p className="text-lg font-bold">Prix total:</p>
                    <p className="text-sm text-muted-foreground">
                      {subscriptionTerm === 'monthly' ? 'Mensuel' : 'Annuel'}
                    </p>
                  </div>
                  <p className="text-2xl font-bold">
                    {priceDetails.total.toFixed(0)}€ HT
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      {subscriptionTerm === 'monthly' ? '/mois' : '/an'}
                    </span>
                  </p>
                </div>
                <div className="w-full flex flex-col sm:flex-row gap-4 mt-4">
                  <Button variant="outline" className="w-full sm:w-auto" onClick={() => setShowSummary(false)}>
                    Modifier ma sélection
                  </Button>
                  <Button className="w-full sm:w-auto" onClick={() => toast.success("Votre demande d'abonnement a été envoyée!")}>
                    Valider l'abonnement
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>

        {/* Right Column - Price Summary */}
        <div>
          <div className="sticky top-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalculatorIcon className="h-5 w-5" />
                  Résumé du prix
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Display selected areas with individual prices */}
                {selectedAreas.length > 0 && shouldShowPrices && (
                  <div className="space-y-2">
                    <div className="flex justify-between font-medium">
                      <span>Zones sélectionnées</span>
                      <span>{priceDetails.areasPrice.toFixed(0)}€ HT</span>
                    </div>
                    <div className="pl-4 text-sm space-y-1 border-l-2 border-gray-100">
                      {selectedAreas.map(areaCode => {
                        const area = areas.find(a => a.code === areaCode);
                        if (!area) return null;
                        const areaPrice = getAreaPriceImpact(area);
                        return (
                          <div key={area.id} className="flex justify-between">
                            <span>{area.name} ({area.code})</span>
                            <span>{areaPrice.toFixed(0)}€ HT</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Display selected services with individual prices */}
                {selectedServices.length > 0 && shouldShowPrices && (
                  <div className="space-y-2">
                    <div className="flex justify-between font-medium">
                      <span>Services sélectionnés</span>
                      <span>{priceDetails.servicesPrice.toFixed(0)}€ HT</span>
                    </div>
                    <div className="pl-4 text-sm space-y-1 border-l-2 border-gray-100">
                      {selectedServices.map(servId => {
                        const service = services.find(s => s.id === servId);
                        if (!service) return null;
                        const servicePrice = getServicePriceImpact(service);
                        return (
                          <div key={service.id} className="flex justify-between">
                            <span>{service.name}</span>
                            <span>{servicePrice.toFixed(0)}€ HT</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {priceDetails.discount > 0 && shouldShowPrices && (
                  <div className="flex justify-between text-green-600">
                    <span>Remise régionale</span>
                    <span>-{priceDetails.discount.toFixed(0)}€ HT</span>
                  </div>
                )}
                {priceDetails.subscriptionDiscount > 0 && shouldShowPrices && (
                  <div className="flex justify-between text-green-600">
                    <span>Remise annuelle</span>
                    <span>-{priceDetails.subscriptionDiscount.toFixed(0)}€ HT</span>
                  </div>
                )}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total</span>
                    {shouldShowPrices ? (
                      <span className="text-xl font-bold">
                        {priceDetails.total.toFixed(0)}€ HT
                        <span className="text-xs font-normal ml-1">
                          {subscriptionTerm === 'monthly' ? '/mois' : '/an'}
                        </span>
                      </span>
                    ) : (
                      <span className="text-sm italic text-muted-foreground">
                        Sélectionnez au moins une zone et un service
                      </span>
                    )}
                  </div>
                </div>

                {!showSummary && (
                  <Button 
                    className="w-full mt-4" 
                    disabled={selectedAreas.length === 0 || selectedServices.length === 0}
                    onClick={handleGenerateSummary}
                  >
                    Générer le récapitulatif
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSubscriptionEstimation;

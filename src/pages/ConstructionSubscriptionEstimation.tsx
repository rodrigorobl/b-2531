import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalculatorIcon, CheckCircle2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

// Define types for our data structures
interface Department {
  id: string;
  name: string;
  code: string;
  basePrice: number;
  region: string;
}

interface Activity {
  id: string;
  name: string;
  basePrice: number;
}

interface Region {
  id: string;
  name: string;
  departments: string[]; // department codes
}

const ConstructionSubscriptionEstimation = () => {
  // Define departments data
  const departments: Department[] = [
    { id: 'dept-91', name: 'Essonne', code: '91', basePrice: 950, region: 'ile-de-france' },
    { id: 'dept-92', name: 'Hauts-de-Seine', code: '92', basePrice: 950, region: 'ile-de-france' },
    { id: 'dept-93', name: 'Seine-Saint-Denis', code: '93', basePrice: 950, region: 'ile-de-france' },
    { id: 'dept-94', name: 'Val-de-Marne', code: '94', basePrice: 950, region: 'ile-de-france' },
  ];

  // Define activities data
  const activities: Activity[] = [
    { id: 'act-plomberie', name: 'Plomberie', basePrice: 450 },
    { id: 'act-electricite', name: 'Électricité', basePrice: 500 },
    { id: 'act-maconnerie', name: 'Maçonnerie', basePrice: 600 },
    { id: 'act-platrerie', name: 'Plâtrerie', basePrice: 400 },
    { id: 'act-carrelage', name: 'Carrelage', basePrice: 350 },
  ];

  // Define regions data
  const regions: Region[] = [
    { 
      id: 'reg-idf', 
      name: 'Île-de-France', 
      departments: ['91', '92', '93', '94']
    }
  ];

  // State for selected departments and activities
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [subscriptionTerm, setSubscriptionTerm] = useState<'monthly' | 'annual'>('monthly');
  const [showSummary, setShowSummary] = useState(false);

  // Determine if prices should be visible - UPDATED to show when at least one activity is checked
  const shouldShowPrices = selectedActivities.length > 0;

  // Function to check if all departments in a region are selected
  const isRegionComplete = (region: Region) => {
    return region.departments.every(deptCode => 
      selectedDepartments.includes(deptCode)
    );
  };

  // Function to handle region selection
  const toggleRegion = (region: Region) => {
    // Check if all departments in the region are already selected
    const allSelected = isRegionComplete(region);
    
    if (allSelected) {
      // If all are selected, deselect all departments in this region
      setSelectedDepartments(prev => 
        prev.filter(deptCode => !region.departments.includes(deptCode))
      );
    } else {
      // If not all selected, select all departments in this region
      const newDepts = [...selectedDepartments];
      region.departments.forEach(deptCode => {
        if (!newDepts.includes(deptCode)) {
          newDepts.push(deptCode);
        }
      });
      setSelectedDepartments(newDepts);
    }
  };

  // Calculate total price based on selections
  const calculateTotalPrice = () => {
    if (!shouldShowPrices) {
      return {
        departmentsPrice: 0,
        activitiesPrice: 0,
        discount: 0,
        subscriptionDiscount: 0,
        total: 0
      };
    }

    // Base calculation from departments
    const deptTotal = selectedDepartments.reduce((sum, deptCode) => {
      const dept = departments.find(d => d.code === deptCode);
      // Department price is scaled by number of activities
      const activityMultiplier = Math.max(selectedActivities.length, 1);
      return sum + (dept ? dept.basePrice * activityMultiplier * 0.2 + dept.basePrice : 0);
    }, 0);

    // Activity price calculation (multiplied by selected departments count)
    const activityMultiplier = Math.max(selectedDepartments.length, 1); // At least 1
    const activityTotal = selectedActivities.reduce((sum, actId) => {
      const activity = activities.find(a => a.id === actId);
      return sum + (activity ? activity.basePrice * activityMultiplier : 0);
    }, 0);

    // Calculate regional discounts
    let discount = 0;
    regions.forEach(region => {
      if (isRegionComplete(region)) {
        // Apply 15% discount on departments in this region
        const regionDeptTotal = region.departments.reduce((sum, deptCode) => {
          const dept = departments.find(d => d.code === deptCode);
          return sum + (dept ? dept.basePrice : 0);
        }, 0);
        discount += regionDeptTotal * 0.15;
      }
    });

    // Calculate subscription term discount
    let total = deptTotal + activityTotal - discount;
    if (subscriptionTerm === 'annual') {
      // Apply 15% annual discount
      total = total * 0.85;
    }

    return {
      departmentsPrice: deptTotal,
      activitiesPrice: activityTotal,
      discount: discount,
      subscriptionDiscount: subscriptionTerm === 'annual' ? (deptTotal + activityTotal - discount) * 0.15 : 0,
      total: total
    };
  };

  const priceDetails = calculateTotalPrice();

  // Handle department selection
  const toggleDepartment = (deptCode: string) => {
    setSelectedDepartments(prev => 
      prev.includes(deptCode) 
        ? prev.filter(d => d !== deptCode) 
        : [...prev, deptCode]
    );
  };

  // Handle activity selection
  const toggleActivity = (actId: string) => {
    setSelectedActivities(prev => 
      prev.includes(actId) 
        ? prev.filter(a => a !== actId) 
        : [...prev, actId]
    );
  };

  // Handle subscription term change
  const handleTermChange = (value: string) => {
    setSubscriptionTerm(value as 'monthly' | 'annual');
  };

  // Generate summary
  const handleGenerateSummary = () => {
    if (selectedDepartments.length === 0 || selectedActivities.length === 0) {
      toast.error("Veuillez sélectionner au moins un département et une activité");
      return;
    }
    setShowSummary(true);
  };

  // Calculate department price impact with selected activities
  const getDepartmentPriceImpact = (dept: Department) => {
    if (!shouldShowPrices) return 0;
    
    const activityMultiplier = Math.max(selectedActivities.length, 1);
    return dept.basePrice * activityMultiplier * 0.2 + dept.basePrice;
  };

  // Calculate activity price impact with selected departments
  const getActivityPriceImpact = (activity: Activity) => {
    if (!shouldShowPrices) return 0;
    
    const deptMultiplier = Math.max(selectedDepartments.length, 1);
    return activity.basePrice * deptMultiplier;
  };

  return (
    <div className="container max-w-6xl py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Estimation du prix d'abonnement</h1>
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

              {/* Departments Selection with Region selection at the top */}
              <Card>
                <CardHeader>
                  <CardTitle>Départements</CardTitle>
                  <CardDescription>
                    Sélectionnez les départements où vous souhaitez être visible
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

                  {/* Departments List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {departments.map((dept) => {
                      const isSelected = selectedDepartments.includes(dept.code);
                      const priceImpact = getDepartmentPriceImpact(dept);
                      
                      return (
                        <div key={dept.id} className="flex items-start space-x-3 p-3 rounded-md border hover:bg-accent/20 transition-colors">
                          <Checkbox 
                            id={dept.id} 
                            checked={isSelected}
                            onCheckedChange={() => toggleDepartment(dept.code)}
                          />
                          <div className="flex-1">
                            <label htmlFor={dept.id} className="font-medium cursor-pointer">
                              {dept.name} ({dept.code})
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

              {/* Activities Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Activités</CardTitle>
                  <CardDescription>
                    Sélectionnez les activités de construction qui vous concernent
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activities.map((activity) => {
                      const isSelected = selectedActivities.includes(activity.id);
                      const priceImpact = getActivityPriceImpact(activity);
                      
                      return (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-md border hover:bg-accent/20 transition-colors">
                          <Checkbox 
                            id={activity.id} 
                            checked={isSelected}
                            onCheckedChange={() => toggleActivity(activity.id)}
                          />
                          <div className="flex-1">
                            <label htmlFor={activity.id} className="font-medium cursor-pointer">
                              {activity.name}
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
                {/* Departments Summary */}
                <div>
                  <h3 className="font-semibold mb-2">Départements sélectionnés</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDepartments.map(deptCode => {
                      const dept = departments.find(d => d.code === deptCode);
                      return dept ? (
                        <div key={dept.code} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>{dept.name} ({dept.code})</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Activities Summary */}
                <div>
                  <h3 className="font-semibold mb-2">Activités sélectionnées</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedActivities.map(actId => {
                      const activity = activities.find(a => a.id === actId);
                      return activity ? (
                        <div key={activity.id} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>{activity.name}</span>
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
                      <span>Prix des départements:</span>
                      <span>{priceDetails.departmentsPrice.toFixed(0)}€ HT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prix des activités:</span>
                      <span>{priceDetails.activitiesPrice.toFixed(0)}€ HT</span>
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
                <div className="flex justify-between">
                  <span>Départements ({selectedDepartments.length})</span>
                  {shouldShowPrices ? (
                    <span>{priceDetails.departmentsPrice.toFixed(0)}€ HT</span>
                  ) : (
                    <span>-</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span>Activités ({selectedActivities.length})</span>
                  {shouldShowPrices ? (
                    <span>{priceDetails.activitiesPrice.toFixed(0)}€ HT</span>
                  ) : (
                    <span>-</span>
                  )}
                </div>
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
                        Sélectionnez au moins un département et une activité
                      </span>
                    )}
                  </div>
                </div>

                {!showSummary && (
                  <Button 
                    className="w-full mt-4" 
                    disabled={selectedDepartments.length === 0 || selectedActivities.length === 0}
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

export default ConstructionSubscriptionEstimation;

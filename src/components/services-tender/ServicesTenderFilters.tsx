
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  CircleDollarSign, 
  Clock,
  Map, 
  Tags
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function ServicesTenderFilters() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    status: true,
    type: true,
    location: true,
    budget: true,
    date: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Service types based on requested values
  const serviceTypes = [
    "LOCATION DE LOCAUX DE STOCKAGE",
    "SERVICES DE PHOTOGRAPHIE ET VIDÉO PROMOTIONNELLE",
    "PHOTOGRAPHE DE CHANTIER",
    "PILOTE DE DRONE POUR VUES AÉRIENNES",
    "SERVICES DE MARKETING SUR LE CHANTIER",
    "ORGANISATION DE VISITES DE CHANTIER POUR LES CLIENTS",
    "SERVICES D'AMÉNAGEMENT INTÉRIEUR ET HOME STAGING"
  ];

  return (
    <aside className="w-72 min-w-72 border-r bg-background">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Filtres</h2>
      </div>
      
      <ScrollArea className="h-[calc(100vh-13rem)]">
        <div className="p-4 space-y-6">
          {/* Status Filter */}
          <Collapsible 
            open={openSections.status} 
            onOpenChange={() => toggleSection('status')}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex w-full justify-between p-0 h-auto mb-2">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-muted-foreground" />
                  <span>Statut</span>
                </div>
                {openSections.status ? (
                  <ChevronUp size={16} className="text-muted-foreground" />
                ) : (
                  <ChevronDown size={16} className="text-muted-foreground" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="status-open" />
                <Label htmlFor="status-open">En cours</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="status-closed" />
                <Label htmlFor="status-closed">Clôturé</Label>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <Separator />
          
          {/* Service Type Filter */}
          <Collapsible 
            open={openSections.type} 
            onOpenChange={() => toggleSection('type')}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex w-full justify-between p-0 h-auto mb-2">
                <div className="flex items-center gap-2">
                  <Tags size={16} className="text-muted-foreground" />
                  <span>Type de service</span>
                </div>
                {openSections.type ? (
                  <ChevronUp size={16} className="text-muted-foreground" />
                ) : (
                  <ChevronDown size={16} className="text-muted-foreground" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {serviceTypes.map((type, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`type-${index}`} />
                  <Label htmlFor={`type-${index}`} className="text-sm">{type}</Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
          
          <Separator />
          
          {/* Location Filter */}
          <Collapsible 
            open={openSections.location} 
            onOpenChange={() => toggleSection('location')}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex w-full justify-between p-0 h-auto mb-2">
                <div className="flex items-center gap-2">
                  <Map size={16} className="text-muted-foreground" />
                  <span>Localisation</span>
                </div>
                {openSections.location ? (
                  <ChevronUp size={16} className="text-muted-foreground" />
                ) : (
                  <ChevronDown size={16} className="text-muted-foreground" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="location-paris" />
                <Label htmlFor="location-paris">Paris</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="location-lyon" />
                <Label htmlFor="location-lyon">Lyon</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="location-marseille" />
                <Label htmlFor="location-marseille">Marseille</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="location-bordeaux" />
                <Label htmlFor="location-bordeaux">Bordeaux</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="location-lille" />
                <Label htmlFor="location-lille">Lille</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="location-nice" />
                <Label htmlFor="location-nice">Nice</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="location-nantes" />
                <Label htmlFor="location-nantes">Nantes</Label>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <Separator />
          
          {/* Budget Filter */}
          <Collapsible 
            open={openSections.budget} 
            onOpenChange={() => toggleSection('budget')}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex w-full justify-between p-0 h-auto mb-2">
                <div className="flex items-center gap-2">
                  <CircleDollarSign size={16} className="text-muted-foreground" />
                  <span>Budget</span>
                </div>
                {openSections.budget ? (
                  <ChevronUp size={16} className="text-muted-foreground" />
                ) : (
                  <ChevronDown size={16} className="text-muted-foreground" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="budget-5k" />
                <Label htmlFor="budget-5k">Moins de 5 000 €</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="budget-10k" />
                <Label htmlFor="budget-10k">5 000 € - 10 000 €</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="budget-20k" />
                <Label htmlFor="budget-20k">10 000 € - 20 000 €</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="budget-50k" />
                <Label htmlFor="budget-50k">20 000 € - 50 000 €</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="budget-plus" />
                <Label htmlFor="budget-plus">Plus de 50 000 €</Label>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <Separator />
          
          {/* Date Filter */}
          <Collapsible 
            open={openSections.date} 
            onOpenChange={() => toggleSection('date')}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex w-full justify-between p-0 h-auto mb-2">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span>Date limite</span>
                </div>
                {openSections.date ? (
                  <ChevronUp size={16} className="text-muted-foreground" />
                ) : (
                  <ChevronDown size={16} className="text-muted-foreground" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="date-week" />
                <Label htmlFor="date-week">Cette semaine</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="date-month" />
                <Label htmlFor="date-month">Ce mois-ci</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="date-quarter" />
                <Label htmlFor="date-quarter">Ce trimestre</Label>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t flex gap-2">
        <Button variant="outline" className="flex-1">Réinitialiser</Button>
        <Button className="flex-1">Appliquer</Button>
      </div>
    </aside>
  );
}
